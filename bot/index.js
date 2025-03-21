require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// 从环境变量获取配置
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL;

// 检查必要的环境变量
if (!BOT_TOKEN || !WEBAPP_URL) {
  console.error('错误: 请在.env文件中设置BOT_TOKEN和WEBAPP_URL环境变量');
  process.exit(1);
}

// 创建机器人实例，启用长轮询模式
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log(`机器人已启动，WebApp URL: ${WEBAPP_URL}`);

// 处理 /start 命令
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  // 发送欢迎消息和带WebApp按钮的键盘
  bot.sendMessage(chatId, 
    `👋 欢迎使用 CRM 系统!\n\n` +
    `点击下方按钮打开CRM WebApp，管理您的客户、任务和通知。`,
    {
      reply_markup: {
        keyboard: [
          [{ text: '📱 打开CRM系统', web_app: { url: WEBAPP_URL } }]
        ],
        resize_keyboard: true
      }
    }
  );
});

// 设置命令列表
bot.setMyCommands([
  { command: 'start', description: '启动机器人并显示CRM系统按钮' }
]);

// 处理除命令外的所有消息
bot.on('message', (msg) => {
  // 忽略命令和WebApp数据
  if (msg.text && msg.text.startsWith('/')) return;
  if (msg.web_app_data) return;
  
  const chatId = msg.chat.id;
  
  // 引导用户使用WebApp
  bot.sendMessage(chatId, 
    `请使用底部的按钮打开CRM系统。\n` +
    `如果没有看到按钮，请发送 /start 命令。`
  );
});

// 处理WebApp数据（当用户从WebApp发送数据到机器人时）
bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const data = msg.web_app_data.data;
  
  try {
    // 尝试解析WebApp发送的JSON数据
    const parsedData = JSON.parse(data);
    console.log('从WebApp收到数据:', parsedData);
    
    // 这里可以根据需要处理来自WebApp的数据
    // 例如，确认收到数据
    bot.sendMessage(chatId, '✅ 已成功接收您的数据！');
  } catch (error) {
    console.error('解析WebApp数据出错:', error);
    bot.sendMessage(chatId, '❌ 处理数据时出错，请重试。');
  }
});

// 错误处理
bot.on('polling_error', (error) => {
  console.error('机器人轮询错误:', error);
});

/*
注意：如果您希望通过BotFather设置菜单按钮，请按照以下步骤操作：
1. 联系 @BotFather
2. 发送 /mybots 命令
3. 选择您的机器人
4. 点击 Bot Settings > Menu Button
5. 选择 Configure menu button
6. 输入按钮文字（如：CRM系统）
7. 输入WebApp URL（您的WEBAPP_URL）
*/