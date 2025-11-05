import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapPin, Clock, Shield, Award, Star, TrendingUp } from 'lucide-react';

const Quality = () => {
  const [visiblePoints, setVisiblePoints] = useState([]);
  const [activePointIndex, setActivePointIndex] = useState(0);
  const sectionRef = useRef(null);

  const qualityPoints = useMemo(() => ([
    {
      icon: TrendingUp,
      title: '8年匠心培育',
      description: '港埠农业自2016年起深耕甜龙竹培育，2024年成功注册"版纳1号"甜龙竹新品种，打造专属种苗',
      details: ['2016年开始培育', '2024年新品种注册', '专属种苗基地'],
      color: 'from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-600',
      bgColor: 'bg-emerald-500'
    },
    {
      icon: Clock,
      title: '黄金采收期',
      description: '生长周期短，24小时内从竹林到餐桌，保证鲜嫩度和营养价值达到峰值',
      details: ['24小时内完成', '营养峰值状态', '新鲜度保证'],
      color: 'from-blue-50 to-blue-100 border-blue-200 text-blue-600',
      bgColor: 'bg-blue-500'
    },
    {
      icon: Award,
      title: '全程溯源体系',
      description: '基地-采收-质检-出库全链路记录，每批次均可追溯与核验',
      details: ['批次追踪', '流程留痕', '在线核验'],
      color: 'from-purple-50 to-purple-100 border-purple-200 text-purple-600',
      bgColor: 'bg-purple-500'
    },
    {
      icon: Shield,
      title: '五无纯净标准',
      description: '无农药、无化肥、无除草剂、无激素、无转基因，纯手工挖取，全程质量把控',
      details: ['无化学添加', '纯手工采挖', '全程质量监控'],
      color: 'from-green-50 to-green-100 border-green-200 text-green-600',
      bgColor: 'bg-green-500'
    }
  ]), []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8;

      if (isVisible) {
        // 渐进显示品质要点
        qualityPoints.forEach((_, index) => {
          setTimeout(() => {
            setVisiblePoints(prev => [...prev, index]);
          }, index * 200);
        });

        // 已移除认证徽章区域，无需额外显隐
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [qualityPoints]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePointIndex((prev) => (prev + 1) % qualityPoints.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [qualityPoints.length]);

  return (
    <section id="quality" ref={sectionRef} className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-transparent via-white/5 to-transparent overflow-hidden bamboo-texture bambo-wave-animation">
      {/* SuperDesign背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* SuperDesign流体形状 */}
        <div className="bamboo-shape-bg -top-10 -left-10" style={{animationDelay: '1s', opacity: '0.015'}}></div>
        <div className="bamboo-shape-bg -bottom-10 -right-10" style={{animationDelay: '6s', transform: 'scale(1.3) rotate(30deg)', opacity: '0.015'}}></div>
        <div className="bamboo-shape-bg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{animationDelay: '11s', transform: 'scale(1.5) rotate(-15deg)', opacity: '0.015'}}></div>

        {/* 柔和的光晕效果 */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-bamboo-light/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-bamboo-primary/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-bamboo-light/10 to-bamboo-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6 border border-emerald-200">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 fill-emerald-600" />
            <span className="text-xs sm:text-sm font-medium text-emerald-700">品质承诺</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent mb-4 sm:mb-6">
            品质保证·8年匠心
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            从澜沧江畔到您的餐桌，8年匠心培育，为您带来最纯净、营养的高原甜笋
          </p>
        </div>

        {/* 主要内容区域 - 左图右文 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16">
          {/* 左侧图片区域 */}
          <div className="relative group">
            {/* 主图片容器 */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 hover:scale-[1.02]">
              <div
                className="h-[560px] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: "url('/好看的图片/retouch_2024070815550373.jpg')"
                }}
              >
                {/* 多层渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-transparent to-blue-600/20"></div>

                {/* 现代化装饰网格 */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                    <defs>
                      <pattern id="modernGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.8"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#modernGrid)" />
                  </svg>
                </div>
              </div>

              {/* 现代化浮动标签 */}
              <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/30 transform rotate-2 hover:rotate-0 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">100% 天然</p>
                    <p className="text-sm text-gray-600">无添加 · 有机种植</p>
                  </div>
                </div>
              </div>

              {/* 现代化底部信息卡片 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-base font-medium">云南·西双版纳</p>
                      <p className="text-sm text-white/80">海拔1200米雨林基地</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">生态产区</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 优化的装饰元素 */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-r from-emerald-400/30 to-emerald-600/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-r from-blue-400/30 to-cyan-600/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 -left-8 w-24 h-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl"></div>
          </div>

          {/* 右侧内容区域 */}
          <div className="space-y-5">
            {/* 品质要点时间轴 */}
            <div className="space-y-4">
              {qualityPoints.map((point, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-700 ${
                    visiblePoints.includes(index)
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-10 opacity-0'
                  }`}
                  onMouseEnter={() => setActivePointIndex(index)}
                >
                  <div className={`group relative p-5 rounded-2xl border-2 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                    activePointIndex === index ? point.color + ' shadow-lg' : 'border-gray-200 hover:border-emerald-300'
                  }`}>
                    {/* 连接线 */}
                    {index < qualityPoints.length - 1 && (
                      <div className="absolute left-8 top-full w-0.5 h-6 bg-gradient-to-b from-gray-300 to-transparent"></div>
                    )}

                    <div className="flex items-start gap-4">
                      {/* 图标区域 */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${point.bgColor} p-3 text-white shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                        <point.icon size={24} className="w-full h-full" />
                      </div>

                      {/* 内容区域 */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                          {point.title}
                          {activePointIndex === index && (
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          )}
                        </h3>
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          {point.description}
                        </p>

                        {/* 详细标签 */}
                        <div className="flex flex-wrap gap-2">
                          {point.details.map((detail, detailIndex) => (
                            <span
                              key={detailIndex}
                              className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full border border-gray-200"
                            >
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 进度指示器 */}
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          activePointIndex === index
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : 'border-gray-300 bg-white text-gray-400'
                        }`}>
                          <span className="text-xs font-bold">{index + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 认证徽章与重复说明已移除，避免与下方“证书展示”重复 */}
      </div>
    </section>
  );
};

export default Quality;
