// ====== DEMO DATA ======
const heroData = {
  slark: {
    id: "slark",
    name: "Slark",
    roles: ["Carry"],
    short: "Агрессивный керри, который живёт в затяжных драках и наказывает соло-таргеты.",
    icon: "images/heroes/slark.png",
    strengths: [
      "Очень сильный лейт при правильном позиционировании",
      "Мобильность и эскейпы за счёт Pounce/Shadow Dance",
      "Любит длинные драки и слабый вижен врага"
    ],
    weaknesses: [
      "Страдает от плотного вижена и сентриков",
      "Контрится жёстким контролем и сайлансами",
      "Слаб в драфтах без фронтлайна"
    ],
    synergy: ["Tidehunter", "Clockwerk", "Dark Willow"],
    counters: ["Axe", "Legion Commander", "Disruptor"],
    items: ["Power Treads", "Echo Sabre", "Aghanim's Scepter", "Black King Bar", "Skadi"],
    tags: ["carry", "snowball", "late"]
  },
  drow: {
    id: "drow",
    name: "Drow Ranger",
    roles: ["Carry"],
    short: "Дальнобойный керри с сильным сплит-пушем и уроном по фронтлайну.",
    icon: "images/heroes/drow.png",
    strengths: ["Высокий физический урон по героям и строениям", "Сильная аура для дальников", "Хорошо пушит линии"],
    weaknesses: ["Низкая мобильность", "Зависит от хорошего позиционирования", "Страдает от мобильных героев"],
    synergy: ["Vengeful Spirit", "Dazzle", "Shadow Demon"],
    counters: ["Storm Spirit", "Clockwerk", "Phantom Assassin"],
    items: ["Power Treads", "Hurricane Pike", "Manta Style", "Silver Edge", "Skadi"],
    tags: ["carry", "ranged", "push", "late"]
  },
  void_spirit: {
    id: "void_spirit",
    name: "Void Spirit",
    roles: ["Mid"],
    short: "Мобильный мидер для пиков по всей карте и мгновенного burst-а.",
    icon: "images/heroes/void_spirit.png",
    strengths: ["Сильные ротации по карте", "Burst-урон и контроль", "Трудно ловится без контроля"],
    weaknesses: ["Зависит от предметов и таймингов", "Плохо чувствует себя против сайлансов и корней"],
    synergy: ["Spirit Breaker", "Earthshaker", "Grimstroke"],
    counters: ["Silencer", "Lion", "Disruptor"],
    items: ["Bottle", "Power Treads", "Echo Sabre", "Kaya & Sange", "Black King Bar"],
    tags: ["mid", "snowball", "burst"]
  },
  storm_spirit: {
    id: "storm_spirit",
    name: "Storm Spirit",
    roles: ["Mid"],
    short: "Классический мидер с бесконечными влётами при большом манапуле.",
    icon: "images/heroes/storm_spirit.png",
    strengths: ["Сильный сноубол", "Высокий магический burst", "Глобальное влияние после 6 уровня"],
    weaknesses: ["Зависимость от маны и фарма", "Контрится орчидом, сайлансами и контролем"],
    synergy: ["Io", "Crystal Maiden", "Bloodseeker"],
    counters: ["Anti-Mage", "Nyx Assassin", "Lion"],
    items: ["Bottle", "Power Treads", "Orchid", "Black King Bar", "Bloodstone"],
    tags: ["mid", "burst", "mobile"]
  },
  tidehunter: {
    id: "tidehunter",
    name: "Tidehunter",
    roles: ["Offlane"],
    short: "Жирный инициатор с одним из самых сильных тимфайт-ультов в игре.",
    icon: "images/heroes/tidehunter.png",
    strengths: ["Мощный тимфайт-ульт (Ravage)", "Танк с хорошей выживаемостью", "Сильная линия против мили керри"],
    weaknesses: ["Долгий кулдаун ультимейта", "Слабый пуш без предметов", "Зависит от позиционирования"],
    synergy: ["Witch Doctor", "Phoenix", "Disruptor"],
    counters: ["Silencer", "Bane", "Rubick"],
    items: ["Vanguard", "Blink Dagger", "Pipe of Insight", "Shiva's Guard"],
    tags: ["offlane", "teamfight", "tank"]
  },
  witch_doctor: {
    id: "witch_doctor",
    name: "Witch Doctor",
    roles: ["Support"],
    short: "Саппорт с сильной линией и ультимейтом, который наказывает плохое позиционирование.",
    icon: "images/heroes/witch_doctor.png",
    strengths: ["Сильная линия с Maledict", "Мощный тимфайт-ульт Death Ward", "Полезен в течение всей игры"],
    weaknesses: ["Хрупкий, легко фокусится", "Сильная зависимость от позиционирования при ульте"],
    synergy: ["Tidehunter", "Faceless Void", "Magnus"],
    counters: ["Silencer", "Clockwerk", "Nyx Assassin"],
    items: ["Boots of Speed", "Glimmer Cape", "Aghanim's Scepter"],
    tags: ["support", "teamfight", "lane"]
  }
};

