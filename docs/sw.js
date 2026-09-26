/*
 * 離線快取：讓「加到主畫面」的 Travel App 沒網路也能看行程。
 *
 * - 網站自己的檔案：有網路就抓最新的（改了行程馬上看得到），順便存一份；
 *   沒網路、或 3 秒內沒回應，才用存下來的那份
 * - Google 字型：抓過一次就存起來，之後直接用
 * - 頁面會把連到的網頁、用到的檔案傳過來（見 assets/app.js），還沒存過的先存
 *
 * 改了這個檔案的快取邏輯時，把 CACHE 的版本號加一，舊的快取會被清掉。
 */
var CACHE = "travel-v1";
var CORE = ["./", "assets/journal.css", "assets/app.js", "manifest.webmanifest", "assets/icons/icon-192.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE)
    .then(function (c) { return c.addAll(CORE); })
    .then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys()
    .then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    })
    .then(function () { return self.clients.claim(); }));
});

self.addEventListener("message", function (e) {
  var urls = e.data && e.data.type === "cache" && e.data.urls;
  if (!Array.isArray(urls)) return;
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(urls.filter(inScope).map(function (u) {
      return c.match(u).then(function (hit) {
        if (hit) return;
        return fetch(u).then(function (r) { if (r.ok) return c.put(u, r); }).catch(function () {});
      });
    }));
  }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  if (inScope(req.url)) {
    e.respondWith(networkFirst(req));
  } else if (/^https:\/\/fonts\.(googleapis|gstatic)\.com\//.test(req.url)) {
    e.respondWith(cacheFirst(req));
  }
});

function inScope(url) { return url.indexOf(self.registration.scope) === 0; }

function networkFirst(req) {
  return caches.open(CACHE).then(function (c) {
    var net = fetch(req).then(function (r) {
      if (r.ok) c.put(req, r.clone());
      return r;
    });
    var wait = new Promise(function (resolve) { setTimeout(resolve, 3000); });
    // 網路先回來就用網路；沒網路或 3 秒還沒回來就改用快取（快取也沒有就繼續等網路）
    return Promise.race([net.catch(function () {}), wait]).then(function (r) {
      return r || c.match(req, { ignoreSearch: true }).then(function (hit) { return hit || net; });
    });
  });
}

function cacheFirst(req) {
  return caches.open(CACHE).then(function (c) {
    return c.match(req).then(function (hit) {
      return hit || fetch(req).then(function (r) {
        if (r.ok || r.type === "opaque") c.put(req, r.clone());
        return r;
      });
    });
  });
}
