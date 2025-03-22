'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { expandWebApp } from '../../utils/telegramWebApp';
import { BottomNavigation } from '../../components/BottomNavigation';

// 模拟数据
const MOCK_DATA = {
  totalCustomers: 156,
  newCustomersThisMonth: 23,
  pendingFollowUps: 8,
  activeUsers: 42,
  newNotifications: 5,
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
  ],
  salesData: [
    { month: '1月', value: 25000 },
    { month: '2月', value: 35000 },
    { month: '3月', value: 28000 },
    { month: '4月', value: 32000 },
    { month: '5月', value: 42000 },
    { month: '6月', value: 38000 },
    { month: '7月', value: 52000 },
    { month: '8月', value: 48000 },
    { month: '9月', value: 62000 },
    { month: '10月', value: 68000 },
    { month: '11月', value: 58000 },
    { month: '12月', value: 72000 }
  ],
  recentCustomers: [
    { id: 101, name: '李明', phone: '13800138001', company: '北京科技有限公司', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 102, name: '张华', phone: '13900139002', company: '上海贸易有限公司', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: 103, name: '王芳', phone: '13700137003', company: '广州电子有限公司', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: 104, name: '赵丽', phone: '13600136004', company: '深圳科技股份有限公司', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: 105, name: '钱伟', phone: '13500135005', company: '杭州网络科技有限公司', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' }
  ]
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const maxSalesValue = Math.max(...MOCK_DATA.salesData.map(item => item.value));

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
  
  // 处理搜索功能
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);
  
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = MOCK_DATA.recentCustomers.filter(customer => 
        customer.name.includes(searchQuery) || 
        customer.phone.includes(searchQuery) || 
        customer.company.includes(searchQuery)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add_customer':
        navigate('/customers/add');
        break;
      case 'notifications':
        navigate('/notifications');
        break;
      case 'search':
        setShowSearch(true);
        break;
      case 'stats':
        setShowStats(true);
        break;
      default:
        break;
    }
  };

  const handleActivityClick = (activity: any) => {
    navigate(`/customers/${activity.id}`);
  };

  const handleCustomerClick = (customerId: number) => {
    setShowSearch(false);
    setSearchQuery('');
    navigate(`/customers/${customerId}`);
  };
  
  const handleCloseSearch = () => {
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };
  
  const handleCloseStats = () => {
    setShowStats(false);
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
            <p className="text-gray-500 text-sm">新提醒</p>
            <p className="text-2xl font-bold">{MOCK_DATA.newNotifications}</p>
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
            onClick={() => handleQuickAction('notifications')}
            className="flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow"
          >
            <div className="bg-red-100 p-2 rounded-full mb-2 relative">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {MOCK_DATA.newNotifications > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {MOCK_DATA.newNotifications}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-700">新提醒</span>
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

      {/* 搜索客户弹窗 */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white p-4 shadow">
            <div className="flex items-center mb-4">
              <button 
                onClick={handleCloseSearch}
                className="mr-2"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索客户姓名、公司或手机号"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mb-2">
              {searchQuery ? 
                searchResults.length > 0 ? 
                  `找到 ${searchResults.length} 个相关客户` : 
                  '未找到匹配的客户' : 
                '输入关键词开始搜索'}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {searchResults.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {searchResults.map(customer => (
                  <div 
                    key={customer.id}
                    onClick={() => handleCustomerClick(customer.id)}
                    className="bg-white p-4 flex items-center cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex-shrink-0">
                      {customer.avatar ? (
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={customer.avatar}
                          alt={customer.name}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {customer.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.company}</p>
                    </div>
                    <div className="text-xs text-gray-500">{customer.phone}</div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 py-10">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>未找到匹配的客户</p>
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>请输入搜索关键词</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* 统计图表弹窗 */}
      {showStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white p-4 shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">销售统计</h2>
              <button 
                onClick={handleCloseStats}
                className="p-1"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">2023年销售额（万元）</h3>
              <div className="relative h-64">
                <div className="flex h-full items-end space-x-2">
                  {MOCK_DATA.salesData.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex-1 flex flex-col items-center"
                    >
                      <div 
                        className="w-full bg-blue-500 rounded-t" 
                        style={{ 
                          height: `${(item.value / maxSalesValue) * 100}%`,
                          minHeight: '1px'
                        }}
                      ></div>
                      <div className="text-xs mt-1 text-gray-500">{item.month}</div>
                    </div>
                  ))}
                </div>
                
                {/* Y轴刻度 */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pointer-events-none">
                  <span>10万</span>
                  <span>8万</span>
                  <span>6万</span>
                  <span>4万</span>
                  <span>2万</span>
                  <span>0</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-4">销售业绩</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">76.5万</div>
                  <div className="text-sm text-gray-500 mt-1">本月销售额</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">32</div>
                  <div className="text-sm text-gray-500 mt-1">本月成交客户</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">645.8万</div>
                  <div className="text-sm text-gray-500 mt-1">今年累计销售</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">48%</div>
                  <div className="text-sm text-gray-500 mt-1">同比增长</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-4">销售排行榜</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium">张经理</div>
                    <div className="text-xs text-gray-500">销售部</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">142.5万</div>
                    <div className="text-xs text-green-500">↑ 28%</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium">李销售</div>
                    <div className="text-xs text-gray-500">销售部</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">118.2万</div>
                    <div className="text-xs text-green-500">↑ 17%</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-400 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium">王销售</div>
                    <div className="text-xs text-gray-500">销售部</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">92.6万</div>
                    <div className="text-xs text-red-500">↓ 5%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <BottomNavigation currentPath="/dashboard" />
    </div>
  );
}