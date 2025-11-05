import React from 'react';
import { ShoppingCart, CheckCircle, Truck, Clock, MapPin, Package } from 'lucide-react';

const Process = () => {
  const processSteps = [
    {
      number: 1,
      title: '下单',
      icon: ShoppingCart,
      description: '选择产品规格，填写收货信息',
      details: ['选择港埠雨林甜笋规格', '填写准确收货地址', '选择支付方式完成付款'],
      time: '2分钟',
      color: 'bg-blue-50 border-blue-200 text-blue-600'
    },
    {
      number: 2,
      title: '采收/包装',
      icon: CheckCircle,
      description: '新鲜采摘，专业包装',
      details: ['当日清晨新鲜采摘', 'SGS质量检测', '泡沫箱+冰袋专业包装'],
      time: '2-4小时',
      color: 'bg-green-50 border-green-200 text-green-600'
    },
    {
      number: 3,
      title: '顺丰送达',
      icon: Truck,
      description: '顺丰陆运配送，新鲜到家',
      details: ['顺丰陆运配送', '全程保鲜措施', '3-4天内送达'],
      time: '3-4天',
      color: 'bg-orange-50 border-orange-200 text-orange-600'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: '极速发货',
      description: '订单确认后2小时内开始处理'
    },
    {
      icon: Package,
      title: '安全包装',
      description: '专业包装，确保运输安全'
    },
    {
      icon: MapPin,
      title: '全国配送',
      description: '覆盖全国大部分地区'
    },
    {
      icon: CheckCircle,
      title: '品质保证',
      description: '不满意可退换，购物无忧'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-transparent via-white/5 to-transparent overflow-hidden bamboo-texture bambo-wave-animation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            简单三步，新鲜到家
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            从下单到收货，我们为您简化每一个环节
          </p>
        </div>

        {/* 流程步骤 */}
        <div className="relative">
          {/* 连接线 */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-green-200 to-orange-200 transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* 步骤卡片 */}
                <div className="glass-effect border border-white/20 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* 步骤编号 */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-xl font-bold border-2 border-white shadow-lg`}>
                      {step.number}
                    </div>
                  </div>

                  {/* 图标和标题 */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-4 rounded-full ${step.color} mb-4`}>
                      <step.icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>

                  {/* 详细步骤 */}
                  <div className="space-y-3 mb-6">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* 时间标识 */}
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-500">预计用时</span>
                    <div className="font-semibold text-primary">{step.time}</div>
                  </div>
                </div>

                {/* 箭头指示器（移动端显示） */}
                {index < processSteps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-8 h-8 text-primary">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 优势特点 */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">为什么选择我们？</h3>
            <p className="text-gray-600">专业、快速、可靠的服务体验</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 glass-effect rounded-xl transition-colors duration-300 border border-white/20">
                <div className="inline-flex p-3 bg-white/70 backdrop-blur-sm rounded-full mb-4">
                  <benefit.icon size={24} className="text-primary" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 配送说明 */}
        <div className="mt-16 glass-effect rounded-2xl p-8 border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">配送说明</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">配送时效</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 发货后3-4天内送达</li>
                <li>• 偏远地区时效可能延长</li>
                <li>• 节假日可能有所延迟</li>
                <li>• 具体物流信息以顺丰官方为准</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">配送须知</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 顺丰陆运配送（非冷链）</li>
                <li>• 泡沫箱+冰袋包装保鲜</li>
                <li>• 收货后请立即冷藏保存</li>
                <li>• 如遇配送问题请及时联系客服</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 温馨提示 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            * 配送时间可能因天气、交通等客观因素有所调整，请以实际配送时间为准
          </p>
        </div>
      </div>
    </section>
  );
};

export default Process;
