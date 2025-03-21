import React, { useState } from 'react';
import { Customer } from '../types/customer';

interface DashboardProps {
  customers: Customer[];
  username: string;
  organization: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ customers, username, organization }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'today'>('summary');

  // 获取今天的日期（格式：2023-03-21）
  const today = new Date().toISOString().split('T')[0];
  
  // 过滤今天新增的客户
  const newCustomersToday = customers.filter(customer => {
    const customerDate = customer.createdAt.split('T')[0];
    return customerDate === today;
  });

  // 计算转化率（示例数据，实际应用中可能需要真实数据）
  const totalLeads = customers.length + 15; // 假设总潜在客户比实际多15个
  const conversionRate = customers.length > 0 ? (customers.length / totalLeads) * 100 : 0;
  
  // 示例待办事项数据
  const todoItems = [
    { id: '1', title: '联系王先生', priority: 'high', completed: false },
    { id: '2', title: '准备销售报告', priority: 'medium', completed: false },
    { id: '3', title: '更新客户资料', priority: 'low', completed: true },
  ];
  
  // 示例通知数据
  const notifications = [
    { id: '1', title: '新客户注册', time: '10分钟前', read: false },
    { id: '2', title: '销售目标已完成', time: '1小时前', read: true },
    { id: '3', title: '系统维护通知', time: '昨天', read: true },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* 欢迎区域 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">欢迎回来，{username}</h2>
        <p className="text-gray-600 text-sm">{organization}</p>
      </div>
      
      {/* 标签切换 */}
      <div className="flex border-b mb-6">
        <button
          className={`pb-2 px-4 text-sm font-medium ${
            activeTab === 'summary' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('summary')}
        >
          数据摘要
        </button>
        <button
          className={`pb-2 px-4 text-sm font-medium ${
            activeTab === 'today' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('today')}
        >
          今日工作
        </button>
      </div>
      
      {/* 内容区域 */}
      {activeTab === 'summary' ? (
        <div>
          {/* 数据卡片 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-500 mb-1">总客户</h3>
              <p className="text-2xl font-bold">{customers.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-500 mb-1">今日新增</h3>
              <p className="text-2xl font-bold">{newCustomersToday.length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-500 mb-1">待办事项</h3>
              <p className="text-2xl font-bold">{todoItems.filter(item => !item.completed).length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-500 mb-1">转化率</h3>
              <p className="text-2xl font-bold">{conversionRate.toFixed(1)}%</p>
            </div>
          </div>
          
          {/* 最近客户 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">最近客户</h3>
              <button className="text-sm text-blue-600">查看全部</button>
            </div>
            {customers.length > 0 ? (
              <div className="space-y-3">
                {customers.slice(0, 3).map(customer => (
                  <div key={customer.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-medium">{customer.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">暂无客户数据</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* 待办事项 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">今日待办</h3>
              <button className="text-sm text-blue-600">添加待办</button>
            </div>
            <div className="space-y-2">
              {todoItems.map(item => (
                <div key={item.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                  <input 
                    type="checkbox" 
                    checked={item.completed}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-3"
                    readOnly
                  />
                  <span className={`flex-1 ${item.completed ? 'line-through text-gray-400' : ''}`}>
                    {item.title}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.priority === 'high' ? 'bg-red-100 text-red-800' :
                    item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.priority === 'high' ? '高' : item.priority === 'medium' ? '中' : '低'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* 通知 */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">最新通知</h3>
              <button className="text-sm text-blue-600">全部通知</button>
            </div>
            <div className="space-y-2">
              {notifications.map(notification => (
                <div key={notification.id} className="flex items-start p-2 hover:bg-gray-50 rounded-lg">
                  {!notification.read && (
                    <span className="h-2 w-2 mt-1 mr-2 bg-blue-600 rounded-full"></span>
                  )}
                  <div className={`flex-1 ${notification.read ? 'ml-4' : ''}`}>
                    <p className={`${notification.read ? 'text-gray-500' : 'font-medium'}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};