const heroIds = Object.keys(heroData);
const heroOfDayPool = heroIds;

const patchData = [
  {
    version: "7.40",
    date: "2024-09-10",
    summary: "Крупное обновление героев и предметов.",
    changes: [
      "Переработаны несколько талантов и Aghanim's Shard.",
      "Изменения в экономике и опыте за крипов.",
      "Новый нейтральный предметный пул."
    ]
  },
  {
    version: "7.40b",
    date: "2024-09-18",
    summary: "Хотфикс после крупных изменений.",
    changes: [
      "Нерф некоторых самых сильных героев патча 7.40.",
      "Фиксы бага с несколькими предметами.",
      "Мелкая корректировка нейтральных предметов."
    ]
  },
  {
    version: "7.40c",
    date: "2024-10-01",
    summary: "Балансный патч вокруг текущей меты.",
    changes: [
      "Slark, Drow, Spectre остаются сильными, но без жёстких нерфов.",
      "Поддерживающие герои с контролем выглядят ещё лучше.",
      "Небольшие изменения в экономике джунглей."
    ]
  }
];

const demoThreads = [
  {
    id: 1,
    title: "Slark в 7.40c — пикать первым или ждать конца драфта?",
    tag: "meta",
    preview: "Обсуждаем, когда Slark выглядит стабильно, а когда превращается в героя «по ситуации»...",
    text: "Slark сейчас очень сильный керри, но он чувствителен к контролю и вижену. Делитесь опытом: в каких драфтах вы готовы брать его на ранних стадиях, а где ждёте последних пиков? Какие герои/предметы контрят больше всего?",
    author: "MetaSeeker",
    replies: 9,
    lastActivity: "1 час назад"
  },
  {
    id: 2,
    title: "Как билдить Void Spirit на миду в 7.40c?",
    tag: "builds",
    preview: "Echo Sabre, Kaya & Sange, BKB — или есть более жадные варианты сборки?",
    text: "Классическая сборка через Echo Sabre + Kaya & Sange всё ещё кажется лучшей, но иногда хочется поэкспериментировать. Кто-то пробовал более глас-канон билд через Dagon/Hex? Насколько это оправдано, особенно на высоком рейтинге?",
    author: "VoidEnjoyer",
    replies: 5,
    lastActivity: "2 часа назад"
  },
  {
    id: 3,
    title: "Любимые саппорты для поднятия MMR: WD, Clock, Lich",
    tag: "heroes",
    preview: "Поделитесь историями, как эти саппорты выигрывали вам игры в соло.",
    text: "В 7.40c WD, Clock и Lich ощущаются как очень сильные саппорты: хороший контроль, сильная линия и полезные ульты. Расскажите, какие билды, шард/агоним тайминги и фишки вы используете, чтобы выигрывать игры даже с рандом керри.",
    author: "SupportMain",
    replies: 11,
    lastActivity: "Сегодня"
  }
];

const demoBuildsCount = 6;
const demoHeroesCount = heroIds.length;

// ====== DOM helpers ======
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ====== Sidebar navigation & scroll ======
function setupSidebarNavigation() {
  const links = $$(".td-nav-link");
  const sections = [...document.querySelectorAll("section[id^='section-']")];

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").replace("#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

      links.forEach((l) => l.classList.remove("td-nav-link--active"));
      link.classList.add("td-nav-link--active");
    });
  });

  window.addEventListener("scroll", () => {
    let currentSectionId = "section-home";
    let minDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top - 130);
      if (distance < minDistance) {
        minDistance = distance;
        currentSectionId = section.id;
      }
    });

    links.forEach((link) => {
      const hrefId = link.getAttribute("href").replace("#", "");
      link.classList.toggle("td-nav-link--active", hrefId === currentSectionId);
    });
  });
}

