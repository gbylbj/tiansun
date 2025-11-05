/**
 * 清理localStorage中的性能监控数据
 * 在浏览器控制台中运行此脚本
 */

(function clearWebVitalsData() {
  try {
    // 清理webVitalsData
    if (localStorage.getItem('webVitalsData')) {
      localStorage.removeItem('webVitalsData');
      console.log('✅ 已清理 localStorage 中的 webVitalsData 数据');
    } else {
      console.log('ℹ️ localStorage 中没有找到 webVitalsData 数据');
    }

    // 清理sessionId（如果存在）
    if (localStorage.getItem('sessionId')) {
      localStorage.removeItem('sessionId');
      console.log('✅ 已清理 localStorage 中的 sessionId 数据');
    }

    // 列出当前localStorage中的所有项目
    console.log('📋 当前 localStorage 中的项目:');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      console.log(`  - ${key}`);
    }

    console.log('🎉 性能监控数据清理完成！');

  } catch (error) {
    console.error('❌ 清理过程中出现错误:', error);
  }
})();