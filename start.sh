#!/bin/bash

# 天笋新鲜企业网站启动脚本
# 使用方法: ./start.sh

echo "🎋 天笋新鲜企业网站启动脚本"
echo "=================================="

# 检查 Node.js 是否已安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未检测到 Node.js"
    echo "请先安装 Node.js 14.0 或更高版本"
    echo "下载地址: https://nodejs.org/"
    exit 1
fi

# 检查 npm 是否已安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未检测到 npm"
    exit 1
fi

echo "✅ 环境检查通过"
echo ""

# 检查依赖是否已安装
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    npm install
    echo ""
fi

echo "🚀 启动开发服务器..."
echo "网站将在浏览器中自动打开: http://localhost:3000"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

# 启动开发服务器
npm start