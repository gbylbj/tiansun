import React, { useEffect } from 'react';

const MobileTouchOptimizer = () => {
  useEffect(() => {
    // 移动端触摸优化
    const optimizeForMobile = () => {
      // 防止双击缩放
      let lastTouchEnd = 0;
      document.addEventListener('touchend', function (event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);

      // 优化滚动性能
      const supportsPassive = () => {
        let supportsPassive = false;
        try {
          const opts = Object.defineProperty({}, 'passive', {
            get: function() {
              supportsPassive = true;
            }
          });
          window.addEventListener('testPassive', null, opts);
          window.removeEventListener('testPassive', null, opts);
        } catch (e) {}
        return supportsPassive;
      };

      // 移动端滚动优化
      if (supportsPassive()) {
        document.addEventListener('touchmove', function() {}, { passive: true });
      }

      // 优化输入框焦点
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('focus', function() {
          // 延迟滚动到输入框
          setTimeout(() => {
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        });
      });

      // 添加触摸反馈
      const touchElements = document.querySelectorAll('button, a, .clickable');
      touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
          this.style.transform = 'scale(0.95)';
        });

        element.addEventListener('touchend', function() {
          this.style.transform = 'scale(1)';
        });
      });
    };

    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                    (window.innerWidth <= 768);

    if (isMobile) {
      optimizeForMobile();
    }

    // 处理屏幕旋转
    const handleOrientationChange = () => {
      // 延迟处理以确保布局已更新
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    };

    window.addEventListener('orientationchange', handleOrientationChange);

    // 清理函数
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return null; // 这是一个无渲染的组件，只用于优化
};

export default MobileTouchOptimizer;