'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { expandWebApp } from '../../utils/telegramWebApp';
import { BottomNavigation } from '../../components/BottomNavigation';

// 模拟数据
const MOCK_DATA = {
  totalCustomers: 156,
  newCustomersThisMonth: 23,
  pendingFollowUps: 8,
  activeUsers: 42,
  recentActivity: [
    { id: 1, type: 'new_customer', name: '王先生', time: '10分钟前', action: '新增客户' },
    { id: 2, type: 'call', name: '李女士', time: '1小时前', action: '电话跟进' },
    { id: 3, type: 'deal', name: '赵总', time: '昨天', action: '成交签约' },
    { id: 4, type: 'meeting', name: '张先生', time: '昨天', action: '会议安排' },
    { id: 5, type: 'note', name: '刘女士', time: '2天前', action: '添加备注' }
  ],
  customerGroups: [
    { name: '潜在客户', count: 45, percent: 29 },
    { name: '跟进中', count: 68, percent: 43 },
    { name: '已签约', count: 32, percent: 21 },
    { name: '流失客户', count: 11, percent: 7 }
  ]
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // 页面加载时展开 Telegram WebApp
  useEffect(() => {
    expandWebApp();
    
    // 设置问候语
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('早上好');
    } else if (hours < 18) {
      setGreeting('下午好');
    } else {
      setGreeting('晚上好');
    }
    
    // 设置当前日期
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    };
    setCurrentDate(date.toLocaleDateString('zh-CN', options));
  }, []);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add_customer':
        navigate('/customers/add');
        break;
      case 'follow_ups':
        navigate('/tasks/follow-ups');
        break;
      case 'search':
        navigate('/customers/search');
        break;
      case 'stats':
        navigate('/stats');
        break;
      default:
        break;
    }
  };

  const handleActivityClick = (activity: any) => {
    navigate(`/customers/${activity.id}`);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'new_customer':
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        );
      case 'call':
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
        );
      case 'deal':
        return (
          <div className="bg-purple-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'meeting':
        return (
          <div className="bg-yellow-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'note':
        return (
          <div className="bg-gray-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部问候栏 */}
      <div className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-semibold">{greeting}，管理员</h1>
          <p className="text-blue-100 text-sm mt-1">{currentDate}</p>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500 text-sm">客户总数</p>
            <p className="text-2xl font-bold">{MOCK_DATA.totalCustomers}</p>
            <p className="text-green-500 text-xs mt-1">
              <span className="inline-block mr-1">↑</span>
              本月新增 {MOCK_DATA.newCustomersThisMonth}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500 text-sm">待跟进</p>
            <p className="text-2xl font-bold">{MOCK_DATA.pendingFollowUps}</p>
            <p className="text-blue-500 text-xs mt-1">
              <span className="inline-block mr-1">⟳</span>
              点击查看详情
            </p>
          </div>
        </div>
      </div>

      {/* 快捷操作 */}
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-gray-700 font-medium mb-3">快捷操作</h2>
        <div className="grid grid-cols-4 gap-2">
          <button 
            onClick={() => handleQuickAction('add_customer')}
            className="flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow"
          >
            <div className="bg-blue-100 p-2 rounded-full mb-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <span className="text-xs text-gray-700">新增客户</span>
          </button>
          <button 
            onClick={() => handleQuickAction('follow_ups')}
            className="flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow"
          >
            <div className="bg-yellow-100 p-2 rounded-full mb-2">
              <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs text-gray-700">待跟进</span>
          </button>
          <button 
            onClick={() => handleQuickAction('search')}
            className="flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow"
          >
            <div className="bg-purple-100 p-2 rounded-full mb-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="text-xs text-gray-700">搜索</span>
          </button>
          <button 
            onClick={() => handleQuickAction('stats')}
            className="flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow"
          >
            <div className="bg-green-100 p-2 rounded-full mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-xs text-gray-700">统计</span>
          </button>
        </div>
      </div>

      {/* 客户分组 */}
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-gray-700 font-medium mb-3">客户分布</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          {MOCK_DATA.customerGroups.map((group, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{group.name}</span>
                <span className="text-gray-500">{group.count} ({group.percent}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 rounded-full h-2" 
                  style={{ width: `${group.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 最近活动 */}
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-gray-700 font-medium mb-3">最近活动</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {MOCK_DATA.recentActivity.map((activity, index) => (
            <div 
              key={activity.id}
              onClick={() => handleActivityClick(activity)}
              className={`flex items-center p-4 ${
                index !== MOCK_DATA.recentActivity.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              {getActivityIcon(activity.type)}
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                <p className="text-xs text-gray-500">{activity.action}</p>
              </div>
              <div className="text-xs text-gray-400">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部导航 */}
      <BottomNavigation currentPath="/dashboard" />
    </div>
  );
}