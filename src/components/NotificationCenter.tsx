import React, { useState, useEffect } from 'react';
import { Notification } from '../types/notification';

interface NotificationCenterProps {
  initialNotifications?: Notification[];
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  initialNotifications = [] 
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // 初始化示例通知数据
  useEffect(() => {
    if (notifications.length === 0) {
      const defaultNotifications: Notification[] = [
        {
          id: '1',
          title: '新客户注册',
          message: '张女士已注册成为新客户',
          type: 'info',
          isRead: false,
          createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
          relatedTo: { type: 'customer', id: '101' }
        },
        {
          id: '2',
          title: '客户信息更新',
          message: '李先生的联系方式已更新',
          type: 'info',
          isRead: false,
          createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
          relatedTo: { type: 'customer', id: '102' }
        },
        {
          id: '3',
          title: '销售目标达成',
          message: '恭喜！您本月的销售目标已达成',
          type: 'success',
          isRead: true,
          createdAt: new Date(Date.now() - 1 * 86400000).toISOString()
        },
        {
          id: '4',
          title: '任务到期提醒',
          message: '您有一项任务即将到期：联系王先生',
          type: 'warning',
          isRead: false,
          createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
          relatedTo: { type: 'todo', id: '201' }
        },
        {
          id: '5',
          title: '系统维护通知',
          message: '系统将于今晚22:00-23:00进行例行维护',
          type: 'info',
          isRead: true,
          createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
          relatedTo: { type: 'system' }
        }
      ];
      setNotifications(defaultNotifications);
    }
  }, [notifications.length]);

  // 根据过滤条件筛选通知
  const getFilteredNotifications = () => {
    return notifications.filter(notification => {
      if (filter === 'unread') return !notification.isRead;
      if (filter === 'read') return notification.isRead;
      return true;
    }).sort((a, b) => {
      // 按时间降序排序（最新的排在前面）
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  const filteredNotifications = getFilteredNotifications();
  const paginatedNotifications = filteredNotifications.slice(0, page * pageSize);
  const hasMore = paginatedNotifications.length < filteredNotifications.length;

  // 标记通知为已读
  const markAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // 标记所有通知为已读
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, isRead: true }))
    );
  };

  // 删除通知
  const deleteNotification = (notificationId: string) => {
    setNotifications(
      notifications.filter(notification => notification.id !== notificationId)
    );
  };

  // 加载更多通知
  const loadMore = () => {
    setPage(page + 1);
  };

  // 获取未读通知数
  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.isRead).length;
  };

  const unreadCount = getUnreadCount();

  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);

    if (diffSec < 60) {
      return '刚刚';
    } else if (diffMin < 60) {
      return `${diffMin}分钟前`;
    } else if (diffHour < 24) {
      return `${diffHour}小时前`;
    } else if (diffDay === 1) {
      return '昨天';
    } else if (diffDay < 7) {
      return `${diffDay}天前`;
    } else {
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">通知中心</h2>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500">您有 {unreadCount} 条未读通知</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            className="text-sm text-blue-500"
            onClick={markAllAsRead}
          >
            全部标记为已读
          </button>
        )}
      </div>
      
      {/* 筛选器 */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filter === 'all' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-800'
          }`}
          onClick={() => setFilter('all')}
        >
          全部
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filter === 'unread' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-800'
          }`}
          onClick={() => setFilter('unread')}
        >
          未读
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filter === 'read' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-800'
          }`}
          onClick={() => setFilter('read')}
        >
          已读
        </button>
      </div>
      
      {/* 通知列表 */}
      <div className="space-y-4">
        {paginatedNotifications.length > 0 ? (
          paginatedNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`p-4 border rounded-lg ${notification.isRead ? 'bg-white' : 'bg-blue-50'}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' :
                      notification.type === 'error' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`}></span>
                    <h3 className={`font-medium ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                        新
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mb-2 ${notification.isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                    {notification.message}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{formatDate(notification.createdAt)}</span>
                    {notification.relatedTo && (
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {notification.relatedTo.type === 'customer' ? '客户相关' :
                         notification.relatedTo.type === 'todo' ? '待办相关' :
                         '系统通知'}
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  className="text-gray-400 hover:text-red-500 ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            {filter === 'all' 
              ? '暂无通知' 
              : filter === 'unread' 
                ? '没有未读通知' 
                : '没有已读通知'}
          </div>
        )}
      </div>
      
      {/* 加载更多按钮 */}
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md"
            onClick={loadMore}
          >
            加载更多
          </button>
        </div>
      )}
    </div>
  );
};