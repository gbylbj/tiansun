import React, { useState } from 'react';
import { Store, ShoppingCart, Users, Phone, Mail, Clock, X } from 'lucide-react';
import PlatformStores from './PlatformStores';

const Channels = () => {
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const channels = [
    {
      icon: ShoppingCart,
      title: '官方商城',
      description: '多平台官方店铺同步销售',
      features: ['正品保证', '同步上新', '平台优惠', '官方售后'],
      contact: {
        type: '合作平台',
        value: '淘宝、抖音、拼多多、小红书、微信',
        action: '前往购买'
      },
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      buttonText: '选择购买平台'
    },
    {
      icon: Store,
      title: '餐饮商超',
      description: '专注商超和餐饮企业供应',
      features: ['批量供应', '品质稳定', '冷链配送', '定制服务'],
      contact: {
        type: '服务范围',
        value: '全国中高端餐饮企业、连锁商超',
        action: '合作咨询'
      },
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      buttonText: '商超合作'
    },
    {
      icon: Users,
      title: '企业团购',
      description: '批量采购，专属优惠',
      features: ['批量优惠', '定制包装', '发票服务', '专属客服'],
      contact: {
        type: '团购热线',
        value: '18510890322',
        action: '立即咨询'
      },
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600',
      buttonText: '团购咨询'
    }
  ];

  const baseInfo = [
    {
      title: '种植基地',
      content: '北纬21°西双版纳原始雨林',
      description: '20000亩专属种植基地，每日10小时充足阳光，20℃适宜温差，大黑山山泉水灌溉'
    },
    {
      title: '认证资质',
      content: '绿色食品A级认证',
      description: '有机转换认证、国际竹类新品种登录证书，无农药、无化肥、无除草剂、无激素、无转基因'
    },
    {
      title: '产品特色',
      content: '可生食水果笋',
      description: '含18种氨基酸，高蛋白低脂肪，无草酸无嘌呤，老人、小孩、孕妇、痛风及三高人群皆可食用'
    },
    {
      title: '物流保障',
      content: '顺丰陆运配送',
      description: '泡沫箱加冰袋包装，发货后3-4天送达，全程保鲜，确保产品品质'
    }
  ];

  return (
    <section id="channels" className="py-20 bg-gradient-to-br from-transparent via-white/5 to-transparent overflow-hidden bamboo-texture bambo-wave-animation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            多种购买渠道
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            选择最适合您的购买方式，随时随地享受新鲜甜笋
          </p>
        </div>

        {/* 购买渠道卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {channels.map((channel, index) => (
            <div
              key={index}
              className={`border-2 ${channel.color} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group`}
            >
              {/* 图标和标题 */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${channel.color}`}>
                  <channel.icon size={32} className={channel.iconColor} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{channel.title}</h3>
                  <p className="text-sm text-gray-600">{channel.description}</p>
                </div>
              </div>

              {/* 特点列表 */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3">
                  {channel.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${channel.iconColor} bg-current`}></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 联系信息 */}
              <div className={`p-4 rounded-xl ${channel.color} mb-6`}>
                <div className="text-sm text-gray-600 mb-1">{channel.contact.type}</div>
                <div className="font-semibold text-gray-900 mb-2">{channel.contact.value}</div>
              </div>

              {/* 操作按钮 */}
              <button
                className="w-full bg-primary hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                onClick={() => {
                  if (channel.title === '官方商城') {
                    // 滚动到平台区域而不是弹出窗口
                    const platformsElement = document.getElementById('platforms-grid');
                    if (platformsElement) {
                      platformsElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }
                }}
              >
                {channel.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* 品质保障 */}
        <div className="glass-effect rounded-2xl p-8 shadow-2xl mb-16 border border-white/20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            港埠雨林品质保障
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {baseInfo.map((info, index) => (
              <div key={index} className="text-center p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">{index + 1}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">{info.title}</h4>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-800 bg-white/70 px-3 py-2 rounded-lg">
                    {info.content}
                  </div>
                  <div className="text-xs text-gray-600 px-2">
                    {info.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button className="text-primary hover:text-primary/80 font-medium transition-colors">
              了解更多详情 →
            </button>
          </div>
        </div>

        {/* 联系方式汇总 */}
        <div className="glass-effect rounded-2xl p-8 shadow-2xl border border-white/20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            客服服务
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-3 sm:p-4 lg:p-6 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl">
              <Phone className="mx-auto mb-2 sm:mb-3 text-primary" size={28} />
              <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base lg:text-lg">客服热线</h4>
              <p className="text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm">18510890322</p>
              <div className="flex items-center justify-center gap-1 text-xs sm:text-sm text-gray-500">
                <Clock size={14} />
                <span>7×24小时服务</span>
              </div>
            </div>

            <div className="text-center p-3 sm:p-4 lg:p-6 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl">
              <Mail className="mx-auto mb-2 sm:mb-3 text-primary" size={28} />
              <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base lg:text-lg">邮箱咨询</h4>
              <p className="text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm break-all">xixi@gbylbj.com</p>
              <div className="text-xs sm:text-sm text-gray-500">24小时内回复</div>
            </div>

            <div className="text-center p-3 sm:p-4 lg:p-6 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl col-span-2 sm:col-span-1 lg:col-span-1">
              <Users className="mx-auto mb-2 sm:mb-3 text-primary" size={28} />
              <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base lg:text-lg">在线客服</h4>
              <p className="text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm">官网/微信/APP</p>
              <div className="text-xs sm:text-sm text-gray-500">实时在线答疑</div>
            </div>
          </div>
        </div>

        {/* 购买提示 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            * 不同渠道的促销活动和库存情况可能有所不同，请以实际为准
          </p>
        </div>

        {/* 平台选择弹窗 */}
        {showPlatformModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="glass-effect rounded-2xl max-w-5xl w-full border border-white/20 relative">
              {/* 关闭按钮 - 固定在右上角 */}
              <button
                onClick={() => setShowPlatformModal(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl border border-white/30"
              >
                <X size={20} className="text-gray-600 hover:text-gray-800" />
              </button>

              {/* 弹窗内容 - 无滚动 */}
              <div className="p-4 sm:p-6">
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">选择购买平台</h3>
                  <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
                    全平台官方店铺同步销售，选择您习惯的购物平台
                  </p>
                </div>

                {/* 平台网格 - 紧凑布局 */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { name: '淘宝', logo: '/icon/淘宝.png', description: '官方旗舰店', link: 'https://gbyl.taobao.com', color: 'bg-orange-50 border-orange-200' },
                    { name: '抖音', logo: '/icon/tiktok.png', description: '直播专享', link: 'https://haohuo.jinritemai.com/ecommerce/trade/detail/index.html?id=3760257472175145398&origin_type=604', color: 'bg-gray-50 border-gray-200' },
                    { name: '拼多多', logo: '/icon/拼多多.png', description: '百亿补贴', link: 'https://mobile.yangkeduo.com/login.html?from=https%3A%2F%2Fmobile.yangkeduo.com%2Fgoods.html%3Fpdd_bapp_share_channel%3Dwechat%26goods_id%3D769023400069%26__wls_rt%3D1%26__wls_lt%3D1%26__wls_fm%3Dn&refer_page_name=goods_detail&refer_page_id=10014_1762321986368_4cy5bjtwer&refer_page_sn=10014', color: 'bg-red-50 border-red-200' },
                    { name: '小红书', logo: '/icon/小红书.png', description: '种草推荐', link: 'https://www.xiaohongshu.com/goods-detail/68931bceb1b9df000178c992?t=1762321517814&xsec_token=ABvlLc8si85LIRFsT-zTmVd2FzHcQulCpHHu6cBxZWzCM%3D&xsec_source=app_arkselfshare', color: 'bg-pink-50 border-pink-200' },
                    { name: '微信小店', logo: '/icon/微信.png', description: '微信生态', link: 'https://store.weixin.qq.com/shop/a/DFzZM8kRnIXqeeG', color: 'bg-green-50 border-green-200' },
                    { name: '快手', logo: '/icon/快手.png', description: '短视频', link: 'https://www.kuaishou.com/search/video?searchKey=%E6%B8%AF%E5%9F%A0%E9%9B%A8%E6%9E%97%E7%94%9C%E7%AC%8B', color: 'bg-orange-50 border-orange-200' },
                    { name: '视频号', logo: '/icon/视频号.png', description: '微信视频', link: 'https://channels.weixin.qq.com/', color: 'bg-green-50 border-green-200' },
                    { name: '新浪微博', logo: '/icon/新浪.png', description: '官方微博', link: 'https://weibo.com/u/8006973849', color: 'bg-red-50 border-red-200' }
                  ].map((platform, index) => (
                    <div
                      key={index}
                      className={`border-2 ${platform.color} rounded-lg p-3 sm:p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105`}
                      onClick={() => {
                        window.open(platform.link, '_blank', 'noopener,noreferrer');
                        setShowPlatformModal(false);
                      }}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 mb-2 flex items-center justify-center bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                          <img
                            src={platform.logo}
                            alt={platform.name}
                            loading="lazy"
                            decoding="async"
                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                          />
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{platform.name}</h4>
                        <p className="text-xs text-gray-600">{platform.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 提示信息 */}
                <div className="text-center mt-4">
                  <p className="text-xs text-gray-500">
                    * 各平台优惠活动可能不同，请以实际页面显示为准
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Channels;
