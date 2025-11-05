import { useEffect } from 'react';

const ServiceWorkerRegister = () => {
  useEffect(() => {
    // 检查浏览器是否支持Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker 注册成功:', registration);

            // 检查是否有新版本
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // 有新版本可用，提示用户刷新页面
                  if (window.confirm('检测到新版本，是否立即更新？')) {
                    window.location.reload();
                  }
                }
              });
            });
          })
          .catch(error => {
            console.log('ServiceWorker 注册失败:', error);
          });
      });
    }
  }, []);

  return null;
};

export default ServiceWorkerRegister;