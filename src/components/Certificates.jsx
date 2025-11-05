import React, { useState, useEffect } from 'react';

const Certificates = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());

  const certificates = [
    {
      title: '绿色食品A级认证',
      image: '/certificates/绿色食品证书.jpg',
      description: '2024年4月认证，符合国家绿色食品标准，确保产品安全与品质',
      badge: '权威认证',
      badgeColor: 'bg-gradient-to-r from-emerald-500 to-green-600',
      icon: '🏆',
      category: '国家级认证'
    },
    {
      title: '有机转换认证',
      image: '/certificates/有机转换认证证书.jpg',
      description: '证书编号：085328，有机转换期认证，符合国际有机标准',
      badge: '有机认证',
      badgeColor: 'bg-gradient-to-r from-green-500 to-teal-600',
      icon: '🌿',
      category: '环保认证'
    },
    {
      title: '国际竹类新品种登录证书',
      image: '/certificates/国际竹类新品种登录证书.png',
      description: '"版纳1号"甜龙竹国际认证，获得国际植物新品种保护',
      badge: '国际认证',
      badgeColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      icon: '🌍',
      category: '国际认证'
    },
    {
      title: '林木良种证',
      image: '/certificates/林木良种证.png',
      description: '国家林业局颁发，确认竹品种优良特性，保障种源质量',
      badge: '良种认证',
      badgeColor: 'bg-gradient-to-r from-green-600 to-emerald-600',
      icon: '🌱',
      category: '品种认证'
    },
    {
      title: '检测报告',
      image: '/certificates/检测报告.png',
      description: 'SGS权威检测，无农残无重金属超标，安全指标远超行业标准',
      badge: '品质保证',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-600',
      icon: '🔬',
      category: '质量检测'
    },
    {
      title: '检测报告2',
      image: '/certificates/检测报告2.png',
      description: '第三方机构检测，营养成分全面分析，确保产品营养价值',
      badge: '营养分析',
      badgeColor: 'bg-gradient-to-r from-indigo-500 to-purple-600',
      icon: '📊',
      category: '营养检测'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  const getBadgeGlowColor = (badgeColor) => {
    if (badgeColor.includes('emerald')) return 'shadow-emerald-500/25';
    if (badgeColor.includes('green')) return 'shadow-green-500/25';
    if (badgeColor.includes('teal')) return 'shadow-teal-500/25';
    if (badgeColor.includes('blue')) return 'shadow-blue-500/25';
    if (badgeColor.includes('indigo')) return 'shadow-indigo-500/25';
    if (badgeColor.includes('purple')) return 'shadow-purple-500/25';
    if (badgeColor.includes('pink')) return 'shadow-pink-500/25';
    return 'shadow-gray-500/25';
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-transparent via-white/5 to-transparent">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-100/20 to-blue-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* 网格背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* 装饰线条 */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-20"></div>
            <div className="mx-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-20"></div>
          </div>

          {/* 主标题 */}
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-700 bg-clip-text text-transparent mb-4 relative">
            <span className="relative z-10">权威认证·品质保证</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/20 to-green-700/20 blur-xl"></div>
          </h2>

          {/* 副标题 */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            多重权威认证，确保产品品质与安全。每一份认证都是我们对品质的郑重承诺。
          </p>

          {/* 信任指示器 */}
          <div className="flex items-center justify-center mt-6 space-x-6">
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span>官方认证</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse delay-300"></span>
              <span>国际标准</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse delay-700"></span>
              <span>品质保证</span>
            </div>
          </div>
        </div>

        {/* 证书展示区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* 主卡片 */}
              <div className={`relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-white/20 ${hoveredCard === index ? 'scale-105' : ''}`}>
                {/* 发光边框效果 */}
                <div className={`absolute inset-0 bg-gradient-to-r ${cert.badgeColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}></div>

                {/* 顶部装饰条 */}
                <div className={`h-1 bg-gradient-to-r ${cert.badgeColor} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
                </div>

                {/* 图片容器 */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  {/* 背景图案 */}
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                          <path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z" fill="#9C92AC" fillOpacity="0.05"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>

                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className={`w-full h-full object-contain p-4 transition-all duration-700 ${hoveredCard === index ? 'scale-110 rotate-1' : 'scale-100'} ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad(index)}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23d1d5db"%3E%3Cpath d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z%3E%3C/path%3E%3Cpath fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2 1 1 0 100-2 2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clip-rule="evenodd"%3E%3C/path%3E%3C/svg%3E';
                    }}
                  />

                  {/* 悬停时的放大镜效果 */}
                  {hoveredCard === index && (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* 徽章 */}
                  <div className={`absolute top-4 right-4 ${cert.badgeColor} text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg ${getBadgeGlowColor(cert.badgeColor)} transform transition-all duration-300 ${hoveredCard === index ? 'scale-110 rotate-3' : ''}`}>
                    <span className="flex items-center">
                      <span className="mr-1">{cert.icon}</span>
                      {cert.badge}
                    </span>
                  </div>

                  {/* 分类标签 */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2 py-1 rounded-lg font-medium">
                    {cert.category}
                  </div>
                </div>

                {/* 内容区域 */}
                <div className="p-6 relative">
                  {/* 装饰线条 */}
                  <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${cert.badgeColor} opacity-20`}></div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-700 group-hover:to-green-700 group-hover:bg-clip-text transition-all duration-300">
                    {cert.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  {/* 底部装饰 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'} transition-colors duration-300`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className={`text-xs font-medium ${cert.badgeColor.replace('bg-', 'text-').replace('500', '600').replace('600', '700')}`}>
                      认证通过
                    </div>
                  </div>
                </div>
              </div>

              {/* 悬停时的光效 */}
              {hoveredCard === index && (
                <div className={`absolute -inset-1 bg-gradient-to-r ${cert.badgeColor} opacity-30 blur-xl rounded-2xl -z-10 animate-pulse`}></div>
              )}
            </div>
          ))}
        </div>

        {/* 底部说明区域 */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* 装饰元素 */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-16"></div>
            <div className="mx-3">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-16"></div>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            所有证书均为真实有效，可在相关机构官网查询验证
          </p>

          {/* 信任印章 */}
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center text-xs text-gray-400">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              官方认证
            </div>
            <div className="flex items-center text-xs text-gray-400">
              <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              安全保障
            </div>
            <div className="flex items-center text-xs text-gray-400">
              <svg className="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              品质保证
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Certificates;
