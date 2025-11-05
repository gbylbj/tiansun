import React from 'react';
import { Video, Heart, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    product: [
      { name: '鲜剥整笋', href: '#products' },
      { name: '真空保鲜片', href: '#products' },
      { name: '即食笋尖', href: '#products' },
      { name: '产品规格', href: '#products' }
    ],
    service: [
      { name: '购买渠道', href: '#channels' },
      { name: '下单流程', href: '#process' },
      { name: '配送说明', href: '#process' },
      { name: '售后服务', href: '#channels' }
    ],
    company: [
      { name: '关于我们', href: '#quality' },
      { name: '品质保证', href: '#quality' },
      { name: '联系我们', href: '#contact' },
      { name: '用户评价', href: '#reviews' }
    ]
  };

  const contactInfo = [
    {
      icon: Phone,
      label: '客服热线',
      value: '18510890322',
      description: '7×24小时服务'
    },
    {
      icon: Mail,
      label: '邮箱',
      value: 'xixi@gbylbj.com',
      description: '24小时内回复'
    },
    {
      icon: MapPin,
      label: '公司地址',
      value: '北京市朝阳区东三环中路39号建外SOHO东区B座28层2805A',
      description: '北京分公司'
    },
    {
      icon: MapPin,
      label: '种植基地',
      value: '云南省西双版纳傣族自治州20000亩专属种植基地',
      description: '欢迎实地考察'
    }
  ];

  const socialLinks = [
    {
      icon: Video,
      name: '抖音',
      href: '#',
      color: 'hover:bg-black',
      account: '@港埠雨林甜笋'
    },
    {
      icon: Heart,
      name: '小红书',
      href: '#',
      color: 'hover:bg-red-600',
      account: '@港埠雨林'
    },
    {
      icon: Video,
      name: '快手',
      href: '#',
      color: 'hover:bg-orange-600',
      account: '@港埠雨林甜笋'
    },
    {
      icon: MessageCircle,
      name: '微信视频号',
      href: '#',
      color: 'hover:bg-green-600',
      account: '港埠雨林'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* 公司信息 */}
          <div className="lg:col-span-2 sm:col-span-1">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">港埠雨林甜笋</h3>
              <p className="text-gray-400 text-sm max-w-sm">
                港埠集团核心健康产业板块，源自北纬21°西双版纳原始雨林，8年匠心培育版纳1号甜龙竹，可生食级高端绿色食材。
              </p>
            </div>

            {/* 社交媒体 */}
            <div className="mb-4 sm:mb-6">
              <h4 className="text-sm font-semibold text-white mb-3">关注我们的自媒体平台</h4>
              <div className="flex gap-2 sm:gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center ${social.color} transition-colors duration-300`}
                    aria-label={social.name}
                    title={`${social.name}: ${social.account}`}
                  >
                    <social.icon size={14} className="text-white sm:size-18" />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* 产品链接、服务链接、关于我们 - 三列并排 */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {/* 产品链接 */}
            <div>
              <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-2 sm:mb-3">产品中心</h4>
              <ul className="space-y-1 sm:space-y-2">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-xs lg:text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 服务链接 */}
            <div>
              <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-2 sm:mb-3">客户服务</h4>
              <ul className="space-y-1 sm:space-y-2">
                {footerLinks.service.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-xs lg:text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 关于我们 */}
            <div>
              <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-2 sm:mb-3">关于</h4>
              <ul className="space-y-1 sm:space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-xs lg:text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 联系信息区域 */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                    <info.icon size={18} className="text-primary" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-400">{info.label}</div>
                  <div className="text-sm text-white">{info.value}</div>
                  <div className="text-xs text-gray-500">{info.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 订阅区域已移动至“自媒体平台”模块下方 */}
      </div>

      {/* 底部版权信息 */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © 2024 港埠雨林甜笋. All rights reserved.
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
              <button className="text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                隐私政策
              </button>
              <span className="text-gray-600">|</span>
              <button className="text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                服务条款
              </button>
              <span className="text-gray-600">|</span>
              <button className="text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                网站地图
              </button>
              <span className="text-gray-600">|</span>
              <button className="text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                帮助中心
              </button>
            </div>
          </div>

          {/* 备案信息 */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              专注高端绿色食材 源自西双版纳原始雨林 | 港埠雨林甜笋——让自然的馈赠，滋养每一份健康
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
