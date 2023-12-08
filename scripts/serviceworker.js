const cacheName = "clipboard-to-image-v1";
const assets = [
    '../index.html',
	'../styles/style.css',
	'../scripts/index.js'
];

self.addEventListener("install", e => {
    console.log("[Service Worker] Install");
    e.waitUntil((async () => {
        console.log("[Service Worker] Caching all the assets");
        const cache = await caches.open(cacheName);
        cache.addAll(assets);
    })());
});


self.addEventListener("activate", e => {
    console.log("[Service Worker] Activate");
    e.waitUntil((async() => {
        console.log("[Service Worker] Cleaning up all caches");
        const keys = await caches.keys();
        for (let key in keys) {
            if (key !== cacheName) {
                await caches.delete(key);
            }
        }
    })());
});

self.addEventListener("fetch", (e) => {
    e.respondWith((async () => {
        console.log(`[Service Worker] Fetch ${e.request.url}`);
        const cache = await caches.open(cacheName);
        let response = await cache.match(e.request.url);
        if (response === undefined) {
            console.log(`[Service Worker] Response for ${e.request.url} is not available in cache. Making an actual request...`);
            response = await fetch(e.request.url);
            cache.put(e.request.url, response.clone());
        }
        return response;
    })());
});