// 初始化Telegram WebApp
export const initTelegramApp = (): void => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    // 通知Telegram WebApp准备就绪
    window.Telegram.WebApp.ready();
  }
};

// 启用关闭确认
export const enableClosingConfirmation = (): void => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.enableClosingConfirmation();
  }
};

// 设置主按钮参数
export const setMainButtonParams = (params: {
  text?: string;
  color?: string;
  textColor?: string;
  isVisible?: boolean;
  isActive?: boolean;
}): void => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    const { text, color, textColor, isVisible, isActive } = params;
    window.Telegram.WebApp.MainButton.setParams({
      text,
      color,
      text_color: textColor,
      is_visible: isVisible,
      is_active: isActive,
    });
  }
};

// 发送数据到Telegram
export const sendDataToTelegram = (data: string): void => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.sendData(data);
  }
};

// 获取主题颜色
export const getThemeParams = () => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    return window.Telegram.WebApp.themeParams;
  }
  return {
    bg_color: '#ffffff',
    text_color: '#000000',
    hint_color: '#999999',
    link_color: '#2481cc',
    button_color: '#2481cc',
    button_text_color: '#ffffff',
  };
};

// 获取颜色方案
export const getColorScheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    return window.Telegram.WebApp.colorScheme;
  }
  return 'light';
};

// 展开WebApp
export const expandWebApp = (): void => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.expand();
  }
};

// 关闭WebApp
export const closeWebApp = (): void => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.close();
  }
};

// 显示主按钮
export const showMainButton = (text?: string): void => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    if (text) {
      window.Telegram.WebApp.MainButton.setParams({ text });
    }
    window.Telegram.WebApp.MainButton.show();
  }
};

// 隐藏主按钮
export const hideMainButton = (): void => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.MainButton.hide();
  }
};

// 设置主按钮点击事件
export const setMainButtonOnClick = (callback: () => void): void => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.MainButton.onClick(callback);
  }
};

// 移除主按钮点击事件
export const removeMainButtonOnClick = (callback: () => void): void => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.MainButton.offClick(callback);
  }
};