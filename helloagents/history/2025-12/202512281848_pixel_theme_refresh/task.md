# 任务清单: 精细像素风视觉升级（Stardew-like）

目录: `helloagents/plan/202512281848_pixel_theme_refresh/`

---

## 1. 主题样式
- [√] 1.1 新增 `assets/pixel-theme.css`，定义像素风色板、字体、面板/按钮/输入组件样式
- [√] 1.2 加入响应式断点（手机竖屏/横屏），并处理 `prefers-reduced-motion`

## 2. 页面改造
- [√] 2.1 在 `Snake.html` 引入主题样式，调整布局/类名以适配主题，保持游戏逻辑不变
- [√] 2.2 在 `Store.html` 引入主题样式，统一卡片/按钮/货币展示
- [√] 2.3 在 `lottery.html` 引入主题样式，统一卡片/按钮/结果展示

## 3. 质量验证
- [√] 3.1 手工验证：PC/手机竖屏/横屏下布局与可读性
- [√] 3.2 手工验证：商店购买/抽奖后 `localStorage` 数据仍正确

## 4. 知识库同步
- [√] 4.1 更新 `helloagents/wiki/overview.md` 与 `helloagents/wiki/modules/theme.md`（如实施细节有调整）
- [√] 4.2 更新 `helloagents/CHANGELOG.md` 记录视觉升级
