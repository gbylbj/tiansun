const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const directories = [
  '好看的图片',
  '菜品',
  'certificates',
  'icon'
];

async function optimizeImages() {
  console.log('🚀 开始图片优化...');

  for (const dir of directories) {
    const sourceDir = path.join(publicDir, dir);

    if (!fs.existsSync(sourceDir)) {
      console.log(`⚠️  目录不存在: ${dir}`);
      continue;
    }

    console.log(`📁 优化目录: ${dir}`);

    try {
      // 优化JPEG和PNG
      const optimizedFiles = await imagemin([`${sourceDir}/*.{jpg,jpeg,png}`], {
        destination: sourceDir,
        plugins: [
          imageminMozjpeg({ quality: 80 }),
          imageminPngquant({ quality: [0.6, 0.8] })
        ]
      });

      console.log(`✅ 优化了 ${optimizedFiles.length} 张图片`);

      // 生成WebP版本
      const webpFiles = await imagemin([`${sourceDir}/*.{jpg,jpeg,png}`], {
        destination: sourceDir,
        plugins: [
          imageminWebp({ quality: 80 })
        ]
      });

      console.log(`🌐 生成了 ${webpFiles.length} 个WebP文件`);

    } catch (error) {
      console.error(`❌ 优化 ${dir} 失败:`, error);
    }
  }

  console.log('🎉 图片优化完成!');
}

// 创建图片优化配置文件
const createImageConfig = () => {
  const config = {
    imageOptimization: {
      enabled: true,
      formats: ['webp', 'jpg', 'png'],
      quality: {
        jpg: 80,
        png: 75,
        webp: 80
      },
      responsive: {
        breakpoints: [640, 768, 1024, 1280, 1536]
      }
    }
  };

  fs.writeFileSync(
    path.join(__dirname, '../public/image-config.json'),
    JSON.stringify(config, null, 2)
  );
  console.log('📄 创建了图片配置文件');
};

if (require.main === module) {
  createImageConfig();
  optimizeImages();
}

module.exports = { optimizeImages, createImageConfig };