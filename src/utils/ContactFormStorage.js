/**
 * 联系表单数据本地存储工具
 * 将用户提交的留言保存到本地文件中
 */

class ContactFormStorage {
  constructor() {
    this.storageFolder = 'contact-submissions';
    this.initStorageFolder();
  }

  /**
   * 初始化存储文件夹
   */
  initStorageFolder() {
    // 在浏览器中创建文件夹结构的概念
    // 实际保存会通过文件下载实现
    this.ensureStorageStructure();
  }

  /**
   * 确保存储结构存在
   */
  ensureStorageStructure() {
    const today = new Date().toISOString().split('T')[0];
    this.currentFolder = `${this.storageFolder}/${today}`;
  }

  /**
   * 保存表单数据到本地
   * @param {Object} formData - 表单数据
   * @returns {Promise<boolean>} - 保存是否成功
   */
  async saveSubmission(formData) {
    try {
      // 1. 保存到 localStorage (现有功能)
      this.saveToLocalStorage(formData);

      // 2. 保存到本地文件 (新功能)
      await this.saveToLocalStorageFile(formData);

      // 3. 生成备份文件
      await this.generateBackupFile();

      return true;
    } catch (error) {
      console.error('保存留言失败:', error);
      return false;
    }
  }

  /**
   * 保存到 localStorage (现有功能)
   */
  saveToLocalStorage(formData) {
    const STORAGE_KEY = 'contactSubmissions';
    const submissions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    const newSubmission = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).replace(/\//g, '-'),
      status: 'pending',
      savedToFile: true
    };

    submissions.push(newSubmission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  }

  /**
   * 保存到本地文件系统（通过下载）
   */
  async saveToLocalStorageFile(formData) {
    const today = new Date().toISOString().split('T')[0];
    const timestamp = new Date().getTime();

    // 创建单条记录文件
    const singleRecord = {
      ...formData,
      timestamp: new Date().toLocaleString('zh-CN'),
      id: timestamp,
      savedAt: new Date().toISOString()
    };

    // 保存为 JSON 文件
    this.downloadFile(
      JSON.stringify(singleRecord, null, 2),
      `留言_${formData.name}_${timestamp}.json`,
      'application/json'
    );

    // 保存为可读的文本文件
    const textContent = this.formatAsText(singleRecord);
    this.downloadFile(
      textContent,
      `留言_${formData.name}_${timestamp}.txt`,
      'text/plain'
    );
  }

  /**
   * 格式化为可读文本
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
   * 生成每日汇总文件
   */
  async generateBackupFile() {
    const STORAGE_KEY = 'contactSubmissions';
    const submissions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    const today = new Date().toISOString().split('T')[0];
    const todaySubmissions = submissions.filter(sub =>
      sub.timestamp.includes(today.replace(/-/g, '-')) ||
      sub.savedAt?.includes(today)
    );

    if (todaySubmissions.length > 0) {
      // 每日汇总 JSON
      const dailyJson = {
        date: today,
        totalSubmissions: todaySubmissions.length,
        submissions: todaySubmissions
      };

      this.downloadFile(
        JSON.stringify(dailyJson, null, 2),
        `每日留言汇总_${today}.json`,
        'application/json'
      );

      // 每日汇总文本
      const dailyText = this.generateDailySummary(todaySubmissions);
      this.downloadFile(
        dailyText,
        `每日留言汇总_${today}.txt`,
        'text/plain'
      );
    }
  }

  /**
   * 生成每日汇总文本
   */
  generateDailySummary(submissions) {
    let summary = `═══════════════════════════════════════════════════
                    每日留言汇总报告
═══════════════════════════════════════════════════

📅 日期：${new Date().toLocaleDateString('zh-CN')}
📊 总留言数：${submissions.length}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`;

    submissions.forEach((sub, index) => {
      summary += `【${index + 1}】 ${sub.name} (${sub.phone})
时间：${sub.timestamp}
留言：${sub.message.substring(0, 100)}${sub.message.length > 100 ? '...' : ''}

`;
    });

    summary += `═══════════════════════════════════════════════════
报告生成时间：${new Date().toLocaleString('zh-CN')}
═══════════════════════════════════════════════════`;

    return summary;
  }

  /**
   * 下载文件到本地
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
   * 获取所有保存的文件信息
   */
  getStorageInfo() {
    const STORAGE_KEY = 'contactSubmissions';
    const submissions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    return {
      totalSubmissions: submissions.length,
      savedToFile: submissions.filter(sub => sub.savedToFile).length,
      latestSubmission: submissions[submissions.length - 1]?.timestamp,
      storageFolder: this.storageFolder
    };
  }

  /**
   * 批量导出所有数据
   */
  exportAllData() {
    const STORAGE_KEY = 'contactSubmissions';
    const submissions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    if (submissions.length === 0) {
      console.log('📭 暂无数据可导出');
      return;
    }

    // 导出完整数据
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
}

// 创建全局实例
const contactStorage = new ContactFormStorage();

// 导出给其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContactFormStorage;
} else {
  window.ContactFormStorage = ContactFormStorage;
  window.contactStorage = contactStorage;
}