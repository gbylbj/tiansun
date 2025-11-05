import React from 'react';

const SEO = ({
  title = '港埠雨林甜笋 - 可生食水果笋 | 北纬21°西双版纳原产地直供',
  description = '港埠雨林甜笋，来自北纬21°西双版纳原产地的可生食水果笋。8年匠心培育，绿色食品A级认证，无农药无化肥，富含18种氨基酸。支持零售家庭、线下商超、餐饮酒店批发，冷链配送直达您家。',
  keywords = '甜笋,港埠雨林,西双版纳,可生食,水果笋,绿色食品,新鲜竹笋,北纬21度,无农药,无化肥,冷链配送',
  image = '/logo.png',
  url = 'https://www.gbylbj.com',
  type = 'website',
  canonical = 'https://www.gbylbj.com/'
}) => {
  // 网站信息结构化数据
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "港埠雨林农业科技有限公司",
    "url": url,
    "logo": `${url}${image}`,
    "description": "专业从事甜笋种植、加工和销售的现代化农业企业",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CN",
      "addressRegion": "云南省",
      "addressLocality": "西双版纳傣族自治州",
      "streetAddress": "景洪市"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+86-400-888-8888",
      "contactType": "customer service",
      "availableLanguage": ["zh-CN"]
    }
  };

  // 产品结构化数据
  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "港埠雨林甜笋",
    "description": "可生食水果笋，绿色食品A级认证",
    "image": [
      `${url}/好看的图片/DSC08490.JPG`,
      `${url}/好看的图片/IMG_8063.jpg`,
      `${url}/好看的图片/retouch_2024070815434892.jpg`
    ],
    "brand": {
      "@type": "Brand",
      "name": "港埠雨林"
    },
    "category": "蔬菜/农产品",
    "offers": [
      {
        "@type": "Offer",
        "name": "零售家庭装",
        "price": "68",
        "priceCurrency": "CNY",
        "description": "500g可生食级水果笋，新鲜采摘人工去皮"
      },
      {
        "@type": "Offer",
        "name": "线下商超装",
        "price": "58",
        "priceCurrency": "CNY",
        "description": "400g统一规格精切，即开即售"
      },
      {
        "@type": "Offer",
        "name": "餐饮酒店装",
        "price": "158",
        "priceCurrency": "CNY",
        "description": "300g×2盒稳定大宗供货，支持定制切配"
      }
    ],
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": "15 kcal",
      "proteinContent": "2.4 g",
      "carbohydrateContent": "2.7 g",
      "fatContent": "0.2 g",
      "fiberContent": "2.8 g"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1286",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // 面包屑导航结构化数据
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "首页",
        "item": url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "产品中心",
        "item": `${url}#products`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "甜笋产品",
        "item": `${url}#products`
      }
    ]
  };

  // 本地业务结构化数据
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "港埠雨林甜笋专营店",
    "description": "西双版纳原产地直供可生食甜笋",
    "url": url,
    "telephone": "+86-400-888-8888",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CN",
      "addressRegion": "云南省",
      "addressLocality": "西双版纳傣族自治州",
      "streetAddress": "景洪市"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.0154",
      "longitude": "100.7966"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "servesCuisine": "中国菜",
    "priceRange": "¥58-¥158"
  };

  return (
    <>
      {/* 基础Meta标签 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="港埠雨林农业科技有限公司" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#2E7D32" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:site_name" content="港埠雨林甜笋" />
      <meta property="og:locale" content="zh_CN" />

      {/* Twitter Card */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${url}${image}`} />

      {/* 结构化数据 */}
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(productData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessData)}
      </script>

      {/* 预加载关键资源 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />

      {/* 图标 */}
      <link rel="icon" href={image} />
      <link rel="apple-touch-icon" href={image} />
    </>
  );
};

export default SEO;