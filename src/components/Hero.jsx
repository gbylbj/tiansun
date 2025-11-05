import React, { useState, useEffect, useRef, useMemo } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const heroRef = useRef(null);

  const heroImages = [
    '/好看的图片/retouch_2024070815550373.jpg',
    '/好看的图片/retouch_2024070815194064.jpg',
    '/好看的图片/retouch_2024070815434892.jpg',
    '/好看的图片/retouch_2024070816031355.jpg',
    '/好看的图片/IMG_8063.jpg'
  ];

  const fullText = "一口鲜脆甜，解锁自然的健康馈赠\n8年匠心培育，定义高端绿色食材新标杆";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    setIsVisible(true);

    // 打字机效果
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 预计算粒子位置，避免每次渲染随机导致抖动与性能问题
  const particles = useMemo(() => (
    Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 2}s`
    }))
  ), []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black z-10 safe-area-inset-top"
      style={{
        paddingTop: '4rem',
        minHeight: 'calc(100vh - 4rem)'
      }}
    >
      {/* 背景图片轮播 */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-2000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              filter: 'brightness(0.7) contrast(1.1)'
            }}
            loading={index === 0 ? "eager" : "lazy"}
          >
            {/* 竹林主题渐变叠加 */}
            <div className="absolute inset-0 bg-gradient-to-br from-bamboo-deep/20 via-bamboo-primary/10 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>
        ))}
      </div>

      {/* 动态光效层 */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 z-10 opacity-15"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(74, 124, 46, 0.2) 0%, transparent 50%)`,
          transition: 'background 0.3s ease-out'
        }}
      />

      {/* 竹叶装饰元素 */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 bamboo-leaf ${isVisible ? 'animate-fade-left' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}></div>
        <div className={`absolute top-40 right-20 bamboo-leaf transform -rotate-12 ${isVisible ? 'animate-fade-right' : 'opacity-0'}`} style={{animationDelay: '0.7s'}}></div>
        <div className={`absolute bottom-32 left-1/4 bamboo-leaf transform rotate-90 scale-75 ${isVisible ? 'animate-float' : 'opacity-0'}`} style={{animationDelay: '1.2s'}}></div>
        <div className={`absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-bamboo-accent/20 to-transparent rounded-full animate-pulse ${isVisible ? 'animate-scale-up' : 'opacity-0'}`} style={{animationDelay: '0.9s'}}></div>
      </div>

      {/* 粒子效果背景 */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/60 rounded-full animate-pulse"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>

      {/* 主内容区域 */}
      <div className="relative z-10 text-center px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* 主标题 - 渐变文字 */}
        <h1 className={`mb-6 sm:mb-8 transform transition-all duration-1200 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`} style={{transitionDelay: '0.4s'}}>
          <div className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black leading-tight">
            <span className="block text-white mb-2 drop-shadow-2xl tracking-tight"
                  style={{textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(46,125,50,0.3)'}}>
              北纬21°雨林直供
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-200 drop-shadow-lg text-shadow-strong"
                  style={{fontSize: '0.75em sm:0.8em md:0.85em', textShadow: '0 2px 8px rgba(0,0,0,0.35), 0 0 20px rgba(255,220,100,0.25)'}}>
              可生食的甜笋王者
            </span>
          </div>
        </h1>

        {/* 权威认证徽章 */}
        <div className={`flex justify-center mb-6 sm:mb-8 transform transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`} style={{transitionDelay: '0.6s'}}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-yellow-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-bamboo-accent to-yellow-400 text-white rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-default bamboo-decoration">
              <span className="flex items-center gap-1 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="hidden sm:inline">版纳1号 · 权威认证品种</span>
                <span className="sm:hidden">版纳1号 · 权威认证</span>
              </span>
            </div>
          </div>
        </div>

        {/* 描述文案 - 打字机效果 */}
        <div className={`mb-8 sm:mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '0.8s'}}>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg whitespace-pre-line px-2"
             style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
            {typedText}
            <span className="inline-block w-1 h-4 sm:h-6 bg-white ml-1 animate-pulse"></span>
          </p>
        </div>

        {/* CTA按钮组 */}
        <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center mb-8 sm:mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{transitionDelay: '1s'}}>
          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative overflow-hidden bg-gradient-to-r from-bamboo-primary to-bamboo-deep hover:from-bamboo-deep hover:to-bamboo-primary text-white font-bold py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-12 rounded-xl sm:rounded-2xl text-base sm:text-lg md:text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-white/20 backdrop-blur-sm w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative flex items-center gap-2 sm:gap-3 justify-center">
              <span>立即尝鲜</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          <button
            onClick={() => document.getElementById('channels')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative overflow-hidden bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-12 rounded-xl sm:rounded-2xl text-base sm:text-lg md:text-xl border-2 border-white/20 hover:border-white/40 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-2xl w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="flex items-center gap-2 sm:gap-3 justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
              <span className="relative">基地直供</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>

        {/* 质量认证标签 */}
        <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '1.2s'}}>
          {[
            { color: 'bamboo-light', icon: '✓', text: '绿色食品A级认证', shortText: '绿色食品' },
            { color: 'bamboo-accent', icon: '◉', text: '五无种植标准', shortText: '五无标准' },
            { color: 'bamboo-primary', icon: '★', text: '可生食水果笋', shortText: '可生食' }
          ].map((badge, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur-md hover:bg-white/20 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 cursor-default hover:scale-105"
              style={{animationDelay: `${1.2 + index * 0.2}s`}}
            >
              <div className="flex items-center gap-1 sm:gap-2 text-white">
                <span className={`text-${badge.color} text-sm sm:text-base md:text-lg font-bold animate-pulse`} style={{animationDelay: `${index * 0.3}s`}}>{badge.icon}</span>
                <span className="text-xs sm:text-sm font-medium">
                  <span className="hidden sm:inline">{badge.text}</span>
                  <span className="sm:hidden">{badge.shortText}</span>
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 高级轮播指示器 */}
      <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'w-8 sm:w-10 md:w-12 bg-gradient-to-r from-white to-white/90 shadow-lg shadow-white/50'
                : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/60 hover:scale-110'
            }`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent rounded-full animate-ping"></div>
            )}
          </button>
        ))}
      </div>

      {/* 高级滚动指示器 */}
      {showScrollIndicator && (
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-300">
          <div className="flex flex-col items-center gap-1 sm:gap-2 text-white/80 animate-bounce">
            <span className="text-[10px] sm:text-xs font-medium tracking-widest uppercase">向下滚动</span>
            <div className="relative">
              <div className="w-4 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-0.5 h-2 sm:w-1 sm:h-3 bg-white/80 rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
