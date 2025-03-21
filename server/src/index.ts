import { Telegraf } from 'telegraf';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN!);
const app = express();

// 配置 Express 中间件
app.use(cors());
app.use(express.json());

// API 路由 - 保留基础架构，可根据需要添加实际API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 简化的Bot命令 - 只保留入口点
bot.command('start', (ctx) => {
  ctx.reply('欢迎使用CRM系统！请点击下方按钮打开应用', {
    reply_markup: {
      keyboard: [[
        {
          text: '📱 打开CRM系统',
          web_app: { url: process.env.WEBAPP_URL! }
        }
      ]],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  });
});

// 处理普通消息 - 引导用户使用WebApp
bot.on('message', (ctx) => {
  // 忽略命令和WebApp数据
  if ('text' in ctx.message && ctx.message.text.startsWith('/')) return;
  if ('web_app_data' in ctx.message) return;
  
  ctx.reply('请使用下方按钮打开CRM系统。\n如果没有看到按钮，请发送 /start 命令。');
});

// 处理 WebApp 数据 - 简化版，只返回确认消息
bot.on('web_app_data', (ctx) => {
  try {
    ctx.reply('✅ 已接收数据，谢谢使用！');
  } catch (error) {
    console.error('处理 WebApp 数据错误:', error);
    ctx.reply('处理数据时出错，请重试');
  }
});

// 启动 Express 服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

// 启动 Bot
bot.launch().then(() => {
  console.log('Bot 已启动 - 仅提供WebApp入口');
}).catch((error) => {
  console.error('Bot 启动失败:', error);
});