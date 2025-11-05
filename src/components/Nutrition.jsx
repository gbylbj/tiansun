import React from 'react';
import { Leaf, Heart, Brain, Shield } from 'lucide-react';

const Nutrition = () => {
  const nutritionData = [
    {
      icon: Leaf,
      title: '18种氨基酸',
      value: '全面营养',
      description: '包含人体必需的多种氨基酸，营养价值极高',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Heart,
      title: '高蛋白低脂肪',
      value: '植物蛋白',
      description: '低脂肪含量0.26-0.49%，适合健康饮食',
      color: 'text-red-600 bg-red-50'
    },
    {
      icon: Brain,
      title: '无草酸无嘌呤',
      value: '痛风友好',
      description: '不含有害草酸和嘌呤，三高人群可放心食用',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: Shield,
      title: '膳食纤维',
      value: '抑脂减重',
      description: '中科院认证：调理肠胃菌群，增强免疫力',
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  const comparisonData = [
    {
      name: '港埠雨林甜笋',
      protein: '2.8%',
      fat: '0.38%',
      sugar: '2.1%',
      fiber: '2.4%',
      feature: '可生食'
    },
    {
      name: '普通竹笋',
      protein: '1.8%',
      fat: '0.2%',
      sugar: '1.2%',
      fiber: '1.8%',
      feature: '需烹煮'
    },
    {
      name: '芦笋',
      protein: '2.2%',
      fat: '0.12%',
      sugar: '1.9%',
      fiber: '1.6%',
      feature: '嫩尖可食'
    }
  ];

  return (
    <section id="nutrition" className="py-16 sm:py-20 bg-gradient-to-br from-transparent via-white/5 to-transparent bamboo-texture bambo-wave-animation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题部分 */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            营养价值·科学认证
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            中科院营养认证，港埠雨林甜笋营养价值远超同类产品
          </p>
        </div>

        {/* 营养卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {nutritionData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* 图标和数值 */}
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${item.color.split(' ')[1]} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={24} className={item.color.split(' ')[0]} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                </div>
              </div>

              {/* 标题和描述 */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* 营养对比表格 */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg mb-8 sm:mb-12">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            营养成分对比表（每100g）
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">产品名称</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">蛋白质</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">脂肪</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">糖分</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">膳食纤维</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">特色</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index === 0 ? 'bg-green-50 font-semibold' : ''
                    }`}
                  >
                    <td className="py-4 px-4">
                      <span className={index === 0 ? 'text-green-700 font-bold' : 'text-gray-900'}>
                        {item.name}
                      </span>
                      {index === 0 && (
                        <span className="ml-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                          推荐
                        </span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className={index === 0 ? 'text-green-700' : 'text-gray-700'}>
                        {item.protein}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className={index === 0 ? 'text-green-700' : 'text-gray-700'}>
                        {item.fat}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className={index === 0 ? 'text-green-700' : 'text-gray-700'}>
                        {item.sugar}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className={index === 0 ? 'text-green-700' : 'text-gray-700'}>
                        {item.fiber}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        index === 0
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.feature}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 适用人群 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            适用人群广泛
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: '老年人', desc: '易消化，营养丰富', emoji: '👴', image: '/菜品/甜笋煮鸡.png' },
              { name: '儿童', desc: '促进生长发育', emoji: '👶', image: '/菜品/甜笋沙拉.jpg' },
              { name: '孕妇', desc: '安全无添加', emoji: '🤱', image: '/菜品/凉拌甜笋.jpg' },
              { name: '健身人群', desc: '高蛋白低脂肪', emoji: '💪', image: '/菜品/甜笋汁.jpg' },
              { name: '痛风患者', desc: '无嘌呤无草酸', emoji: '🏃', image: '/菜品/甜笋三文鱼刺身3.jpg' },
              { name: '三高人群', desc: '低糖低脂', emoji: '❤️', image: '/菜品/素炒甜笋.jpg' },
              { name: '减肥人群', desc: '低卡高纤维', emoji: '⚖️', image: '/菜品/甜笋沙拉2.jpg' },
              { name: '上班族', desc: '方便快捷营养', emoji: '💼', image: '/菜品/椒麻甜笋.png' }
            ].map((group, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative mb-3">
                  <div className="w-16 h-16 mx-auto rounded-full overflow-hidden shadow-md">
                    <img
                      src={group.image}
                      alt={group.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.outerHTML = `<div class="w-full h-full bg-white rounded-full flex items-center justify-center"><span class="text-2xl">${group.emoji}</span></div>`;
                      }}
                    />
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{group.name}</h4>
                <p className="text-xs text-gray-600">{group.desc}</p>
              </div>
            ))}
          </div>
        </div>

        </div>
    </section>
  );
};

export default Nutrition;
