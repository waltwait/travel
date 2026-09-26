/*
 * 讓網站可以「加到主畫面」當 App 用。首頁和每一趟的行程頁都在 </body> 前載入這個檔案。
 *
 * 1. 註冊離線快取 ../sw.js
 * 2. 把這一頁連到的網頁、用到的檔案交給 sw.js 先存起來（首頁會連到每一趟的行程），
 *    沒網路也打得開
 * 3. 從背景切回來時，如果離開超過 5 分鐘就重新整理，「進行中」「下一站」「還有幾天出發」
 *    才會是現在的（App 模式沒有重新整理的按鈕）
 */
(function () {
  var sw = new URL("../sw.js", document.currentScript.src).href;

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(sw).then(function () {
        return navigator.serviceWorker.ready;
      }).then(function (reg) {
        var urls = [location.href];
        document.querySelectorAll("a[href], script[src], link[href]").forEach(function (el) {
          urls.push(el.href || el.src);
        });
        urls = urls.map(function (u) { return u.split("#")[0]; }).filter(function (u, i, all) {
          return u.indexOf(reg.scope) === 0 && all.indexOf(u) === i;
        });
        reg.active.postMessage({ type: "cache", urls: urls });
      }).catch(function () {});
    });
  }

  var hiddenAt = 0;
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) hiddenAt = Date.now();
    else if (hiddenAt && Date.now() - hiddenAt > 5 * 60 * 1000) location.reload();
  });
})();
