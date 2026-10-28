/* Offline-capable app shell; third-party news remains network-first. */
const CACHE = 'the-six-daily-v1.1';
const SHELL = [
  './', './index.html', './styles.css', './app.js', './manifest.webmanifest',
  './assets/vice-city-hero.svg', './assets/card-sunset.svg', './assets/card-radio.svg',
  './assets/card-merch.svg', './assets/card-album.svg', './assets/icon-192.png',
  './assets/icon-512.png', './assets/favicon.svg'
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
  if(new URL(req.url).pathname.endsWith('/data/news.json')){
    event.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(cache=>cache.put(req,copy));}return res;}).catch(()=>caches.match(req)));return;
  }
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(req,copy));}return response;})));
});
