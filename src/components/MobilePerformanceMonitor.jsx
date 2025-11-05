import React, { useEffect, useState } from 'react';

const MobilePerformanceMonitor = () => {
  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    // 检测设备类型
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                    (window.innerWidth <= 768);

    if (!isMobile) return;

    // 监控页面加载性能
    const monitorPerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0];
        const timing = {
          // 页面加载时间
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          // DNS查询时间
          dnsTime: navigation.domainLookupEnd - navigation.domainLookupStart,
          // 连接时间
          connectTime: navigation.connectEnd - navigation.connectStart,
          // 首字节时间
          ttfbTime: navigation.responseStart - navigation.requestStart,
          // DOM解析时间
          domParseTime: navigation.domContentLoadedEventEnd - navigation.domLoading,
          // 资源加载时间
          resourceTime: navigation.loadEventEnd - navigation.domContentLoadedEventEnd
        };

        setPerformanceData(timing);

        // 性能警告
        if (timing.loadTime > 3000) {
          console.warn('页面加载时间较长:', timing.loadTime + 'ms');
        }

        if (timing.ttfbTime > 1000) {
          console.warn('服务器响应时间较长:', timing.ttfbTime + 'ms');
        }
      }
    };

    // 监控内存使用情况（如果支持）
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = performance.memory;
        const memoryData = {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit
        };

        console.log('内存使用情况:', memoryData);

        // 内存使用警告
        const usageRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        if (usageRatio > 0.8) {
          console.warn('内存使用率较高:', (usageRatio * 100).toFixed(2) + '%');
        }
      }
    };

    // 监控网络状态
    const monitorNetwork = () => {
      if ('connection' in navigator) {
        const connection = navigator.connection;
        console.log('网络状态:', {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt
        });

        // 慢网络提示
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          console.warn('网络连接较慢，建议优化页面资源');
        }
      }
    };

    // 延迟执行监控，确保页面完全加载
    setTimeout(() => {
      monitorPerformance();
      monitorMemory();
      monitorNetwork();
    }, 1000);

    // 监控长任务（如果支持）
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.duration > 50) {
              console.warn('检测到长任务:', {
                name: entry.name,
                duration: entry.duration,
                startTime: entry.startTime
              });
            }
          });
        });

        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.log('长任务监控不支持:', e);
      }
    }

  }, []);

  return null; // 这是一个监控组件，不渲染任何内容
};

export default MobilePerformanceMonitor;