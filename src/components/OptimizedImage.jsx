import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className,
  webpSrc,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  loading = 'lazy',
  quality = 80,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);
  const imgRef = useRef(null);

  // 检查WebP支持
  const [supportsWebP, setSupportsWebP] = useState(false);

  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const webpData = canvas.toDataURL('image/webp');
      setSupportsWebP(webpData.indexOf('data:image/webp') === 0);
    };
    checkWebPSupport();
  }, []);

  // 生成WebP文件名
  const generateWebPSrc = (originalSrc) => {
    if (webpSrc) return webpSrc;
    const lastDot = originalSrc.lastIndexOf('.');
    if (lastDot === -1) return originalSrc;
    return originalSrc.substring(0, lastDot) + '.webp';
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setError(false);
  };

  const handleError = () => {
    setError(true);
    // 如果WebP加载失败，尝试加载原格式
    if (supportsWebP && currentSrc && currentSrc.includes('.webp')) {
      setCurrentSrc(src);
    }
  };

  useEffect(() => {
    if (supportsWebP) {
      const webp = generateWebPSrc(src);
      setCurrentSrc(webp);
    } else {
      setCurrentSrc(src);
    }
  }, [supportsWebP, src]);

  // 优先加载图片
  useEffect(() => {
    if (priority && imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.disconnect();
              }
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
  }, [priority]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
        <span className="text-gray-500 text-sm">图片加载失败</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 低质量占位符 */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      )}

      {/* 主图片 */}
      <img
        ref={imgRef}
        src={priority ? currentSrc : undefined}
        data-src={priority ? undefined : currentSrc}
        alt={alt}
        className={`
          transition-all duration-500 ease-out
          ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
          ${className}
        `}
        loading={priority ? 'eager' : loading}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        decoding="async"
      />

      {/* 渐进式加载指示器 */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;