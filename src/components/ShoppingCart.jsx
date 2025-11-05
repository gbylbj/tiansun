import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, Tag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ShoppingCart = () => {
  const {
    items,
    isOpen,
    totalPrice,
    totalItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    coupon,
    setCoupon,
    removeCoupon
  } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const couponCode = e.target.couponCode.value.trim().toUpperCase();

    // 模拟优惠券验证
    const validCoupons = {
      'WELCOME10': { discount: 10, description: '新用户专享9折' },
      'SAVE20': { discount: 20, description: '满200减20' },
      'VIP30': { discount: 30, description: 'VIP会员专享7折' }
    };

    if (validCoupons[couponCode]) {
      setCoupon({ ...validCoupons[couponCode], code: couponCode });
      e.target.reset();
    } else {
      alert('无效的优惠券码');
    }
  };

  const handleCheckout = () => {
    // 这里可以集成支付系统或跳转到结算页面
    const orderData = {
      items,
      totalPrice,
      coupon,
      timestamp: new Date().toISOString()
    };

    console.log('订单信息:', orderData);
    alert('订单已提交！感谢您的购买！');

    // 清空购物车
    clearCart();
    toggleCart();
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleCart}
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 z-50 flex items-center space-x-2 group"
      >
        <ShoppingBag size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
        <span className="hidden md:block group-hover:block">
          购物车
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={toggleCart}
      />

      {/* 购物车面板 */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <ShoppingBag size={24} />
            <span>购物车 ({totalItems})</span>
          </h2>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 购物车内容 */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBag size={48} className="mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">购物车是空的</p>
              <p className="text-sm mb-4">快去选择您喜欢的产品吧！</p>
              <button
                onClick={toggleCart}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                去购物
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {/* 商品列表 */}
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.weight}</p>
                    <p className="text-green-600 font-bold">¥{item.price}</p>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    {/* 数量控制 */}
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* 删除按钮 */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* 优惠券 */}
              <div className="border-t pt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Tag size={16} />
                  <span className="font-medium">优惠券</span>
                </div>

                {coupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">{coupon.code}</p>
                      <p className="text-sm text-green-600">{coupon.description}</p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                    <input
                      type="text"
                      name="couponCode"
                      placeholder="输入优惠券码"
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      应用
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 底部结算 */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>小计</span>
                <span>¥{totalPrice.subtotal}</span>
              </div>
              {coupon && (
                <div className="flex justify-between text-green-600">
                  <span>优惠 ({coupon.code})</span>
                  <span>-¥{totalPrice.discount}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg">
                <span>总计</span>
                <span className="text-green-600">¥{totalPrice.total}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={clearCart}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                清空
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                去结算
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;