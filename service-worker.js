/**
 * コードネーム キーカード サービスワーカー
 * オフライン機能とPWA対応のためのサービスワーカー
 */

// キャッシュ名（バージョン管理用）
const CACHE_NAME = 'codename-keycard-v1';

// キャッシュするファイルリスト
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/keycard.js',
  '/manifest.json'
];

// インストール時のイベントハンドラ
self.addEventListener('install', (event) => {
  // キャッシュの作成と登録
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('キャッシュを作成しました');
        return cache.addAll(CACHE_ASSETS);
      })
      .catch((error) => {
        console.error('キャッシュの作成に失敗しました:', error);
      })
  );
});

// アクティベート時のイベントハンドラ
self.addEventListener('activate', (event) => {
  // 古いキャッシュの削除
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('古いキャッシュを削除しました:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});

// フェッチ時のイベントハンドラ
self.addEventListener('fetch', (event) => {
  // キャッシュファーストの戦略
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュにあればそれを返す
        if (response) {
          return response;
        }
        
        // キャッシュになければネットワークからフェッチ
        return fetch(event.request)
          .then((response) => {
            // レスポンスが有効でなければそのまま返す
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // レスポンスをクローンしてキャッシュに追加
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch((error) => {
            console.error('フェッチに失敗しました:', error);
            // オフライン時のフォールバック処理をここに追加
          });
      })
  );
});
