<?php
header('Content-Type: application/json; charset=utf-8');

// 1. ЗАГРУЗКА .env
$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0) continue;
        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) continue;
        $key = trim($parts[0]);
        $value = trim(trim($parts[1]), "\"'");
        if ($key !== '') $_ENV[$key] = $value;
    }
} else {
    echo json_encode(['error' => '.env file not found']);
    exit;
}

// 2. КОНФИГ
$supabaseUrl = $_ENV['SUPABASE_URL'] ?? '';
$supabaseKey = $_ENV['SUPABASE_KEY'] ?? '';
$tgToken     = $_ENV['TG_BOT_TOKEN'] ?? '';
$tgChatId    = $_ENV['TG_CHAT_ID']  ?? '';

if (!$supabaseUrl || !$supabaseKey) {
    echo json_encode(['error' => 'Supabase config missing']);
    exit;
}

// 3. ЧТЕНИЕ ДАННЫХ
$input = json_decode(file_get_contents('php://input'), true);
$action = $_GET['action'] ?? '';

if (!$input || !$action) {
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

$email    = $input['email'] ?? '';
$password = $input['password'] ?? '';
$nickname = $input['nickname'] ?? '';

// 4. ШАГ 1: SUPABASE AUTH (Регистрация или Вход)
$endpoint = ($action === 'register') ? '/auth/v1/signup' : '/auth/v1/token?grant_type=password';

$ch = curl_init($supabaseUrl . $endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['email' => $email, 'password' => $password]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'apikey: ' . $supabaseKey,
    'Content-Type: application/json'
]);

$authResponse = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$authData = json_decode($authResponse, true);

// КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: Достаем ID правильно
$supabaseUserId = $authData['id'] ?? $authData['user']['id'] ?? null;
$isOk = ($httpCode >= 200 && $httpCode < 300) && !isset($authData['error']);

// 5. ШАГ 2: СОХРАНЕНИЕ ПРОФИЛЯ
if ($action === 'register' && $isOk && $supabaseUserId) {
    
    // Формируем данные (snake_case как в таблице)
    $profileData = [
        'id'         => $supabaseUserId,
        'email'      => $email,
        'nickname'   => $nickname,
        'rank_value' => $input['rankValue'] ?? null,
        'rank_label' => $input['rankLabel'] ?? null,
        'role'       => $input['role'] ?? null,
        'role_label' => $input['roleLabel'] ?? null,
        'about'      => $input['about'] ?? null
    ];

    $chP = curl_init($supabaseUrl . '/rest/v1/profiles');
    curl_setopt($chP, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($chP, CURLOPT_POST, true);
    
    // ОТПРАВЛЯЕМ ИМЕННО $profileData
    curl_setopt($chP, CURLOPT_POSTFIELDS, json_encode($profileData)); 
    
    curl_setopt($chP, CURLOPT_HTTPHEADER, [
        'apikey: ' . $supabaseKey,
        'Authorization: Bearer ' . $supabaseKey, // Должен быть Service Role Key
        'Content-Type: application/json',
        'Prefer: return=minimal'
    ]);

    curl_exec($chP);
    curl_close($chP);
}

// 6. ШАГ 3: TELEGRAM
if ($isOk && $tgToken && $tgChatId) {
    $actionTitle = ($action === 'register') ? "🔔 НОВА РЕЄСТРАЦІЯ" : "✅ НОВИЙ ВХІД";
    $tgText = "<b>$actionTitle</b>\n\n"
            . "👤 Нік: " . ($nickname ?: '—') . "\n"
            . "📧 Email: <code>$email</code>\n"
            . "🏅 Ранг: " . ($input['rankLabel'] ?? '—') . "\n"
            . "🎯 Роль: " . ($input['roleLabel'] ?? '—') . "\n"
            . "🌐 IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');

    $tgUrl = "https://api.telegram.org/bot{$tgToken}/sendMessage";
    $tgCh = curl_init($tgUrl);
    curl_setopt($tgCh, CURLOPT_POST, true);
    curl_setopt($tgCh, CURLOPT_POSTFIELDS, ['chat_id' => $tgChatId, 'text' => $tgText, 'parse_mode' => 'HTML']);
    curl_setopt($tgCh, CURLOPT_RETURNTRANSFER, true);
    curl_exec($tgCh);
    curl_close($tgCh);
}

// ОТВЕТ КЛИЕНТУ
http_response_code($httpCode);
echo $authResponse;