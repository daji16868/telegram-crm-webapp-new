# Telegram CRM WebApp

一个用于Telegram的客户关系管理(CRM)迷你应用，专为移动设备优化的轻量级解决方案。

## 功能特点

- **仪表盘**: 显示关键业务指标和客户统计
- **客户管理**: 添加、编辑、查看和删除客户信息
- **待办事项**: 管理任务和提醒，按优先级和到期日期排序
- **通知中心**: 查看系统通知和重要消息

## 技术栈

- **React** + **TypeScript**: 构建用户界面
- **Tailwind CSS**: 样式和响应式设计
- **Telegram WebApp API**: 与Telegram集成
- **Vite**: 构建工具和开发服务器

## 开发环境设置

1. 克隆仓库:
   ```bash
   git clone https://github.com/daji16868/telegram-crm-webapp-new.git
   cd telegram-crm-webapp-new
   ```

2. 安装依赖:
   ```bash
   npm install
   ```

3. 启动开发服务器:
   ```bash
   npm run dev
   ```

4. 构建生产版本:
   ```bash
   npm run build
   ```

## 部署

该应用可以部署在任何静态网站托管服务上，如Vercel, Netlify, GitHub Pages等。

1. 构建应用:
   ```bash
   npm run build
   ```

2. 将`dist`文件夹部署到您的托管服务。

3. 使用BotFather更新您的Telegram机器人以使用新的WebApp URL。

## Telegram机器人配置

1. 联系BotFather (@BotFather)
2. 发送命令 `/mybots`
3. 选择您的机器人
4. 点击 "Bot Settings" -> "Menu Button"
5. 设置按钮类型为WebApp，并输入您的部署URL

## 贡献

欢迎提交Pull Request和Issue。

## 许可证

MIT