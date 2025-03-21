# Telegram CRM 机器人

这是一个简化版的Telegram机器人，其唯一功能是提供CRM系统WebApp的入口点。

## 设置说明

1. 安装依赖：
```
cd bot
npm install
```

2. 编辑 `index.js` 文件，替换以下内容：
   - `YOUR_TELEGRAM_BOT_TOKEN`: 替换为您的Telegram机器人Token（从BotFather获取）
   - `YOUR_WEBAPP_URL`: 替换为您的Vercel部署URL

3. 启动机器人：
```
npm start
```

## 功能说明

这个机器人非常简单，只有以下功能：

1. 用户发送 `/start` 命令时，显示一个键盘按钮，点击可打开WebApp
2. 用户发送其他任何消息，机器人会引导用户使用WebApp
3. 可以选择通过BotFather设置菜单按钮，提供另一种打开WebApp的方式

## BotFather配置

如果您希望在机器人菜单中添加WebApp按钮，请按照以下步骤操作：

1. 打开Telegram，联系 [@BotFather](https://t.me/BotFather)
2. 发送 `/mybots` 命令选择您的机器人
3. 点击 "Bot Settings" > "Menu Button"
4. 选择 "Configure menu button"
5. 输入按钮文字（如：CRM系统）
6. 输入WebApp URL（您的Vercel部署地址）

完成上述配置后，机器人聊天界面底部将显示菜单按钮，用户可以直接点击打开WebApp。