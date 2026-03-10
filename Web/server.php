<?php
ob_start();

header('Content-Type: application/json; charset=utf-8');
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

function jsonResponse(array $data, int $statusCode = 200): void {
    if (ob_get_length()) {
        ob_clean();
    }

    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function supabasePost(string $url, array $payload, array $headers): array {
    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_TIMEOUT => 30,
    ]);

    $response = curl_exec($ch);
    $curlError = curl_error($ch);
    $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (is_resource($ch) || $ch instanceof CurlHandle) {
        curl_close($ch);
    }

    if ($response === false) {
        return [
            'ok' => false,
            'http_code' => 500,
            'error' => 'cURL error: ' . $curlError,
            'body' => null,
            'raw' => null,
        ];
    }

    $decoded = json_decode($response, true);

    return [
        'ok' => $httpCode >= 200 && $httpCode < 300,
        'http_code' => $httpCode,
        'error' => null,
        'body' => $decoded ?? $response,
        'raw' => $response,
    ];
}

function telegramSend(string $botToken, string $chatId, string $message): array {
    $url = "https://api.telegram.org/bot{$botToken}/sendMessage";

    $payload = [
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'HTML',
    ];

    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($payload),
        CURLOPT_TIMEOUT => 30,
    ]);

    $response = curl_exec($ch);
    $curlError = curl_error($ch);
    $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (is_resource($ch) || $ch instanceof CurlHandle) {
        curl_close($ch);
    }

    if ($response === false) {
        return [
            'ok' => false,
            'http_code' => 500,
            'error' => 'Telegram cURL error: ' . $curlError,
            'body' => null,
        ];
    }

    $decoded = json_decode($response, true);

    return [
        'ok' => $httpCode >= 200 && $httpCode < 300 && !empty($decoded['ok']),
        'http_code' => $httpCode,
        'error' => $decoded['description'] ?? null,
        'body' => $decoded,
    ];
}

