# Travel

所有旅行都放在這個 repo：每趟一個行程網站，用 GitHub Pages 發布。

總覽：https://waltwait.github.io/travel/

| 旅行 | 日期 | 網址 |
| --- | --- | --- |
| 新加坡 | 2026/10/17–10/19 | https://waltwait.github.io/travel/sin-2026-10/ |
| 釜山 | 2026/11/27–11/30 | https://waltwait.github.io/travel/pus-2026-11/ |

## 結構

- `docs/`：GitHub Pages 的內容（Settings → Pages 設定為 `main` 分支的 `/docs`）
  - `docs/index.html`：首頁（旅行手帳）：下一趟的出發看板，和每趟一個印章的印章牆
  - `docs/assets/journal.css`：所有頁面共用的手帳樣式
  - `docs/manifest.webmanifest`、`docs/sw.js`、`docs/assets/app.js`、`docs/assets/icons/`：讓網站可以加到主畫面當 App，沒網路也能看
  - `docs/{地點代碼}-{YYYY-MM}/`：一趟旅行的網站，改行程只要改裡面的 `itinerary.js`
- `.claude/skills/`：規劃旅行用的 Claude Code skills（說明在 `CLAUDE.md`）
  - `/trip`（以及 `/trip-plan`、`/trip-research`、`/trip-go`、`/trip-review`、`/trip-pack`）：[fdjkgh580/claude-trip-skills](https://github.com/fdjkgh580/claude-trip-skills)
  - `travel-planner`（說「旅行計劃」「旅遊攻略」就會觸發）：[tianxingyang/skills-travel-planner](https://github.com/tianxingyang/skills-travel-planner)

## 加到手機主畫面

打開 https://waltwait.github.io/travel/ ：

- iPhone（Safari）：點「分享」→「加入主畫面」
- Android（Chrome）：點右上角 ⋮ →「加到主畫面」或「安裝應用程式」

主畫面上會出現藍底白色飛機的 Travel 圖示，打開是全螢幕的首頁。看過的行程沒網路也能看；導航和 Google 地圖連結還是要網路。

## 新增一趟旅行的網站

1. 複製 `docs/sin-2026-10/` 成新資料夾，例如 `docs/tyo-2027-03/`
2. 改新資料夾裡的 `itinerary.js`，和 `index.html` 裡寫死的地名、代碼（`<title>`、導覽列、大印章）
3. 在 `docs/index.html` 的 `TRIPS` 最上面加一筆，並在上面的表格加一列
4. 推上 `main`，約一分鐘後就會出現在 `https://waltwait.github.io/travel/tyo-2027-03/`

## 本機預覽

直接用瀏覽器打開 `docs/` 底下的 `index.html` 即可。
