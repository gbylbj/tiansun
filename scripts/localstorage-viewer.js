/**
 * localStorage 数据查看器
 * 用于查看联系表单在浏览器中的实际存储数据
 */

(function LocalStorageViewer() {
  'use strict';

  console.log('🔍 localStorage 数据查看器');
  console.log('==========================================');

  // 1. 检查 localStorage 中所有数据
  console.log('\n📋 localStorage 中的所有项目:');
  const allKeys = Object.keys(localStorage);

  if (allKeys.length === 0) {
    console.log('   (空)');
  } else {
    allKeys.forEach(key => {
      const value = localStorage.getItem(key);
      const isJson = value.startsWith('{') || value.startsWith('[');

      console.log(`🔑 ${key}`);
      console.log(`   类型: ${isJson ? 'JSON' : 'String'}`);
      console.log(`   大小: ${(value.length / 1024).toFixed(2)} KB`);
      console.log(`   内容预览: ${value.substring(0, 100)}${value.length > 100 ? '...' : ''}`);
      console.log('');
    });
  }

  // 2. 专门查看联系表单数据
  console.log('\n📝 联系表单数据详情:');
  const contactKey = 'contactSubmissions';
  const contactData = localStorage.getItem(contactKey);

  if (contactData) {
    try {
      const submissions = JSON.parse(contactData);
      console.log(`✅ 找到 ${submissions.length} 条提交记录`);

      // 按时间排序（最新的在前面）
      submissions.sort((a, b) => new Date(b.timestamp.replace(/\//g, '-')) - new Date(a.timestamp.replace(/\//g, '-')));

      submissions.forEach((item, index) => {
        console.log(`\n--- 记录 ${index + 1} ---`);
        console.log(`ID: ${item.id}`);
        console.log(`姓名: ${item.name}`);
        console.log(`手机: ${item.phone}`);
        console.log(`留言: ${item.message}`);
        console.log(`时间: ${item.timestamp}`);
        console.log(`状态: ${item.status}`);
      });

      // 3. 显示存储统计
      console.log('\n📊 存储统计:');
      console.log(`总记录数: ${submissions.length}`);
      console.log(`数据大小: ${(contactData.length / 1024).toFixed(2)} KB`);

      if (submissions.length > 0) {
        const latestTime = submissions[0].timestamp;
        const earliestTime = submissions[submissions.length - 1].timestamp;
        console.log(`最早记录: ${earliestTime}`);
        console.log(`最新记录: ${latestTime}`);
      }

    } catch (error) {
      console.error('❌ 解析联系表单数据失败:', error);
    }
  } else {
    console.log('❌ 未找到联系表单数据');
  }

  // 4. 浏览器存储信息
  console.log('\n🌐 浏览器存储信息:');
  console.log(`当前域名: ${window.location.origin}`);
  console.log(`存储配额: ${navigator.storage ? '检测中...' : '不支持'}`);

  // 检查存储配额（如果浏览器支持）
  if (navigator.storage && navigator.storage.estimate) {
    navigator.storage.estimate().then(estimate => {
      console.log(`已用存储: ${(estimate.usage / 1024 / 1024).toFixed(2)} MB`);
      console.log(`可用存储: ${(estimate.quota / 1024 / 1024).toFixed(2)} MB`);
      console.log(`使用率: ${((estimate.usage / estimate.quota) * 100).toFixed(2)}%`);
    });
  }

  console.log('\n🎯 重要提示:');
  console.log('• 数据存储在浏览器的 localStorage 中');
  console.log('• 清除浏览器数据会导致数据丢失');
  console.log('• 更换浏览器或设备无法同步数据');
  console.log('• 建议定期导出重要数据进行备份');

})();