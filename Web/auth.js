const $ = (s) => document.querySelector(s);

function setStatus(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className = "td-form-status";
  if (type === "ok") el.classList.add("td-form-status--success");
  if (type === "err") el.classList.add("td-form-status--error");
}

function mapRankLabel(rankValue) {
  return {
    herald: "Herald / Guardian",
    crusader: "Crusader / Archon",
    legend: "Legend / Ancient",
    divine: "Divine / Immortal",
  }[rankValue] || "Не указан";
}

function mapRoleLabel(roleValue) {
  return {
    carry: "Carry",
    mid: "Mid",
    offlane: "Offlane",
    support: "Support",
  }[roleValue] || "Не выбрана";
}

function saveAuth(profile, supabaseAuthResponse) {
  const safeProfile = {
    nickname: profile.nickname || "",
    email: profile.email || "",
    rankValue: profile.rankValue || "",
    rankLabel: profile.rankLabel || "Не указан",
    role: profile.role || "",
    roleLabel: profile.roleLabel || "Не выбрана",
    about: profile.about || "",
    avatar: profile.avatar || "",
    access_token: supabaseAuthResponse?.access_token || "",
    refresh_token: supabaseAuthResponse?.refresh_token || "",
    user_id: supabaseAuthResponse?.user?.id || "",
  };

  localStorage.setItem("tdProfile", JSON.stringify(safeProfile));
  localStorage.setItem("tdAuth", "1");
}

function goToApp() {
  window.location.href = "index.html";
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function fetchJson(url, payload) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const rawText = await res.text();

  let data = null;
  try {
    data = JSON.parse(rawText);
  } catch (e) {
    throw new Error(`Сервер вернул не JSON: ${rawText.slice(0, 300)}`);
  }

  return { res, data };
}

document.addEventListener("DOMContentLoaded", () => {
  const tabLogin = $("#tabLogin");
  const tabRegister = $("#tabRegister");
  const loginForm = $("#loginForm");
  const registerForm = $("#registerForm");

  const avatarInput = $("#regAvatar");
  const avatarPreview = $("#regAvatarPreview");

  let avatarDataUrl = "";

  function setTab(active) {
    if (!tabLogin || !tabRegister || !loginForm || !registerForm) return;

    if (active === "login") {
      loginForm.classList.remove("auth-hidden");
      registerForm.classList.add("auth-hidden");
      tabLogin.classList.add("td-auth-tab--active");
      tabRegister.classList.remove("td-auth-tab--active");
    } else {
      registerForm.classList.remove("auth-hidden");
      loginForm.classList.add("auth-hidden");
      tabRegister.classList.add("td-auth-tab--active");
      tabLogin.classList.remove("td-auth-tab--active");
    }
  }

  if (tabLogin) tabLogin.addEventListener("click", () => setTab("login"));
  if (tabRegister) tabRegister.addEventListener("click", () => setTab("register"));
  setTab("login");

  if (avatarInput && avatarPreview) {
    avatarInput.addEventListener("change", async () => {
      const file = avatarInput.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setStatus($("#registerStatus"), "Выбери картинку PNG, JPG или WebP.", "err");
        avatarInput.value = "";
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setStatus($("#registerStatus"), "Картинка слишком большая. Максимум 2MB.", "err");
        avatarInput.value = "";
        return;
      }

      try {
        avatarDataUrl = await readFileAsDataURL(file);
        avatarPreview.style.backgroundImage = `url("${avatarDataUrl}")`;
        avatarPreview.classList.add("td-avatar--has");
      } catch (e) {
        console.error(e);
        setStatus($("#registerStatus"), "Не удалось прочитать файл.", "err");
      }
    });
  }

  // ===== LOGIN =====
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const statusEl = $("#loginStatus");
      setStatus(statusEl, "Входим...", "");

      const email = $("#loginEmail")?.value.trim() || "";
      const password = $("#loginPassword")?.value || "";

      if (!email || !password) {
        setStatus(statusEl, "Введите email и пароль.", "err");
        return;
      }

      try {
        const { res, data } = await fetchJson("server.php?action=login", {
          email,
          password,
        });

        console.log("LOGIN RESPONSE:", data);

        const auth = data?.auth || null;
        const user = auth?.user || null;

        if (res.ok && data?.success && user?.id) {
          let stored = {};
          try {
            stored = JSON.parse(localStorage.getItem("tdProfile") || "{}");
          } catch {}

          saveAuth(
            {
              nickname: stored.nickname || "",
              email,
              rankValue: stored.rankValue || "",
              rankLabel: stored.rankLabel || "Не указан",
              role: stored.role || "",
              roleLabel: stored.roleLabel || "Не выбрана",
              about: stored.about || "",
              avatar: stored.avatar || "",
            },
            auth
          );

          setStatus(statusEl, "Успешно! Перенаправляем...", "ok");
          setTimeout(goToApp, 400);
        } else {
          const errorText =
            data?.error ||
            data?.details?.error_description ||
            data?.details?.msg ||
            data?.details?.message ||
            "Не удалось войти.";

          setStatus(statusEl, "Ошибка: " + errorText, "err");
        }
      } catch (err) {
        console.error("LOGIN ERROR:", err);
        setStatus(statusEl, "Ошибка сервера. Проверь консоль.", "err");
      }
    });
  }

  // ===== REGISTER =====
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const statusEl = $("#registerStatus");
      setStatus(statusEl, "Регистрируем...", "");

      const nickname = $("#regNickname")?.value.trim() || "";
      const email = $("#regEmail")?.value.trim() || "";
      const password = $("#regPassword")?.value || "";
      const rankValue = $("#regRank")?.value || "";
      const about = $("#regAbout")?.value || "";
      const agree = $("#regAgree")?.checked;

      if (!nickname) {
        setStatus(statusEl, "Введите никнейм.", "err");
        return;
      }

      if (!email) {
        setStatus(statusEl, "Введите email.", "err");
        return;
      }

      if (!password || password.length < 6) {
        setStatus(statusEl, "Пароль должен быть не короче 6 символов.", "err");
        return;
      }

      if (!agree) {
        setStatus(statusEl, "Нужно согласиться с правилами.", "err");
        return;
      }

      const roleInput = document.querySelector("input[name='regRole']:checked");
      const role = roleInput ? roleInput.value : "";

      const profile = {
        nickname,
        email,
        password,
        rankValue,
        role,
        about,
        avatar: avatarDataUrl || "",
      };

      try {
        const { res, data } = await fetchJson("server.php?action=register", profile);

        console.log("REGISTER RESPONSE:", data);

        const auth = data?.auth || null;
        const user = auth?.user || null;

        if (res.ok && data?.success && user?.id) {
          saveAuth(
            {
              nickname,
              email,
              rankValue,
              rankLabel: mapRankLabel(rankValue),
              role,
              roleLabel: mapRoleLabel(role),
              about,
              avatar: avatarDataUrl || "",
            },
            auth
          );

          setStatus(statusEl, "Аккаунт создан! Перенаправляем...", "ok");
          setTimeout(goToApp, 400);
        } else {
          const errorText =
            data?.error ||
            data?.details?.error_description ||
            data?.details?.msg ||
            data?.details?.message ||
            "Не удалось создать аккаунт.";

          setStatus(statusEl, "Ошибка: " + errorText, "err");
        }
      } catch (err) {
        console.error("REGISTER ERROR:", err);
        setStatus(statusEl, "Ошибка сервера. Проверь консоль.", "err");
      }
    });
  }
});