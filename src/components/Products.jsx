import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MessageCircle, Sparkles, Package, Shield, Truck, Zap, Gift, Clock, CheckCircle } from 'lucide-react';

const Products = () => {
  // 已统一为场景导向的产品卡展示，不再使用数量步进
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sectionRef = useRef(null);

  const products = [
    {
      id: 'fresh',
      name: '零售家庭装',
      title: '零售家庭',
      description: '可生食级水果笋，新鲜采摘人工去皮；快手烹饪或刺身直吃，家庭日常更省心',
      weight: '500g',
      price: 68,
      originalPrice: 88,
      image: '/好看的图片/DSC08490.JPG',
      features: ['可生食', '快手烹饪', '冰袋保鲜', '当日采摘'],
      badge: '零售',
      badgeColor: 'gradient-bamboo',
      discount: '23%',
      rating: 4.9,
      soldCount: '2.3k',
      deliveryTime: '当日发货'
    },
    {
      id: 'sliced',
      name: '线下商超装',
      title: '线下商超',
      description: '统一规格精切，即开即售；冷链陈列、保鲜稳定，适配生食/熟食多场景',
      weight: '400g',
      price: 58,
      originalPrice: 78,
      image: '/好看的图片/IMG_8063.jpg',
      features: ['即开即售', '冷链陈列', '生食级', '规格稳定'],
      badge: '商超',
      badgeColor: 'gradient-bamboo-light',
      discount: '26%',
      rating: 4.8,
      soldCount: '1.8k',
      deliveryTime: '当日发货'
    },
    {
      id: 'ready',
      name: '餐饮酒店装',
      title: '餐饮酒店',
      description: '稳定大宗供货，支持定制切配；生食/熟食均可，适合刺身、沙拉、热菜等多种菜式',
      weight: '300g×2盒',
      price: 158,
      originalPrice: 198,
      image: '/好看的图片/retouch_2024070815434892.jpg',
      features: ['稳定供货', '定制切配', '多场景适配', '对账支持'],
      badge: '餐饮',
      badgeColor: 'gradient-bamboo-accent',
      discount: '20%',
      rating: 5.0,
      soldCount: '856',
      deliveryTime: '次日发货'
    }
  ];

  // 交互动画效果
  useEffect(() => {
    // IntersectionObserver 兼容与降级，防止内容因观察失败而保持隐藏
    let timeoutId;
    const sectionRefCurrent = sectionRef.current;
    try {
      if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (timeoutId) clearTimeout(timeoutId);
            }
          },
          { threshold: 0.1 }
        );

        if (sectionRefCurrent) observer.observe(sectionRefCurrent);

        // 兜底：2s 内未触发则直接显示
        timeoutId = setTimeout(() => setIsVisible(true), 2000);

        return () => {
          if (sectionRefCurrent) observer.unobserve(sectionRefCurrent);
          if (timeoutId) clearTimeout(timeoutId);
        };
      }
      // 无 IntersectionObserver 时直接显示
      setIsVisible(true);
    } catch (_) {
      setIsVisible(true);
    }
  }, []);

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

  // 粒子背景常量，避免重渲染随机闪烁
  const particles = useMemo(() => (
    Array.from({ length: 25 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      duration: `${3 + Math.random() * 3}s`
    }))
  ), []);

  // 数量调整逻辑已移除，避免未使用变量警告

  const handlePurchase = (productId) => {
    setSelectedProduct(productId);
    // 可以在这里添加其他购买相关功能，比如显示产品详情或跳转到购买页面
    console.log(`选择了产品: ${products.find(p => p.id === productId)?.name || '产品'}`);
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-24 bg-gradient-to-br from-transparent via-white/5 to-transparent overflow-hidden bamboo-texture bambo-wave-animation"
    >
      {/* SuperDesign背景装饰层 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 动态光效跟随鼠标 */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background: `radial-gradient(circle 1000px at ${mousePosition.x}% ${mousePosition.y}%, rgba(74, 124, 46, 0.15) 0%, transparent 50%)`,
            transition: 'background 0.3s ease-out'
          }}
        />

        {/* SuperDesign流体形状 */}
        <div className="bamboo-shape-bg top-20 left-20" style={{animationDelay: '2s', opacity: '0.01'}}></div>
        <div className="bamboo-shape-bg bottom-40 right-40" style={{animationDelay: '7s', transform: 'scale(0.9) rotate(60deg)', opacity: '0.01'}}></div>
        <div className="bamboo-shape-bg top-2/3 left-1/4" style={{animationDelay: '12s', transform: 'scale(1.1) rotate(-45deg)', opacity: '0.01'}}></div>

        {/* 竹叶装饰图形 */}
        <div className={`absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-bamboo-light/12 to-transparent rounded-full animate-morph ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-bamboo-primary/10 to-transparent rounded-full animate-float ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{animationDelay: '1s'}}></div>
        <div className={`absolute top-1/2 left-1/3 bamboo-leaf transform scale-125 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* 粒子效果 */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-full animate-pulse"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* 高级标题区域 */}
        <div className={`text-center mb-12 sm:mb-16 md:mb-20 transform transition-all duration-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          {/* 品牌标识 */}
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 bg-gradient-to-r from-bamboo-primary/15 to-bamboo-light/15 backdrop-blur-sm border border-bamboo-primary/25 rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 shadow-lg bamboo-decoration">
            <Package className="w-4 h-4 sm:w-5 sm:h-5 text-bamboo-primary animate-pulse" />
            <span className="text-bamboo-deep font-bold text-sm sm:text-base md:text-lg tracking-wide">产品系列</span>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-bamboo-primary animate-pulse" style={{animationDelay: '1s'}} />
          </div>

          {/* 主标题 */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 sm:mb-8 md:mb-10">
            <span className="block text-gray-900 mb-2 sm:mb-3 tracking-tight">精选港埠雨林甜笋</span>
            <span className="block text-bamboo-deep tracking-tight sd-title">
              满足不同需求
            </span>
          </h2>

          {/* 装饰线 */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="h-0.5 sm:h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-transparent to-bamboo-primary rounded-full"></div>
            <div className="flex gap-1.5 sm:gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-bamboo-primary rounded-full animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>
              ))}
            </div>
            <div className="h-0.5 sm:h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-l from-transparent to-bamboo-primary rounded-full"></div>
          </div>

          {/* 副标题：三大应用场景 */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            <span className="font-semibold text-bamboo-deep">零售家庭</span>
            <span className="mx-2 sm:mx-3 text-gray-400">·</span>
            <span className="font-semibold text-bamboo-primary">线下商超</span>
            <span className="mx-2 sm:mx-3 text-gray-400">·</span>
            <span className="font-semibold text-bamboo-accent">餐饮酒店</span>
          </p>
        </div>

        {/* 高级产品卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group relative transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{transitionDelay: `${0.3 + index * 0.2}s`}}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* 高级卡片主体 */}
              <div className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden sd-card">

                {/* 背景图片层 - 3D效果 */}
                <div className="relative h-48 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${hoveredCard === product.id ? 'scale-110 rotate-1' : 'scale-100 rotate-0'}`}
                    style={{
                      backgroundImage: `url('${product.image}')`,
                      filter: 'brightness(0.85) contrast(1.1)'
                    }}
                    loading="lazy"
                  >
                    {/* 多层渐变叠加 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.badgeColor}/20 to-transparent`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  </div>

                  {/* 高级徽章 - 3D浮动 */}
                  <div className={`absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 transform transition-all duration-500 ${hoveredCard === product.id ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}`}>
                    <div className={`relative bg-gradient-to-r ${product.badgeColor} px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full shadow-2xl`}>
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                      <span className="relative text-white text-xs sm:text-sm font-bold z-10">{product.badge}</span>
                    </div>
                  </div>

                </div>

                {/* 内容区域 */}
                <div className="relative p-4 sm:p-6 md:p-8">
                  {/* 产品标题 */}
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 mb-1">{product.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">{product.name}</p>
                  </div>

                  {/* 描述文字 */}
                  <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-xs sm:text-sm">
                    {product.description}
                  </p>

                  {/* 特色标签 */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {product.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="inline-flex items-center gap-0.5 sm:gap-1 bg-gradient-to-r from-bamboo-primary/15 to-bamboo-light/15 px-2 sm:px-3 py-1 rounded-full border border-bamboo-primary/30"
                      >
                        <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-bamboo-primary" />
                        <span className="text-[10px] sm:text-xs font-medium text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>


                  {/* 高级购买按钮 */}
                  <button
                    onClick={() => handlePurchase(product.id)}
                    className={`group relative w-full sd-cta justify-center ${selectedProduct === product.id ? 'scale-95' : ''}`}
                  >
                    <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl sm:rounded-2xl"></div>
                    <span className="relative flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg">
                      {product.badge === '礼品' ? <Gift size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Package size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />}
                      查看详情
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>

                  {/* 底部装饰线 */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r ${product.badgeColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>

                {/* 优化的光晕效果 */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${product.badgeColor} opacity-0 rounded-3xl blur-md transition-all duration-500 group-hover:opacity-10`}></div>
              </div>

              {/* 装饰性几何图形 */}
              <div className={`absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br ${product.badgeColor} rounded-lg transform rotate-45 opacity-60 group-hover:rotate-90 transition-transform duration-500`}></div>
            </div>
          ))}
        </div>

        {/* 高级服务承诺区域 */}
        <div className={`mb-8 sm:mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{transitionDelay: '1.5s'}}>
          <div className="bg-gradient-to-r from-bamboo-bg via-bamboo-light/20 to-bamboo-bg rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-bamboo-primary/30 shadow-xl bamboo-decoration">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">服务承诺</h3>
              <p className="text-sm sm:text-base text-gray-600">我们承诺为您提供最优质的产品和服务</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[
                { icon: Truck, title: '快速配送', desc: '顺丰陆运，送货上门', color: 'blue' },
                { icon: Shield, title: '品质保证', desc: '质量问题包赔', color: 'green' },
                { icon: Clock, title: '售后无忧', desc: '坏果包售后', color: 'yellow' },
                { icon: CheckCircle, title: '客服支持', desc: '24小时在线服务', color: 'purple' }
              ].map((service, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-${service.color}-500 to-${service.color}-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                    <service.icon size={20} className="text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{service.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 购买须知 - 优化排版 */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{transitionDelay: '1.7s'}}>
          <div className="glass-effect rounded-3xl p-10 border border-white/20 shadow-2xl">
            {/* 标题区域 */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-bamboo-primary to-bamboo-deep rounded-2xl flex items-center justify-center shadow-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  购买须知
                </h3>
                <div className="w-12 h-12 bg-gradient-to-r from-bamboo-light to-bamboo-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="h-1 w-24 bg-gradient-to-r from-bamboo-primary to-bamboo-light rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 配送服务 */}
              <div className="bg-gradient-to-br from-green-50/50 to-transparent rounded-2xl p-6 border border-green-200/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-green-800">配送服务</h4>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>覆盖全国大部分地区</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>顺丰陆运 + 保温包装</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>发货后3-4天送达</span>
                  </div>
                </div>
              </div>

              {/* 售后保障 */}
              <div className="bg-gradient-to-br from-blue-50/50 to-transparent rounded-2xl p-6 border border-blue-200/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-blue-800">售后保障</h4>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>生鲜产品不支持7天无理由退换</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>质量问题24小时内处理</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>客服热线：18510890322</span>
                  </div>
                </div>
              </div>

              {/* 温馨提示 */}
              <div className="bg-gradient-to-br from-orange-50/50 to-transparent rounded-2xl p-6 border border-orange-200/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-orange-800">温馨提示</h4>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  <p className="mb-3">
                    <span className="text-orange-600 font-semibold">根部氧化属正常现象</span>
                    ，无防腐处理，只为健康食材。
                  </p>
                  <p>
                    切掉一层即可正常食用，不影响品质。
                  </p>
                </div>
              </div>
            </div>

            {/* 详细操作指南 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
              {/* 笋丁处理 */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-5 sm:p-6 border border-purple-200/30">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-purple-800">鲜笋丁处理方式</h4>
                </div>
                <div className="space-y-1">
                  {[
                    { icon: '1️⃣', text: '切掉根部切口一层' },
                    { icon: '2️⃣', text: '顺着笋壳中间竖切一刀' },
                    { icon: '3️⃣', text: '轻轻剥去外壳' },
                    { icon: '4️⃣', text: '切掉表面老皮' },
                    { icon: '5️⃣', text: '切片或切段备用' }
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-gray-700 p-2 rounded-lg hover:bg-purple-100/30 transition-colors">
                      <span className="text-lg font-bold text-purple-600 w-6">{step.icon}</span>
                      <span>{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 保存方法 */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-5 sm:p-6 border border-red-200/30">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-red-800">保存方法</h4>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm text-gray-700">
                  <div className="bg-white/50 rounded-lg p-3 sm:p-4 border border-red-200/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        📦
                      </div>
                      <span className="font-semibold text-red-700">冷藏保存</span>
                    </div>
                    <p className="text-gray-600 ml-10">
                      带壳放入冰箱冷藏，可保存约10天
                    </p>
                  </div>

                  <div className="bg-white/50 rounded-lg p-3 sm:p-4 border border-red-200/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        ⚡
                      </div>
                      <span className="font-semibold text-orange-700">最佳食用期</span>
                    </div>
                    <p className="text-gray-600 ml-10">
                      竹笋会缓慢生长，越早食用越新鲜
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部提示 */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200/50">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-amber-800">
                  天然食材 • 健康安心 • 从产地到餐桌
                </span>
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
