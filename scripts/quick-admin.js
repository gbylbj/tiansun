/**
 * 快速管理员脚本
 * 在浏览器控制台中运行此脚本来查看和导出留言数据
 */

(function QuickAdmin() {
  'use strict';

  console.log('🚀 港埠雨林留言管理工具启动...');
  console.log('===========================================');

  // 获取所有留言数据
  function getAllSubmissions() {
    try {
      return JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    } catch (error) {
      console.error('读取数据失败:', error);
      return [];
    }
  }

  // 显示所有留言
  function showAllSubmissions() {
    const submissions = getAllSubmissions();

    if (submissions.length === 0) {
      console.log('📭 暂无留言记录');
      return;
    }

    console.log(`📋 共有 ${submissions.length} 条留言记录:`);
    console.log('');

    // 按时间倒序显示
    const sorted = submissions.slice().reverse();

    sorted.forEach((item, index) => {
      const actualIndex = submissions.length - index;
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`📝 记录 #${actualIndex}`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`👤 姓名: ${item.name}`);
      console.log(`📱 手机: ${item.phone}`);
      console.log(`🕒 时间: ${item.timestamp}`);
      console.log(`📊 状态: ${item.status}`);
      console.log(`🆔 ID: ${item.id}`);
      console.log(`💬 留言:`);
      console.log(item.message);
      console.log('');
    });

    console.log('===========================================');
  }

  // 导出为JSON文件
  function exportAsJSON() {
    const submissions = getAllSubmissions();

    if (submissions.length === 0) {
      console.log('❌ 暂无数据可导出');
      return;
    }

    const exportData = {
      exportTime: new Date().toISOString(),
      exportType: 'all',
      totalCount: submissions.length,
      submissions: submissions
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `港埠雨林留言数据_${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    URL.revokeObjectURL(url);
    console.log(`✅ 已导出 ${submissions.length} 条留言记录为JSON文件`);
  }

  // 导出为TXT文件
  function exportAsTXT() {
    const submissions = getAllSubmissions();

    if (submissions.length === 0) {
      console.log('❌ 暂无数据可导出');
      return;
    }

    let textContent = `港埠雨林客户留言数据
导出时间: ${new Date().toLocaleString('zh-CN')}
总留言数: ${submissions.length}

`;

    // 按时间倒序排列
    const sorted = submissions.slice().reverse();

    sorted.forEach((item, index) => {
      const actualIndex = submissions.length - index;
      textContent += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
记录 #${actualIndex}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
姓名: ${item.name}
手机: ${item.phone}
时间: ${item.timestamp}
状态: ${item.status}

留言内容:
${item.message}

`;
    });

    textContent += `==========================================
数据导出完成
导出时间: ${new Date().toLocaleString('zh-CN')}
==========================================`;

    const dataBlob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `港埠雨林留言数据_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();

    URL.revokeObjectURL(url);
    console.log(`✅ 已导出 ${submissions.length} 条留言记录为TXT文件`);
  }

  // 获取统计数据
  function showStatistics() {
    const submissions = getAllSubmissions();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const todayCount = submissions.filter(item => {
      const itemDate = new Date(item.timestamp.replace(/\//g, '-'));
      return itemDate >= today;
    }).length;

    const weekCount = submissions.filter(item => {
      const itemDate = new Date(item.timestamp.replace(/\//g, '-'));
      return itemDate >= weekAgo;
    }).length;

    const monthCount = submissions.filter(item => {
      const itemDate = new Date(item.timestamp.replace(/\//g, '-'));
      return itemDate >= monthAgo;
    }).length;

    console.log('📊 留言统计数据:');
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📈 总留言数: ${submissions.length}`);
    console.log(`📅 今日留言: ${todayCount}`);
    console.log(`📆 本周留言: ${weekCount}`);
    console.log(`📊 本月留言: ${monthCount}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  }

  // 清空所有数据
  function clearAllData() {
    const count = getAllSubmissions().length;
    if (count === 0) {
      console.log('ℹ️ 暂无数据需要清空');
      return;
    }

    if (confirm(`确定要清空所有 ${count} 条留言记录吗？此操作不可恢复！`)) {
      localStorage.removeItem('contactSubmissions');
      console.log('✅ 所有数据已清空');
    } else {
      console.log('❌ 操作已取消');
    }
  }

  // 删除指定ID的记录
  function deleteRecord(id) {
    const submissions = getAllSubmissions();
    const filtered = submissions.filter(item => item.id !== id);
    localStorage.setItem('contactSubmissions', JSON.stringify(filtered));
    console.log(`✅ 已删除记录 ID: ${id}`);
  }

  // 创建全局管理对象
  window.ContactAdmin = {
    show: showAllSubmissions,
    exportJSON: exportAsJSON,
    exportTXT: exportAsTXT,
    stats: showStatistics,
    clear: clearAllData,
    delete: deleteRecord,
    getAll: getAllSubmissions
  };

  // 显示使用说明
  console.log('🎉 留言管理工具已加载！');
  console.log('📖 使用方法:');
  console.log('• ContactAdmin.show()     - 显示所有留言记录');
  console.log('• ContactAdmin.exportJSON() - 导出JSON格式文件');
  console.log('• ContactAdmin.exportTXT()  - 导出TXT格式文件');
  console.log('• ContactAdmin.stats()     - 显示统计数据');
  console.log('• ContactAdmin.clear()    - 清空所有数据');
  console.log('• ContactAdmin.delete(id) - 删除指定记录');
  console.log('• ContactAdmin.getAll()   - 获取原始数据');
  console.log('');

  // 自动显示统计信息
  showStatistics();

})();