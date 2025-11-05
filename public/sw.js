// 版本控制
const CACHE_VERSION = 'v2.0';
const STATIC_CACHE = `gbylbj-static-${CACHE_VERSION}`;
const IMAGE_CACHE = `gbylbj-images-${CACHE_VERSION}`;
const RUNTIME_CACHE = `gbylbj-runtime-${CACHE_VERSION}`;

// 需要预缓存的核心资源
const STATIC_ASSETS = [
  '/',
  '/static/js/main.js',
  '/static/css/main.css',
  '/logo.png',
  '/manifest.json'
];

// 图片缓存配置
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
const CACHE_STRATEGIES = {
  STATIC: 'cacheFirst',      // 静态资源：缓存优先
  IMAGE: 'staleWhileRevalidate', // 图片：后台更新
  RUNTIME: 'networkFirst'    // 动态内容：网络优先
};

// 工具函数：判断资源类型
const getResourceType = (url) => {
  const extension = url.split('.').pop()?.toLowerCase();

  if (IMAGE_EXTENSIONS.includes(extension)) {
    return 'IMAGE';
  }
  if (STATIC_ASSETS.some(asset => url.includes(asset))) {
    return 'STATIC';
  }
  return 'RUNTIME';
};

// 缓存优先策略
const cacheFirst = (request, cacheName) => {
  return caches.match(request)
    .then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        return caches.open(cacheName).then(cache => {
          cache.put(request, networkResponse.clone());
          return networkResponse;
        });
      });
    });
};

// 网络优先策略
const networkFirst = (request, cacheName) => {
  return fetch(request)
    .then(networkResponse => {
      if (networkResponse && networkResponse.status === 200) {
        caches.open(cacheName).then(cache => {
          cache.put(request, networkResponse.clone());
        });
      }
      return networkResponse;
    })
    .catch(() => {
      return caches.match(request);
    });
};

// 后台更新策略
const staleWhileRevalidate = (request, cacheName) => {
  const cachedResponsePromise = caches.match(request);
  const networkResponsePromise = fetch(request).then(networkResponse => {
    if (networkResponse && networkResponse.status === 200) {
      caches.open(cacheName).then(cache => {
        cache.put(request, networkResponse.clone());
      });
    }
    return networkResponse;
  });

  return cachedResponsePromise.then(cachedResponse => {
    return cachedResponse || networkResponsePromise;
  });
};

// 安装Service Worker - 预缓存核心资源
self.addEventListener('install', event => {
  console.log('📦 Service Worker 安装中...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ 核心资源预缓存完成');
        return self.skipWaiting();
      })
  );
});

// 激活Service Worker - 清理旧缓存
self.addEventListener('activate', event => {
  console.log('🔄 Service Worker 激活中...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // 删除旧版本缓存
            if (!cacheName.includes(CACHE_VERSION)) {
              console.log('🗑️ 删除旧缓存:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ 缓存清理完成');
        return self.clients.claim();
      })
  );
});

// 拦截请求 - 智能缓存策略
self.addEventListener('fetch', event => {
  const request = event.request;
  const resourceType = getResourceType(request.url);

  // 跳过非HTTP请求
  if (!request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    (async () => {
      try {
        switch (resourceType) {
          case 'STATIC':
            return await cacheFirst(request, STATIC_CACHE);

          case 'IMAGE':
            return await staleWhileRevalidate(request, IMAGE_CACHE);

          case 'RUNTIME':
          default:
            return await networkFirst(request, RUNTIME_CACHE);
        }
      } catch (error) {
        console.error('⚠️ 缓存策略执行失败:', error);
        return await fetch(request);
      }
    })()
  );
});

// 消息处理 - 支持手动缓存清理
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }).then(() => {
      event.ports[0].postMessage({ success: true });
    });
  }
});