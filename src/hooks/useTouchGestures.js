import { useState, useRef, useEffect } from 'react';

const useTouchGestures = (elementRef, options = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPinch,
    onTap,
    threshold = 50,
    pinchThreshold = 10
  } = options;

  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [initialDistance, setInitialDistance] = useState(0);
  const [isMultiTouch, setIsMultiTouch] = useState(false);

  // 计算两点间距离
  const getDistance = (touch1, touch2) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // 处理触摸开始
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd({ x: touch.clientX, y: touch.clientY });

    // 多点触控检测
    if (e.touches.length === 2 && onPinch) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      setInitialDistance(distance);
      setIsMultiTouch(true);
    }
  };

  // 处理触摸移动
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });

    // 处理缩放手势
    if (e.touches.length === 2 && isMultiTouch && onPinch) {
      e.preventDefault();
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const scale = currentDistance / initialDistance;
      onPinch(scale, e);
    }
  };

  // 处理触摸结束
  const handleTouchEnd = (e) => {
    if (!touchStart.x || !touchEnd.x) return;

    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    const isSwipe = Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold;

    // 重置多点触控状态
    setIsMultiTouch(false);

    if (!isSwipe) {
      // 点击事件
      if (onTap) {
        onTap(e);
      }
      return;
    }

    // 滑动手势
    if (isHorizontalSwipe) {
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight({ deltaX, deltaY, start: touchStart, end: touchEnd });
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft({ deltaX, deltaY, start: touchStart, end: touchEnd });
      }
    } else {
      if (deltaY > 0 && onSwipeDown) {
        onSwipeDown({ deltaX, deltaY, start: touchStart, end: touchEnd });
      } else if (deltaY < 0 && onSwipeUp) {
        onSwipeUp({ deltaX, deltaY, start: touchStart, end: touchEnd });
      }
    }
  };

  // 绑定事件监听器
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [elementRef, touchStart, touchEnd, initialDistance, isMultiTouch]);

  return {
    touchStart,
    touchEnd,
    isMultiTouch
  };
};

export default useTouchGestures;