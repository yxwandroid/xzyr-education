#!/bin/bash

# 知盈瑞教育网站部署脚本

echo "开始部署知盈瑞教育网站..."

# 检查是否安装了pm2
if ! command -v pm2 &> /dev/null; then
    echo "PM2 未安装，正在安装..."
    npm install -g pm2
fi

# 安装依赖
echo "安装项目依赖..."
npm install

# 停止现有的pm2进程（如果存在）
echo "停止现有进程..."
pm2 stop zhiyingrui-education 2>/dev/null || true
pm2 delete zhiyingrui-education 2>/dev/null || true

# 启动应用
echo "启动应用..."
pm2 start ecosystem.config.js

# 保存pm2配置
pm2 save

# 设置pm2开机自启动
pm2 startup

echo "部署完成！"
echo "应用状态："
pm2 status

echo ""
echo "常用命令："
echo "查看状态: pm2 status"
echo "查看日志: pm2 logs zhiyingrui-education"
echo "重启应用: pm2 restart zhiyingrui-education"
echo "停止应用: pm2 stop zhiyingrui-education"
echo "删除应用: pm2 delete zhiyingrui-education"