// ====== Mobile sidebar ======
function setupMobileSidebar() {
  const sidebar = $(".td-sidebar");
  const toggleBtn = $("#mobileMenuToggle");
  if (!sidebar || !toggleBtn) return;

  toggleBtn.addEventListener("click", () => sidebar.classList.toggle("td-sidebar--open"));

  sidebar.addEventListener("click", (e) => {
    if (e.target.classList.contains("td-nav-link")) {
      sidebar.classList.remove("td-sidebar--open");
    }
  });
}

// ====== Theme toggle ======
function setupThemeToggle() {
  const btn = $("#toggleThemeBtn");
  if (!btn) return;

  const root = document.body;
  const storedTheme = localStorage.getItem("trueDotaTheme");
  if (storedTheme === "light") {
    root.setAttribute("data-theme", "light");
    btn.textContent = "🌙";
  } else {
    root.removeAttribute("data-theme");
    btn.textContent = "☀️";
  }

  btn.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    if (isLight) {
      root.removeAttribute("data-theme");
      localStorage.setItem("trueDotaTheme", "dark");
      btn.textContent = "☀️";
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("trueDotaTheme", "light");
      btn.textContent = "🌙";
    }
  });
}

// ====== Stats ======
function setupStats() {
  const threadsCountEl = $("#statThreadsCount");
  const buildsCountEl = $("#statBuildsCount");
  const heroesCountEl = $("#statHeroesCount");

  if (threadsCountEl) threadsCountEl.textContent = String(demoThreads.length);
  if (buildsCountEl) buildsCountEl.textContent = String(demoBuildsCount);
  if (heroesCountEl) heroesCountEl.textContent = String(demoHeroesCount);
}

// ====== Reveal on scroll ======
function setupRevealOnScroll() {
  const revealEls = $$(".td-reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("td-reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

// ====== Hero of the day ======
function setupHeroOfDay() {
  const card = $("#heroOfDayCard");
  if (!card) return;

  const nameEl = $("#heroOfDayName");
  const rolesEl = $("#heroOfDayRoles");
  const iconEl = $("#heroOfDayIcon");
  const descEl = $("#heroOfDayDesc");
  const moreBtn = $("#heroOfDayMoreBtn");

  const randomId = heroOfDayPool[Math.floor(Math.random() * heroOfDayPool.length)];
  const hero = heroData[randomId];

  if (!hero) {
    card.style.display = "none";
    return;
  }

  nameEl.textContent = hero.name;
  rolesEl.textContent = hero.roles.join(", ");
  iconEl.src = hero.icon;
  iconEl.alt = hero.name;
  descEl.textContent = hero.short;

  moreBtn.addEventListener("click", () => openHeroModal(hero.id));
}

// ====== Hero modal ======
function openHeroModal(heroId) {
  const hero = heroData[heroId];
  if (!hero) return;

  const backdrop = $("#heroDetailsModal");
  if (!backdrop) return;

  $("#heroModalName").textContent = hero.name;
  $("#heroModalIcon").src = hero.icon;
  $("#heroModalRoles").textContent = hero.roles.join(", ");
  $("#heroModalShort").textContent = hero.short;

  const fillList = (elId, arr) => {
    const ul = $(elId);
    if (!ul) return;
    ul.innerHTML = "";
    arr.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      ul.appendChild(li);
    });
  };

  fillList("#heroModalStrengths", hero.strengths || []);
  fillList("#heroModalWeaknesses", hero.weaknesses || []);
  fillList("#heroModalSynergy", hero.synergy || []);
  fillList("#heroModalCounters", hero.counters || []);

  const itemsRow = $("#heroModalItems");
  if (itemsRow) {
    itemsRow.innerHTML = "";
    (hero.items || []).forEach((item) => {
      const span = document.createElement("span");
      span.className = "td-item-pill";
      span.textContent = item;
      itemsRow.appendChild(span);
    });
  }

  backdrop.classList.add("td-modal-backdrop--visible");
}

function setupHeroModal() {
  const backdrop = $("#heroDetailsModal");
  if (!backdrop) return;
  const closeBtn = $("#closeHeroModal");
  if (closeBtn) closeBtn.addEventListener("click", () => backdrop.classList.remove("td-modal-backdrop--visible"));

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) backdrop.classList.remove("td-modal-backdrop--visible");
  });

  $$(".td-hero-details-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = btn.closest(".td-hero-card");
      if (!card) return;
      openHeroModal(card.dataset.heroId);
    });
  });
}

