/*
 * 行程資料 —— 要改行程只需要改這個檔案。
 *
 * items 裡每一列是一個時段：
 *   type: "move"  交通／移動（時間軸上畫成虛線）
 *         "stop"  停留點，places 可以放一個或多個地點
 *         "free"  空檔／待安排
 *   start / end   24 小時制 "HH:MM"，end 可省略；過午夜直接寫 "00:30" 即可
 *   label         想用文字取代時間時使用，例如 "結束後"
 *   eve: true     這一列在前一天晚上（例如半夜的班機，前一晚就要出門），時間照寫 "21:57"
 *   flight        搭飛機那一列寫航班號碼，例如 "JX900"（要跟 flights 的 no 一樣）
 *                 時間照機票寫：起飛是出發地時間、抵達是目的地時間。
 *                 同一天起飛前的列用出發地時間、落地後的列用目的地時間，
 *                 所以在台灣的列照台灣時間寫就好，網頁會自己換算
 *   note / notes  備註（字串或字串陣列）
 *   （每天的 from：整天路線的出發地，例如飯店）
 *   （每天的 pending：還沒排的提醒，顯示在當天最下面）
 *   links         額外連結，例如 [{ text: "客運時刻表", url: "https://..." }]
 *   q / to        移動的目的地：q 是 Google 地圖搜尋字，to 是顯示用的短名稱
 *
 * places 裡每一個地點：
 *   kind:    "food" 吃喝 ／ "spot" 景點、逛街、活動
 *   name:    顯示名稱
 *   meal:    "早餐" / "午餐" / "晚餐"（正餐會以藍字標示）
 *   booked:  已預約的標籤文字（會以紅字標示），例如 "已訂位"
 *   suggest: true 表示是 Claude 建議加進來的
 *   hours:   營業時間
 *   q:       Google 地圖搜尋關鍵字（省略就用 name 搜尋）
 *
 * 有 q（或 name）的地點會出現「導航」按鈕，並依時間順序串進「整天路線」。
 * 分店不確定的地點請把 q 改成有分店名或地址的關鍵字，導航才會準。
 *
 * flights 的 utc 是機場所在地的時區（台灣 8、韓國 9），用來算飛行時間。
 */
window.TRIP = {
  updated: "2026-09-26",

  flights: [
    {
      dir: "去程",
      date: "2026-11-27",
      no: "JX900",
      airline: "星宇航空 STARLUX",
      from: { code: "TPE", name: "桃機", term: "T1", time: "08:25", utc: 8 },
      to: { code: "PUS", name: "金海", term: "國際線", time: "11:30", utc: 9 }
    },
    {
      dir: "回程",
      date: "2026-11-30",
      no: "JX901",
      airline: "星宇航空 STARLUX",
      from: { code: "PUS", name: "金海", term: "國際線", time: "12:30", utc: 9 },
      to: { code: "TPE", name: "桃機", term: "T1", time: "14:15", utc: 8 }
    }
  ],

  // 訂好住宿後改成 { name: "飯店名稱", q: "Google 地圖搜尋字" }
  hotel: null,

  days: [
    {
      date: "2026-11-27",
      theme: "抵達釜山",
      line: "cc",
      items: [
        { type: "move", start: "08:25", end: "11:30", flight: "JX900", title: "搭飛機 JX900", note: "桃機 T1 → 金海 國際線" },
        { type: "move", start: "11:30", title: "抵達釜山", note: "入境、領行李", q: "Gimhae International Airport", to: "金海機場" }
      ],
      pending: "落地之後的行程還沒排。"
    },
    {
      date: "2026-11-28",
      theme: "待安排",
      line: "ne",
      items: [],
      pending: "這天的行程還沒排。"
    },
    {
      date: "2026-11-29",
      theme: "待安排",
      line: "ew",
      items: [],
      pending: "這天的行程還沒排。"
    },
    {
      date: "2026-11-30",
      theme: "回台灣",
      line: "cc",
      items: [
        { type: "move", start: "12:30", end: "14:15", flight: "JX901", title: "搭飛機 JX901", note: "金海 國際線 → 桃機 T1" },
        { type: "move", start: "14:15", title: "抵達桃園", note: "入境、領行李" }
      ],
      pending: "起飛前的行程還沒排。"
    }
  ]
};
