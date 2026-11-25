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
 *   pass:    true 表示釜山 Pass（Visit Busan Pass）免費的景點，會加一個「釜山 Pass」標籤
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
var HOTEL = { name: "Elmomento Songdo", q: "엘모멘토 송도", at: [35.0768, 129.0242] };

window.TRIP = {
  updated: "2026-11-24",

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
      theme: "松島入住、西面、荒嶺山夜景、南浦採購",
      line: "cc",
      pending: "待查：日豪 1250 清晨班次（出發前用 Bus+ 確認）。",
      items: [
        {
          type: "move", start: "05:00", end: "05:50", title: "日豪客運 1250 新竹轉運站 → 桃機 T1",
          notes: [
            "約 50 分鐘，約 210 元（悠遊卡／付現）；光復路沿線可上車",
            "出發前用 Bus+ 查 05:00 前後班次，沒有就搭 04:00 或改叫計程車"
          ]
        },
        { type: "move", start: "05:50", end: "07:25", title: "報到、托運、出境", note: "星宇托運最晚起飛前 1 小時" },
        {
          type: "move", start: "08:25", end: "11:30", flight: "JX900", title: "搭飛機 JX900",
          notes: [
            "桃機 T1 → 金海 國際線",
            "抵達前 3 天內填韓國電子入境卡 e-Arrival Card（2026 年底前免 K-ETA）"
          ]
        },
        {
          type: "move", start: "11:30", end: "12:45", title: "入境、領行李",
          notes: [
            "抓 75 分鐘，視通關速度調整",
            "奶茶筆記：ANGELINUS 10 號登機口在出境管制區（排 Day 4 回程喝；國內線 3F 一般區也有）；Blu Shaak 機場無分店，排等等西面／松島喝"
          ],
          links: [
            { text: "Blu Shaak 奶茶", url: "https://www.threads.com/@cini.1331/post/Df4ylotkvhY" },
            { text: "機場 ANGELINUS 奶茶", url: "https://www.threads.com/@qoppppppppppsssss/post/Df3ZLmCJffr" }
          ],
          q: "김해국제공항", at: [35.1801, 128.9364], to: "金海機場"
        },
        {
          type: "move", start: "12:45", end: "13:25", title: "計程車 → 松島飯店 Elmomento Songdo",
          notes: [
            "約 30–35 分鐘",
            "4 人大行李叫 Kakao T Venti（約 3.5–4.5 萬韓元）或分 2 台車（約 2 萬／台）"
          ],
          q: HOTEL.q, at: HOTEL.at, to: HOTEL.name
        },
        { type: "move", start: "13:25", end: "13:50", title: "飯店寄放行李", note: "부산 서구 등대로 9，先寄放大廳輕裝出門", q: HOTEL.q, at: HOTEL.at, to: HOTEL.name },
        { type: "move", start: "13:50", end: "14:15", title: "計程車 → 西面", note: "約 20–25 分鐘，1.2–1.5 萬韓元", q: "서면역", at: [35.1578, 129.0594], to: "西面站" },
        {
          type: "stop", start: "14:15", end: "15:45",
          notes: [
            "Blu Shaak 喝皇家奶茶，點無糖或少糖（덜 달게 / less sugar）；西面店在 83 獬豸隔壁街，松島飯店旁也有",
            "留胃給 16:00 烤肉"
          ],
          places: [
            { kind: "spot", name: "西面商圈・地下街 서면지하상가", q: "서면지하상가", at: [35.1559, 129.0591] },
            { kind: "food", name: "Blu Shaak 西面店 블루샥 서면점", q: "블루샥 서면점" },
            { kind: "food", suggest: true, name: "Blu Shaak 釜山松島店 블루샥 부산송도점", q: "블루샥 부산송도점" }
          ]
        },
        { type: "move", start: "15:45", end: "16:00", title: "步行 → 83 獬豸 西面店", note: "西面站 8／10 號出口約 3 分鐘，現場機台抽號", q: "83해치 서면점", at: [35.1580, 129.0611], to: "83 獬豸 西面店" },
        {
          type: "stop", start: "16:00", end: "17:30",
          notes: ["熟成烤五花／豬頸肉，全程代烤", "부산 부산진구 서전로 11 1층"],
          places: [
            { kind: "food", meal: "晚餐", name: "83 獬豸 83해치 西面店", hours: "15:30–01:00（00:15 最後點餐）", q: "83해치 서면점", at: [35.1580, 129.0611] }
          ]
        },
        {
          type: "move", start: "17:30", end: "18:00", title: "計程車 → 荒嶺山展望休息區",
          notes: [
            "約 20–25 分鐘，8,000–10,000 韓元；跟司機說「황령산 전망쉼터」",
            "下車走 10 分鐘上烽燧臺，山頂風大穿防風外套"
          ],
          q: "황령산 전망쉼터", at: [35.1580, 129.0827], to: "荒嶺山展望休息區"
        },
        {
          type: "stop", start: "18:00", end: "19:15",
          note: "360 度市區與廣安大橋夜景，看完喝熱飲暖身",
          places: [
            { kind: "spot", name: "荒嶺山烽燧臺 황령산 봉수대", q: "황령산 봉수대", at: [35.1572, 129.0819] },
            { kind: "food", name: "荒嶺山咖啡廳 블루뱅", hours: "營業至 02:00", q: "황령산 전망쉼터", at: [35.1580, 129.0827] }
          ]
        },
        { type: "move", start: "19:15", end: "19:45", title: "Kakao T 叫車 → 南浦洞", note: "山頂無排班車，提早 10 分鐘叫車；約 25–30 分鐘，1.3–1.6 萬韓元", q: "올리브영 부산남포점", at: [35.0993, 129.0315], to: "Olive Young 釜山南浦店" },
        {
          type: "stop", start: "19:45", end: "21:15",
          note: "帶護照現場退稅，周邊光復路可順逛",
          places: [
            { kind: "spot", name: "Olive Young 南浦店 올리브영 부산남포점", hours: "10:00–22:30", q: "올리브영 부산남포점", at: [35.0993, 129.0315] }
          ]
        },
        { type: "move", start: "21:15", end: "21:35", title: "計程車 → 回飯店", note: "約 8–10 分鐘，5,000–6,000 韓元（公車 26／30／71 亦可）", q: HOTEL.q, at: HOTEL.at, to: HOTEL.name }
      ]
    },
    {
      date: "2026-11-28",
      theme: "松島纜車、釜山塔＆南浦、新世界＆廣安里汗蒸幕、無人機秀",
      line: "ne",
      pending: "廣安里無人機冬季週六 19:00、21:00 各一場；下午汗蒸幕可去廣安里 Aqua Palace 或新世界 Spa Land（皆 Pass 免費）。",
      from: { q: HOTEL.q, at: HOTEL.at, to: HOTEL.name },
      items: [
        { type: "free", start: "08:30", end: "09:00", title: "起床、飯店周邊早餐" },
        {
          type: "stop", start: "09:00", end: "10:45",
          note: "飯店走 2 分鐘搭水晶車廂來回，出站走 5 分鐘到雲橋",
          places: [
            { kind: "spot", name: "松島海上纜車 송도해상케이블카", pass: true, hours: "09:00–21:00", q: "송도해상케이블카 송도베이스테이션", at: [35.0763, 129.0235] },
            { kind: "spot", name: "松島龍宮雲橋 송도용궁구름다리", pass: true, q: "송도용궁구름다리", at: [35.0620, 129.0131] }
          ]
        },
        { type: "move", start: "10:45", end: "11:00", title: "計程車 → 釜山塔", note: "約 10–12 分鐘，5,000–6,000 韓元", q: "부산타워", at: [35.1008, 129.0325], to: "釜山塔" },
        {
          type: "stop", start: "11:00", end: "11:45",
          note: "Pass 免費登塔，停留約 45 分鐘",
          places: [
            { kind: "spot", name: "釜山塔 부산타워", pass: true, hours: "10:00–22:00", q: "부산타워", at: [35.1008, 129.0325] }
          ]
        },
        {
          type: "stop", start: "11:45", end: "14:00",
          note: "龍頭山手扶梯下光復路逛街，BIFF 吃黑糖餅／辣炒年糕或南浦周邊午餐",
          places: [
            { kind: "spot", name: "光復路時裝街 광복로 패션거리", q: "광복로 패션거리", at: [35.0988, 129.0285] },
            { kind: "food", meal: "午餐", name: "BIFF 廣場 BIFF광장", q: "BIFF광장", at: [35.0978, 129.0267] },
            { kind: "spot", suggest: true, name: "國際市場 국제시장", q: "국제시장", at: [35.1012, 129.0278] }
          ]
        },
        { type: "move", start: "14:00", end: "14:25", title: "計程車 → 新世界百貨 Centum City", note: "約 20–25 分鐘，1.3–1.6 萬韓元", q: "신세계백화점 센텀시티점", at: [35.1689, 129.1298], to: "新世界百貨 Centum City" },
        {
          type: "stop", start: "14:25", end: "16:20",
          note: "位於海雲台與廣安里交界，逛百貨或選泡五星級 Spa Land（Pass 免費 4 小時）",
          places: [
            { kind: "spot", name: "新世界百貨 Centum City 신세계백화점 센텀시티점", hours: "10:30–20:00", q: "신세계백화점 센텀시티점", at: [35.1689, 129.1298] },
            { kind: "spot", suggest: true, name: "備選：新世界 Spa Land 스파랜드 센텀시티", pass: true, hours: "09:00–22:00", q: "스파랜드 센텀시티", at: [35.1689, 129.1298] }
          ]
        },
        { type: "move", start: "16:20", end: "16:35", title: "計程車 → 廣安里 Hotel Aqua Palace", note: "過橋約 10 分鐘，6,000–8,000 韓元", q: "호텔 아쿠아펠리스", at: [35.1528, 129.1186], to: "Hotel Aqua Palace" },
        {
          type: "stop", start: "16:35", end: "18:45",
          note: "廣安里海灘第一排汗蒸幕（5F 海水溫泉＋8–9F 正對廣安大橋海景），泡完走出門就是沙灘",
          places: [
            { kind: "spot", name: "Hotel Aqua Palace 汗蒸幕 호텔 아쿠아펠리스", pass: true, hours: "24 小時（23:00–03:00 浴池清潔）", q: "호텔 아쿠아펠리스", at: [35.1528, 129.1186] }
          ]
        },
        {
          type: "stop", start: "19:00", end: "19:15",
          note: "沙灘中央正面看，約 12–15 分鐘（冬季週六 19:00、21:00 各一場）",
          places: [
            { kind: "spot", name: "廣安里 M 無人機秀（19:00／21:00 場）", q: "광안리해수욕장", at: [35.1509, 129.1168] }
          ]
        },
        {
          type: "stop", start: "19:20", end: "21:15",
          note: "烤盲鰻、海鮮蛤蜊鍋或烤肉；吃完還可順看 21:00 第二場無人機",
          places: [
            { kind: "food", meal: "晚餐", name: "廣安里海邊晚餐", q: "광안리 맛집" }
          ]
        },
        { type: "move", start: "21:20", end: "21:45", title: "計程車 → 回飯店", note: "走高架約 20–25 分鐘，1.8–2.2 萬韓元", q: HOTEL.q, at: HOTEL.at, to: HOTEL.name }
      ]
    },
    {
      date: "2026-11-29",
      theme: "滑車、樂天 Outlet、海岸列車、X the Sky、19:30 遊艇、24hr Hillspa",
      line: "ew",
      pending: "19:30 鑽石灣遊艇已預約：19:00 前到龍湖灣碼頭報到，全員帶護照＋釜山 Pass。若想搭天空膠囊列車（青沙浦→美浦，自費）需提前官網預約。",
      from: { q: HOTEL.q, at: HOTEL.at, to: HOTEL.name },
      items: [
        { type: "free", start: "08:45", end: "09:15", title: "起床、松島周邊早餐" },
        { type: "move", start: "09:15", end: "09:55", title: "計程車 → Skyline Luge 釜山", note: "約 35–40 分鐘，2.5–3 萬韓元；趕 10:00 開門免排隊", q: "스카이라인루지 부산", at: [35.1948, 129.2188], to: "Skyline Luge 釜山" },
        {
          type: "stop", start: "10:00", end: "11:20",
          note: "Pass 免費滑車 2 次",
          places: [
            { kind: "spot", name: "Skyline 滑車 스카이라인 루지 부산", pass: true, hours: "10:00–18:00", q: "스카이라인루지 부산", at: [35.1948, 129.2188] }
          ]
        },
        { type: "move", start: "11:20", end: "11:30", title: "步行 → 樂天 Outlet 東釜山店", note: "就在對面，走 5–8 分鐘", q: "롯데프리미엄아울렛 동부산점", at: [35.1915, 129.2125], to: "樂天 Outlet 東釜山店" },
        {
          type: "stop", start: "11:30", end: "13:50",
          note: "逛約 2.5 小時＋3F 美食街吃午餐",
          places: [
            { kind: "spot", name: "樂天 Outlet 東釜山店 롯데프리미엄아울렛 동부산점", hours: "10:30–21:00", q: "롯데프리미엄아울렛 동부산점", at: [35.1915, 129.2125] },
            { kind: "food", meal: "午餐", name: "樂天 Outlet 3F 美食街", q: "롯데프리미엄아울렛 동부산점 식당가" }
          ]
        },
        { type: "move", start: "13:50", end: "14:00", title: "計程車 → 海岸列車 松亭站", note: "約 5 分鐘，4,000–5,000 韓元", q: "해운대블루라인파크 송정정거장", to: "松亭站" },
        {
          type: "stop", start: "14:00", end: "15:45",
          note: "松亭持 Pass 換票坐回海雲台；青沙浦下車拍燈塔、平交道與透明步道，美浦出站走 3 分鐘到 LCT",
          places: [
            { kind: "spot", name: "海雲台海岸列車（松亭 → 青沙浦 → 美浦）", pass: true, q: "해운대블루라인파크 송정정거장", at: [35.1788, 129.2013] },
            { kind: "spot", name: "青沙浦踏石展望台・紅白燈塔", q: "청사포 다릿돌전망대", at: [35.1641, 129.1960] }
          ]
        },
        {
          type: "stop", start: "15:45", end: "17:15",
          note: "100 樓觀景台（Pass 免費），看 17:15 日落，99 樓有最高星巴克",
          places: [
            { kind: "spot", name: "Busan X the Sky 부산 엑스더스카이", pass: true, hours: "10:00–21:00", q: "부산 엑스더스카이", at: [35.1601, 129.1695] }
          ]
        },
        { type: "move", start: "17:15", end: "17:30", title: "步行 → 海雲台市場", note: "約 12–15 分鐘", q: "해운대시장", at: [35.1623, 129.1632], to: "海雲台市場" },
        {
          type: "stop", start: "17:30", end: "18:25",
          note: "尚國家辣炒年糕（상국이네）、魚板炸物或烤盲鰻",
          places: [
            { kind: "food", meal: "晚餐", name: "海雲台傳統市場 해운대시장", q: "상국이네 해운대시장", at: [35.1623, 129.1632] }
          ]
        },
        { type: "move", start: "18:25", end: "18:55", title: "計程車 → 龍湖灣碼頭（鑽石灣遊艇）", note: "走廣安大橋約 20–25 分鐘，1–1.3 萬韓元；19:00 前報到，帶護照＋Pass", q: "다이아몬드베이 요트", at: [35.1324, 129.1157], to: "鑽石灣遊艇碼頭" },
        {
          type: "stop", start: "19:30", end: "20:20",
          note: "夜航 50 分鐘看廣安大橋與海雲台夜景；海風冷穿防風外套",
          places: [
            { kind: "spot", name: "鑽石灣遊艇 다이아몬드베이 요트", booked: "已預約 19:30", pass: true, q: "다이아몬드베이 요트", at: [35.1324, 129.1157] }
          ]
        },
        { type: "move", start: "20:20", end: "20:45", title: "計程車 → 海雲台 Hillspa (24hr)", note: "約 20–25 分鐘，1.2–1.5 萬韓元；20:15 快靠港先用 Kakao T 叫車", q: "힐스파 해운대", at: [35.1583, 129.1754], to: "Hillspa" },
        {
          type: "stop", start: "20:45", end: "22:45",
          note: "Pass 免費 4 小時，迎月路高處泡海水溫泉看海雲台夜景，24hr 營業不趕時間",
          places: [
            { kind: "spot", name: "Hillspa 汗蒸幕 힐스파 (24hr)", pass: true, hours: "汗蒸幕 24 小時・三溫暖 06:00–23:59", q: "힐스파 해운대", at: [35.1583, 129.1754] }
          ]
        },
        { type: "move", start: "22:45", end: "23:15", title: "計程車 → 回飯店", note: "走高架約 30 分鐘，2.5–3 萬韓元", q: HOTEL.q, at: HOTEL.at, to: HOTEL.name }
      ]
    },
    {
      date: "2026-11-30",
      theme: "退房直奔機場、10 號登機口奶茶 + 回台灣",
      line: "cc",
      pending: "無上午行程，退房直去機場。",
      from: { q: HOTEL.q, at: HOTEL.at, to: HOTEL.name },
      items: [
        { type: "free", start: "08:30", end: "09:00", title: "退房、整理行李" },
        {
          type: "move", start: "09:00", end: "09:50", title: "計程車 → 金海機場國際線",
          notes: [
            "週一早高峰抓 45–55 分鐘",
            "4 人大行李叫 Kakao T Venti（約 3.5–4.5 萬韓元）或分 2 台車（約 2 萬／台）"
          ],
          q: "김해국제공항 국제선", at: [35.1801, 128.9364], to: "金海機場國際線"
        },
        {
          type: "move", start: "09:50", end: "10:50", title: "報到、托運、退稅、出境",
          notes: [
            "退稅在托運前辦理",
            "安檢前 3F 有美食街、名家之庭、孝子牛骨湯可吃早午餐"
          ],
          links: [
            { text: "機場 ANGELINUS 奶茶", url: "https://www.threads.com/@qoppppppppppsssss/post/Df3ZLmCJffr" }
          ]
        },
        {
          type: "stop", start: "10:50", end: "12:00",
          notes: [
            "出境管制區內必喝：伯爵奶茶（얼그레이 밀크티），點正常冰＋less sugar",
            "點餐機常顯示 sold out 且不能調甜度，直接去櫃檯點；加蓋可帶上機"
          ],
          places: [
            { kind: "food", name: "ANGELINUS 엔제리너스（10 號登機口對面）", q: "김해국제공항 국제선 엔제리너스", at: [35.1801, 128.9364] }
          ]
        },
        { type: "move", start: "12:30", end: "14:15", flight: "JX901", title: "搭飛機 JX901", note: "金海 國際線 → 桃機 T1" },
        { type: "move", start: "14:15", end: "15:00", title: "抵達桃園", note: "入境、領行李" },
        { type: "move", start: "15:00", end: "15:20", title: "機捷普通車 T1 → 高鐵桃園站", note: "約 20 分鐘" },
        { type: "move", start: "15:35", end: "15:50", title: "高鐵回新竹", note: "約 12 分鐘，落地再買或搭自由座" }
      ]
    }
  ]
};
