import React, { useState } from 'react';
import { Star, TrendingUp, Award, Users, ChevronRight, Calendar, Sparkles, Quote, CheckCircle } from 'lucide-react';

const Reviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState(6);
  // 已移除统计卡片，去除动画统计状态
  // 精简交互：去除点赞/评论/收藏

  const reviews = [
    {
      id: 1,
      name: '美食博主小雅',
      avatar: '/菜品/微信图片_2025-06-17_174113_218.jpg',
      rating: 5,
      date: '2024年10月15日',
      product: '港埠雨林甜笋',
      category: '美食博主',
      verified: true,
      content: '真的被惊艳到了！港埠雨林甜笋可以生吃，试了刺身做法，0.3mm薄片配上山葵酱，鲜甜脆嫩，完全颠覆了我对竹笋的认知。包装很用心，泡沫箱加冰袋，收到时还很新鲜。',
      images: [
        '/菜品/甜笋三文鱼刺身3.jpg',
        '/菜品/甜笋沙拉.jpg'
      ],
      likes: 128,
      helpful: 89
    },
    {
      id: 2,
      name: '健身教练阿明',
      avatar: '/好看的图片/IMG_8012.jpg',
      rating: 5,
      date: '2024年10月12日',
      product: '港埠雨林甜笋',
      category: '健身教练',
      verified: true,
      content: '作为健身人士，对饮食要求很高。港埠雨林甜笋高蛋白低脂肪，无草酸无嘌呤，太适合我们了！3分钟快炒，保持营养不流失，口感清甜，已经推荐给很多学员。',
      images: [
        '/菜品/素炒甜笋.jpg'
      ],
      likes: 96,
      helpful: 67
    },
    {
      id: 3,
      name: '宝妈小丽',
      avatar: '/好看的图片/retouch_2024070815194064.jpg',
      rating: 5,
      date: '2024年10月10日',
      product: '港埠雨林甜笋',
      category: '普通用户',
      verified: true,
      content: '孩子不太爱吃蔬菜，但这个甜笋他很喜欢！甜笋煮鸡汤，汤汁清甜，孩子喝了两碗。知道是无农药无化肥的五无标准，给孩子吃很放心。顺丰配送3天就到了，包装很好。',
      images: [
        '/菜品/甜笋煮鸡.png',
        '/菜品/甜笋肉末汤.jpg'
      ],
      likes: 156,
      helpful: 102
    },
    {
      id: 4,
      name: '餐厅老板王总',
      avatar: '/好看的图片/DSC08492.JPG',
      rating: 5,
      date: '2024年10月8日',
      product: '港埠雨林甜笋',
      category: '餐厅老板',
      verified: true,
      content: '做餐饮20年，对食材要求很严格。港埠雨林甜笋品质稳定，客人反馈都说口感特别好，脆嫩清甜。现在店里的招牌菜就是甜笋刺身和甜笋沙拉，回头客很多。值得长期合作！',
      images: [
        '/菜品/凉拌甜笋.jpg'
      ],
      likes: 203,
      helpful: 145
    },
    {
      id: 5,
      name: '营养师小陈',
      avatar: '/好看的图片/DSC08494.JPG',
      rating: 5,
      date: '2024年10月5日',
      product: '港埠雨林甜笋',
      category: '营养师',
      verified: true,
      content: '从业营养师10年，港埠雨林甜笋确实是我见过品质最好的。18种氨基酸含量高，总糖含量1.9%-2.2%，低卡高蛋白，特别适合三高人群。推荐给很多客户，反馈都很好。',
      images: [
        '/菜品/甜笋汁.jpg'
      ],
      likes: 178,
      helpful: 124
    },
    {
      id: 6,
      name: '美食达人小雨',
      avatar: '/好看的图片/DSC08493.JPG',
      rating: 5,
      date: '2024年10月2日',
      product: '港埠雨林甜笋',
      category: '美食博主',
      verified: true,
      content: '尝试了甜笋布丁，口感很惊艳！淡淡甜味很清爽，热量很低。还做了椒麻甜笋，开胃解腻。北纬21°雨林种植的品质确实不一样，肉质细嫩无渣，生吃都没有土腥味。',
      images: [
        '/菜品/甜笋布丁.jpg',
        '/菜品/椒麻甜笋.png'
      ],
      likes: 145,
      helpful: 98
    }
  ];

  const categories = [
    { id: 'all', name: '全部评价', icon: Users },
    { id: '美食博主', name: '美食博主', icon: Award },
    { id: '营养师', name: '营养师', icon: CheckCircle },
    { id: '餐厅老板', name: '餐厅老板', icon: Users },
    { id: '健身教练', name: '健身教练', icon: TrendingUp },
    { id: '普通用户', name: '普通用户', icon: Users }
  ];

  // 统计数字动画已移除

  const filteredReviews = selectedFilter === 'all'
    ? reviews
    : reviews.filter(review => review.category === selectedFilter);

  const renderStars = (rating, size = 'small') => {
    const starSize = size === 'large' ? 24 : size === 'medium' ? 20 : 16;
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={starSize}
        className={`transition-all duration-300 ${
          index < rating
            ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  // 点赞/收藏交互已移除

  return (
    <section id="reviews" className="relative py-12 bg-gradient-to-br from-transparent via-white/5 to-transparent overflow-hidden bamboo-texture bambo-wave-animation">
      {/* SuperDesign背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* SuperDesign流体形状 */}
        <div className="bamboo-shape-bg top-20 left-20" style={{animationDelay: '3s', opacity: '0.01'}}></div>
        <div className="bamboo-shape-bg bottom-20 right-20" style={{animationDelay: '8s', transform: 'scale(0.7) rotate(75deg)', opacity: '0.01'}}></div>
        <div className="bamboo-shape-bg top-1/2 left-1/3" style={{animationDelay: '13s', transform: 'scale(1.4) rotate(-60deg)', opacity: '0.01'}}></div>

        {/* 柔和的光晕效果 */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-bamboo-light/8 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-bamboo-primary/8 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-bamboo-accent/6 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center mb-14 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4" />
            用户评价
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            用户评价
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            来自不同人群的使用分享与口碑，看看大家怎么说
          </p>
        </div>

        {/* 统计数据区域已移除，聚焦用户评价内容 */}

        {/* 筛选标签 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedFilter(category.id)}
                className={`group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedFilter === category.id
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-green-300 hover:shadow-md'
                }`}
              >
                <Icon className={`w-4 h-4 transition-all duration-300 ${
                  selectedFilter === category.id ? 'text-white' : 'text-gray-500 group-hover:text-green-600'
                }`} />
                {category.name}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  selectedFilter === category.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.id === 'all' ? reviews.length : reviews.filter(r => r.category === category.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* 评价卡片网格：降低整体留白 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
          {filteredReviews.slice(0, visibleCards).map((review, index) => (
            <div
              key={review.id}
              onMouseEnter={() => setHoveredCard(review.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative rounded-2xl transition-all duration-500 sd-card ${
                hoveredCard === review.id ? 'transform -translate-y-2' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* 推荐标签 */}
              {index < 3 && (
                <div className="absolute -top-3 left-6 z-10">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    <TrendingUp className="w-3 h-3" />
                    热门推荐
                  </div>
                </div>
              )}

              <div className="p-4">
                <div className="md:grid md:grid-cols-[auto,1fr] md:gap-4 items-start">
                {/* 左图右文布局 */}
                {/* 左侧展示首图（整卡左列） */}
                {review.images.length > 0 && (
                  <div className="hidden md:block w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                    <img
                      src={review.images[0]}
                      alt={`用户分享图片 1`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {/* 右侧内容列 */}
                <div className="md:col-start-2 flex-1 min-w-0">
                {/* 评价头部 */}
                <div className="flex items-start justify-between mb-2">
                  {/* 中部头像与信息 */}
                   <div className="flex items-center gap-3">
                    <div className="relative">
                       <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-green-100 group-hover:ring-green-300 transition-all duration-300">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      {review.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                          {review.name}
                        </h3>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium whitespace-nowrap">
                          {review.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {review.date}
                        </span>
                        {/* 去除图片数量显示 */}
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      5.0分
                    </div>
                  </div>
                </div>

                {/* 去除产品标签 */}

                {/* 评价内容 */}
                <div className="mb-4">
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-green-100" />
                    <p className="text-gray-700 leading-relaxed pl-6 text-sm line-clamp-2">
                      {review.content}
                    </p>
                  </div>
                </div>

                {/* 评价图片（缩略图行隐藏以压缩高度，如需查看大图可在后续迭代加入弹窗） */}

                {/* 去除互动按钮 */}
                </div>
                </div>
              </div>

              {/* 悬浮装饰 */}
              {hoveredCard === review.id && (
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl transform scale-105"></div>
              )}
            </div>
          ))}
        </div>

        {/* 加载更多按钮 */}
        {visibleCards < filteredReviews.length && (
          <div className="text-center mb-12">
            <button
              onClick={() => setVisibleCards(prev => prev + 3)}
              className="sd-cta"
            >
              <span>加载更多评价</span>
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {/* 去除重复的“信任标识”说明，避免与其它版块冗余 */}
      </div>
    </section>
  );
};

export default Reviews;
