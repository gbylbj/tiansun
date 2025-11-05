/**
 * 简化的留言存储工具
 * 直接在组件中使用，避免复杂的外部依赖
 */

class SimpleStorage {
  constructor() {
    this.STORAGE_KEY = 'contactSubmissions';
  }

  /**
   * 保存留言数据
   * @param {Object} formData - 表单数据
   * @returns {Promise<boolean>} - 保存是否成功
   */
  async saveSubmission(formData) {
    try {
      // 1. 保存到 localStorage
      this.saveToLocalStorage(formData);

      // 2. 生成并下载文件
      await this.downloadFiles(formData);

      return true;
    } catch (error) {
      console.error('保存失败:', error);
      return false;
    }
  }

  /**
   * 保存到 localStorage
   */
  saveToLocalStorage(formData) {
    const submissions = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');

    const newSubmission = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toLocaleString('zh-CN'),
      status: 'pending',
      savedToFile: true
    };

    submissions.push(newSubmission);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(submissions));
  }

  /**
   * 下载文件
   */
  async downloadFiles(formData) {
    const timestamp = Date.now();

    // JSON 格式文件
    const jsonData = {
      ...formData,
      timestamp: new Date().toLocaleString('zh-CN'),
      id: timestamp,
      savedAt: new Date().toISOString()
    };

    this.downloadFile(
      JSON.stringify(jsonData, null, 2),
      `留言_${formData.name}_${timestamp}.json`,
      'application/json'
    );

    // TXT 格式文件
    const textContent = this.formatAsText(jsonData);
    this.downloadFile(
      textContent,
      `留言_${formData.name}_${timestamp}.txt`,
      'text/plain'
    );
  }

  /**
   * 格式化为文本
   */
  formatAsText(data) {
    return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    用户留言记录
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 基本信息：
   姓名：${data.name}
   手机：${data.phone}
   留言时间：${data.timestamp}

💬 留言内容：
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
记录ID：${data.id}
保存时间：${data.savedAt}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
  }

  /**
   * 下载文件
   */
  downloadFile(content, filename, mimeType) {
    try {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      console.log(`✅ 文件已保存: ${filename}`);
    } catch (error) {
      console.error('❌ 文件保存失败:', error);
    }
  }

  /**
   * 获取所有数据
   */
  getAllSubmissions() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch (error) {
      console.error('获取数据失败:', error);
      return [];
    }
  }

  /**
   * 导出所有数据
   */
  exportAllData() {
    const submissions = this.getAllSubmissions();

    if (submissions.length === 0) {
      console.log('📭 暂无数据可导出');
      return;
    }

    const allData = {
      exportTime: new Date().toISOString(),
      totalSubmissions: submissions.length,
      submissions: submissions
    };

    this.downloadFile(
      JSON.stringify(allData, null, 2),
      `全部留言数据_${new Date().toISOString().split('T')[0]}.json`,
      'application/json'
    );

    console.log(`✅ 已导出 ${submissions.length} 条留言记录`);
  }

  /**
   * 清空所有数据
   */
  clearAllData() {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('✅ 所有数据已清空');
  }
}

// 创建全局实例
const simpleStorage = new SimpleStorage();

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SimpleStorage;
} else {
  window.SimpleStorage = SimpleStorage;
  window.simpleStorage = simpleStorage;
}