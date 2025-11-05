import React, { useState, useEffect } from 'react';
import { Download, FileText, Database, Trash2, RefreshCw, Eye, Calendar, Users, MessageSquare, Phone, User } from 'lucide-react';

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    try {
      const data = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      setSubmissions(data.sort((a, b) => new Date(b.timestamp.replace(/\//g, '-')) - new Date(a.timestamp.replace(/\//g, '-'))));
      calculateStats(data);
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (data) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const todayCount = data.filter(item => {
      const itemDate = new Date(item.timestamp.replace(/\//g, '-'));
      return itemDate >= today;
    }).length;

    const weekCount = data.filter(item => {
      const itemDate = new Date(item.timestamp.replace(/\//g, '-'));
      return itemDate >= weekAgo;
    }).length;

    const monthCount = data.filter(item => {
      const itemDate = new Date(item.timestamp.replace(/\//g, '-'));
      return itemDate >= monthAgo;
    }).length;

    setStats({
      total: data.length,
      today: todayCount,
      thisWeek: weekCount,
      thisMonth: monthCount
    });
  };

  const exportAllData = () => {
    if (window.contactStorage) {
      window.contactStorage.exportAllData();
    }
  };

  const exportSingleRecord = (record) => {
    const content = `留言记录
================

姓名：${record.name}
手机：${record.phone}
留言时间：${record.timestamp}

留言内容：
${record.message}

================
记录ID：${record.id}
保存时间：${record.savedAt || new Date().toISOString()}
================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `留言_${record.name}_${record.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    if (window.confirm('确定要清空所有留言数据吗？此操作不可恢复！')) {
      localStorage.removeItem('contactSubmissions');
      loadData();
      alert('✅ 所有数据已清空');
    }
  };

  const deleteRecord = (id) => {
    if (window.confirm('确定要删除这条记录吗？')) {
      const data = submissions.filter(item => item.id !== id);
      localStorage.setItem('contactSubmissions', JSON.stringify(data));
      loadData();
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp.replace(/\//g, '-')).toLocaleString('zh-CN');
  };

  if (!window.location.hash.includes('#admin')) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">请访问 #admin 页面查看管理面板</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 留言管理面板</h1>
          <p className="text-gray-600">管理和导出用户提交的留言信息</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">总留言数</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <Database className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">今日留言</p>
                <p className="text-2xl font-bold text-green-600">{stats.today}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">本周留言</p>
                <p className="text-2xl font-bold text-blue-600">{stats.thisWeek}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">本月留言</p>
                <p className="text-2xl font-bold text-purple-600">{stats.thisMonth}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              刷新数据
            </button>

            <button
              onClick={exportAllData}
              disabled={submissions.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              导出全部数据
            </button>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Eye className="w-4 h-4" />
              {showDetails ? '隐藏详情' : '显示详情'}
            </button>

            <button
              onClick={clearAllData}
              disabled={submissions.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              清空所有数据
            </button>
          </div>
        </div>

        {/* 数据列表 */}
        <div className="bg-white rounded-xl shadow-md p-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-500">加载中...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">暂无留言数据</p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission, index) => (
                <div key={submission.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-800">{submission.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="w-3 h-3" />
                          <span>{submission.phone}</span>
                          <span className="text-gray-300">•</span>
                          <span>{formatDate(submission.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => exportSingleRecord(submission)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="导出单条记录"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteRecord(submission.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="删除记录"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {showDetails && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">{submission.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 使用说明 */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2">💡 使用说明</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 所有留言数据会自动保存到本地文件（JSON和TXT格式）</li>
            <li>• 可以单独导出某条留言或批量导出所有数据</li>
            <li>• 文件会自动下载到您的默认下载文件夹</li>
            <li>• 建议定期导出数据进行备份</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;