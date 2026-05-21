# Repository Guidelines

## 项目结构与模块组织

本仓库是纯前端的静态小游戏集合（HTML/CSS/JS 内联为主），核心页面与资源如下：

- `Snake.html`：主游戏（贪吃蛇 + 道具/音效等）
- `Store.html`：商店页面（购买/消耗与本地存档）
- `lottery.html`：抽奖/转盘页面
- `LevelSelect.html`：关卡选择
- `MapSelect.html`：地图选择（自由模式）
- `SkinSelect.html`：皮肤选择
- `Achievements.html`：成就页
- `Leaderboard.html`：本地排行榜
- `assets/pixel-theme.css`：统一像素风主题样式（字体/按钮/面板/响应式）
- `assets/*.js`：共享玩法数据与页面渲染（关卡/地图/皮肤/存档）
- `img/`：图标与食物素材（例如 `img/food/`）
- `Sounds/`：音频资源（背景音乐、开始/失败等音效）
- `Videos/`：视频资源（如 `Videos/myVideo.mp4`）

## 构建、测试与本地开发命令

本项目无需构建工具；推荐使用本地静态服务器运行，以避免浏览器对本地文件的限制（音频加载、路径、缓存等）。

- `python -m http.server 8000`：在仓库根目录启动本地服务器
- 在浏览器打开：`http://localhost:8000/Snake.html`

仅快速预览时也可直接双击打开 `Snake.html`（功能受浏览器策略影响）。

## 编码风格与命名约定

- 缩进：HTML/CSS/JS 统一使用 2 空格。
- 资源命名：小写字母 + 连字符（例如 `shield-icon.png`）；新增素材按类型放入 `img/`、`Sounds/`、`Videos/`。
- 状态存储：页面间通过 `localStorage` 共享数据；修改前请确认键名兼容，避免破坏已有存档。
- 编码：若发现页面中文出现乱码，请统一为 UTF-8 并确保 `<meta charset="UTF-8">` 与实际文件编码一致。

## 测试指南（手工验证）

当前未配置自动化测试。提交前至少手工验证：

- `Snake.html`：开始/暂停、移动、得分、碰撞与失败流程
- `Store.html`/`lottery.html`：购买/抽奖后刷新页面仍能正确读取存档
- 资源：图片/音频路径正常、无 404

## 提交与 Pull Request 规范

仓库未包含 Git 历史时，建议采用 Conventional Commits：

- `feat: ...` 新功能；`fix: ...` 修复；`docs: ...` 文档；`chore: ...` 杂项

PR 请包含：变更说明、关键页面截图/录屏（UI/玩法变更必需）、手工验证清单；新增音频/视频需注明来源与许可，避免引入敏感信息或密钥。
