// 声明全局Telegram对象类型
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        close: () => void;
        expand: () => void;
        enableClosingConfirmation: () => void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          enable: () => void;
          disable: () => void;
          showProgress: (leaveActive: boolean) => void;
          hideProgress: () => void;
          setParams: (params: {
            text?: string;
            color?: string;
            text_color?: string;
            is_active?: boolean;
            is_visible?: boolean;
          }) => void;
        };
        BackButton: {
          isVisible: boolean;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
        };
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
        initData: string;
        initDataUnsafe: object;
        colorScheme: 'light' | 'dark';
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          link_color: string;
          button_color: string;
          button_text_color: string;
        };
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        sendData: (data: string) => void;
        onEvent: (eventType: string, eventHandler: () => void) => void;
        offEvent: (eventType: string, eventHandler: () => void) => void;
      }
    };
  }
}

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