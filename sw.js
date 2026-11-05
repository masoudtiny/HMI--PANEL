/* Service worker منوی اصلی: فقط فایل‌های خود منو را کش می‌کند؛ پنل‌ها سرویس‌ورکر و کش جدا و مخصوص خودشان را دارند */
const PREFIX = "hmi-menu-";   /* پیشوند مخصوص منو تا کش پنل‌ها پاک نشود */
const CACHE = PREFIX + "v1";
const SHELL = ["./", "index.html", "manifest.json", "images/icon-192.png", "images/icon-512.png", "images/amotek-logo.png", "images/ccs-logo.png"];
const SCOPE = new URL("./", self.location).pathname;
function mine(url) {   /* فقط خود منو و پوشه‌ی images همین ریشه؛ هر چیز داخل پوشه‌ی یک پنل به سرویس‌ورکر خود آن پنل واگذار می‌شود */
  const p = url.pathname.slice(SCOPE.length);
  return p === "" || p === "index.html" || p === "manifest.json" || p.startsWith("images/");
}
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin || !mine(url)) return;
  const save = res => { if (res && res.ok) { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return res; };
  if (req.mode === "navigate" || /\.(html|json)$/.test(url.pathname) || url.pathname.endsWith("/")) {   /* صفحه: اول اینترنت، اگر نبود کش */
    e.respondWith(fetch(req).then(save).catch(() => caches.match(req).then(h => h || caches.match("index.html"))));
  } else {   /* عکس‌ها: اول کش */
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(save)));
  }
});
