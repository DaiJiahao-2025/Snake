(() => {
  const MAPS = [
    {
      id: "meadow",
      name: "牧野",
      bg: ["#0f2a1d", "#163b27", "#1d4a30"],
      tile: "rgba(255,255,255,0.035)",
      obstacleFill: "rgba(255,255,255,0.10)",
      obstacleStroke: "rgba(255,255,255,0.22)",
    },
    {
      id: "desert",
      name: "沙漠",
      bg: ["#2a1c0f", "#4a2e13", "#6b4a1b"],
      tile: "rgba(255,255,255,0.03)",
      obstacleFill: "rgba(255,255,255,0.10)",
      obstacleStroke: "rgba(255,255,255,0.20)",
    },
    {
      id: "ocean",
      name: "海洋",
      bg: ["#071c2e", "#0c2a48", "#0f3a5e"],
      tile: "rgba(255,255,255,0.03)",
      obstacleFill: "rgba(0,188,212,0.14)",
      obstacleStroke: "rgba(0,188,212,0.30)",
    },
    {
      id: "hell",
      name: "地狱",
      bg: ["#1a0610", "#2b0713", "#3a0a12"],
      tile: "rgba(255,255,255,0.028)",
      obstacleFill: "rgba(255,91,110,0.16)",
      obstacleStroke: "rgba(255,91,110,0.34)",
    },
  ];

  const SKINS = [
    { id: "classic", name: "经典绿", head: "#00ff00", body: "#32cd32", accent: "#0b1423" },
    { id: "stardew", name: "星露草绿", head: "#4bd365", body: "#2fb053", accent: "#0b1423" },
    { id: "ocean", name: "深海蓝", head: "#62c6ff", body: "#2ea7ff", accent: "#0b1423" },
    { id: "inferno", name: "熔岩红", head: "#ff5b6e", body: "#ff2e45", accent: "#0b1423" },
    { id: "gold", name: "黄金蛇", head: "#ffd700", body: "#f6c445", accent: "#0b1423" },
    { id: "amethyst", name: "紫晶蛇", head: "#b388ff", body: "#8a5bff", accent: "#0b1423" },
  ];

  const LEVELS = [
    { id: 1, name: "第 1 关：草地热身", mapId: "meadow", goalScore: 90, baseSpeed: 170, pattern: "none", focus: "熟悉移动、吃食物与身体增长" },
    { id: 2, name: "第 2 关：篱笆门", mapId: "meadow", goalScore: 140, baseSpeed: 164, pattern: "gates", focus: "第一次绕障碍，练习提前转向" },
    { id: 3, name: "第 3 关：林间车道", mapId: "meadow", goalScore: 200, baseSpeed: 158, pattern: "lanes", focus: "在竖向通道中规划路线" },
    { id: 4, name: "第 4 关：沙丘石阵", mapId: "desert", goalScore: 260, baseSpeed: 152, pattern: "pillars", focus: "处理分散障碍，保持蛇身空间" },
    { id: 5, name: "第 5 关：风眼十字", mapId: "desert", goalScore: 330, baseSpeed: 146, pattern: "cross", focus: "穿越中心路口，避免贪吃失位" },
    { id: 6, name: "第 6 关：浅海礁岛", mapId: "ocean", goalScore: 400, baseSpeed: 140, pattern: "islands", focus: "在小区域之间切换节奏" },
    { id: 7, name: "第 7 关：回潮双环", mapId: "ocean", goalScore: 480, baseSpeed: 136, pattern: "ring", focus: "用环形空间练习长线绕行" },
    { id: 8, name: "第 8 关：熔岩闸门", mapId: "hell", goalScore: 560, baseSpeed: 130, pattern: "gauntlet", focus: "连续过门，控制高速下的转向窗口" },
    { id: 9, name: "第 9 关：炼狱迷宫", mapId: "hell", goalScore: 640, baseSpeed: 126, pattern: "maze", focus: "读取路线，减少回头路与自撞风险" },
    { id: 10, name: "第 10 关：蛇王竞技场", mapId: "hell", goalScore: 720, baseSpeed: 122, pattern: "arena", focus: "综合考验速度、空间管理与贪吃取舍" },
  ];

  const ACHIEVEMENTS = [
    { id: "first_game", name: "第一局", desc: "完成一局游戏（胜利或失败）" },
    { id: "first_coin", name: "叮当！", desc: "获得 1 枚金币（在游戏中吃到金币）" },
    { id: "first_diamond", name: "闪亮！", desc: "获得 1 颗钻石（在游戏中吃到钻石）" },
    { id: "score_300", name: "小有成就", desc: "单局分数达到 300" },
    { id: "score_600", name: "高手", desc: "单局分数达到 600" },
    { id: "clear_1", name: "启程", desc: "通关第 1 关" },
    { id: "clear_5", name: "深海试炼", desc: "通关第 5 关" },
    { id: "clear_10", name: "终章通关", desc: "通关第 10 关" },
    { id: "unlock_skin", name: "新衣服", desc: "解锁任意一款皮肤" },
    { id: "unlock_map", name: "新世界", desc: "解锁任意一张地图" },
  ];

  const SHOP_ITEMS = [
    { id: "shield", name: "护盾", desc: "抵消一次自撞（可在局内使用）", currency: "coins", price: 20 },
    { id: "boost", name: "疾行药水", desc: "短时间加速（可在局内使用）", currency: "coins", price: 30 },
    { id: "multiplier", name: "倍率卷轴", desc: "短时间 2 倍得分（可在局内使用）", currency: "coins", price: 40 },
    { id: "magnet", name: "磁铁护符", desc: "短时间吸附金币（可在局内使用）", currency: "coins", price: 50 },
    { id: "map_desert", name: "解锁地图：沙漠", desc: "自由模式可选沙漠地图", currency: "diamonds", price: 30, unlockMapId: "desert" },
    { id: "map_ocean", name: "解锁地图：海洋", desc: "自由模式可选海洋地图", currency: "diamonds", price: 30, unlockMapId: "ocean" },
    { id: "map_hell", name: "解锁地图：地狱", desc: "自由模式可选地狱地图", currency: "diamonds", price: 40, unlockMapId: "hell" },
  ];

  const GACHA = {
    costDiamonds: 10,
    table: [
      { type: "coins", amount: 80, weight: 28 },
      { type: "coins", amount: 160, weight: 18 },
      { type: "diamonds", amount: 12, weight: 14 },
      { type: "diamonds", amount: 20, weight: 8 },
      { type: "item", itemId: "shield", amount: 1, weight: 12 },
      { type: "item", itemId: "boost", amount: 1, weight: 8 },
      { type: "item", itemId: "multiplier", amount: 1, weight: 6 },
      { type: "item", itemId: "magnet", amount: 1, weight: 6 },
      { type: "unlockSkin", skinId: "stardew", weight: 2 },
      { type: "unlockSkin", skinId: "ocean", weight: 2 },
      { type: "unlockSkin", skinId: "inferno", weight: 2 },
      { type: "unlockSkin", skinId: "amethyst", weight: 2 },
      { type: "unlockSkin", skinId: "gold", weight: 1 },
      { type: "unlockMap", mapId: "desert", weight: 2 },
      { type: "unlockMap", mapId: "ocean", weight: 2 },
      { type: "unlockMap", mapId: "hell", weight: 1 },
    ],
  };

  function weightedPick(entries) {
    const total = entries.reduce((sum, e) => sum + e.weight, 0);
    let r = Math.random() * total;
    for (const entry of entries) {
      r -= entry.weight;
      if (r <= 0) return entry;
    }
    return entries[entries.length - 1];
  }

  window.GameData = { MAPS, SKINS, LEVELS, ACHIEVEMENTS, SHOP_ITEMS, GACHA, weightedPick };
})();
