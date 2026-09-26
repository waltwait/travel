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
 *   q / to / at   移動的目的地：q 是 Naver Map 搜尋字（韓文最準），to 是顯示用的短名稱，
 *                 at 是座標 [緯度, 經度]
 *
 * places 裡每一個地點：
 *   kind:    "food" 吃喝 ／ "spot" 景點、逛街、活動
 *   name:    顯示名稱
 *   meal:    "早餐" / "午餐" / "晚餐"（正餐會以藍字標示）
 *   booked:  已預約的標籤文字（會以紅字標示），例如 "已訂位"
 *   suggest: true 表示是 Claude 建議加進來的
 *   hours:   營業時間
 *   q:       Naver Map 搜尋關鍵字（省略就用 name 搜尋；韓文最準）
 *   at:      座標 [緯度, 經度]，可省略
 *
 * 地圖連結都開 Naver Map（韓國的 Google 地圖不能導航）。點地名是搜尋；
 * 「導航」在手機上直接開 Naver Map App：有 at 就從目前位置規劃大眾運輸路線，
 * 沒有 at 就先搜尋 q，再從搜尋結果按路線。電腦上兩個都開 Naver Map 網頁搜尋。
 * 分店不確定的地點請把 q 改成有分店名或地址的關鍵字，導航才會準。
 *
 * flights 的 utc 是機場所在地的時區（台灣 8、韓國 9），用來算飛行時間。
 */
var HOTEL = { name: "Kwangsu Hotel", q: "광수호텔 해운대", at: [35.1595, 129.1561] };

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

  hotel: HOTEL,

  days: [
    {
      date: "2026-11-27",
      theme: "西面 + 荒嶺山夜景",
      line: "cc",
      items: [
        { type: "move", start: "08:25", end: "11:30", flight: "JX900", title: "搭飛機 JX900", note: "桃機 T1 → 金海 國際線" },
        { type: "move", start: "11:30", end: "12:30", title: "入境、領行李", notes: ["在機場便利商店買 T-money 交通卡並儲值，儲值只收現金"], q: "김해국제공항", at: [35.1801, 128.9364], to: "金海機場" },
        { type: "move", start: "12:30", end: "12:45", title: "輕軌 機場站 → 沙上站", note: "釜山金海輕軌，約 10 分鐘", q: "사상역", at: [35.1625, 128.9890], to: "沙上站" },
        { type: "move", start: "12:45", end: "13:40", title: "地鐵 2 號線 沙上 → 海雲台", notes: ["往萇山 장산 方向，約 50 分鐘", "出輕軌站走到 2 號線月台約 5 分鐘"], q: "해운대역 부산", at: [35.1638, 129.1587], to: "海雲台站" },
        { type: "move", start: "13:40", end: "13:50", title: "走到飯店放行李", notes: ["約 8 分鐘", "15:00 才能入住，行李先寄放在櫃台", "今天會 22:00 後才回來，跟櫃台說一聲"], q: HOTEL.q, at: HOTEL.at, to: HOTEL.name },
        {
          type: "stop", start: "14:00", end: "14:45",
          notes: ["1962 年開的老店，招牌是牛肉湯飯 소고기국밥", "在海雲台站 3 號出口附近，吃完直接搭地鐵"],
          places: [
            { kind: "food", meal: "午餐", name: "海雲台元祖奶奶湯飯 해운대원조할매국밥", hours: "10:00–19:00", q: "해운대원조할매국밥", at: [35.1620, 129.1633] }
          ]
        },
        { type: "move", start: "14:45", end: "15:20", title: "地鐵 2 號線 海雲台 → 田浦", notes: ["往沙上 사상 方向，約 30 分鐘", "田浦是西面的前一站"], q: "전포역", at: [35.1528, 129.0653], to: "田浦站" },
        {
          type: "stop", start: "15:20", end: "16:30",
          notes: ["咖啡廳很多，現場挑一家喝咖啡、拍照", "旁邊的田浦工具街 전포공구길 是老五金行改成的小店，順便逛"],
          places: [
            { kind: "spot", name: "田浦咖啡街 전포카페거리", q: "전포카페거리" }
          ]
        },
        { type: "move", start: "16:30", end: "16:50", title: "搭計程車上荒嶺山", notes: ["約 15–20 分鐘", "跟司機說「황령산 전망쉼터」，才會開到展望台下面，不是登山口"], q: "황령산 전망쉼터", at: [35.1580, 129.0827], to: "荒嶺山展望休息區" },
        {
          type: "stop", start: "16:50", end: "18:15",
          notes: ["日落 17:13，17:40 左右天全黑，夜景最漂亮", "從展望休息區走到烽燧臺約 10 分鐘", "看得到廣安大橋和海雲台", "山上風大，11 月底晚上很冷，帶外套"],
          places: [
            { kind: "spot", name: "荒嶺山烽燧臺 황령산 봉수대", q: "황령산 봉수대", at: [35.1572, 129.0819] },
            { kind: "food", name: "展望休息區咖啡廳 블루뱅", hours: "營業到凌晨 2 點", q: "황령산 전망쉼터", at: [35.1580, 129.0827] }
          ]
        },
        { type: "move", start: "18:15", end: "18:45", title: "搭計程車下山回西面", notes: ["山上很少計程車經過，用 Kakao T 叫車", "約 15 分鐘"], q: "고기굽는남자 서면점", at: [35.1571, 129.0615], to: "烤肉店" },
        {
          type: "stop", start: "18:45", end: "20:15",
          notes: ["週五晚上常要排隊，下山前先用 CatchTable 線上排隊"],
          places: [
            { kind: "food", meal: "晚餐", name: "烤肉男 고기굽는남자 西面店", hours: "11:00–00:30", q: "고기굽는남자 서면점", at: [35.1571, 129.0615] }
          ]
        },
        {
          type: "stop", start: "20:15", end: "21:45",
          notes: ["地下街和 Olive Young 大多 22:00 左右關門"],
          places: [
            { kind: "spot", name: "西面地下街 서면지하상가", q: "서면지하상가", at: [35.1559, 129.0591] },
            { kind: "spot", name: "Olive Young 西面", q: "올리브영 서면" }
          ]
        },
        { type: "move", start: "21:45", end: "22:30", title: "地鐵 2 號線 西面 → 海雲台，回飯店入住", notes: ["往萇山 장산 方向，約 35 分鐘", "出站走回飯店約 8 分鐘"], q: HOTEL.q, at: HOTEL.at, to: HOTEL.name }
      ]
    },
    {
      date: "2026-11-28",
      theme: "待安排",
      line: "ne",
      from: { q: HOTEL.q, at: HOTEL.at, to: HOTEL.name },
      items: [],
      pending: "這天的行程還沒排。"
    },
    {
      date: "2026-11-29",
      theme: "待安排",
      line: "ew",
      from: { q: HOTEL.q, at: HOTEL.at, to: HOTEL.name },
      items: [],
      pending: "這天的行程還沒排。"
    },
    {
      date: "2026-11-30",
      theme: "回台灣",
      line: "cc",
      from: { q: HOTEL.q, at: HOTEL.at, to: HOTEL.name },
      items: [
        { type: "move", start: "12:30", end: "14:15", flight: "JX901", title: "搭飛機 JX901", note: "金海 國際線 → 桃機 T1" },
        { type: "move", start: "14:15", title: "抵達桃園", note: "入境、領行李" }
      ],
      pending: "起飛前的行程還沒排。"
    }
  ]
};
