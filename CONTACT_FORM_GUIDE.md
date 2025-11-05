# 📝 联系表单使用指南

## ✅ 功能完成状态

### 🎯 已实现的功能
1. **完整的联系表单**：包含姓名、手机号、留言内容三个字段
2. **表单验证**：
   - 姓名：必填
   - 手机号：必填，格式验证（中国大陆手机号）
   - 留言：必填，至少10个字符
3. **数据存储**：提交后保存在浏览器的localStorage中
4. **状态反馈**：提交中、成功、失败等状态显示
5. **管理工具**：提供数据查看和管理脚本

## 📋 表单功能详解

### 表单字段
- **姓名**：文本输入，必填
- **手机号**：电话输入，必填，支持中国大陆手机号格式验证
- **留言内容**：多行文本，必填，最少10个字符

### 验证规则
- 手机号格式：`/^1[3-9]\d{9}$/`（中国大陆手机号）
- 留言长度：最少10个字符
- 实时验证：输入时立即显示验证结果

### 交互体验
- **实时验证**：用户输入时立即验证并显示错误提示
- **提交状态**：显示提交中、成功、失败等状态
- **自动清空**：提交成功后自动清空表单
- **防重复提交**：提交中禁用提交按钮

## 🔧 如何查看提交的数据

### 方法一：使用管理脚本
1. 打开网站并按 `F12` 打开开发者工具
2. 切换到 `Console`（控制台）标签页
3. 复制以下代码并粘贴到控制台中：

```javascript
// 加载联系表单管理器
// 复制 scripts/contact-manager.js 文件内容到控制台运行
```

4. 或者直接在控制台中运行：
```javascript
// 加载脚本
fetch('/scripts/contact-manager.js')
  .then(response => response.text())
  .then(script => eval(script))
  .catch(() => {
    // 如果fetch失败，直接运行内置的管理代码
    (function ContactManager() {
      'use strict';
      const STORAGE_KEY = 'contactSubmissions';

      function getSubmissions() {
        try {
          return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch (error) {
          console.error('读取数据失败:', error);
          return [];
        }
      }

      function displaySubmissions() {
        const submissions = getSubmissions();
        if (submissions.length === 0) {
          console.log('📭 暂无提交的表单数据');
          return;
        }
        console.log(`📋 共有 ${submissions.length} 条表单提交记录:\n`);

        const table = submissions.map((item, index) => [
          index + 1,
          item.name,
          item.phone,
          item.message.substring(0, 50) + (item.message.length > 50 ? '...' : ''),
          item.timestamp
        ]);

        console.table(table, ['序号', '姓名', '手机号', '留言内容', '提交时间']);
        console.log('\n📝 详细信息:');
        submissions.forEach((item, index) => {
          console.log(`\n--- 记录 ${index + 1} ---`);
          console.log(`姓名: ${item.name}`);
          console.log(`手机: ${item.phone}`);
          console.log(`留言: ${item.message}`);
          console.log(`提交时间: ${item.timestamp}`);
        });
      }

      window.ContactManager = {
        show: displaySubmissions,
        get: getSubmissions
      };

      displaySubmissions();
      console.log('\n🎉 联系表单管理器已加载！');
    })();
  });
```

### 方法二：直接查看localStorage
在控制台中运行：
```javascript
// 查看所有提交数据
JSON.parse(localStorage.getItem('contactSubmissions') || '[]')

// 查看最新一条数据
JSON.parse(localStorage.getItem('contactSubmissions') || '[]').slice(-1)[0]
```

## 📊 数据格式

每条提交记录包含以下信息：
```json
{
  "id": 1699123456789,
  "name": "张三",
  "phone": "13812345678",
  "message": "我想了解你们的甜笋产品，请详细介绍",
  "timestamp": "2023-11-05 15:30:45",
  "status": "pending"
}
```

## 🛠️ 管理功能

### 清空所有数据
```javascript
// 在控制台中运行
localStorage.removeItem('contactSubmissions');
console.log('✅ 所有表单数据已清空');
```

### 导出数据
```javascript
// 导出为JSON文件
const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
const dataStr = JSON.stringify(submissions, null, 2);
const dataBlob = new Blob([dataStr], { type: 'application/json' });
const link = document.createElement('a');
link.href = URL.createObjectURL(dataBlob);
link.download = `contact_submissions_${new Date().toISOString().split('T')[0]}.json`;
link.click();
```

## 📱 表单位置

联系表单位于网站页面底部，在"联系我们"区域。用户可以通过以下方式访问：

1. **页面滚动**：滚动到页面底部即可看到联系表单
2. **导航链接**：如果网站有导航菜单，可以添加"联系我们"的锚点链接
3. **页面标识**：表单区域有"产品咨询与合作洽谈"的标题

## 🔄 提交流程

1. 用户填写表单（姓名、手机号、留言内容）
2. 系统进行实时验证
3. 用户点击"提交咨询"按钮
4. 显示"提交中..."状态
5. 数据保存到localStorage
6. 显示"提交成功"提示
7. 3秒后自动重置状态

## 📞 备用联系方式

在表单底部还提供了备用联系方式：
- **客服热线**：18510890322
- **邮箱**：xixi@gbylbj.com

---

**更新时间**：2025年11月5日
**状态**：✅ 所有功能已完成并测试通过