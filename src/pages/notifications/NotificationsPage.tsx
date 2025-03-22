import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { expandWebApp } from '../../utils/telegramWebApp';
import { BackButton } from '../../components/common/BackButton';

interface Notification {
  id: number;
  title: string;
  content: string;
  time: string;
  type: 'update' | 'team' | 'report' | 'customer';
  read: boolean;
}

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: '客户数据导出功能上线更新', content: '新版本已发布，支持批量导出客户数据，点击查看详情了解更多。', time: '刚刚', type: 'update', read: false },
    { id: 2, title: '新成员加入团队', content: '陈经理已加入您的团队，您可以邀请他参与客户管理。', time: '昨天', type: 'team', read: false },
    { id: 3, title: '业绩报表已生成', content: '您的月度业绩报表已生成，包含新增客户、转化率等指标。', time: '2天前', type: 'report', read: false },
    { id: 4, title: '客户跟进提醒', content: '您有3个客户超过7天未跟进，请及时联系。', time: '3天前', type: 'customer', read: true },
    { id: 5, title: '系统维护通知', content: '系统将于本周日凌晨2点-4点进行例行维护，届时可能无法访问。', time: '1周前', type: 'update', read: true }
  ]);
  
  const [filter, setFilter] = useState<'all' | 'unread' | 'update' | 'team' | 'report' | 'customer'>('all');
  
  // 页面加载时展开 Telegram WebApp
  useEffect(() => {
    expandWebApp();
  }, []);
  
  // 过滤通知
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'update' || filter === 'team' || filter === 'report' || filter === 'customer') {
      return notification.type === filter;
    }
    return true;
  });
  
  // 标记通知为已读
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  // 全部标记为已读
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  // 计算未读通知数
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 标题栏 */}
      <div className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
        <BackButton />
        <h1 className="text-lg font-medium flex-1 text-center mr-8">通知中心</h1>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h2 className="font-semibold">通知中心</h2>
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button 
                className="text-blue-500 text-sm"
                onClick={markAllAsRead}
              >
                全部已读
              </button>
            )}
          </div>
          
          {/* 通知过滤选项 */}
          <div className="flex space-x-2 mb-4 overflow-x-auto py-1">
            <button 
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setFilter('all')}
            >
              全部
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                filter === 'unread' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setFilter('unread')}
            >
              未读
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                filter === 'update' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setFilter('update')}
            >
              更新
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                filter === 'team' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setFilter('team')}
            >
              团队
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                filter === 'report' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setFilter('report')}
            >
              报表
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                filter === 'customer' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setFilter('customer')}
            >
              客户
            </button>
          </div>
          
          {filteredNotifications.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              没有通知
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg border-l-4 ${
                    notification.read ? 'bg-gray-50 border-gray-300' : 'bg-blue-50 border-blue-500'
                  }`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      )}
                      <h3 className="font-medium text-gray-800">{notification.title}</h3>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                        notification.type === 'update' ? 'bg-blue-100 text-blue-600' :
                        notification.type === 'team' ? 'bg-purple-100 text-purple-600' :
                        notification.type === 'report' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {notification.type === 'update' ? '更新' :
                        notification.type === 'team' ? '团队' :
                        notification.type === 'report' ? '报表' : '客户'}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">{notification.content}</p>
                  <div className="mt-3 flex space-x-2">
                    {notification.type === 'update' && (
                      <>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">查看详情</button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm">稍后提醒</button>
                      </>
                    )}
                    {notification.type === 'team' && (
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">查看团队</button>
                    )}
                    {notification.type === 'report' && (
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">查看报表</button>
                    )}
                    {notification.type === 'customer' && (
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">查看客户</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {filteredNotifications.length >= 5 && (
            <button className="w-full mt-6 py-2 text-center text-blue-500 border border-blue-500 rounded-lg">
              加载更多
            </button>
          )}
        </div>
      </div>
    </div>
  );
}