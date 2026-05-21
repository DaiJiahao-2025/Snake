# 项目技术约定

## 技术栈
- **形态:** 静态网页（纯 HTML/CSS/JS，脚本内联）
- **入口页面:** `Snake.html`

## 开发约定
- **编码:** UTF-8
- **缩进:** 2 空格
- **跨页面状态:** 使用 `localStorage`，新增键名需兼容旧存档

## 运行方式
- 推荐使用本地静态服务器运行：`python -m http.server 8000`
- 浏览器打开：`http://localhost:8000/Snake.html`