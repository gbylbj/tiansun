import React from 'react';

const PlatformStores = () => {
  const platforms = [
    {
      name: '淘宝',
      logo: '/icon/淘宝.png',
      description: '官方旗舰店正品保障',
      link: 'https://gbyl.taobao.com',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      name: '抖音',
      logo: '/icon/tiktok.png',
      description: '直播专属优惠',
      link: 'https://haohuo.jinritemai.com/ecommerce/trade/detail/index.html?id=3760257472175145398&origin_type=604',
      color: 'bg-gray-50 border-gray-200'
    },
    {
      name: '拼多多',
      logo: '/icon/拼多多.png',
      description: '百亿补贴频道',
      link: 'https://mobile.yangkeduo.com/login.html?from=https%3A%2F%2Fmobile.yangkeduo.com%2Fgoods.html%3Fpdd_bapp_share_channel%3Dwechat%26goods_id%3D769023400069%26__wls_rt%3D1%26__wls_lt%3D1%26__wls_fm%3Dn&refer_page_name=goods_detail&refer_page_id=10014_1762321986368_4cy5bjtwer&refer_page_sn=10014',
      color: 'bg-red-50 border-red-200'
    },
    {
      name: '小红书',
      logo: '/icon/小红书.png',
      description: '种草推荐',
      link: 'https://www.xiaohongshu.com/goods-detail/68931bceb1b9df000178c992?t=1762321517814&xsec_token=ABvlLc8si85LIRFsT-zTmVd2FzHcQulCpHHu6cBxZWzCM%3D&xsec_source=app_arkselfshare',
      color: 'bg-pink-50 border-pink-200'
    },
    {
      name: '微信小店',
      logo: '/icon/微信.png',
      description: '微信生态购买',
      link: 'https://store.weixin.qq.com/shop/a/DFzZM8kRnIXqeeG',
      color: 'bg-green-50 border-green-200'
    },
    {
      name: '快手',
      logo: '/icon/快手.png',
      description: '短视频带货',
      link: 'https://www.kuaishou.com/search/video?searchKey=%E6%B8%AF%E5%9F%A0%E9%9B%A8%E6%9E%97%E7%94%9C%E7%AC%8B',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      name: '视频号',
      logo: '/icon/视频号.png',
      description: '微信视频号',
      link: 'https://channels.weixin.qq.com/',
      color: 'bg-green-50 border-green-200'
    },
    {
      name: '新浪微博',
      logo: '/icon/新浪.png',
      description: '微博官方账号',
      link: 'https://weibo.com/u/8006973849',
      color: 'bg-red-50 border-red-200'
    }
  ];

  const handlePlatformClick = (platform) => {
    // 在新窗口打开对应的购买平台链接
    if (platform.link && platform.link !== '#') {
      window.open(platform.link, '_blank', 'noopener,noreferrer');
    } else {
      alert(`${platform.name}链接暂未配置，敬请期待`);
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-8 shadow-2xl border border-white/20">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        选择购买平台
      </h3>
      <p className="text-center text-gray-600 mb-8">
        全平台官方店铺同步销售，选择您习惯的购物平台
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {platforms.map((platform, index) => (
          <div
            key={index}
            className={`border-2 ${platform.color} rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
            onClick={() => handlePlatformClick(platform)}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-3 flex items-center justify-center bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  src={platform.logo}
                  alt={platform.name}
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{platform.name}</h4>
              <p className="text-xs text-gray-600">{platform.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          * 各平台优惠活动可能不同，请以实际页面显示为准
        </p>
      </div>
    </div>
  );
};

export default PlatformStores;
