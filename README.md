# Travel

所有旅行都放在這個 repo：每趟一個行程網站，用 GitHub Pages 發布。

總覽：https://waltwait.github.io/travel/

| 旅行 | 日期 | 網址 |
| --- | --- | --- |
| 新加坡 | 2026/10/17–10/19 | https://waltwait.github.io/travel/sin-2026-10/ |

## 結構

- `docs/`：GitHub Pages 的內容（Settings → Pages 設定為 `main` 分支的 `/docs`）
  - `docs/index.html`：總覽頁
  - `docs/{地點代碼}-{YYYY-MM}/`：一趟旅行的網站，改行程只要改裡面的 `itinerary.js`
- `.claude/skills/`：規劃旅行用的 Claude Code skills（說明在 `CLAUDE.md`）
  - `/trip`（以及 `/trip-plan`、`/trip-research`、`/trip-go`、`/trip-review`、`/trip-pack`）：[fdjkgh580/claude-trip-skills](https://github.com/fdjkgh580/claude-trip-skills)
  - `travel-planner`（說「旅行計劃」「旅遊攻略」就會觸發）：[tianxingyang/skills-travel-planner](https://github.com/tianxingyang/skills-travel-planner)

## 新增一趟旅行的網站

1. 複製 `docs/sin-2026-10/` 成新資料夾，例如 `docs/tyo-2027-03/`
2. 改新資料夾裡的 `itinerary.js`，和 `index.html` 的 `<title>`
3. 在 `docs/index.html` 和上面的表格各加一筆
4. 推上 `main`，約一分鐘後就會出現在 `https://waltwait.github.io/travel/tyo-2027-03/`

## 本機預覽

直接用瀏覽器打開 `docs/` 底下的 `index.html` 即可。
