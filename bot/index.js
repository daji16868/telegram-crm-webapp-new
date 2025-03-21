const TelegramBot = require('node-telegram-bot-api');

// 替换为您的机器人Token
const token = 'YOUR_TELEGRAM_BOT_TOKEN';

// 替换为您的WebApp URL (Vercel部署地址)
const webAppUrl = 'YOUR_WEBAPP_URL';

// 创建机器人实例
const bot = new TelegramBot(token, { polling: true });

// 处理 /start 命令
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  // 创建带有WebApp按钮的键盘
  const keyboard = {
    reply_markup: {
      keyboard: [
        [{ text: '打开CRM管理系统', web_app: { url: webAppUrl } }]
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  };
  
  // 发送欢迎消息和键盘
  bot.sendMessage(
    chatId, 
    '欢迎使用CRM管理系统！\n\n点击下方按钮打开Web应用。', 
    keyboard
  );
});

// 添加菜单按钮
bot.setMyCommands([
  { command: 'start', description: '开始使用并显示WebApp按钮' }
]);

// 可选：设置机器人菜单按钮(需要BotFather配置权限)
// 这部分代码不会直接工作，仅作为API调用参考
// 您需要通过BotFather手动设置菜单按钮
/*
fetch(`https://api.telegram.org/bot${token}/setChatMenuButton`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    menu_button: {
      type: 'web_app',
      text: 'CRM系统',
      web_app: { url: webAppUrl }
    }
  })
});
*/

// 处理所有其他消息
bot.on('message', (msg) => {
  // 忽略WebApp发送的数据和命令
  if (msg.web_app_data || msg.text?.startsWith('/')) {
    return;
  }
  
  const chatId = msg.chat.id;
  
  // 对所有其他消息，引导用户使用WebApp
  bot.sendMessage(
    chatId,
    '请使用下方按钮打开CRM管理系统。如需重新显示按钮，请发送 /start 命令。'
  );
});

console.log('机器人已启动');