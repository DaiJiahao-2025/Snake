(() => {
  const STORAGE_VERSION = 1;

  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getNumber(key, fallback = 0) {
    const value = parseInt(localStorage.getItem(key), 10);
    return Number.isFinite(value) ? value : fallback;
  }

  function setNumber(key, value) {
    localStorage.setItem(key, String(value));
  }

  function ensureSet(key, defaultArray) {
    const current = loadJson(key, null);
    if (Array.isArray(current)) return current;
    saveJson(key, defaultArray);
    return defaultArray;
  }

  function ensureObject(key, defaultObject) {
    const current = loadJson(key, null);
    if (current && typeof current === "object" && !Array.isArray(current)) return current;
    saveJson(key, defaultObject);
    return defaultObject;
  }

  function migrate() {
    const migratedVersion = getNumber("saveVersion", 0);
    if (migratedVersion >= STORAGE_VERSION) return;

    const startShield = localStorage.getItem("startShield");
    if (startShield === "true") {
      const shieldCount = getNumber("shieldCount", 0);
      setNumber("shieldCount", shieldCount + 1);
      localStorage.removeItem("startShield");
    }

    const unlockedLevels = getNumber("unlockedLevelMax", 0);
    if (unlockedLevels <= 0) setNumber("unlockedLevelMax", 1);

    ensureSet("unlockedSkins", ["classic"]);
    ensureSet("unlockedMaps", ["meadow"]);
    if (!localStorage.getItem("selectedSkinId")) localStorage.setItem("selectedSkinId", "classic");
    if (!localStorage.getItem("selectedMapId")) localStorage.setItem("selectedMapId", "meadow");
    if (!localStorage.getItem("selectedMode")) localStorage.setItem("selectedMode", "endless");

    ensureObject("inventory", {
      shield: getNumber("shieldCount", 0),
      boost: 0,
      multiplier: 0,
      magnet: 0,
    });

    ensureObject("achievements", {});
    ensureObject("leaderboards", {});
    ensureObject("stats", {
      gamesPlayed: 0,
      totalScore: 0,
      bestScore: getNumber("snakeHighScore", 0),
      levelsCleared: 0,
    });

    setNumber("saveVersion", STORAGE_VERSION);
  }

  window.StorageUtil = {
    loadJson,
    saveJson,
    getNumber,
    setNumber,
    ensureSet,
    ensureObject,
    migrate,
  };
})();

