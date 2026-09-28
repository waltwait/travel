---
name: travel-planner
description: 製作完整旅行攻略或把行程轉成此專案的手機網頁，整合研究、每日安排、預算與 GitHub Pages 資料格式。適用「完整旅遊攻略」「出網頁版」；單純進度或局部排程使用 trip 系列。
---

# 完整攻略與行程網站

先讀 repo 根目錄 `AGENTS.md`。本專案使用 `docs/` 下的旅行手帳與 GitHub Pages；沿用既有 `window.TRIP` 資料結構，不套用其他專案的 Cloudflare 根目錄網站。

## 依要求選工作範圍

- 已有行程，只要網頁：直接讀該趟內容與 metadata，不重新訪談或全套研究。
- 要完整新攻略：讀 [trip-plan](../trip-plan/SKILL.md) 補必要條件、[trip-research](../trip-research/SKILL.md) 查資料、[trip-go](../trip-go/SKILL.md) 排程，再依要求產網站。已知資訊與授權一路沿用。
- 只改某天：讀目前 `itinerary.js`，最小範圍更新內容；不重新設計整站。
- 要獨立 HTML 檔：輸出在行程資料夾，標示為內容快照；內嵌必要樣式與腳本，不要求發布到網站。

## 寫入網站

1. 用 metadata 指向的網站路徑，或在 `docs/index.html` 的 `TRIPS` 比對日期與地點；有歧義再問，不僅依相同城市覆蓋另一趟。
2. 既有頁先讀該趟 `README.md`、`itinerary.js` 開頭註解與 renderer 所需欄位。使用其 `days`、`items`、`places`、`flights` 結構，保留 `q`、`at`、`utc`、`flight`、`eve`、`booked`、`pass` 等有意義資料。
3. 新網站依 `AGENTS.md` 複製合適的既有頁面，逐一換掉來源目的地、航班、飯店、日期、時區、地圖及當地說明；檢查多日跨時區是否真的受現有 renderer 支援，不支援時修正實作或明確標示限制。
4. 新增首頁 `TRIPS` 與 README 索引，metadata 記錄相對網站路徑。網站更新日期反映實際修改；旅行資料夾日期仍是建立日期。
5. 維持手帳樣式、手機與深色模式、相對路徑、PWA；不要重新加入圖例列，也不為每趟強制更換版型。
6. 公開頁只包含旅遊資訊，移除訂位代碼、證件、私人聯絡及醫療資料。網頁文字與 JSON 正確跳脫；不可將未處理的外部字串直接插入 HTML／script。

## 驗證與交付

- 修改 `itinerary.js` 時可用 `node --check` 檢查語法；這不等於完整功能驗證。
- 檢查日期／星期／航班時間、地圖分店與網址、首頁索引及 `/travel/` 下的資源路徑。
- 網頁變更用本機 HTTP 預覽，確認手機寬度、深色模式、導航與相關時間狀態；宣稱離線可用前，實測曾載入後斷網的情況。無法測到的項目如實列出。
- 交付變更檔案與預覽方式，區分本機完成與已發布。只有使用者要求發布或 push 時才執行對應操作，確認實際 GitHub Pages 結果後才說已上線。
