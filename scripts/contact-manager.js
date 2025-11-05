/**
 * 联系表单数据管理工具
 * 在浏览器控制台中运行此脚本来查看和管理提交的表单数据
 */

(function ContactManager() {
  'use strict';

  const STORAGE_KEY = 'contactSubmissions';

  // 获取所有提交数据
  function getSubmissions() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (error) {
      console.error('读取数据失败:', error);
      return [];
    }
  }

  // 清空所有数据
  function clearAllSubmissions() {
    if (confirm('确定要清空所有提交的表单数据吗？此操作不可恢复！')) {
      localStorage.removeItem(STORAGE_KEY);
      console.log('✅ 所有表单数据已清空');
      displaySubmissions();
    }
  }

  // 删除单条数据
  function deleteSubmission(id) {
    if (confirm('确定要删除这条记录吗？')) {
      const submissions = getSubmissions();
      const filtered = submissions.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      console.log('✅ 记录已删除');
      displaySubmissions();
    }
  }

  // 导出数据为JSON
  function exportData() {
    const submissions = getSubmissions();
    const dataStr = JSON.stringify(submissions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `contact_submissions_${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    console.log('✅ 数据已导出');
  }

  // 格式化时间戳
  function formatTimestamp(timestamp) {
    return new Date(timestamp.replace(/\//g, '-')).toLocaleString('zh-CN');
  }

  // 显示数据表格
  function displaySubmissions() {
    const submissions = getSubmissions();

    if (submissions.length === 0) {
      console.log('📭 暂无提交的表单数据');
      return;
    }

    console.log(`📋 共有 ${submissions.length} 条表单提交记录:\n`);

    // 创建表格
    const table = submissions.map((item, index) => {
      const statusIcon = item.status === 'pending' ? '⏳' : '✅';
      return [
        index + 1,
        statusIcon,
        item.name,
        item.phone,
        item.message.substring(0, 50) + (item.message.length > 50 ? '...' : ''),
        item.timestamp,
        item.id
      ];
    });

    // 打印表格
    console.table(table, [
      '序号',
      '状态',
      '姓名',
      '手机号',
      '留言内容',
      '提交时间',
      'ID'
    ]);

    // 详细信息
    console.log('\n📝 详细信息:');
    submissions.forEach((item, index) => {
      console.log(`\n--- 记录 ${index + 1} ---`);
      console.log(`ID: ${item.id}`);
      console.log(`姓名: ${item.name}`);
      console.log(`手机: ${item.phone}`);
      console.log(`留言: ${item.message}`);
      console.log(`提交时间: ${item.timestamp}`);
      console.log(`状态: ${item.status}`);
    });

    console.log('\n🔧 管理命令:');
    console.log('- ContactManager.clearAll()  清空所有数据');
    console.log('- ContactManager.delete(123)  删除指定ID的记录');
    console.log('- ContactManager.export()   导出数据为JSON文件');
  }

  // 创建全局管理对象
  window.ContactManager = {
    get: getSubmissions,
    show: displaySubmissions,
    clearAll: clearAllSubmissions,
    delete: deleteSubmission,
    export: exportData
  };

  // 自动显示数据
  displaySubmissions();

  console.log('\n🎉 联系表单管理器已加载！');
  console.log('📖 使用说明:');
  console.log('1. ContactManager.show()     - 显示所有提交记录');
  console.log('2. ContactManager.clearAll() - 清空所有数据');
  console.log('3. ContactManager.delete(id) - 删除指定记录');
  console.log('4. ContactManager.export()   - 导出数据为JSON文件');
  console.log('\n💡 提示：数据保存在浏览器的localStorage中');

})();