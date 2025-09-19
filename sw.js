const CACHE_NAME = "belo-ol?mpio-v1.0.0";
const STATIC_CACHE = "belo-ol?mpio-static-v1.0.0";
const DYNAMIC_CACHE = "belo-ol?mpio-dynamic-v1.0.0";

// Assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/imagens/logo.jpeg",
  "/imagens/fundo.jpg",
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-regular-400.woff2",
];

// Image optimization cache
const IMAGE_CACHE = "belo-ol?mpio-images-v1.0.0";

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing");
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("[Service Worker] Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error("[Service Worker] Error caching static assets:", error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log("[Service Worker] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve cached content when offline
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle API requests differently
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(JSON.stringify({ error: "Offline" }), {
          headers: { "Content-Type": "application/json" },
        });
      })
    );
    return;
  }

  // Cache-first strategy for static assets
  if (
    STATIC_ASSETS.includes(request.url) ||
    request.url.includes("font-awesome")
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      })
    );
    return;
  }

  // Network-first strategy for HTML pages
  if (request.destination === "document") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response for caching
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request).then((response) => {
            return response || caches.match("/index.html");
          });
        })
    );
    return;
  }

  // Stale-while-revalidate for other requests
  event.respondWith(
    caches.match(request).then((response) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          // Cache successful responses
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Return cached response if network fails
          return response;
        });

      // Return cached response immediately if available, otherwise wait for network
      return response || fetchPromise;
    })
  );
});

// Background sync for form submissions
self.addEventListener("sync", (event) => {
  console.log("[Service Worker] Background sync triggered:", event.tag);

  if (event.tag === "contact-form-sync") {
    event.waitUntil(syncContactForm());
  }
});

// Function to sync contact form data
async function syncContactForm() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const keys = await cache.keys();

    // Find cached form submissions
    const formRequests = keys.filter(
      (request) => request.url.includes("contact") || request.method === "POST"
    );

    for (const request of formRequests) {
      try {
        await fetch(request);
        await cache.delete(request);
        console.log("[Service Worker] Synced form submission");
      } catch (error) {
        console.error(
          "[Service Worker] Failed to sync form submission:",
          error
        );
      }
    }
  } catch (error) {
    console.error("[Service Worker] Error during background sync:", error);
  }
}

// Push notifications (for future implementation)
self.addEventListener("push", (event) => {
  console.log("[Service Worker] Push received:", event);

  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "/icon-192x192.png",
      badge: "/icon-192x192.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  console.log("[Service Worker] Notification clicked:", event);
  event.notification.close();

  event.waitUntil(clients.openWindow("/"));
});
