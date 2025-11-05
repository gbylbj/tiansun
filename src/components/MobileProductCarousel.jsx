import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import useTouchGestures from '../hooks/useTouchGestures';

const MobileProductCarousel = ({ products, onAddToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);

  // 使用触摸手势Hook
  useTouchGestures(carouselRef, {
    onSwipeLeft: () => {
      nextSlide();
    },
    onSwipeRight: () => {
      prevSlide();
    },
    threshold: 30
  });

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isDragging]);

  return (
    <div className="md:hidden w-full">
      {/* 轮播容器 */}
      <div
        ref={carouselRef}
        className="relative overflow-hidden rounded-xl touch-pan-y"
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product, index) => (
            <div key={product.id} className="w-full flex-shrink-0 px-2">
              <div className="bg-white rounded-lg shadow-lg p-4">
                {/* 产品图片 */}
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />

                  {/* 优惠标签 */}
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      省{product.discount}
                    </div>
                  )}
                </div>

                {/* 产品信息 */}
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>

                  {/* 价格 */}
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">
                      ¥{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ¥{product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* 产品特性 */}
                  <div className="flex flex-wrap gap-1">
                    {product.features?.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* 购买按钮 */}
                  <button
                    onClick={() => onAddToCart && onAddToCart(product)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
                  >
                    <ShoppingCart size={16} />
                    <span>加入购物车</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 左右箭头 */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
          aria-label="上一个"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
          aria-label="下一个"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* 指示器 */}
      <div className="flex justify-center space-x-2 mt-4">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-green-500'
                : 'w-2 bg-gray-300'
            }`}
            aria-label={`切换到第${index + 1}个产品`}
          />
        ))}
      </div>

      {/* 快速导航 */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {products.map((product, index) => (
          <button
            key={product.id}
            onClick={() => goToSlide(index)}
            className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              index === currentIndex
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {product.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileProductCarousel;