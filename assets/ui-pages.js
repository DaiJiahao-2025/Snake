(() => {
  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === null || v === undefined) continue;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k === "disabled") node.disabled = true;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    for (const c of children) node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    return node;
  }

  function toast(text) {
    const host = document.getElementById("toast-host");
    if (!host) return;
    const item = el("div", { class: "px-toast", text });
    host.appendChild(item);
    setTimeout(() => item.classList.add("px-toast--show"), 30);
    setTimeout(() => {
      item.classList.remove("px-toast--show");
      setTimeout(() => item.remove(), 240);
    }, 1800);
  }

  function renderLevelSelect() {
    StorageUtil.migrate();
    const unlockedMax = StorageUtil.getNumber("unlockedLevelMax", 1);
    const selectedLevelId = StorageUtil.getNumber("selectedLevelId", 1);
    const list = document.getElementById("level-list");
    list.innerHTML = "";

    for (const level of GameData.LEVELS) {
      const locked = level.id > unlockedMax;
      const meta = [
        `地图：${GameData.MAPS.find(m => m.id === level.mapId)?.name || level.mapId}`,
        `目标分数：${level.goalScore}`,
        level.focus ? `挑战：${level.focus}` : null,
      ].filter(Boolean).join("  |  ");
      const card = el("div", { class: `px-card ${locked ? "px-card--locked" : ""}` }, [
        el("div", { class: "px-card__title", text: level.name }),
        el("div", { class: "px-card__meta", text: meta }),
        el("div", { class: "px-card__actions" }, [
          el(
            "button",
            {
              disabled: locked ? "true" : null,
              class: level.id === selectedLevelId ? "px-btn px-btn--alt" : "px-btn",
              onclick: () => {
                if (locked) return;
                localStorage.setItem("selectedMode", "level");
                localStorage.setItem("selectedLevelId", String(level.id));
                localStorage.setItem("selectedMapId", level.mapId);
                toast(`已选择：${level.name}`);
                setTimeout(() => (window.location.href = "Snake.html"), 450);
              },
            },
            [locked ? "未解锁" : level.id === selectedLevelId ? "已选择" : "选择"]
          ),
        ]),
      ]);
      list.appendChild(card);
    }
  }

  function renderMapSelect() {
    StorageUtil.migrate();
    const unlockedMaps = new Set(StorageUtil.ensureSet("unlockedMaps", ["meadow"]));
    const selectedMapId = localStorage.getItem("selectedMapId") || "meadow";
    const list = document.getElementById("map-list");
    list.innerHTML = "";

    for (const map of GameData.MAPS) {
      const locked = !unlockedMaps.has(map.id);
      const card = el("div", { class: `px-card ${locked ? "px-card--locked" : ""}` }, [
        el("div", { class: "px-card__title", text: map.name }),
        el("div", { class: "px-card__meta", text: locked ? "未解锁（可在商店/宝箱获得）" : "自由模式可用" }),
        el("div", { class: "px-card__actions" }, [
          el(
            "button",
            {
              disabled: locked ? "true" : null,
              class: map.id === selectedMapId ? "px-btn px-btn--alt" : "px-btn",
              onclick: () => {
                if (locked) return;
                localStorage.setItem("selectedMode", "endless");
                localStorage.setItem("selectedMapId", map.id);
                toast(`地图已切换：${map.name}`);
                setTimeout(() => (window.location.href = "Snake.html"), 450);
              },
            },
            [locked ? "未解锁" : map.id === selectedMapId ? "已选择" : "选择"]
          ),
        ]),
      ]);
      list.appendChild(card);
    }
  }

  function renderSkinSelect() {
    StorageUtil.migrate();
    const unlockedSkins = new Set(StorageUtil.ensureSet("unlockedSkins", ["classic"]));
    const selectedSkinId = localStorage.getItem("selectedSkinId") || "classic";
    const list = document.getElementById("skin-list");
    list.innerHTML = "";

    for (const skin of GameData.SKINS) {
      const locked = !unlockedSkins.has(skin.id);
      const card = el("div", { class: `px-card ${locked ? "px-card--locked" : ""}` }, [
        el("div", { class: "px-card__title", text: skin.name }),
        el("div", { class: "px-swatch", style: `--swatch1:${skin.head};--swatch2:${skin.body};` }),
        el("div", { class: "px-card__actions" }, [
          el(
            "button",
            {
              disabled: locked ? "true" : null,
              class: skin.id === selectedSkinId ? "px-btn px-btn--alt" : "px-btn",
              onclick: () => {
                if (locked) return;
                localStorage.setItem("selectedSkinId", skin.id);
                toast(`已装备：${skin.name}`);
                setTimeout(() => (window.location.href = "Snake.html"), 450);
              },
            },
            [locked ? "未解锁" : skin.id === selectedSkinId ? "已装备" : "装备"]
          ),
        ]),
      ]);
      list.appendChild(card);
    }
  }

  function renderAchievements() {
    StorageUtil.migrate();
    const achievements = StorageUtil.ensureObject("achievements", {});
    const list = document.getElementById("achievement-list");
    list.innerHTML = "";

    for (const a of GameData.ACHIEVEMENTS) {
      const unlocked = Boolean(achievements[a.id]);
      const card = el("div", { class: `px-card ${unlocked ? "" : "px-card--locked"}` }, [
        el("div", { class: "px-card__title", text: a.name }),
        el("div", { class: "px-card__meta", text: a.desc }),
        el("div", { class: "px-card__actions" }, [el("span", { class: "px-chip", text: unlocked ? "已解锁" : "未解锁" })]),
      ]);
      list.appendChild(card);
    }
  }

  function renderLeaderboard() {
    StorageUtil.migrate();
    const leaderboards = StorageUtil.ensureObject("leaderboards", {});
    const list = document.getElementById("leaderboard-list");
    list.innerHTML = "";

    const entries = Object.entries(leaderboards)
      .map(([k, v]) => ({ k, v: Array.isArray(v) ? v : [] }))
      .sort((a, b) => a.k.localeCompare(b.k));

    if (entries.length === 0) {
      list.appendChild(el("div", { class: "px-card" }, [el("div", { class: "px-card__meta", text: "暂无记录，去玩一局吧！" })]));
      return;
    }

    for (const group of entries) {
      const card = el("div", { class: "px-card" }, [
        el("div", { class: "px-card__title", text: group.k }),
        el(
          "ol",
          { class: "px-ol" },
          group.v.slice(0, 10).map((e) => el("li", { class: "px-li", text: `${e.score} 分  ·  ${e.date || ""}` }))
        ),
      ]);
      list.appendChild(card);
    }
  }

  window.UIPages = {
    renderLevelSelect,
    renderMapSelect,
    renderSkinSelect,
    renderAchievements,
    renderLeaderboard,
    toast,
  };
})();
