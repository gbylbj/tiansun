import React, { createContext, useContext, useReducer, useEffect } from 'react';

// 购物车状态管理
const CartContext = createContext();

// 购物车Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          lastUpdated: Date.now()
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          lastUpdated: Date.now()
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        lastUpdated: Date.now()
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
        lastUpdated: Date.now()
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        lastUpdated: Date.now()
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
        lastUpdated: Date.now()
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };

    case 'SET_COUPON':
      return {
        ...state,
        coupon: action.payload
      };

    case 'REMOVE_COUPON':
      return {
        ...state,
        coupon: null
      };

    default:
      return state;
  }
};

// 初始状态
const initialState = {
  items: [],
  isOpen: false,
  coupon: null,
  lastUpdated: Date.now()
};

// 购物车Provider组件
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // 从本地存储加载购物车
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('gbylbj_cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart.items || [] });
      }
    } catch (error) {
      console.warn('加载购物车数据失败:', error);
    }
  }, []);

  // 保存购物车到本地存储
  useEffect(() => {
    try {
      localStorage.setItem('gbylbj_cart', JSON.stringify({
        items: state.items,
        lastUpdated: state.lastUpdated
      }));
    } catch (error) {
      console.warn('保存购物车数据失败:', error);
    }
  }, [state.items, state.lastUpdated]);

  // 计算总价
  const getTotalPrice = () => {
    const subtotal = state.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    let discount = 0;
    if (state.coupon) {
      discount = subtotal * (state.coupon.discount / 100);
    }

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      total: Math.round((subtotal - discount) * 100) / 100
    };
  };

  // 计算总数量
  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  // 添加到购物车
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  // 从购物车移除
  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  // 更新数量
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  // 清空购物车
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // 切换购物车显示状态
  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  // 设置优惠券
  const setCoupon = (coupon) => {
    dispatch({ type: 'SET_COUPON', payload: coupon });
  };

  // 移除优惠券
  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };

  const value = {
    ...state,
    items: state.items,
    isOpen: state.isOpen,
    coupon: state.coupon,
    totalPrice: getTotalPrice(),
    totalItems: getTotalItems(),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    setCoupon,
    removeCoupon
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// 自定义Hook使用购物车
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;