import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapPin, Shield, Star, Heart, Sparkles, Award, Leaf, Zap } from 'lucide-react';

const Highlights = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const highlights = [
    {
      icon: MapPin,
      title: '雨林秘境',
      subtitle: '生长基底',
      description: '北纬21°西双版纳原始雨林，每日10小时充足阳光，20℃适宜温差，大黑山山泉水灌溉，19124平方公里无污染生态系统',
      image: '/好看的图片/IMG_8012.jpg',
      gradient: 'gradient-bamboo',
      features: ['原生态环境', '山泉灌溉', '充足阳光'],
      stats: '21°N'
    },
    {
      icon: Shield,
      title: '有机匠造',
      subtitle: '安心承诺',
      description: '20000亩专属种植基地，"无农药、无化肥、无除草剂、无激素、无转基因"五无标准，绿色食品A级认证',
      image: '/好看的图片/IMG_8063.jpg',
      gradient: 'gradient-bamboo-light',
      features: ['五无标准', '绿色认证', '专属基地'],
      stats: '20000亩'
    },
    {
      icon: Star,
      title: '生食级口感',
      subtitle: '味蕾盛宴',
      description: '鲜：含18种氨基酸，释放纯粹雨林鲜味；脆：纤维紧致柔韧；嫩：肉质细嫩无渣；甜：总糖含量1.9%-2.2%，甜度远超同类',
      image: '/菜品/甜笋三文鱼刺身3.jpg',
      gradient: 'gradient-bamboo-accent',
      features: ['18种氨基酸', '纤维紧致', '甜度2.2%'],
      stats: '生食级'
    },
    {
      icon: Heart,
      title: '营养巅峰',
      subtitle: '健康之选',
      description: '高蛋白、低脂肪，无草酸、无嘌呤；中科院认证：膳食纤维可抑脂减重、调理肠胃菌群、增强免疫',
      image: '/好看的图片/retouch_2024070815434892.jpg',
      gradient: 'gradient-bamboo',
      features: ['高蛋白', '无草酸', '中科院认证'],
      stats: '低脂肪'
    }
  ];

  useEffect(() => {
    // IntersectionObserver 兼容与降级：若不可用或未触发，超时后强制显示，避免内容永久隐藏
    let timeoutId;
    try {
      if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const section = sectionRef.current;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (timeoutId) clearTimeout(timeoutId);
            }
          },
          { threshold: 0.1 }
        );

        if (section) {
          observer.observe(section);
        }

        // 兜底：2s 内未触发则直接显示
        timeoutId = setTimeout(() => setIsVisible(true), 2000);

        return () => {
          if (section) {
            observer.unobserve(section);
          }
          if (timeoutId) clearTimeout(timeoutId);
        };
      }
      // 无 IntersectionObserver 时直接显示
      setIsVisible(true);
    } catch (_) {
      setIsVisible(true);
    }
  }, []);

  // 粒子背景常量，避免重渲染随机闪烁
  const particles = useMemo(() => (
    Array.from({ length: 15 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 2}s`
    }))
  ), []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-transparent via-white/5 to-transparent overflow-hidden bamboo-texture bambo-wave-animation"
    >
      {/* SuperDesign背景装饰层 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 动态波纹光效 */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle 800px at ${mousePosition.x}% ${mousePosition.y}%, rgba(74, 124, 46, 0.18) 0%, transparent 50%)`,
            transition: 'background 0.3s ease-out'
          }}
        />

        {/* SuperDesign流体形状 */}
        <div className="bamboo-shape-bg top-10 left-10" style={{animationDelay: '0s', opacity: '0.01'}}></div>
        <div className="bamboo-shape-bg bottom-20 right-20" style={{animationDelay: '5s', transform: 'scale(0.8) rotate(45deg)', opacity: '0.01'}}></div>
        <div className="bamboo-shape-bg top-1/2 right-1/3" style={{animationDelay: '10s', transform: 'scale(1.2) rotate(-30deg)', opacity: '0.01'}}></div>

        {/* 竹叶装饰图形 */}
        <div className={`absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-bamboo-light/15 to-transparent rounded-full animate-morph ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-bamboo-primary/12 to-transparent rounded-full animate-float ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{animationDelay: '1s'}}></div>
        <div className={`absolute top-1/2 left-1/3 bamboo-leaf transform scale-150 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* 粒子效果 */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-green-400/40 to-emerald-400/40 rounded-full animate-pulse"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 - 高级动画 */}
        <div className={`text-center mb-20 transform transition-all duration-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          {/* 品牌标识 */}
          <div className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-bamboo-primary/15 to-bamboo-light/15 backdrop-blur-sm border border-bamboo-primary/25 rounded-full px-6 py-2 bamboo-decoration">
            <Sparkles className="w-4 h-4 text-bamboo-primary animate-pulse" />
            <span className="text-bamboo-deep font-semibold text-sm tracking-wide">核心优势</span>
            <Award className="w-4 h-4 text-bamboo-primary animate-pulse" style={{animationDelay: '1s'}} />
          </div>

          {/* 主标题 */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-10">
            <span className="block text-gray-900 mb-2 tracking-tight">港埠雨林甜笋</span>
            <span className="block text-bamboo-deep tracking-tight sd-title">
              四大核心优势
            </span>
          </h2>

          {/* 副标题装饰线 */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent to-bamboo-primary"></div>
            <Leaf className="w-5 h-5 text-bamboo-primary animate-pulse" />
            <div className="h-0.5 w-20 bg-gradient-to-l from-transparent to-bamboo-primary"></div>
          </div>

          {/* 描述文字 */}
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <span className="font-semibold text-bamboo-deep">北纬21°雨林秘境</span>
            <span className="mx-2 text-bamboo-primary">·</span>
            <span className="font-semibold text-bamboo-primary">有机匠造</span>
            <span className="mx-2 text-bamboo-primary">·</span>
            <span className="font-semibold text-bamboo-accent">生食级口感</span>
            <span className="mx-2 text-bamboo-accent">·</span>
            <span className="font-semibold text-bamboo-deep">营养巅峰</span>
          </p>
        </div>

        {/* 高级卡片网格布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className={`group relative transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{transitionDelay: `${0.3 + index * 0.15}s`}}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* 卡片主体 */}
              <div className="relative h-full bg-white rounded-3xl shadow-xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">

                {/* 背景图片层 */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110`}
                    style={{
                      backgroundImage: `url('${highlight.image}')`,
                      filter: 'brightness(0.9) contrast(1.1)'
                    }}
                  >
                    {/* 渐变叠加 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient}/20 to-transparent`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  </div>

                  {/* 图标容器 - 3D浮动效果 */}
                  <div className={`absolute top-6 right-6 transform transition-all duration-500 ${hoveredCard === index ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}`}>
                    <div className={`relative bg-gradient-to-br ${highlight.gradient} p-4 rounded-2xl shadow-2xl`}>
                      <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                      <highlight.icon size={28} className="relative text-white z-10" />
                    </div>
                  </div>

                  {/* 统计数据标签 */}
                  <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md rounded-full px-3 py-1">
                    <span className="text-white text-xs font-bold">{highlight.stats}</span>
                  </div>
                </div>

                {/* 内容区域 */}
                <div className="relative p-8">
                  {/* 标题 */}
                  <div className="mb-4">
                    <h3 className={`text-2xl font-black text-bamboo-deep mb-1`}>
                      {highlight.title}
                    </h3>
                    <p className="text-sm font-semibold text-bamboo-primary">{highlight.subtitle}</p>
                  </div>

                  {/* 描述文字 */}
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                    {highlight.description}
                  </p>

                  {/* 特性标签 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {highlight.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="inline-flex items-center gap-1 bg-gradient-to-r from-bamboo-primary/15 to-bamboo-light/15 px-3 py-1 rounded-full border border-bamboo-primary/30"
                      >
                        <Zap className="w-3 h-3 text-bamboo-primary" />
                        <span className="text-xs font-medium text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* 悬浮时显示的装饰元素 */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${highlight.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>

                {/* 优化的光晕效果 */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${highlight.gradient} opacity-0 rounded-3xl blur-lg transition-all duration-500 group-hover:opacity-10`}></div>
              </div>

              {/* 装饰性几何图形 */}
              <div className={`absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br ${highlight.gradient} rounded-lg transform rotate-45 opacity-60 group-hover:rotate-90 transition-transform duration-500`}></div>
            </div>
          ))}
        </div>

        {/* 底部装饰区域 */}
        <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '1.2s'}}>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-bamboo-bg to-bamboo-light/20 px-8 py-4 rounded-2xl border border-bamboo-primary/30 bamboo-decoration">
            <div className="flex -space-x-2">
              {[Sparkles, Award, Leaf, Shield].map((Icon, index) => (
                <div key={index} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-bamboo-primary/20">
                  <Icon size={16} className="text-bamboo-primary" />
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-sm font-medium">
              每一根甜笋都承载着雨林的馈赠与匠人的心血
            </p>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            * 所有图片均为示意，实际产品以收到的实物为准
          </p>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
