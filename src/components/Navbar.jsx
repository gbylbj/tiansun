import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const navRef = useRef(null);

  const handleNavClick = (targetId) => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // 手势处理
  const handleTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isRightSwipe && !isOpen) {
      // 从左向右滑动打开菜单
      setIsOpen(true);
    } else if (isLeftSwipe && isOpen) {
      // 从右向左滑动关闭菜单
      setIsOpen(false);
    }
  };

  // 监听页面滚动，自动关闭移动菜单
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // ESC键关闭菜单
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-[60] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 shadow-lg"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="港埠雨林甜笋"
              className="h-8 w-auto sm:h-10 object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4 lg:space-x-6">
              <a href="#home" className="text-gray-800 hover:text-primary px-3 py-2 text-sm lg:text-base font-medium transition-colors hover:underline underline-offset-4">首页</a>
              <a href="#products" className="text-gray-800 hover:text-primary px-3 py-2 text-sm lg:text-base font-medium transition-colors hover:underline underline-offset-4">产品</a>
              <a href="#quality" className="text-gray-800 hover:text-primary px-3 py-2 text-sm lg:text-base font-medium transition-colors hover:underline underline-offset-4">品质</a>
              <a href="#nutrition" className="text-gray-800 hover:text-primary px-3 py-2 text-sm lg:text-base font-medium transition-colors hover:underline underline-offset-4">营养</a>
              <a href="#reviews" className="text-gray-800 hover:text-primary px-3 py-2 text-sm lg:text-base font-medium transition-colors hover:underline underline-offset-4">评价</a>
              <a href="#recipes" className="text-gray-800 hover:text-primary px-3 py-2 text-sm lg:text-base font-medium transition-colors hover:underline underline-offset-4">菜谱</a>
              <a href="#channels" className="text-gray-800 hover:text-primary px-3 py-2 text-sm lg:text-base font-medium transition-colors hover:underline underline-offset-4">购买渠道</a>
              <a href="#contact" className="text-gray-800 hover:text-primary px-3 py-2 text-sm lg:text-base font-medium transition-colors hover:underline underline-offset-4">联系我们</a>
            </div>
          </div>

          {/* Tablet Menu - Medium */}
          <div className="hidden md:block lg:hidden">
            <div className="flex items-center space-x-2">
              <a href="#home" className="text-gray-800 hover:text-primary px-2 py-2 text-sm font-medium">首页</a>
              <a href="#products" className="text-gray-800 hover:text-primary px-2 py-2 text-sm font-medium">产品</a>
              <a href="#contact" className="text-gray-800 hover:text-primary px-2 py-2 text-sm font-medium">联系</a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-3 py-3 space-y-1">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 transform hover:translate-x-1"
            style={{animationDelay: '0.05s'}}
          >
            🏠 首页
          </a>
          <a
            href="#products"
            onClick={(e) => { e.preventDefault(); handleNavClick('products'); }}
            className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 transform hover:translate-x-1"
            style={{animationDelay: '0.1s'}}
          >
            🛒 产品
          </a>
          <a
            href="#quality"
            onClick={(e) => { e.preventDefault(); handleNavClick('quality'); }}
            className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 transform hover:translate-x-1"
            style={{animationDelay: '0.15s'}}
          >
            ✨ 品质
          </a>
          <a
            href="#nutrition"
            onClick={(e) => { e.preventDefault(); handleNavClick('nutrition'); }}
            className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 transform hover:translate-x-1"
            style={{animationDelay: '0.2s'}}
          >
            🥗 营养
          </a>
          <a
            href="#reviews"
            onClick={(e) => { e.preventDefault(); handleNavClick('reviews'); }}
            className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 transform hover:translate-x-1"
            style={{animationDelay: '0.25s'}}
          >
            ⭐ 评价
          </a>
          <a
            href="#recipes"
            onClick={(e) => { e.preventDefault(); handleNavClick('recipes'); }}
            className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 transform hover:translate-x-1"
            style={{animationDelay: '0.3s'}}
          >
            🍳 菜谱
          </a>
          <a
            href="#channels"
            onClick={(e) => { e.preventDefault(); handleNavClick('channels'); }}
            className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 transform hover:translate-x-1"
            style={{animationDelay: '0.35s'}}
          >
            📍 购买渠道
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 transform hover:translate-x-1"
            style={{animationDelay: '0.4s'}}
          >
            📞 联系我们
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
