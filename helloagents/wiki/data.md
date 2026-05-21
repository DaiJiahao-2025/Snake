# 数据模型

## localStorage 键
- `snakeHighScore`：最高分
- `snakeBgUrl`：自定义背景媒体链接
- `snakeMusicUrl`：自定义背景音乐链接
- `snakeBgAlpha`：背景透明度
- `shopStars`：星星数量
- `shopCoins`：金币数量
- `shopDiamonds`：钻石数量
- `shieldCount`：护盾数量（Snake 维护）

## 新增（v1 存档结构）
- `saveVersion`：存档版本号（用于兼容迁移）
- `selectedMode`：`endless`（自由）或 `level`（关卡）
- `selectedLevelId`：当前选择关卡 ID
- `selectedMapId`：当前选择地图 ID（自由模式）
- `selectedSkinId`：当前选择皮肤 ID
- `unlockedLevelMax`：已解锁的最大关卡号
- `unlockedMaps`：已解锁地图数组（JSON）
- `unlockedSkins`：已解锁皮肤数组（JSON）
- `inventory`：道具库存对象（JSON），例如 `{ shield, boost, multiplier, magnet }`
- `achievements`：成就解锁记录对象（JSON）
- `leaderboards`：排行榜数据对象（JSON）
- `stats`：统计数据对象（JSON）

## 兼容性约定
- 新增键名需保证旧存档不报错（读取时提供默认值）
- 变更键名需提供迁移逻辑或保留旧键读取

## 迁移规则
- 旧键 `startShield=true` 会在迁移时转换为 `shieldCount + 1` 并移除 `startShield`
