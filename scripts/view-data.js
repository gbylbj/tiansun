// 在浏览器控制台中执行以下代码查看提交的数据

console.log('=== 查看提交的表单数据 ===\n');

// 1. 查看原始数据
const rawData = localStorage.getItem('contactSubmissions');
console.log('1. localStorage 原始数据:');
console.log(rawData);

// 2. 解析并格式化显示
const submissions = JSON.parse(rawData || '[]');
console.log('\n2. 格式化显示的提交记录:');
submissions.forEach((submission, index) => {
    console.log(`\n--- 记录 ${index + 1} ---`);
    console.log('ID:', submission.id);
    console.log('姓名:', submission.name);
    console.log('手机:', submission.phone);
    console.log('邮箱:', submission.email || '未提供');
    console.log('留言:', submission.message);
    console.log('提交时间:', submission.timestamp);
    console.log('状态:', submission.status);
});

console.log('\n=== 数据统计 ===');
console.log('总提交数量:', submissions.length);

// 3. 显示最近的提交
if (submissions.length > 0) {
    console.log('\n=== 最近提交 ===');
    const latest = submissions[submissions.length - 1];
    console.log('最新提交时间:', latest.timestamp);
    console.log('最新提交人:', latest.name);
    console.log('最新提交内容:', latest.message.substring(0, 50) + '...');
}