// ====== Patch timeline ======
function setupPatchTimeline() {
  const container = $("#patchTimeline");
  if (!container) return;

  container.innerHTML = "";
  patchData.forEach((patch) => {
    const card = document.createElement("article");
    card.className = "td-patch-card";
    card.innerHTML = `
      <div class="td-patch-header">
        <span class="td-patch-version">${patch.version}</span>
        <span class="td-patch-date">${patch.date}</span>
      </div>
      <p class="td-small-note">${patch.summary}</p>
      <ul class="td-list td-list-dense">
        ${patch.changes.map((c) => `<li>${c}</li>`).join("")}
      </ul>
    `;
    container.appendChild(card);
  });
}

// ====== Builds filter ======
function setupBuildsFilter() {
  const roleButtons = $$(".td-chip-filter[data-role]");
  const styleSelect = $("#buildStyleFilter");
  const durationSelect = $("#buildDurationFilter");
  const difficultySelect = $("#buildDifficultyFilter");
  const buildCards = $$(".td-build-card");
  if (!buildCards.length) return;

  let currentRole = "all";

  function applyFilter() {
    const style = styleSelect ? styleSelect.value : "all";
    const duration = durationSelect ? durationSelect.value : "all";
    const difficulty = difficultySelect ? difficultySelect.value : "all";

    buildCards.forEach((card) => {
      const role = card.getAttribute("data-role");
      const cardStyle = card.getAttribute("data-style");
      const cardDuration = card.getAttribute("data-duration");
      const cardDifficulty = card.getAttribute("data-difficulty");

      const roleOk = currentRole === "all" || role === currentRole;
      const styleOk = style === "all" || style === cardStyle;
      const durOk = duration === "all" || duration === cardDuration;
      const diffOk = difficulty === "all" || difficulty === cardDifficulty;

      card.style.display = roleOk && styleOk && durOk && diffOk ? "" : "none";
    });
  }

  roleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentRole = btn.getAttribute("data-role");
      roleButtons.forEach((b) => b.classList.remove("td-chip-filter--active"));
      btn.classList.add("td-chip-filter--active");
      applyFilter();
    });
  });

  [styleSelect, durationSelect, difficultySelect].forEach((select) => {
    if (!select) return;
    select.addEventListener("change", applyFilter);
  });
}

// ====== Votes ======
function setupBuildVotes() {
  const buildLikeButtons = $$(".td-build-like-btn");
  if (!buildLikeButtons.length) return;

  let storedVotes = {};
  try {
    storedVotes = JSON.parse(localStorage.getItem("tdBuildVotes") || "{}");
  } catch {
    storedVotes = {};
  }

  const counts = $$(".td-vote-count[data-build-id]");
  counts.forEach((span) => {
    const id = span.getAttribute("data-build-id");
    if (storedVotes[id] != null) span.textContent = String(storedVotes[id]);
  });

  buildLikeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = btn.closest(".td-build-card");
      if (!card) return;
      const id = card.getAttribute("data-build-id");
      const countSpan = card.querySelector(".td-vote-count[data-build-id='" + id + "']");
      if (!countSpan) return;

      const current = parseInt(countSpan.textContent || "0", 10) || 0;
      const next = current + 1;
      countSpan.textContent = String(next);
      storedVotes[id] = next;
      localStorage.setItem("tdBuildVotes", JSON.stringify(storedVotes));
    });
  });
}

function setupHeroVotes() {
  const heroLikeButtons = $$(".td-hero-like-btn");
  if (!heroLikeButtons.length) return;

  let storedVotes = {};
  try {
    storedVotes = JSON.parse(localStorage.getItem("tdHeroVotes") || "{}");
  } catch {
    storedVotes = {};
  }

  const counts = $$(".td-vote-count[data-hero-id]");
  counts.forEach((span) => {
    const id = span.getAttribute("data-hero-id");
    if (storedVotes[id] != null) span.textContent = String(storedVotes[id]);
  });

  heroLikeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = btn.closest(".td-hero-card");
      if (!card) return;
      const id = card.getAttribute("data-hero-id");
      const countSpan = card.querySelector(".td-vote-count[data-hero-id='" + id + "']");
      if (!countSpan) return;

      const current = parseInt(countSpan.textContent || "0", 10) || 0;
      const next = current + 1;
      countSpan.textContent = String(next);
      storedVotes[id] = next;
      localStorage.setItem("tdHeroVotes", JSON.stringify(storedVotes));
    });
  });
}

