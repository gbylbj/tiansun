import React, { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceWorkerRegister from './components/ServiceWorkerRegister';
import SEO from './components/SEO';
import BackToTop from './components/BackToTop';
import MobileTouchOptimizer from './components/MobileTouchOptimizer';
import MobilePerformanceMonitor from './components/MobilePerformanceMonitor';

// 懒加载非首屏组件 - 实现代码分割优化
const Highlights = lazy(() => import('./components/Highlights'));
const Quality = lazy(() => import('./components/Quality'));
const Certificates = lazy(() => import('./components/Certificates'));
const Nutrition = lazy(() => import('./components/Nutrition'));
const Products = lazy(() => import('./components/Products'));
const Reviews = lazy(() => import('./components/Reviews'));
const Channels = lazy(() => import('./components/Channels'));
const Recipes = lazy(() => import('./components/Recipes'));
const QrCodes = lazy(() => import('./components/QrCodes'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const Footer = lazy(() => import('./components/Footer'));

// 优化的组件加载指示器
const ComponentLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 text-sm">加载中...</p>
      <p className="text-xs text-gray-400">正在为您准备最佳体验</p>
    </div>
  </div>
);

function App() {
  // 检查是否为管理页面
  const isAdminPage = window.location.hash === '#admin';

  // 港埠雨林甜笋网站 - 实现了全方位的高优先级优化
  if (isAdminPage) {
    return (
      <div className="min-h-screen">
        <Suspense fallback={<ComponentLoader />}>
          <AdminPanel />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen scroll-smooth-mobile touch-manipulation">
      {/* SEO优化 */}
      <SEO />

      {/* 移动端触摸优化 */}
      <MobileTouchOptimizer />

      {/* 移动端性能监控 */}
      <MobilePerformanceMonitor />

      {/* Service Worker 注册 */}
      <ServiceWorkerRegister />

      {/* 主要内容 */}
      <Navbar />
      <Hero />

      {/* 懒加载非首屏组件 - 代码分割优化 */}
      <Suspense fallback={<ComponentLoader />}>
        <Highlights />
        <Quality />
        <Certificates />
        <Nutrition />
        <Products />
        <Reviews />
        <Channels />
        <Recipes />
        <QrCodes />
        <Footer />
      </Suspense>

      <BackToTop />
    </div>
  );
}

export default App;
