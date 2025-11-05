import React, { useEffect } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

const PerformanceMonitor = () => {
  const sendToAnalytics = (metric) => {
    // 构建分析数据
    const analyticsData = {
      ...metric,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      sessionId: sessionStorage.getItem('sessionId') || generateSessionId(),
      deviceInfo: {
        type: getDeviceType(),
        connection: getConnectionType(),
        memory: getMemoryInfo()
      }
    };

    // 在开发环境下输出到控制台
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Web Vitals:', analyticsData);
    }

    // 发送到分析服务
    sendAnalytics(analyticsData);
  };

  const generateSessionId = () => {
    const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('sessionId', sessionId);
    return sessionId;
  };

  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const getConnectionType = () => {
    if ('connection' in navigator) {
      return navigator.connection.effectiveType || 'unknown';
    }
    return 'unknown';
  };

  const getMemoryInfo = () => {
    if ('memory' in performance) {
      return {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      };
    }
    return null;
  };

  const sendAnalytics = (data) => {
    // 性能数据收集已禁用，不再保存到localStorage
    // 如果需要，可以在这里添加其他分析服务的集成

    // 在开发环境下输出到控制台（可选）
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Web Vitals:', data);
    }

    // 发送到分析服务的示例代码（已禁用）
    /*
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch(error => {
      console.warn('发送分析数据失败:', error);
    });
    */
  };

  // 监控页面加载性能
  const monitorPageLoad = () => {
    window.addEventListener('load', () => {
      // 页面完全加载后的性能指标
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      const domContentLoaded = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;

      const pageLoadData = {
        name: 'pageLoad',
        value: loadTime,
        entryType: 'navigation',
        domContentLoadedTime: domContentLoaded,
        resources: performance.getEntriesByType('resource').length,
        timestamp: Date.now()
      };

      sendToAnalytics(pageLoadData);
    });
  };

  // 监控资源加载
  const monitorResources = () => {
    const resources = performance.getEntriesByType('resource');
    const imageData = resources.filter(r => r.name.match(/\.(jpg|jpeg|png|gif|webp)$/));
    const scriptData = resources.filter(r => r.name.match(/\.js$/));
    const cssData = resources.filter(r => r.name.match(/\.css$/));

    const resourceData = {
      name: 'resources',
      totalResources: resources.length,
      imageResources: imageData.length,
      scriptResources: scriptData.length,
      cssResources: cssData.length,
      avgImageLoadTime: imageData.reduce((sum, img) => sum + img.duration, 0) / imageData.length || 0,
      avgScriptLoadTime: scriptData.reduce((sum, script) => sum + script.duration, 0) / scriptData.length || 0,
      timestamp: Date.now()
    };

    sendToAnalytics(resourceData);
  };

  // 监控Core Web Vitals
  const monitorCoreWebVitals = () => {
    // CLS (Cumulative Layout Shift) - 布局稳定性
    onCLS((metric) => {
      sendToAnalytics({
        ...metric,
        category: 'stability',
        description: '页面内容布局稳定性'
      });
    });

    // INP (Interaction to Next Paint) - 响应性
    if (window.IntersectionObserver) {
      onINP((metric) => {
        sendToAnalytics({
          ...metric,
          category: 'responsiveness',
          description: '页面交互响应性'
        });
      });
    }

    // FCP (First Contentful Paint) - 加载性能
    onFCP((metric) => {
      sendToAnalytics({
        ...metric,
        category: 'loading',
        description: '首次内容绘制时间'
      });
    });

    // LCP (Largest Contentful Paint) - 加载性能
    onLCP((metric) => {
      sendToAnalytics({
        ...metric,
        category: 'loading',
        description: '最大内容绘制时间'
      });
    });

    // TTFB (Time to First Byte) - 网络性能
    onTTFB((metric) => {
      sendToAnalytics({
        ...metric,
        category: 'network',
        description: '首字节时间'
      });
    });
  };

  useEffect(() => {
    // 开始性能监控
    monitorCoreWebVitals();
    monitorPageLoad();
    monitorResources();

    // 定期检查内存使用情况
    const memoryInterval = setInterval(() => {
      if ('memory' in performance) {
        const memoryData = {
          name: 'memory',
          value: performance.memory.usedJSHeapSize,
          entryType: 'memory',
          category: 'memory',
          description: 'JavaScript堆内存使用量',
          timestamp: Date.now()
        };
        sendToAnalytics(memoryData);
      }
    }, 30000); // 每30秒检查一次

    return () => clearInterval(memoryInterval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 性能警告组件已禁用
  // 不再显示开发模式下的性能监控面板
  return null;
};

export default PerformanceMonitor;