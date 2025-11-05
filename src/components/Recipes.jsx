import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChefHat, Clock, Users, Star, Heart, Share2, Sparkles, Flame, Leaf, Award, Search, TrendingUp, Timer } from 'lucide-react';

const Recipes = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedRecipes, setLikedRecipes] = useState(new Set());
  const [hoveredRecipe, setHoveredRecipe] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const sectionRef = useRef(null);

  const categories = [
    { id: 'all', name: '全部菜谱', icon: ChefHat, gradient: 'from-purple-500 to-pink-500', count: 9 },
    { id: 'raw', name: '生食系列', icon: Leaf, gradient: 'from-green-500 to-emerald-500', count: 1 },
    { id: 'quick', name: '快手菜', icon: Flame, gradient: 'from-orange-500 to-red-500', count: 3 },
    { id: 'soup', name: '滋补汤品', icon: Timer, gradient: 'from-blue-500 to-cyan-500', count: 2 },
    { id: 'creative', name: '创意料理', icon: Sparkles, gradient: 'from-purple-500 to-indigo-500', count: 3 }
  ];

  useEffect(() => {
    // 兼容与兜底：IntersectionObserver 不可用或未触发时，确保内容不会保持隐藏
    let timeoutId;
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

        if (sectionRef.current) observer.observe(sectionRef.current);

        // 兜底：2s 内未触发则直接显示
        timeoutId = setTimeout(() => setIsVisible(true), 2000);

        return () => {
          observer.disconnect();
          if (timeoutId) clearTimeout(timeoutId);
        };
      }
      // 无 IntersectionObserver 时直接显示
      setIsVisible(true);
    } catch (_) {
      setIsVisible(true);
    }
  }, []);

  // 过滤逻辑放在 recipes 定义之后，避免 no-use-before-define

  const recipes = useMemo(() => ([
    {
      id: 1,
      name: '刺身甜笋',
      category: 'raw',
      difficulty: '简单',
      time: '10分钟',
      servings: '2-3人',
      rating: 4.9,
      description: '0.3mm薄切，搭配山葵酱+酱油，解锁本味鲜甜',
      ingredients: ['港埠雨林甜笋', '山葵酱', '优质生抽', '紫菜丝'],
      steps: [
        '将甜笋削成0.3mm薄片',
        '摆盘造型，可搭配紫菜丝装饰',
        '配上山葵酱和生抽调料碟'
      ],
      image: '/菜品/甜笋三文鱼刺身3.jpg',
      chef: '港埠雨林研发团队'
    },
    {
      id: 2,
      name: '素炒甜笋',
      category: 'quick',
      difficulty: '简单',
      time: '3分钟',
      servings: '2-3人',
      rating: 4.8,
      description: '3分钟出锅，脆嫩爽口',
      ingredients: ['港埠雨林甜笋', '蒜蓉', '生抽', '食用油', '盐'],
      steps: [
        '甜笋切片备用',
        '热锅下油，爆香蒜蓉',
        '下甜笋片大火快炒3分钟',
        '调味即可出锅'
      ],
      image: '/菜品/素炒甜笋.jpg',
      chef: '傣家古法传承'
    },
    {
      id: 3,
      name: '甜笋煮鸡',
      category: 'soup',
      difficulty: '中等',
      time: '45分钟',
      servings: '4-6人',
      rating: 4.9,
      description: '营养滋补，汤汁清甜',
      ingredients: ['港埠雨林甜笋', '土鸡', '姜', '料酒', '盐'],
      steps: [
        '土鸡焯水去腥',
        '甜笋切段',
        '所有材料下锅，加水炖煮45分钟',
        '调味即可'
      ],
      image: '/菜品/甜笋煮鸡.png',
      chef: '港埠雨林营养师'
    },
    {
      id: 4,
      name: '凉拌甜笋',
      category: 'quick',
      difficulty: '简单',
      time: '8分钟',
      servings: '2-3人',
      rating: 4.7,
      description: '清爽开胃，简单易做',
      ingredients: ['港埠雨林甜笋', '蒜末', '生抽', '香醋', '香油', '辣椒油'],
      steps: [
        '甜笋切丝焯水',
        '调制凉拌汁',
        '拌匀后装盘',
        '撒香菜装饰'
      ],
      image: '/菜品/凉拌甜笋.jpg',
      chef: '家常菜谱'
    },
    {
      id: 5,
      name: '甜笋沙拉',
      category: 'creative',
      difficulty: '简单',
      time: '15分钟',
      servings: '2-3人',
      rating: 4.8,
      description: '傣味酸辣汁调味，低卡清爽',
      ingredients: ['港埠雨林甜笋', '生菜', '小番茄', '柠檬', '蜂蜜', '坚果碎'],
      steps: [
        '甜笋切丝，生菜撕小块',
        '调制傣味酸辣汁',
        '所有材料拌匀',
        '撒上坚果碎装饰'
      ],
      image: '/菜品/甜笋沙拉2.jpg',
      chef: '创意料理团队'
    },
    {
      id: 6,
      name: '甜笋闷江鱼',
      category: 'soup',
      difficulty: '中等',
      time: '35分钟',
      servings: '4-5人',
      rating: 4.9,
      description: '鲜鱼配甜笋，汤汁浓郁营养丰富',
      ingredients: ['港埠雨林甜笋', '江鱼', '生姜', '料酒', '盐', '胡椒粉'],
      steps: [
        '江鱼处理干净切段',
        '甜笋切块备用',
        '热油煎鱼至金黄',
        '加水焖煮25分钟调味'
      ],
      image: '/菜品/甜笋闷江鱼.png',
      chef: '江河渔家菜'
    },
    {
      id: 7,
      name: '甜笋素春卷',
      category: 'creative',
      difficulty: '中等',
      time: '25分钟',
      servings: '3-4人',
      rating: 4.6,
      description: '外酥内嫩，素食春卷',
      ingredients: ['港埠雨林甜笋', '春卷皮', '胡萝卜', '木耳', '豆芽'],
      steps: [
        '甜笋切丝焯水',
        '蔬菜切丝拌馅',
        '包春卷炸至金黄',
        '配甜辣酱食用'
      ],
      image: '/菜品/甜笋素春卷.jpg',
      chef: '素食料理'
    },
    {
      id: 8,
      name: '甜笋汁',
      category: 'creative',
      difficulty: '简单',
      time: '5分钟',
      servings: '1-2人',
      rating: 4.5,
      description: '清甜解暑，营养丰富',
      ingredients: ['港埠雨林甜笋', '蜂蜜', '柠檬', '纯净水'],
      steps: [
        '甜笋洗净切块',
        '榨汁机榨汁过滤',
        '加蜂蜜柠檬调味',
        '冷藏后饮用更佳'
      ],
      image: '/菜品/甜笋汁.jpg',
      chef: '养生饮品'
    },
    {
      id: 9,
      name: '椒麻甜笋',
      category: 'quick',
      difficulty: '简单',
      time: '10分钟',
      servings: '2-3人',
      rating: 4.8,
      description: '麻辣鲜香，开胃下饭',
      ingredients: ['港埠雨林甜笋', '花椒油', '生抽', '醋', '蒜蓉', '辣椒油'],
      steps: [
        '甜笋切片焯水备用',
        '调制椒麻汁',
        '拌匀调味',
        '撒芝麻装饰'
      ],
      image: '/菜品/椒麻甜笋.png',
      chef: '川菜师傅推荐'
    }
  ]), []);

  useEffect(() => {
    let filtered = selectedCategory === 'all'
      ? recipes
      : recipes.filter(recipe => recipe.category === selectedCategory);

    if (searchQuery) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredRecipes(filtered);
  }, [selectedCategory, searchQuery, recipes]);

  const toggleLike = (recipeId) => {
    const newLiked = new Set(likedRecipes);
    if (newLiked.has(recipeId)) {
      newLiked.delete(recipeId);
    } else {
      newLiked.add(recipeId);
    }
    setLikedRecipes(newLiked);
  };

  const getDifficultyConfig = (difficulty) => {
    switch (difficulty) {
      case '简单': return { color: 'from-green-400 to-emerald-500', bg: 'bg-green-100', text: 'text-green-700', icon: '⚡' };
      case '中等': return { color: 'from-yellow-400 to-orange-500', bg: 'bg-yellow-100', text: 'text-yellow-700', icon: '🔥' };
      case '困难': return { color: 'from-red-400 to-pink-500', bg: 'bg-red-100', text: 'text-red-700', icon: '💪' };
      default: return { color: 'from-gray-400 to-gray-500', bg: 'bg-gray-100', text: 'text-gray-700', icon: '📝' };
    }
  };

  const getCategoryIcon = (category) => {
    const categoryConfig = {
      'raw': '🌿',
      'quick': '⚡',
      'soup': '🍲',
      'creative': '🎨'
    };
    return categoryConfig[category] || '🍽️';
  };

  return (
    <section id="recipes" ref={sectionRef} className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-transparent via-white/5 to-transparent overflow-hidden bamboo-texture bambo-wave-animation">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full filter blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题部分 */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">港埠雨林独家菜谱</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 bg-clip-text text-transparent mb-6">
            甜笋美味菜谱
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            从生食到烹饪，解锁港埠雨林甜笋的多种美味可能性
          </p>

          {/* 搜索框 */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索菜谱名称、食材或描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 分类筛选 */}
        <div className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative px-6 py-4 rounded-2xl font-medium transition-all duration-500 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r ' + category.gradient + ' text-white shadow-2xl scale-105'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-xl border border-gray-100'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-100'}`}>
                    <category.icon size={20} className={selectedCategory === category.id ? 'text-white' : 'text-gray-600'} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{category.name}</div>
                    <div className={`text-xs ${selectedCategory === category.id ? 'text-white/80' : 'text-gray-500'}`}>
                      {category.count} 道菜谱
                    </div>
                  </div>
                </div>

                {selectedCategory === category.id && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 菜谱网格 */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filteredRecipes.map((recipe, index) => {
            const difficultyConfig = getDifficultyConfig(recipe.difficulty);
            const isHovered = hoveredRecipe === recipe.id;

            return (
              <div
                key={recipe.id}
                className={`group relative glass-effect rounded-3xl shadow-2xl hover:shadow-2xl border border-white/20 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${
                  isHovered ? 'scale-105' : 'scale-100'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
                onMouseEnter={() => setHoveredRecipe(recipe.id)}
                onMouseLeave={() => setHoveredRecipe(null)}
              >
                {/* 发光边框效果 */}
                <div className={`absolute inset-0 bg-gradient-to-r ${difficultyConfig.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}></div>

                {/* 图片部分 */}
                <div className="relative h-64 overflow-hidden rounded-t-3xl">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isHovered ? 'scale-110 rotate-1' : 'scale-100 rotate-0'
                    }`}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ddd"%3E%3Cpath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/%3E%3C/svg%3E';
                    }}
                  />

                  {/* 图片渐变遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* 难度和分类标签 */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${difficultyConfig.color} text-white shadow-lg backdrop-blur-sm`}>
                      <span className="mr-1">{difficultyConfig.icon}</span>
                      {recipe.difficulty}
                    </div>
                    <div className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm text-gray-700 shadow-lg">
                      <span className="mr-1">{getCategoryIcon(recipe.category)}</span>
                      {categories.find(c => c.id === recipe.category)?.name || '其他'}
                    </div>
                  </div>

                  {/* 悬浮时的操作按钮 */}
                  <div className={`absolute top-4 right-4 flex gap-2 transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}>
                    <button
                      onClick={() => toggleLike(recipe.id)}
                      className={`p-2.5 rounded-full transition-all duration-300 ${
                        likedRecipes.has(recipe.id)
                          ? 'bg-red-500 text-white shadow-lg'
                          : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500 shadow-lg'
                      }`}
                    >
                      <Heart
                        size={18}
                        className={likedRecipes.has(recipe.id) ? 'fill-current' : ''}
                      />
                    </button>
                    <button className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:bg-white hover:text-blue-500 shadow-lg transition-all duration-300">
                      <Share2 size={18} />
                    </button>
                  </div>

                  {/* 悬浮时的快速信息 */}
                  <div className={`absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-3 transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                          <Clock size={14} className="text-green-500" />
                          <span>{recipe.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                          <Users size={14} className="text-blue-500" />
                          <span>{recipe.servings}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-gray-700">{recipe.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 内容部分 */}
                <div className="p-6">
                  {/* 标题和评分 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">
                        {recipe.name}
                      </h3>
                      <p className="text-sm text-gray-500">by {recipe.chef}</p>
                    </div>
                  </div>

                  {/* 描述 */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>

                  {/* 食材预览 */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ChefHat className="w-4 h-4 text-green-500" />
                      <p className="text-xs font-semibold text-gray-700">主要食材</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {recipe.ingredients.slice(0, 4).map((ingredient, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 text-xs text-green-700 rounded-full border border-green-200 hover:bg-green-100 transition-colors duration-300"
                        >
                          {ingredient}
                        </span>
                      ))}
                      {recipe.ingredients.length > 4 && (
                        <span className="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                          +{recipe.ingredients.length - 4} 更多
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 底部装饰线 */}
                  <div className={`h-1 bg-gradient-to-r ${difficultyConfig.color} rounded-full transition-all duration-500 ${
                    isHovered ? 'w-full' : 'w-0'
                  }`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 空状态 */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">未找到匹配的菜谱</h3>
            <p className="text-gray-500">尝试调整搜索关键词或选择其他分类</p>
          </div>
        )}

        {/* 烹饪小贴士 */}
        <div className={`mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-br from-emerald-50 via-white to-lime-50 rounded-3xl p-8 md:p-12 shadow-xl border border-emerald-100">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full mb-4">
                <Award className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">专业烹饪指导</span>
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                港埠雨林甜笋烹饪小贴士
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {[
                {
                  icon: '🌿',
                  title: '生食级品质',
                  description: '无草酸无嘌呤，可生食的甜笋品种',
                  gradient: 'from-green-400 to-emerald-500',
                  bgGlow: 'shadow-green-200'
                },
                {
                  icon: '⚡',
                  title: '3分钟快炒',
                  description: '肉质细嫩，无需长时间烹饪',
                  gradient: 'from-yellow-400 to-orange-500',
                  bgGlow: 'shadow-yellow-200'
                },
                {
                  icon: '💧',
                  title: '保持水分',
                  description: '烹饪时少加水，保持原汁原味',
                  gradient: 'from-blue-400 to-cyan-500',
                  bgGlow: 'shadow-blue-200'
                },
                {
                  icon: '🧂',
                  title: '少盐清淡',
                  description: '体现自然甜味，清淡调味最佳',
                  gradient: 'from-purple-400 to-pink-500',
                  bgGlow: 'shadow-purple-200'
                }
              ].map((tip, index) => (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <div className="text-center p-3 sm:p-4 lg:p-6 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-3 lg:mb-4 rounded-2xl bg-gradient-to-r ${tip.gradient} flex items-center justify-center text-2xl sm:text-3xl shadow-lg ${tip.bgGlow} group-hover:scale-110 transition-transform duration-300`}>
                      {tip.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-emerald-600 transition-colors duration-300 text-sm sm:text-base lg:text-lg">
                      {tip.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 互动邀请已移除 */}
      </div>
    </section>
  );
};

export default Recipes;
