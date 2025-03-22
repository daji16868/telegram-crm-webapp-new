'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { expandWebApp } from '../../utils/telegramWebApp';
import { BottomNavigation } from '../../components/BottomNavigation';

// 设置项接口
interface SettingItem {
  id: string;
  title: string;
  description?: string;
  type: 'toggle' | 'select' | 'input' | 'button' | 'link';
  value?: any;
  options?: { label: string; value: any }[];
  action?: () => void;
  icon?: React.ReactNode;
}

// 设置组接口
interface SettingGroup {
  id: string;
  title: string;
  items: SettingItem[];
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<SettingGroup[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('zh-CN');
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [syncFrequency, setSyncFrequency] = useState('daily');
  const [cacheSize, setCacheSize] = useState('100MB');
  const [version, setVersion] = useState('1.0.0');
  
  // 页面加载时展开 Telegram WebApp
  useEffect(() => {
    expandWebApp();
    
    // 初始化设置
    initializeSettings();
  }, []);
  
  const initializeSettings = () => {
    const settingsData: SettingGroup[] = [
      {
        id: 'general',
        title: '通用设置',
        items: [
          {
            id: 'darkMode',
            title: '深色模式',
            description: '使用深色主题显示应用界面',
            type: 'toggle',
            value: darkMode,
            icon: (
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )
          },
          {
            id: 'language',
            title: '语言',
            description: '选择应用显示语言',
            type: 'select',
            value: language,
            options: [
              { label: '简体中文', value: 'zh-CN' },
              { label: '繁体中文', value: 'zh-TW' },
              { label: '英语', value: 'en-US' }
            ],
            icon: (
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            )
          }
        ]
      },
      {
        id: 'notifications',
        title: '通知设置',
        items: [
          {
            id: 'notificationEnabled',
            title: '启用通知',
            description: '接收消息和任务提醒',
            type: 'toggle',
            value: notificationEnabled,
            icon: (
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            )
          },
          {
            id: 'reminders',
            title: '任务提醒',
            description: '设置任务到期提醒时间',
            type: 'select',
            value: '1day',
            options: [
              { label: '不提醒', value: 'never' },
              { label: '任务到期时', value: 'ondue' },
              { label: '提前1小时', value: '1hour' },
              { label: '提前1天', value: '1day' },
              { label: '提前1周', value: '1week' }
            ],
            icon: (
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )
          }
        ]
      },
      {
        id: 'sync',
        title: '同步与存储',
        items: [
          {
            id: 'syncFrequency',
            title: '同步频率',
            description: '设置数据同步到服务器的频率',
            type: 'select',
            value: syncFrequency,
            options: [
              { label: '实时（自动）', value: 'realtime' },
              { label: '每小时', value: 'hourly' },
              { label: '每天', value: 'daily' },
              { label: '仅手动', value: 'manual' }
            ],
            icon: (
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )
          },
          {
            id: 'syncNow',
            title: '立即同步',
            description: '手动同步所有数据到服务器',
            type: 'button',
            action: () => console.log('立即同步数据'),
            icon: (
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            )
          },
          {
            id: 'cacheSize',
            title: '缓存大小',
            description: '当前已使用缓存空间',
            type: 'input',
            value: cacheSize,
            icon: (
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            )
          },
          {
            id: 'clearCache',
            title: '清除缓存',
            description: '清除所有本地缓存数据',
            type: 'button',
            action: () => console.log('清除缓存'),
            icon: (
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )
          }
        ]
      },
      {
        id: 'account',
        title: '账户设置',
        items: [
          {
            id: 'profile',
            title: '个人资料',
            description: '查看和编辑个人资料信息',
            type: 'link',
            action: () => console.log('跳转到个人资料页面'),
            icon: (
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )
          },
          {
            id: 'password',
            title: '修改密码',
            description: '更改您的账户密码',
            type: 'link',
            action: () => console.log('跳转到修改密码页面'),
            icon: (
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            )
          }
        ]
      },
      {
        id: 'about',
        title: '关于',
        items: [
          {
            id: 'version',
            title: '版本信息',
            description: `当前版本: ${version}`,
            type: 'input',
            value: version,
            icon: (
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )
          },
          {
            id: 'checkUpdate',
            title: '检查更新',
            description: '查询是否有可用更新',
            type: 'button',
            action: () => console.log('检查更新'),
            icon: (
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            )
          },
          {
            id: 'feedback',
            title: '意见反馈',
            description: '提交问题报告或功能建议',
            type: 'link',
            action: () => console.log('跳转到反馈页面'),
            icon: (
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            )
          },
          {
            id: 'privacy',
            title: '隐私政策',
            description: '查看应用隐私政策',
            type: 'link',
            action: () => console.log('查看隐私政策'),
            icon: (
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            )
          }
        ]
      },
      {
        id: 'danger',
        title: '危险区域',
        items: [
          {
            id: 'logout',
            title: '退出登录',
            description: '退出当前账号',
            type: 'button',
            action: () => console.log('退出登录'),
            icon: (
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            )
          },
          {
            id: 'deleteAccount',
            title: '删除账户',
            description: '永久删除您的账户和所有数据',
            type: 'button',
            action: () => console.log('删除账户'),
            icon: (
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )
          }
        ]
      }
    ];
    
    setSettings(settingsData);
  };
  
  // 切换开关
  const handleToggleChange = (settingId: string) => {
    console.log('切换设置:', settingId);
    
    // 处理不同的设置项
    switch (settingId) {
      case 'darkMode':
        setDarkMode(!darkMode);
        // 在真实应用中，这里应该更新全局主题
        break;
      case 'notificationEnabled':
        setNotificationEnabled(!notificationEnabled);
        break;
      default:
        break;
    }
    
    // 更新设置状态
    setSettings(prevSettings => 
      prevSettings.map(group => ({
        ...group,
        items: group.items.map(item => 
          item.id === settingId && item.type === 'toggle'
            ? { ...item, value: !item.value }
            : item
        )
      }))
    );
  };
  
  // 选择设置
  const handleSelectChange = (settingId: string, value: any) => {
    console.log('更改设置:', settingId, value);
    
    // 处理不同的设置项
    switch (settingId) {
      case 'language':
        setLanguage(value);
        break;
      case 'syncFrequency':
        setSyncFrequency(value);
        break;
      default:
        break;
    }
    
    // 更新设置状态
    setSettings(prevSettings => 
      prevSettings.map(group => ({
        ...group,
        items: group.items.map(item => 
          item.id === settingId
            ? { ...item, value }
            : item
        )
      }))
    );
  };
  
  // 渲染设置项
  const renderSettingItem = (item: SettingItem) => {
    switch (item.type) {
      case 'toggle':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {item.icon && <div className="mr-3">{item.icon}</div>}
              <div>
                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                {item.description && <div className="text-xs text-gray-500">{item.description}</div>}
              </div>
            </div>
            <button
              onClick={() => handleToggleChange(item.id)}
              className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                item.value ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className="sr-only">{item.title}</span>
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                  item.value ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        );
        
      case 'select':
        return (
          <div>
            <div className="flex items-center">
              {item.icon && <div className="mr-3">{item.icon}</div>}
              <div>
                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                {item.description && <div className="text-xs text-gray-500">{item.description}</div>}
              </div>
            </div>
            <div className="mt-2">
              <select
                id={item.id}
                value={item.value}
                onChange={(e) => handleSelectChange(item.id, e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {item.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
        
      case 'input':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {item.icon && <div className="mr-3">{item.icon}</div>}
              <div>
                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                {item.description && <div className="text-xs text-gray-500">{item.description}</div>}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {item.value}
            </div>
          </div>
        );
        
      case 'button':
        return (
          <button
            onClick={item.action}
            className="w-full flex items-center py-2 px-1 hover:bg-gray-50 rounded-md"
          >
            <div className="flex items-center flex-1">
              {item.icon && <div className="mr-3">{item.icon}</div>}
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                {item.description && <div className="text-xs text-gray-500">{item.description}</div>}
              </div>
            </div>
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        );
        
      case 'link':
        return (
          <button
            onClick={item.action}
            className="w-full flex items-center py-2 px-1 hover:bg-gray-50 rounded-md"
          >
            <div className="flex items-center flex-1">
              {item.icon && <div className="mr-3">{item.icon}</div>}
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                {item.description && <div className="text-xs text-gray-500">{item.description}</div>}
              </div>
            </div>
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 标题栏 */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">设置</h1>
        </div>
      </div>
      
      {/* 设置列表 */}
      <div className="container mx-auto px-4 py-4">
        <div className="space-y-6">
          {settings.map(group => (
            <div key={group.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">{group.title}</h2>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6 space-y-5">
                  {group.items.map(item => (
                    <div key={item.id} className={item.type === 'button' || item.type === 'link' ? '' : 'py-2'}>
                      {renderSettingItem(item)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 底部导航 */}
      <BottomNavigation currentPath="/settings" />
    </div>
  );
}