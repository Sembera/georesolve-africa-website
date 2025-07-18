// Service Worker for GeoResolve App
const CACHE_NAME = 'georesolve-v1';
const STATIC_CACHE = 'georesolve-static-v1';
const API_CACHE = 'georesolve-api-v1';
const IMAGE_CACHE = 'georesolve-images-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  // Add other critical static assets
];

// API patterns to cache
const API_PATTERNS = [
  /^https:\/\/cdn\.contentful\.com/,
  /^https:\/\/preview\.contentful\.com/,
  /^https:\/\/.*\.ctfassets\.net/,
];

// Image patterns to cache
const IMAGE_PATTERNS = [
  /\.(jpg|jpeg|png|gif|webp|svg)$/i,
  /^https:\/\/.*\.ctfassets\.net.*\.(jpg|jpeg|png|gif|webp)$/i,
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('SW: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== STATIC_CACHE &&
                     cacheName !== API_CACHE &&
                     cacheName !== IMAGE_CACHE;
            })
            .map((cacheName) => {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - handle different types of requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else if (isAPIRequest(request)) {
    event.respondWith(handleAPIRequest(request));
  } else if (isStaticAsset(request)) {
    event.respondWith(handleStaticRequest(request));
  } else {
    event.respondWith(handleNavigationRequest(request));
  }
});

// Check if request is for an image
function isImageRequest(request) {
  return IMAGE_PATTERNS.some(pattern => pattern.test(request.url));
}

// Check if request is for API
function isAPIRequest(request) {
  return API_PATTERNS.some(pattern => pattern.test(request.url));
}

// Check if request is for static asset
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/assets/') ||
         url.pathname.startsWith('/static/') ||
         STATIC_ASSETS.includes(url.pathname);
}

// Handle image requests with stale-while-revalidate
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);

  // Return cached version if available
  if (cachedResponse) {
    // Fetch fresh version in background
    fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
    }).catch(() => {
      // Network error, ignore
    });

    return cachedResponse;
  }

  // No cache, fetch from network
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return a fallback image or error response
    return new Response('Image not available', {
      status: 404,
      statusText: 'Not Found'
    });
  }
}

// Handle API requests with network-first strategy
async function handleAPIRequest(request) {
  const cache = await caches.open(API_CACHE);

  try {
    // Try network first
    const response = await fetch(request);

    if (response.ok) {
      // Cache successful responses for 5 minutes
      const responseToCache = response.clone();
      cache.put(request, responseToCache);
    }

    return response;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // No cache available, return error
    return new Response(JSON.stringify({
      error: 'Network unavailable',
      cached: false
    }), {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle static assets with cache-first strategy
async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  // Not in cache, fetch and cache
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('Asset not available', {
      status: 404,
      statusText: 'Not Found'
    });
  }
}

// Handle navigation requests (SPA routing)
async function handleNavigationRequest(request) {
  const cache = await caches.open(STATIC_CACHE);

  try {
    // Try network first for navigation
    const response = await fetch(request);
    return response;
  } catch (error) {
    // Network failed, return cached index.html for SPA
    const cachedResponse = await cache.match('/index.html');

    if (cachedResponse) {
      return cachedResponse;
    }

    // No fallback available
    return new Response('Application not available offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  // Handle any queued requests when back online
  console.log('SW: Background sync triggered');

  // You can implement request queuing logic here
  // For now, just log that sync happened
}

// Push notifications (if needed)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    tag: 'georesolve-update',
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/icon-192x192.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('GeoResolve Africa', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