// ====== Tierlist (drag & drop) ======
const TIER_LS_KEY = "tdTierlist";

function getDefaultTierState() {
  return { pool: heroIds.slice(), S: [], A: [], B: [], C: [] };
}

function loadTierState() {
  try {
    const raw = localStorage.getItem(TIER_LS_KEY);
    if (!raw) return getDefaultTierState();
    const parsed = JSON.parse(raw);

    const state = getDefaultTierState();
    ["pool", "S", "A", "B", "C"].forEach((tier) => {
      if (Array.isArray(parsed[tier])) state[tier] = parsed[tier].filter((id) => heroData[id]);
    });

    const used = new Set([...state.pool, ...state.S, ...state.A, ...state.B, ...state.C]);
    heroIds.forEach((id) => {
      if (!used.has(id)) state.pool.push(id);
    });

    return state;
  } catch {
    return getDefaultTierState();
  }
}

function saveTierState(state) {
  localStorage.setItem(TIER_LS_KEY, JSON.stringify(state));
}

function renderTierlist(state) {
  ["pool", "S", "A", "B", "C"].forEach((tier) => {
    const container = document.querySelector(tier === "pool" ? "#tierPool" : `#tier${tier}`);
    if (!container) return;
    container.innerHTML = "";
    state[tier].forEach((heroId) => {
      const hero = heroData[heroId];
      if (!hero) return;
      const item = document.createElement("div");
      item.className = "td-tier-item";
      item.draggable = true;
      item.dataset.heroId = heroId;
      item.innerHTML = `<span>${hero.name}</span>`;
      container.appendChild(item);
    });
  });
}

function setupTierlist() {
  const tierPool = $("#tierPool");
  if (!tierPool) return;

  let state = loadTierState();
  renderTierlist(state);

  let draggedId = null;

  function onDragStart(e) {
    const target = e.target.closest(".td-tier-item");
    if (!target) return;
    draggedId = target.dataset.heroId;
    e.dataTransfer.effectAllowed = "move";
  }

  function onDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add("td-tier-droppable--over");
    e.dataTransfer.dropEffect = "move";
  }

  function onDragLeave(e) {
    e.currentTarget.classList.remove("td-tier-droppable--over");
  }

  function onDrop(e) {
    e.preventDefault();
    const dropZone = e.currentTarget;
    dropZone.classList.remove("td-tier-droppable--over");
    if (!draggedId) return;

    const targetTier = dropZone.dataset.tier;
    if (!targetTier) return;

    ["pool", "S", "A", "B", "C"].forEach((tier) => {
      state[tier] = state[tier].filter((id) => id !== draggedId);
    });

    state[targetTier].push(draggedId);
    saveTierState(state);
    renderTierlist(state);
    attachTierDragHandlers();
    draggedId = null;
  }

  function attachTierDragHandlers() {
    $$(".td-tier-item").forEach((item) => item.addEventListener("dragstart", onDragStart));
  }

  function attachDropZones() {
    $$(".td-tier-droppable").forEach((zone) => {
      zone.addEventListener("dragover", onDragOver);
      zone.addEventListener("dragleave", onDragLeave);
      zone.addEventListener("drop", onDrop);
    });
  }

  attachTierDragHandlers();
  attachDropZones();

  const resetBtn = $("#tierResetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      state = getDefaultTierState();
      saveTierState(state);
      renderTierlist(state);
      attachTierDragHandlers();
    });
  }
}

// ====== Draft helper ======
const DRAFT_LS_KEY = "tdDraft";

function loadDraftState() {
  try {
    const raw = localStorage.getItem(DRAFT_LS_KEY);
    if (!raw) {
      const res = {};
      heroIds.forEach((id) => (res[id] = "pool"));
      return res;
    }
    const parsed = JSON.parse(raw);
    heroIds.forEach((id) => {
      if (!parsed[id]) parsed[id] = "pool";
    });
    return parsed;
  } catch {
    const res = {};
    heroIds.forEach((id) => (res[id] = "pool"));
    return res;
  }
}

function saveDraftState(state) {
  localStorage.setItem(DRAFT_LS_KEY, JSON.stringify(state));
}

