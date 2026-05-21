# 任务清单: 玩法与功能扩展（关卡/地图/皮肤/成就/排行榜）

目录: `helloagents/plan/202512281922_gameplay_expansion/`

---

## 1. 数据与存储
- [√] 1.1 新增 `assets/storage.js`：JSON 存取、默认值、旧键兼容迁移
- [√] 1.2 新增 `assets/game-data.js`：地图/关卡/皮肤/成就与掉落表

## 2. 新页面
- [√] 2.1 新增 `LevelSelect.html`：关卡选择与解锁状态
- [√] 2.2 新增 `MapSelect.html`：地图选择（自由模式）
- [√] 2.3 新增 `SkinSelect.html`：皮肤选择与预览
- [√] 2.4 新增 `Achievements.html`：成就列表
- [√] 2.5 新增 `Leaderboard.html`：本地排行榜

## 3. Snake.html 玩法扩展
- [√] 3.1 地图背景与障碍物（生成/绘制/碰撞）
- [√] 3.2 关卡模式（目标、通关、奖励、解锁）
- [√] 3.3 道具系统（库存、快捷使用、效果：加速/倍率/磁铁）
- [√] 3.4 手机滑动转向（手势阈值、阻止滚动）
- [√] 3.5 成就与排行榜记录

## 4. Store.html 与 lottery.html 完善
- [√] 4.1 商店：更多道具、库存展示、购买逻辑（金币/钻石）
- [√] 4.2 抽奖：宝箱开箱动画 + 掉落（道具/皮肤/地图）

## 5. 知识库同步
- [√] 5.1 更新 `helloagents/wiki/data.md`（新增存档键）
- [√] 5.2 更新 `helloagents/wiki/modules/pages.md`（新增页面）
- [√] 5.3 更新 `helloagents/CHANGELOG.md`