function safeText(mixed $value): string {
    return htmlspecialchars(trim((string)$value), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$env = parse_ini_file(__DIR__ . '/.env', false, INI_SCANNER_RAW);

if ($env === false || !is_array($env)) {
    jsonResponse([
        'success' => false,
        'error' => 'Не вдалося прочитати .env'
    ], 500);
}

$supabaseUrl = isset($env['SUPABASE_URL']) ? trim((string)$env['SUPABASE_URL']) : '';
$supabaseKey = isset($env['SUPABASE_KEY']) ? trim((string)$env['SUPABASE_KEY']) : '';
$supabaseServiceKey = isset($env['SUPABASE_SERVICE_KEY']) ? trim((string)$env['SUPABASE_SERVICE_KEY']) : '';
$tgBotToken = isset($env['TG_BOT_TOKEN']) ? trim((string)$env['TG_BOT_TOKEN']) : '';
$tgChatId = isset($env['TG_CHAT_ID']) ? trim((string)$env['TG_CHAT_ID']) : '';

if ($supabaseUrl === '' || $supabaseKey === '' || $supabaseServiceKey === '') {
    jsonResponse([
        'success' => false,
        'error' => 'У .env відсутні SUPABASE_URL, SUPABASE_KEY або SUPABASE_SERVICE_KEY'
    ], 500);
}

$supabaseUrl = rtrim($supabaseUrl, '/');

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (!is_array($input)) {
    jsonResponse([
        'success' => false,
        'error' => 'Неверный JSON в теле запроса'
    ], 400);
}

$action = $_GET['action'] ?? '';

if (!in_array($action, ['register', 'login'], true)) {
    jsonResponse([
        'success' => false,
        'error' => 'Некорректный action. Используй ?action=register или ?action=login'
    ], 400);
}

$email = trim((string)($input['email'] ?? ''));
$password = (string)($input['password'] ?? '');
$nickname = trim((string)($input['nickname'] ?? 'Player'));
$rankValue = trim((string)($input['rankValue'] ?? ''));
$role = trim((string)($input['role'] ?? ''));
$about = trim((string)($input['about'] ?? ''));
$avatar = (string)($input['avatar'] ?? '');

if ($email === '' || $password === '') {
    jsonResponse([
        'success' => false,
        'error' => 'Email и пароль обязательны'
    ], 400);
}

$authUrl = $supabaseUrl . (
    $action === 'register'
        ? '/auth/v1/signup'
        : '/auth/v1/token?grant_type=password'
);

$authPayload = [
    'email' => $email,
    'password' => $password,
];

$authHeaders = [
    'apikey: ' . $supabaseKey,
    'Content-Type: application/json',
];

$authResult = supabasePost($authUrl, $authPayload, $authHeaders);

if (!$authResult['ok']) {
    jsonResponse([
        'success' => false,
        'step' => 'auth',
        'http_code' => $authResult['http_code'],
        'error' => $authResult['body']['msg']
            ?? $authResult['body']['error_description']
            ?? $authResult['body']['message']
            ?? $authResult['body']['error']
            ?? $authResult['error']
            ?? 'Ошибка авторизации в Supabase',
        'details' => $authResult['body'],
    ], $authResult['http_code'] > 0 ? $authResult['http_code'] : 500);
}

$authData = $authResult['body'];

if ($action === 'register') {
    $userId = $authData['user']['id'] ?? $authData['id'] ?? null;

    if (!$userId) {
        jsonResponse([
            'success' => false,
            'step' => 'profile',
            'error' => 'Регистрация прошла, но не удалось получить user id',
            'auth_response' => $authData,
        ], 500);
    }

    $profilePayload = [
        'id' => $userId,
        'nickname' => $nickname !== '' ? $nickname : 'Player',
        'rank' => $rankValue,
        'role' => $role,
        'email' => $email,
        'about' => $about,
        'avatar' => $avatar,
    ];

    $profileUrl = $supabaseUrl . '/rest/v1/profiles';

    $profileHeaders = [
        'apikey: ' . $supabaseServiceKey,
        'Authorization: Bearer ' . $supabaseServiceKey,
        'Content-Type: application/json',
        'Prefer: return=representation',
    ];

    $profileResult = supabasePost($profileUrl, $profilePayload, $profileHeaders);

    if (!$profileResult['ok']) {
        jsonResponse([
            'success' => false,
            'step' => 'profile',
            'error' => $profileResult['body']['message']
                ?? $profileResult['body']['error']
                ?? $profileResult['error']
                ?? 'Не удалось записать профиль в profiles',
            'details' => $profileResult['body'],
            'auth_response' => $authData,
        ], $profileResult['http_code'] > 0 ? $profileResult['http_code'] : 500);
    }

    $telegramResult = null;

    if ($tgBotToken !== '' && $tgChatId !== '') {
        $message =
            "🎮 <b>Нова реєстрація True Dota</b>\n\n" .
            "👤 <b>Нік:</b> " . safeText($nickname !== '' ? $nickname : 'Player') . "\n" .
            "📧 <b>Email:</b> " . safeText($email) . "\n" .
            "🏆 <b>Ранг:</b> " . safeText($rankValue !== '' ? $rankValue : 'Не вказано') . "\n" .
            "🎯 <b>Роль:</b> " . safeText($role !== '' ? $role : 'Не вказано') . "\n" .
            "📝 <b>Про себе:</b> " . safeText($about !== '' ? $about : 'Не вказано');

        $telegramResult = telegramSend($tgBotToken, $tgChatId, $message);
    }

    jsonResponse([
        'success' => true,
        'message' => 'Регистрация успешна, профиль создан',
        'auth' => $authData,
        'profile' => $profileResult['body'],
        'telegram' => $telegramResult,
    ]);
}

jsonResponse([
    'success' => true,
    'message' => 'Вход выполнен успешно',
    'auth' => $authData,
]);