function renderDraft(state) {
  const poolEl = $("#draftHeroPool");
  const ourEl = $("#draftOur");
  const enemyEl = $("#draftEnemy");
  if (!poolEl || !ourEl || !enemyEl) return;

  poolEl.innerHTML = "";
  ourEl.innerHTML = "";
  enemyEl.innerHTML = "";

  heroIds.forEach((id) => {
    const hero = heroData[id];
    if (!hero) return;
    const status = state[id] || "pool";

    const makeChip = (clickHandler, showRole) => {
      const chip = document.createElement("div");
      chip.className = "td-draft-hero";
      chip.dataset.heroId = id;
      chip.innerHTML = `<span>${hero.name}</span>${showRole ? `<span class="td-draft-hero-role">${hero.roles.join("/")}</span>` : ""}`;
      chip.addEventListener("click", clickHandler);
      return chip;
    };

    if (status === "pool") {
      poolEl.appendChild(
        makeChip(() => {
          state[id] = "our";
          saveDraftState(state);
          renderDraft(state);
          renderDraftHints(state);
        }, true)
      );
    } else if (status === "our") {
      const slot = document.createElement("div");
      slot.className = "td-draft-slot";
      slot.innerHTML = `<span>${hero.name}</span><span class="td-draft-slot-remove" title="Удалить">×</span>`;
      slot.querySelector(".td-draft-slot-remove").addEventListener("click", () => {
        state[id] = "pool";
        saveDraftState(state);
        renderDraft(state);
        renderDraftHints(state);
      });
      ourEl.appendChild(slot);

      poolEl.appendChild(
        makeChip(() => {
          state[id] = "enemy";
          saveDraftState(state);
          renderDraft(state);
          renderDraftHints(state);
        }, false)
      );
    } else if (status === "enemy") {
      const slot = document.createElement("div");
      slot.className = "td-draft-slot";
      slot.innerHTML = `<span>${hero.name}</span><span class="td-draft-slot-remove" title="Удалить">×</span>`;
      slot.querySelector(".td-draft-slot-remove").addEventListener("click", () => {
        state[id] = "pool";
        saveDraftState(state);
        renderDraft(state);
        renderDraftHints(state);
      });
      enemyEl.appendChild(slot);

      poolEl.appendChild(
        makeChip(() => {
          state[id] = "our";
          saveDraftState(state);
          renderDraft(state);
          renderDraftHints(state);
        }, false)
      );
    }
  });
}

function renderDraftHints(state) {
  const hintsEl = $("#draftHintsList");
  if (!hintsEl) return;

  const our = heroIds.filter((id) => state[id] === "our");
  const enemy = heroIds.filter((id) => state[id] === "enemy");

  const hints = [];
  const roleCount = { carry: 0, mid: 0, offlane: 0, support: 0 };

  our.forEach((id) => {
    const h = heroData[id];
    if (!h) return;
    if (h.tags.includes("carry")) roleCount.carry++;
    if (h.tags.includes("mid")) roleCount.mid++;
    if (h.tags.includes("offlane")) roleCount.offlane++;
    if (h.tags.includes("support")) roleCount.support++;
  });

  if (our.length === 0 && enemy.length === 0) {
    hints.push("Добавь героев в драфт, чтобы увидеть подсказки.");
  } else {
    if (roleCount.support === 0) hints.push("У твоей команды нет саппортов — добавь хотя бы одного героя поддержки.");
    if (roleCount.carry >= 3) hints.push("Много керри в одной команде — может не хватить контроля и вижена.");
    if (roleCount.mid === 0) hints.push("Нет ярко выраженного мидера — это может ударить по темпу игры.");
  }

  if (enemy.length >= 3 && our.length >= 1) {
    hints.push("У врагов достаточно героев — подумай про сейв/контроль, чтобы не дать им навязать свои драки.");
  }

  hintsEl.innerHTML = "";
  hints.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    hintsEl.appendChild(li);
  });
}

function setupDraftHelper() {
  const poolEl = $("#draftHeroPool");
  if (!poolEl) return;
  const state = loadDraftState();
  renderDraft(state);
  renderDraftHints(state);
}

// ====== Discussions ======
let threadSubscriptions = [];

function loadThreadSubscriptions() {
  try {
    threadSubscriptions = JSON.parse(localStorage.getItem("tdThreadSubs") || "[]");
    if (!Array.isArray(threadSubscriptions)) threadSubscriptions = [];
  } catch {
    threadSubscriptions = [];
  }
}
function saveThreadSubscriptions() {
  localStorage.setItem("tdThreadSubs", JSON.stringify(threadSubscriptions));
}

