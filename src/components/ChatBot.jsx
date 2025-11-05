import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, Phone, Clock, Check } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(true); // 默认打开客服机器人
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // 智能回复数据
  const responses = {
    greetings: [
      "您好！我是港埠雨林甜笋的智能助手小竹，很高兴为您服务！🎋",
      "欢迎来到港埠雨林！我可以帮您了解我们的甜笋产品。有什么需要帮助的吗？",
      "您好！我是小竹，您可以问我关于产品、营养、价格或购买渠道的问题。"
    ],
    product: {
      "甜笋": "港埠雨林甜笋是来自北纬21°西双版纳的可生食水果笋，经过8年匠心培育，绿色食品A级认证，无农药无化肥，富含18种氨基酸！我们提供三种规格：\n\n🥇 零售家庭装：500g，¥68\n🥈 线下商超装：400g，¥58\n🥉 餐饮酒店装：300g×2盒，¥158",
      "营养": "我们的甜笋营养价值很高：\n🥬 低热量：每100g仅15千卡\n💪 高蛋白：2.4g蛋白质\n🌿 高纤维：2.8g膳食纤维\n🔍 富含18种氨基酸\n特别适合健身、减肥、三高人群食用！",
      "价格": "我们提供三种包装规格：\n💰 零售家庭装：¥68（500g）\n💰 商超装：¥58（400g）\n💰 餐饮装：¥158（300g×2盒）\n支持全国冷链配送，当日发货！",
      "包装": "我们提供三种包装：\n📦 零售家庭装：适合家庭日常使用\n🏪 线下商超装：规格统一，适合门店销售\n🍽️ 餐饮酒店装：大宗供货，适合餐厅酒店"
    },
    purchase: {
      "购买": "您可以通过以下方式购买：\n🛒 线上购买：扫描网站二维码进入店铺\n📞 电话订购：400-888-8888\n🏢 线下门店：西双版纳景洪市门店\n💬 微信客服：添加客服微信下单",
      "配送": "我们提供专业冷链配送：\n🚚 当日发货：下单后24小时内发出\n❄️ 冷链包装：全程温控保鲜\n📦 全国配送：覆盖全国主要城市\n🔄 退换保障：7天无理由退换",
      "支付": "支持多种支付方式：\n💳 微信支付\n💰 支付宝\n🏦 银行转账\n💸 货到付款"
    },
    company: {
      "关于我们": "港埠雨林农业科技有限公司成立于2016年，位于云南西双版纳，专注于高品质甜笋的种植、加工和销售。我们拥有8年的种植经验，获得绿色食品A级认证，产品远销全国！",
      "证书": "我们拥有完整的认证体系：\n🏆 绿色食品A级认证\n🌿 有机转换认证\n🌍 国际竹类新品种登录证书\n📋 林木良种证\n🔬 SGS检测报告",
      "地址": "公司地址：云南省西双版纳傣族自治州景洪市\n📞 联系电话：400-888-8888\n🌐 官网：www.gbylbj.com\n📧 邮箱：service@gbylbj.com"
    },
    help: {
      "售后": "我们提供完善的售后服务：\n✅ 7天无理由退换\n✅ 24小时客服响应\n✅ 产品质量问题包退换\n✅ 配送问题及时处理\n✅ 使用指导服务",
      "保存": "甜笋保存方法：\n❄️ 冷藏保存：2-8°C，可保存7天\n🧊 冷冻保存：-18°C，可保存6个月\n📦 常温保存：阴凉干燥处，2天内食用完\n💡 开封后请尽快食用，保持最佳口感"
    },
    default: [
      "抱歉，我暂时不太理解您的问题。您可以问我关于产品、价格、购买方式等问题。",
      "您可以尝试问我：甜笋、价格、营养、购买、配送等关键词。",
      "如果您有具体问题，可以拨打客服热线：400-888-8888"
    ]
  };

  // 初始化欢迎消息和事件监听
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      sender: 'bot',
      text: responses.greetings[0],
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcomeMessage]);

    // 监听产品咨询事件
    const handleProductInquiry = (event) => {
      const { productName } = event.detail;
      const productMessage = {
        id: Date.now(),
        sender: 'user',
        text: `我想了解${productName}的详细信息`,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, productMessage]);
      setIsOpen(true);
      setUnreadCount(0);

      // 自动回复产品信息
      setTimeout(() => {
        const response = {
          id: Date.now() + 1,
          sender: 'bot',
          text: generateResponse(productName),
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    };

    window.addEventListener('openChatBot', handleProductInquiry);
    return () => window.removeEventListener('openChatBot', handleProductInquiry);
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 智能回复生成
  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();

    // 检查产品相关关键词
    if (input.includes('甜笋') || input.includes('产品')) {
      return responses.product['甜笋'];
    }
    if (input.includes('营养') || input.includes('蛋白') || input.includes('热量')) {
      return responses.product['营养'];
    }
    if (input.includes('价格') || input.includes('多少钱') || input.includes('贵')) {
      return responses.product['价格'];
    }
    if (input.includes('包装') || input.includes('规格')) {
      return responses.product['包装'];
    }

    // 检查购买相关关键词
    if (input.includes('购买') || input.includes('买') || input.includes('下单')) {
      return responses.purchase['购买'];
    }
    if (input.includes('配送') || input.includes('发货') || input.includes('物流')) {
      return responses.purchase['配送'];
    }
    if (input.includes('支付') || input.includes('付款')) {
      return responses.purchase['支付'];
    }

    // 检查公司相关关键词
    if (input.includes('关于') || input.includes('公司') || input.includes('你们')) {
      return responses.company['关于我们'];
    }
    if (input.includes('证书') || input.includes('认证') || input.includes('资质')) {
      return responses.company['证书'];
    }
    if (input.includes('地址') || input.includes('电话') || input.includes('联系')) {
      return responses.company['地址'];
    }

    // 检查帮助相关关键词
    if (input.includes('售后') || input.includes('退换') || input.includes('保障')) {
      return responses.help['售后'];
    }
    if (input.includes('保存') || input.includes('存储') || input.includes('保鲜')) {
      return responses.help['保存'];
    }

    // 默认回复
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模拟机器人回复延迟
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        text: generateResponse(inputValue),
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // 如果聊天窗口关闭，增加未读计数
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
      // 聚焦输入框
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const quickActions = [
    { text: '产品介绍', icon: '🎋', action: () => setInputValue('甜笋产品介绍') },
    { text: '价格查询', icon: '💰', action: () => setInputValue('甜笋价格') },
    { text: '营养信息', icon: '🥬', action: () => setInputValue('甜笋营养成分') },
    { text: '购买方式', icon: '🛒', action: () => setInputValue('如何购买甜笋') },
    { text: '联系客服', icon: '📞', action: () => setInputValue('人工客服') }
  ];

  // 如果聊天窗口关闭，显示浮动按钮
  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 z-50 group"
      >
        <div className="relative">
          <Bot size={24} className="group-hover:scale-110 transition-transform" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
              {unreadCount}
            </span>
          )}
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            小竹智能客服
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80' : 'w-96'
    }`}>
      {/* 聊天窗口 */}
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot size={24} className="animate-pulse" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-300 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold">小竹智能客服</h3>
                <p className="text-xs opacity-90">在线中 · 智能回复</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleMinimize}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                title={isMinimized ? '最大化' : '最小化'}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                title="关闭"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 聊天内容 - 仅在非最小化时显示 */}
        {!isMinimized && (
          <>
            {/* 消息区域 */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-gray-800 shadow-sm'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-line">{message.text}</div>
                      <div className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                {/* 正在输入指示器 */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 shadow-sm p-3 rounded-lg">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* 快捷操作 */}
            <div className="p-3 bg-white border-t border-gray-200">
              <div className="flex space-x-2 overflow-x-auto">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="flex-shrink-0 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full transition-colors flex items-center space-x-1"
                  >
                    <span>{action.icon}</span>
                    <span>{action.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 输入区域 */}
            <div className="p-3 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入您的问题..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>小竹正在努力为您服务</span>
                <div className="flex items-center space-x-1">
                  <Phone size={12} />
                  <span>400-888-8888</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBot;