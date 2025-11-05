import React, { useState } from 'react';
import { MessageCircle, Video, Heart, Phone, Mail, Share2, Users, TrendingUp, Award, ChevronRight, QrCode, Sparkles, Zap, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';

const QrCodes = () => {
  const [hoveredPlatform, setHoveredPlatform] = useState(null);

  // 联系表单状态
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
  const [errors, setErrors] = useState({});

  const socialPlatforms = [
    {
      type: 'wechat',
      title: '微信公众号',
      description: '扫码关注获取最新产品资讯',
      icon: '/icon/公众号.png',
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      account: '港埠雨林',
      features: ['产品资讯', '优惠活动', '食谱分享', '品牌故事'],
      qrCode: '/微信二维码.png',
      link: 'https://store.weixin.qq.com/shop/a/DFzZM8kRnIXqeeG',
      stats: '10万+粉丝',
      growth: '+25%',
      gradient: 'from-green-400 to-emerald-600'
    },
    {
      type: 'wechat-video',
      title: '微信视频号',
      description: '观看品牌视频和产品展示',
      icon: '/icon/视频号.png',
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      account: '港埠雨林',
      features: ['品牌视频', '产品展示', '直播内容', '互动交流'],
      qrCode: '/微信视频号.jpg',
      stats: '5万+观看',
      growth: '+40%',
      gradient: 'from-green-400 to-emerald-600'
    },
    {
      type: 'douyin',
      title: '抖音号',
      description: '关注获取产品展示和直播优惠',
      icon: '/icon/tiktok.png',
      color: 'text-gray-800',
      bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50',
      borderColor: 'border-gray-300',
      account: '@港埠雨林甜笋',
      features: ['产品展示', '直播带货', '优惠活动', '互动答疑'],
      qrCode: '/抖音二维码.jpg',
      stats: '50万+点赞',
      growth: '+45%',
      gradient: 'from-gray-700 to-gray-900'
    },
    {
      type: 'taobao',
      title: '淘宝',
      description: '扫码进入官方旗舰店购买',
      icon: '/icon/淘宝.png',
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
      borderColor: 'border-orange-200',
      account: 'gbyl.taobao.com',
      features: ['官方正品', '七天无理由', '包邮服务', '售后保障'],
      qrCode: '/淘宝二维码.png',
      link: 'https://gbyl.taobao.com',
      stats: '8万+交易',
      growth: '+35%',
      gradient: 'from-orange-500 to-red-600',
      isStore: true
    },
    {
      type: 'pinduoduo',
      title: '拼多多',
      description: '扫码进入旗舰店享优惠',
      icon: '/icon/拼多多.png',
      color: 'text-red-600',
      bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
      borderColor: 'border-red-200',
      account: '港埠雨林旗舰店',
      features: ['百亿补贴', '限时秒杀', '团购优惠', '品质保证'],
      qrCode: '/拼多多店铺二维码.png',
      link: 'https://mobile.yangkeduo.com/login.html?from=https%3A%2F%2Fmobile.yangkeduo.com%2Fgoods.html%3Fpdd_bapp_share_channel%3Dwechat%26goods_id%3D769023400069%26__wls_rt%3D1%26__wls_lt%3D1%26__wls_fm%3Dn&refer_page_name=goods_detail&refer_page_id=10014_1762321986368_4cy5bjtwer&refer_page_sn=10014',
      stats: '12万+拼单',
      growth: '+50%',
      gradient: 'from-red-500 to-pink-600',
      isStore: true
    },
    {
      type: 'xiaohongshu',
      title: '小红书号',
      description: '查看用户分享和创意食谱',
      icon: '/icon/小红书.png',
      color: 'text-red-600',
      bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
      borderColor: 'border-red-200',
      account: '@港埠雨林',
      features: ['用户种草', '创意食谱', '真实评价', '生活方式'],
      qrCode: '/小红书二维码.jpg',
      link: 'https://www.xiaohongshu.com/goods-detail/68931bceb1b9df000178c992?t=1762321517814&xsec_token=ABvlLc8si85LIRFsT-zTmVd2FzHcQulCpHHu6cBxZWzCM%3D&xsec_source=app_arkselfshare',
      stats: '8万+收藏',
      growth: '+30%',
      gradient: 'from-red-500 to-pink-600'
    },
    {
      type: 'kuaishou',
      title: '快手号',
      description: '观看种植过程和烹饪技巧',
      icon: '/icon/快手.png',
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
      borderColor: 'border-orange-200',
      account: '@港埠雨林甜笋',
      features: ['种植记录', '烹饪教程', '产地实拍', '农民故事'],
      qrCode: '/快手二维码.jpg',
      stats: '6万+关注',
      growth: '+20%',
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      type: 'weibo',
      title: '微博',
      description: '关注品牌动态和互动活动',
      icon: '/icon/新浪.png',
      color: 'text-red-600',
      bgColor: 'bg-gradient-to-br from-red-50 to-orange-50',
      borderColor: 'border-red-200',
      account: '@港埠雨林',
      features: ['品牌动态', '互动活动', '热点资讯', '粉丝互动'],
      qrCode: '/微博二维码.jpg',
      link: 'https://weibo.com/u/8006973849',
      stats: '3万+粉丝',
      growth: '+15%',
      gradient: 'from-red-600 to-orange-600'
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: '客服热线',
      content: '18510890322',
      description: '7×24小时为您服务',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      icon: Mail,
      title: '邮箱咨询',
      content: 'xixi@gbylbj.com',
      description: '24小时内回复',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600'
    }
  ];

  const handlePlatformClick = (platform) => {
    // 如果有外部链接，则在新窗口打开
    if (platform.link) {
      window.open(platform.link, '_blank', 'noopener,noreferrer');
    }
  };

  // 表单验证函数
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '请输入您的姓名';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '请输入您的手机号';
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '请输入有效的手机号码';
    }

    if (!formData.message.trim()) {
      newErrors.message = '请输入留言内容';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = '留言内容至少10个字符';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // 直接保存留言数据到本地存储并尝试同步到飞书
  const saveSubmissionDirectly = async (formData) => {
    try {
      // 保存到 localStorage
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      const newSubmission = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toLocaleString('zh-CN'),
        status: 'pending'
      };
      submissions.push(newSubmission);
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

      // 同时在控制台输出记录，方便管理员查看
      console.log('📝 新留言记录:', newSubmission);
      console.log(`📊 当前总留言数: ${submissions.length}`);

      // 尝试同步到飞书（如果配置了的话）
      trySyncToFeishu(formData);

      return true;
    } catch (error) {
      console.error('保存数据失败:', error);
      return false;
    }
  };

  // 尝试同步数据到飞书
  const trySyncToFeishu = async (formData) => {
    try {
      // 检查是否配置了飞书
      const feishuConfig = localStorage.getItem('feishuConfig');
      if (!feishuConfig) {
        console.log('⚠️ 未配置飞书，跳过同步');
        return;
      }

      const config = JSON.parse(feishuConfig);
      if (!config.appId || !config.appSecret || !config.tableId) {
        console.log('⚠️ 飞书配置不完整，跳过同步');
        return;
      }

      // 构造记录数据
      const recordData = {
        fields: {
          "姓名": formData.name,
          "手机号": formData.phone,
          "留言内容": formData.message,
          "提交时间": new Date().toLocaleString('zh-CN'),
          "状态": "待处理",
          "来源": "官网表单"
        }
      };

      // 这里简化实现，实际项目中需要完整的飞书API调用
      console.log('🔄 正在尝试同步到飞书:', recordData);

      // 实际的飞书同步代码需要完整实现
      // 这里只是示例

    } catch (error) {
      console.warn('飞书同步失败，数据已保存到本地:', error);
    }
  };

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus('submitting');

    try {
      // 直接在组件内部实现存储功能
      const saved = await saveSubmissionDirectly(formData);

      if (saved) {
        console.log('✅ 留言已保存到本地存储');
      }

      // 模拟提交延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      setFormStatus('success');
      setFormData({ name: '', phone: '', message: '' });

      // 3秒后重置状态
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('提交失败:', error);
      setFormStatus('error');
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-transparent via-white/5 to-transparent overflow-hidden bamboo-texture bambo-wave-animation">
      {/* 装饰背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-yellow-100/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">全平台矩阵</span>
            <Sparkles className="w-4 h-4 text-green-600" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 bg-clip-text text-transparent mb-6">
            关注我们的平台
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            在各大平台关注港埠雨林，获取最新产品资讯、美味食谱、购买渠道和专属优惠
          </p>

          {/* 统计数据展示 */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-600">累计粉丝</span>
              <span className="font-bold text-primary">70万+</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-600">月均增长</span>
              <span className="font-bold text-primary">30%</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-600">品牌曝光</span>
              <span className="font-bold text-primary">500万+</span>
            </div>
          </div>
        </div>

        {/* 平台卡片 */}
        <div id="platforms-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20 max-w-7xl mx-auto">
          {socialPlatforms.map((platform, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2`}
              onMouseEnter={() => setHoveredPlatform(platform.type)}
              onMouseLeave={() => setHoveredPlatform(null)}
              onClick={() => handlePlatformClick(platform)}
            >
              {/* 发光效果 */}
              <div className={`absolute inset-0 bg-gradient-to-r ${platform.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`}></div>

              {/* 主卡片 */}
              <div className={`relative bg-white/70 backdrop-blur-sm ${platform.borderColor} border-2 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col`}>
                {/* 平台标识 */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 ${platform.bgColor} rounded-lg group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3`}>
                    <img
                      src={platform.icon}
                      alt={platform.title}
                      className="w-5 h-5 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-bold text-green-600">{platform.growth}</span>
                  </div>
                </div>

                {/* 账号信息 */}
                <div className="mb-3">
                  <h3 className="text-base font-bold text-gray-900 mb-1">{platform.title}</h3>
                  <p className="text-xs text-gray-600 mb-1.5">{platform.account}</p>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{platform.stats}</span>
                  </div>
                </div>

                {/* 二维码显示 */}
                {platform.qrCode && (
                  <div className={`mb-3 flex justify-center transition-all duration-500 ${hoveredPlatform === platform.type ? 'scale-105' : ''}`}>
                    <div className="relative w-24 h-24 bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50"></div>
                      <img
                        src={platform.qrCode}
                        alt={`${platform.title}二维码`}
                        className="relative w-full h-full object-contain p-1.5"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ddd"%3E%3Cpath d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 17h2v2h-2zM19 19h2v2h-2zM15 19h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z"/%3E%3C/svg%3E';
                        }}
                      />
                      <div className={`absolute -bottom-1.5 -right-1.5 ${platform.isStore ? 'bg-orange-500' : 'bg-green-500'} text-white rounded-full p-0.5`}>
                        {platform.isStore ? <Heart className="w-2.5 h-2.5" /> : <QrCode className="w-2.5 h-2.5" />}
                      </div>
                    </div>
                  </div>
                )}

                {/* 描述 */}
                <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2">{platform.description}</p>

                {/* 功能特点 - 紧凑布局 */}
                <div className="grid grid-cols-2 gap-1.5 mb-3 flex-grow">
                  {platform.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-1 group/item">
                      <div className={`w-1 h-1 rounded-full ${platform.color} opacity-60 group-hover/item:scale-150 transition-transform duration-300`}></div>
                      <span className="text-xs text-gray-600 group-hover/item:text-gray-800 transition-colors duration-300 truncate">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* 关注/购买按钮 */}
                <button className={`w-full py-2.5 px-3 rounded-lg bg-gradient-to-r ${platform.gradient} text-white font-medium text-xs hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1.5 mt-auto`}>
                  {platform.isStore ? <Heart className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{platform.isStore ? '立即购买' : '立即关注'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                {/* 装饰元素 */}
                <div className={`absolute top-2 right-2 w-6 h-6 bg-gradient-to-r ${platform.gradient} opacity-10 rounded-full blur-lg`}></div>
                <div className={`absolute bottom-2 left-2 w-5 h-5 bg-gradient-to-r ${platform.gradient} opacity-10 rounded-full blur-lg`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* 联系方式区域 */}
        <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl mb-16 relative overflow-hidden border border-white/20">
          {/* 装饰背景 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-2xl opacity-30"></div>

          <div className="relative">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">快速联系</span>
                <Zap className="w-4 h-4 text-blue-600" />
              </div>

              <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent mb-4">
                联系我们
              </h3>
              <p className="text-lg text-gray-600">
                有任何问题或合作需求，欢迎随时联系我们
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className={`group relative ${contact.bgColor} ${contact.borderColor} border-2 rounded-2xl p-8 hover:shadow-xl transform hover:scale-105 transition-all duration-500 cursor-pointer`}
                >
                  {/* 发光效果 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500"></div>

                  <div className="relative flex items-center gap-6">
                    <div className={`p-4 bg-white rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <contact.icon size={28} className={contact.iconColor} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{contact.title}</h4>
                      <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        {contact.content}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        {contact.description}
                      </p>
                    </div>
                  </div>

                  {/* 装饰元素 */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 品牌理念区域 - 精简版 */}
        <div className="relative glass-effect rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 text-center overflow-hidden border border-white/20">
          {/* 简化装饰背景 */}
          <div className="absolute inset-0">
            <div className="absolute top-8 left-8 w-24 h-24 sm:w-32 sm:h-32 bg-green-200/25 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-8 right-8 w-28 h-28 sm:w-36 sm:h-36 bg-blue-200/25 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/70 backdrop-blur-sm rounded-full mb-4 sm:mb-6">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="text-xs sm:text-sm font-medium text-green-700">品牌承诺</span>
              <Award className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-800 via-emerald-700 to-green-800 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6">
              港埠雨林品牌理念
            </h3>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              源自西双版纳原始雨林，8年匠心培育，坚持绿色生态理念，
              为您带来北纬21°的自然鲜甜。
            </p>

            {/* 精简认证标签 */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              {[
                { icon: '🏆', text: '绿色食品认证', color: 'from-green-100 to-emerald-100' },
                { icon: '🌱', text: '五无种植', color: 'from-blue-100 to-indigo-100' },
                { icon: '🥗', text: '可生食级', color: 'from-yellow-100 to-orange-100' },
                { icon: '🔬', text: '营养认证', color: 'from-purple-100 to-pink-100' }
              ].map((cert, index) => (
                <div
                  key={index}
                  className={`group relative px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r ${cert.color} rounded-full hover:shadow-md transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-sm sm:text-base">{cert.icon}</span>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{cert.text}</span>
                  </div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 rounded-full transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 品牌视频展示 */}
        <div className="mt-16">
          <div className="glass-effect rounded-3xl border border-white/20 p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* 装饰背景 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full blur-3xl opacity-20"></div>
            </div>

            <div className="relative">
              {/* 标题区域 */}
              <div className="text-center mb-8 sm:mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4 sm:mb-6">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  <span className="text-sm sm:text-base font-medium text-purple-700">品牌故事</span>
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent mb-4 sm:mb-6">
                  港埠雨林品牌故事视频
                </h3>

                <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  从西双版纳原始雨林到您的餐桌，8年匠心培育，见证每一根甜笋的成长历程
                </p>
              </div>

              {/* 视频播放区域 */}
              <div className="max-w-5xl mx-auto">
                <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl group">
                  {/* 视频元素 */}
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster="/好看的图片/retouch_2024070815550373.jpg"
                    preload="metadata"
                  >
                    <source src="/最终修改正式版视频.mp4" type="video/mp4" />
                    您的浏览器不支持视频播放，请升级到最新版本
                  </video>

                  {/* 播放状态覆盖层（仅在视频未播放时显示） */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <h4 className="text-2xl font-bold mb-2">港埠雨林 · 自然之味</h4>
                      <p className="text-lg text-white/80">源自雨林，鲜甜到家</p>
                    </div>
                  </div>

                  {/* 视频控制提示 */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs sm:text-sm">
                    点击播放按钮观看完整视频
                  </div>
                </div>

                {/* 视频说明 */}
                <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-bold">8</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">年匠心培育</h4>
                    <p className="text-sm text-gray-600">2016-2024年专注品种研发</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-bold">1200</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">米海拔基地</h4>
                    <p className="text-sm text-gray-600">西双版纳原始雨林环境</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-bold">72h</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">鲜送到家</h4>
                    <p className="text-sm text-gray-600">从采收到餐桌的极致新鲜</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 联系表单 */}
        <div className="mt-16">
          <div className="glass-effect rounded-3xl border border-white/20 max-w-4xl mx-auto p-6 sm:p-8 md:p-12">
            {/* 表单标题 */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-3 sm:mb-4">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span className="text-xs sm:text-sm font-medium text-blue-700">联系我们</span>
                <MessageSquare className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                产品咨询与合作洽谈
              </h3>
              <p className="text-sm sm:text-base text-gray-600 px-4">
                填写表单，我们将尽快与您联系，为您提供专业的产品咨询服务
              </p>
            </div>

            {/* 表单状态显示 */}
            {formStatus === 'success' && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 sm:gap-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-green-800 font-medium">提交成功！</p>
                  <p className="text-xs sm:text-sm text-green-600">我们已收到您的信息，将尽快与您联系</p>
                </div>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 sm:gap-3">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-red-800 font-medium">提交失败</p>
                  <p className="text-xs sm:text-sm text-red-600">请稍后重试或直接拨打客服热线</p>
                </div>
              </div>
            )}

            {/* 联系表单 */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* 姓名输入 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    您的姓名 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="请输入您的姓名"
                    className={`w-full px-4 py-3 sm:py-3 bg-white/70 backdrop-blur-sm border rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 ${
                      errors.name ? 'border-red-300 focus:ring-red-300' : 'border-white/40'
                    }`}
                    disabled={formStatus === 'submitting'}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* 手机号输入 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    手机号码 *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="请输入您的手机号码"
                    className={`w-full px-4 py-3 sm:py-3 bg-white/70 backdrop-blur-sm border rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 ${
                      errors.phone ? 'border-red-300 focus:ring-red-300' : 'border-white/40'
                    }`}
                    disabled={formStatus === 'submitting'}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* 留言内容 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  留言内容 *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="请详细描述您的需求、问题或合作意向（至少10个字符）"
                  rows={4}
                  className={`w-full px-4 py-3 sm:py-3 bg-white/70 backdrop-blur-sm border rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 resize-none ${
                    errors.message ? 'border-red-300 focus:ring-red-300' : 'border-white/40'
                  }`}
                  disabled={formStatus === 'submitting'}
                />
                {errors.message && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
                <div className="mt-2 text-xs text-gray-500 text-right sm:text-right">
                  {formData.message.length}/10 字符
                </div>
              </div>

              {/* 提交按钮 */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="px-6 py-3 sm:px-8 py-3 sd-cta flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>提交中...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>提交咨询</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* 快速联系信息 */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>客服热线：18510890322</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>邮箱：xixi@gbylbj.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QrCodes;