function renderSubsList() {
  const subsList = $("#subsList");
  if (!subsList) return;
  subsList.innerHTML = "";

  if (!threadSubscriptions.length) {
    const li = document.createElement("li");
    li.textContent = "Подписок пока нет.";
    subsList.appendChild(li);
    return;
  }

  threadSubscriptions.forEach((id) => {
    const thread = demoThreads.find((t) => t.id === id);
    if (!thread) return;
    const li = document.createElement("li");
    li.textContent = thread.title;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => {
      const el = document.querySelector(`.td-thread[data-thread-id='${id}']`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("td-thread-expanded");
      }
    });
    subsList.appendChild(li);
  });
}

function renderThreads(threads) {
  const listEl = $("#threadsList");
  if (!listEl) return;

  if (!threads.length) {
    listEl.innerHTML = '<div class="td-card"><p class="td-small-note">Пока нет тем. Создай первую.</p></div>';
    return;
  }

  listEl.innerHTML = "";
  threads.forEach((thread) => {
    const threadEl = document.createElement("article");
    threadEl.className = "td-thread";
    threadEl.dataset.tag = thread.tag;
    threadEl.dataset.threadId = thread.id;

    const isSubbed = threadSubscriptions.includes(thread.id);
    const subLabel = isSubbed ? "Подписан" : "Подписаться";

    threadEl.innerHTML = `
      <div class="td-thread-header">
        <h3 class="td-thread-title">${thread.title}</h3>
        <div class="td-thread-meta">
          <span class="td-thread-tag">${thread.tag}</span>
          <span>Ответов: ${thread.replies}</span>
        </div>
      </div>
      <div class="td-thread-body">${thread.preview}</div>
      <div class="td-thread-footer">
        <span>Автор: ${thread.author}</span>
        <div>
          <span>${thread.lastActivity}</span>
          <button class="td-btn td-btn-xs td-thread-subscribe-btn" data-thread-id="${thread.id}">${subLabel}</button>
        </div>
      </div>
    `;

    threadEl.addEventListener("click", () => {
      const expanded = threadEl.classList.toggle("td-thread-expanded");
      const bodyEl = threadEl.querySelector(".td-thread-body");
      bodyEl.textContent = expanded ? thread.text : thread.preview;
    });

    const subBtn = threadEl.querySelector(".td-thread-subscribe-btn");
    subBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = thread.id;
      const idx = threadSubscriptions.indexOf(id);
      if (idx === -1) threadSubscriptions.push(id);
      else threadSubscriptions.splice(idx, 1);

      saveThreadSubscriptions();
      renderThreads(threads);
      renderSubsList();
    });

    listEl.appendChild(threadEl);
  });
}

function setupThreadFiltering() {
  const filterButtons = $$("#threadTagsFilter .td-chip-filter");
  if (!filterButtons.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tag = btn.getAttribute("data-thread-tag");
      filterButtons.forEach((b) => b.classList.remove("td-chip-filter--active"));
      btn.classList.add("td-chip-filter--active");

      $$(".td-thread").forEach((el) => {
        const threadTag = el.dataset.tag;
        el.style.display = tag === "all" || tag === threadTag ? "" : "none";
      });
    });
  });
}

function setupNewThreadModal() {
  const modalBackdrop = $("#newThreadModal");
  const openBtn = $("#openNewThreadBtn");
  const closeBtn = $("#closeNewThreadModal");
  const form = $("#newThreadForm");
  if (!modalBackdrop || !openBtn || !closeBtn || !form) return;

  const openModal = () => modalBackdrop.classList.add("td-modal-backdrop--visible");
  const closeModal = () => modalBackdrop.classList.remove("td-modal-backdrop--visible");

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = $("#threadTitle").value.trim();
    const tag = $("#threadTag").value;
    const text = $("#threadText").value.trim();
    if (!title || !tag || !text) return;

    const newThread = {
      id: Date.now(),
      title,
      tag,
      preview: text.slice(0, 120) + (text.length > 120 ? "..." : ""),
      text,
      author: "Гость",
      replies: 0,
      lastActivity: "Только что"
    };

    demoThreads.unshift(newThread);
    renderThreads(demoThreads);
    setupStats();
    form.reset();
    closeModal();
  });
}

