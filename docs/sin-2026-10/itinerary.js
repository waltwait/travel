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
 *   note / notes  備註（字串或字串陣列）
 *   （每天的 from：整天路線的出發地，例如飯店）
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
 */
var HOTEL = { name: "Hotel Traveltine", q: "Hotel Traveltine Downtown Singapore, 700 Beach Road" };

window.TRIP = {
  updated: "2026-09-26",

  flights: [
    {
      dir: "去程",
      date: "2026-10-17",
      no: "TR873",
      airline: "酷航 Scoot",
      from: { code: "TPE", name: "桃機", term: "T1", time: "01:35" },
      to: { code: "SIN", name: "樟宜", term: "T1", time: "06:00" }
    },
    {
      dir: "回程",
      date: "2026-10-19",
      no: "JX772",
      airline: "星宇航空 STARLUX",
      from: { code: "SIN", name: "樟宜", term: "T2", time: "14:00" },
      to: { code: "TPE", name: "桃機", term: "T2", time: "18:50" }
    }
  ],

  hotel: {
    name: "Hotel Traveltine Downtown Singapore",
    q: HOTEL.q
  },

  days: [
    {
      date: "2026-10-17",
      theme: "洗頭 + 聖陶沙 + 萬聖夜",
      line: "cc",
      items: [
        { eve: true, type: "move", start: "21:57", end: "22:09", title: "高鐵 1688 新竹 → 桃園", note: "自由座 10–12 車" },
        { eve: true, type: "move", start: "22:17", end: "22:36", title: "機捷普通車 高鐵桃園站 → 第一航廈", notes: ["只有 8 分鐘轉乘", "趕不上就搭下一班，時間還很夠"] },
        { eve: true, type: "move", start: "22:36", end: "23:10", title: "酷航報到、出境", note: "櫃台起飛前 3 小時開" },
        {
          eve: true, type: "stop", start: "23:10", end: "00:40",
          notes: ["出境後在管制區走路或搭航廈電車到第二航廈 4 樓", "23:00 後是深夜時段：簡餐、泡麵、飲料、生啤酒，淋浴間不開", "最多待 3 小時"],
          places: [
            { kind: "food", name: "東方宇逸貴賓室 Oriental Club Lounge", hours: "24 小時", q: "東方宇逸貴賓室 桃園機場第二航廈" }
          ]
        },
        { type: "move", start: "00:40", end: "01:15", title: "走回第一航廈登機門", note: "登機時間以登機證為準" },
        { type: "move", start: "01:35", end: "06:00", title: "搭灰機 TR873", note: "桃機 T1 → 樟宜 T1" },
        { type: "move", start: "06:00", end: "06:50", title: "入境 + 領行李", q: "Changi Airport Terminal 1", to: "樟宜機場 T1" },
        { type: "move", start: "06:50", end: "08:00", title: "搭地鐵至飯店放行李", note: "要走14分鐘 0.0", q: HOTEL.q, to: HOTEL.name },
        {
          type: "stop", start: "08:00", end: "09:00",
          places: [
            { kind: "food", meal: "早餐", name: "亞坤咖椰吐司", q: "Ya Kun Kaya Toast" }
          ]
        },
        {
          type: "stop", start: "09:50", end: "11:00",
          note: "體驗時間約 1 小時",
          places: [
            { kind: "spot", name: "韓式洗頭 Bada Hair", booked: "已訂位", hours: "10:00–20:00", q: "Bada Hair Mandarin Gallery 333A Orchard Road" }
          ]
        },
        {
          type: "stop", start: "11:00", end: "15:00",
          notes: ["Orchard Road 大暴走", "洗完頭走到對面 Lucky Plaza 6 樓吃天天，約 5 分鐘"],
          places: [
            { kind: "food", meal: "午餐", name: "天天海南雞飯 Lucky Plaza 店", hours: "09:30–19:30", q: "Tian Tian Hainanese Chicken Rice Lucky Plaza 304 Orchard Road" },
            { kind: "spot", name: "逛 Orchard Road，Ex. Leftfoot 鞋店", hours: "11:00–20:45", q: "Leftfoot Singapore" },
            { kind: "food", name: "Uncle Chieng Traditional & Wafer ice cream 餅乾冰淇淋", hours: "13:00–22:00", q: "Uncle Chieng Traditional & Wafer Ice Cream" },
            { kind: "food", name: "CHAN SUSU 陳蘇蘇1994 甜品", hours: "11:00–23:00", q: "Chan Susu 1994" },
            { kind: "food", name: "Ümacha X Crepe Endo 日式可麗餅 & 抹茶拿鐵", hours: "10:00–21:00", q: "Umacha x Crepe Endo" }
          ]
        },
        { type: "move", start: "15:00", end: "16:00", title: "前往聖陶沙", note: "車程 40 mins" },
        {
          type: "stop", start: "16:00", end: "17:00",
          note: "亞洲大陸最南端打卡點",
          places: [
            { kind: "spot", name: "Southernmost Point of Continental Asia 巴拉灣島", hours: "09:00–19:00", q: "Southernmost Point of Continental Asia" }
          ]
        },
        { type: "move", start: "17:00", end: "17:30", title: "搭聖淘沙捷運到名勝世界", note: "Beach 站 → Resorts World 站", q: "Resorts World Station Sentosa Express", to: "Resorts World 站" },
        {
          type: "stop", start: "17:30", end: "19:00",
          notes: ["不去滑車，改在環球影城旁邊簡單吃", "冷氣美食街，一次吃到很多馬來西亞小吃", "走到環球影城約 5 分鐘"],
          places: [
            { kind: "food", meal: "晚餐", suggest: true, name: "Malaysian Food Street 馬來西亞美食街", hours: "週末 09:00–22:00", q: "Malaysian Food Street Resorts World Sentosa" }
          ]
        },
        { type: "move", start: "19:00", end: "19:30", title: "走去環球影城排隊" },
        {
          type: "stop", start: "19:30", end: "00:30",
          note: "時間為約略",
          places: [
            { kind: "spot", name: "環球影城 Halloween Horror Nights", q: "Universal Studios Singapore" }
          ]
        },
        { type: "move", start: "00:30", label: "結束後", title: "返回 Hotel Traveltine", q: HOTEL.q, to: HOTEL.name }
      ]
    },

    {
      date: "2026-10-18",
      theme: "按摩 + 賭場",
      line: "ne",
      from: { q: HOTEL.q, to: HOTEL.name },
      items: [
        { type: "move", start: "09:00", end: "09:10", title: "早點出門吃早餐", note: "步行 9 mins" },
        {
          type: "stop", start: "09:10", end: "10:00",
          note: "週二公休，這天是週日有開",
          places: [
            { kind: "food", meal: "早餐", name: "Blanco Court Prawn Noodle", hours: "07:30–16:00", q: "Blanco Court Prawn Mee 243 Beach Road" },
            { kind: "food", name: "Tarik 買奶茶", hours: "08:00–23:30", q: "Tarik Singapore" }
          ]
        },
        { type: "move", start: "10:10", end: "10:50", title: "前往按摩：Jean Yip Loft", note: "Outram Park 站 H 出口" },
        {
          type: "stop", start: "11:00", end: "12:30",
          places: [
            { kind: "spot", name: "Jean Yip Loft 按摩", hours: "週末 11:00–19:30", q: "Jean Yip Loft 307 New Bridge Road" }
          ]
        },
        { type: "free", start: "12:30", end: "13:00" },
        { type: "move", start: "13:00", end: "13:30", title: "坐車回飯店附近", note: "18 mins", q: HOTEL.q, to: HOTEL.name },
        {
          type: "stop", start: "13:30", end: "15:00",
          places: [
            { kind: "food", name: "ROOKIE & HAUS CONCEPT STORE 抹茶拿鐵", hours: "12:00–20:00", q: "Rookie & Haus Concept Store Singapore" },
            { kind: "food", meal: "午餐", name: "Shake Shack", q: "Shake Shack Singapore" }
          ]
        },
        { type: "move", start: "15:00", end: "15:30", title: "前往福康寧公園" },
        {
          type: "stop", start: "15:30", end: "16:30",
          note: "拍照要排隊",
          places: [
            { kind: "spot", name: "福康寧公園 - Fort Canning Tree Tunnel 樹洞", q: "Fort Canning Tree Tunnel" }
          ]
        },
        { type: "move", start: "16:30", end: "17:00", title: "前往 The Thai Spa" },
        {
          type: "stop", start: "17:00", end: "18:30",
          places: [
            { kind: "spot", name: "The Thai Spa - Suntec City 按摩", booked: "已預訂 5 點", hours: "11:00–21:30", q: "The Thai Spa Suntec City" }
          ]
        },
        { type: "move", start: "18:30", end: "19:00", title: "前往咖啡廳 & 老巴剎" },
        {
          type: "stop", start: "19:00", end: "20:30",
          notes: ["吃沙嗲 附近也有很多吃ㄉ", "咖啡如果第一天喝了…"],
          places: [
            { kind: "food", name: "Aifokato (Telok Ayer) | Gelato Coffee Specialty 厲害的咖啡", hours: "10:30–21:00", q: "Aifokato Telok Ayer" },
            { kind: "food", meal: "晚餐", name: "Best Satay 7 & 8 Lau Pa Sat", hours: "19:00–01:00", q: "Best Satay 7 & 8 Lau Pa Sat" }
          ]
        },
        { type: "move", start: "20:30", end: "21:00", title: "前往魚尾獅公園" },
        {
          type: "stop", start: "21:00", end: "21:30",
          note: "看 9 點場燈光秀（8PM & 9PM）",
          places: [
            { kind: "spot", name: "魚尾獅公園 - 水舞燈光秀", q: "Merlion Park" }
          ]
        },
        { type: "move", start: "21:30", end: "22:00", title: "前往金沙酒店", note: "車程 10 mins，步行 26 mins" },
        {
          type: "stop", start: "22:00", end: "23:00",
          note: "帶護照 & 包包寄放",
          places: [
            { kind: "spot", name: "金沙娛樂城 - 放手一搏", q: "Marina Bay Sands Casino" }
          ]
        },
        { type: "move", start: "23:00", title: "Go Home 螺旋橋", q: "Helix Bridge Singapore", to: "螺旋橋" }
      ]
    },

    {
      date: "2026-10-19",
      theme: "機場大遊行",
      line: "ew",
      from: { q: HOTEL.q, to: HOTEL.name },
      items: [
        {
          type: "stop", start: "08:30", end: "09:30",
          notes: ["8 點起床，走路就到", "在蘇丹回教堂對面，招牌是 Murtabak（印度煎餅）"],
          places: [
            { kind: "food", meal: "早餐", suggest: true, name: "Zam Zam 百年老店", hours: "07:00–23:00", q: "Singapore Zam Zam Restaurant 697 North Bridge Road" }
          ]
        },
        { type: "move", start: "09:50", end: "10:00", title: "退房", q: HOTEL.q, to: HOTEL.name },
        { type: "move", start: "10:00", end: "10:20", title: "搭 Uber 前往機場", q: "Changi Airport Terminal 2", to: "樟宜機場 T2" },
        {
          type: "stop", start: "10:20", end: "13:00",
          places: [
            { kind: "spot", name: "機場大遊行 & 報到 & 托運 & 貴賓室", q: "Changi Airport Terminal 2" }
          ]
        },
        { type: "move", start: "14:00", end: "18:50", title: "搭灰機 JX772", note: "樟宜 T2 → 桃機 T2" },
        { type: "move", start: "18:50", title: "抵達桃園", note: "入境、領行李" },
        { type: "move", start: "19:40", end: "20:00", title: "機捷普通車 第二航廈 → 高鐵桃園站", note: "約 16 分鐘" },
        { type: "move", start: "20:15", end: "20:30", title: "高鐵回新竹", notes: ["桃園 → 新竹約 12 分鐘", "時間為約略，班機可能延誤，落地後再訂或搭自由座"] }
      ]
    }
  ]
};