// ====== Profile + Avatar ======
function updateAvatarUI(avatarDataUrl, nickname) {
  const profileWrap = $("#profileAvatar");
  const profileImg = $("#profileAvatarImg");
  const profileFallback = $("#profileAvatarFallback");

  const sidebarWrap = $("#sidebarAvatar");
  const sidebarImg = $("#sidebarAvatarImg");
  const sidebarFallback = $("#sidebarAvatarFallback");

  const initial = nickname?.trim() ? nickname.trim()[0].toUpperCase() : "?";

  const apply = (imgEl, fallbackEl) => {
    if (!imgEl || !fallbackEl) return;
    if (avatarDataUrl) {
      imgEl.src = avatarDataUrl;
      imgEl.style.display = "block";
      fallbackEl.style.display = "none";
    } else {
      imgEl.removeAttribute("src");
      imgEl.style.display = "none";
      fallbackEl.textContent = initial;
      fallbackEl.style.display = "block";
    }
  };

  if (profileWrap && profileFallback) profileFallback.textContent = initial;
  if (sidebarWrap && sidebarFallback) sidebarFallback.textContent = initial;

  apply(profileImg, profileFallback);
  apply(sidebarImg, sidebarFallback);
}

function updateProfileUI(profile) {
  const nickname = profile.nickname || "Гость";
  const email = profile.email || "Email не указан";
  const rank = profile.rankLabel || "Не указан";
  const role = profile.roleLabel || "Не выбрана";
  const about = profile.about && profile.about.trim() ? profile.about.trim() : "Пока ничего не рассказано.";

  const nickEl = $("#profileNickname");
  const emailEl = $("#profileEmail");
  const rankEl = $("#profileRank");
  const roleEl = $("#profileRole");
  const aboutEl = $("#profileAbout");
  const sidebarNameEl = $("#sidebarUserName");
  const sidebarStatusEl = $("#sidebarUserStatus");

  if (nickEl) nickEl.textContent = nickname;
  if (emailEl) emailEl.textContent = email;
  if (rankEl) rankEl.textContent = rank;
  if (roleEl) roleEl.textContent = role;
  if (aboutEl) aboutEl.textContent = about;

  if (sidebarNameEl) sidebarNameEl.textContent = nickname;
  if (sidebarStatusEl) sidebarStatusEl.textContent = "";

  // аватарка
  updateAvatarUI(profile.avatar || "", nickname);
}

function loadProfile() {
  try {
    const raw = localStorage.getItem("tdProfile");
    if (!raw) return;
    const profile = JSON.parse(raw);
    updateProfileUI(profile);
  } catch {
    // ignore
  }
}

function setupAvatarUpload() {
  const input = $("#avatarUpload");
  if (!input) return;

  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;

    const okTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!okTypes.includes(file.type)) {
      alert("Только PNG / JPG / WEBP");
      input.value = "";
      return;
    }

    const maxBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxBytes) {
      alert("Файл слишком большой (до 2MB).");
      input.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const avatarDataUrl = String(reader.result || "");
        const raw = localStorage.getItem("tdProfile");
        const profile = raw ? JSON.parse(raw) : {};
        profile.avatar = avatarDataUrl;
        localStorage.setItem("tdProfile", JSON.stringify(profile));
        updateProfileUI(profile);
        alert("Аватарка сохранена!");
      } catch (e) {
        console.error(e);
        alert("Не удалось сохранить аватар.");
      }
    };
    reader.readAsDataURL(file);
  });
}

// ====== Global search (fixed) ======
function setupGlobalSearch() {
  const searchInput = $("#globalSearchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const sectionsToSearch = ["section-meta", "section-builds", "section-heroes", "section-discussions"];

    sectionsToSearch.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const cards = section.querySelectorAll(".td-card, .td-thread");
      cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        card.style.display = !query || text.includes(query) ? "" : "none";
      });
    });
  });
}

// ====== Logout ======
function setupLogout() {
  const btn = $("#logoutBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    localStorage.removeItem("tdAuth");
    localStorage.removeItem("tdProfile");
    window.location.href = "auth.html";
  });
}

// ====== INIT ======
document.addEventListener("DOMContentLoaded", () => {
  setupSidebarNavigation();
  setupMobileSidebar();
  setupThemeToggle();
  setupStats();
  setupRevealOnScroll();

  setupHeroOfDay();
  setupHeroModal();

  setupPatchTimeline();

  setupBuildsFilter();
  setupBuildVotes();
  setupHeroVotes();

  setupTierlist();
  setupDraftHelper();

  loadThreadSubscriptions();
  renderThreads(demoThreads);
  renderSubsList();
  setupThreadFiltering();
  setupNewThreadModal();

  loadProfile();
  setupAvatarUpload(); // ✅ добавили
  setupGlobalSearch();
  setupLogout();
});