import React, { useMemo } from 'react';
import { Customer, Todo, Notification } from '../types';

interface DashboardProps {
  customers: Customer[];
  todos: Todo[];
  notifications: Notification[];
  username?: string;
  organization?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  customers, 
  todos, 
  notifications,
  username = '用户',
  organization = '您的组织'
}) => {
  // 计算客户统计
  const customerStats = useMemo(() => {
    // 计算最近30天的新客户
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newCustomers = customers.filter(c => 
      new Date(c.createdAt) >= thirtyDaysAgo
    );
    
    // 按状态统计客户
    const byStatus = {
      lead: customers.filter(c => c.status === 'lead').length,
      prospect: customers.filter(c => c.status === 'prospect').length,
      customer: customers.filter(c => c.status === 'customer').length,
      churned: customers.filter(c => c.status === 'churned').length
    };
    
    // 计算转化率 (顾客/线索)
    const conversionRate = byStatus.lead > 0 
      ? ((byStatus.customer / byStatus.lead) * 100).toFixed(1) 
      : '0';
    
    return {
      total: customers.length,
      new: newCustomers.length,
      byStatus,
      conversionRate
    };
  }, [customers]);
  
  // 获取优先待办事项
  const priorityTodos = useMemo(() => {
    return todos
      .filter(todo => !todo.completed)
      .sort((a, b) => {
        // 首先按优先级排序
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        const priorityDiff = 
          priorityOrder[a.priority as keyof typeof priorityOrder] - 
          priorityOrder[b.priority as keyof typeof priorityOrder];
        
        if (priorityDiff !== 0) return priorityDiff;
        
        // 然后按截止日期排序
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      })
      .slice(0, 5); // 只取前5个
  }, [todos]);
  
  // 获取最新通知
  const latestNotifications = useMemo(() => {
    return [...notifications]
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5); // 只取前5个
  }, [notifications]);
  
  // 获取未读通知数量
  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const getStatusName = (status: string) => {
    const statusMap: Record<string, string> = {
      'lead': '线索',
      'prospect': '潜在客户',
      'customer': '客户',
      'churned': '流失客户'
    };
    return statusMap[status] || status;
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getNotificationTypeClass = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'success': return 'text-green-600';
      case 'info':
      default: return 'text-blue-600';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN');
  };

  return (
    <div className="p-4 space-y-6">
      {/* 欢迎 */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-2xl font-bold">欢迎回来，{username}</h1>
        <p className="mt-2 opacity-90">{organization}的仪表盘概览</p>
      </section>
      
      {/* 客户统计卡片 */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">客户统计</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">总客户</p>
            <p className="text-2xl font-bold">{customerStats.total}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">本月新增</p>
            <p className="text-2xl font-bold">{customerStats.new}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600 font-medium">转化率</p>
            <p className="text-2xl font-bold">{customerStats.conversionRate}%</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">活跃客户</p>
            <p className="text-2xl font-bold">{customerStats.byStatus.customer}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <h3 className="text-lg font-medium mb-3">客户分布</h3>
          <div className="flex items-center gap-4">
            {Object.entries(customerStats.byStatus).map(([status, count]) => (
              <div key={status} className="flex flex-col items-center">
                <p className="text-sm text-gray-500">{getStatusName(status)}</p>
                <div className="text-xl font-semibold">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 待办事项和通知的两列布局 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 优先待办事项 */}
        <section className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">优先待办事项</h2>
            {todos.length > 0 && (
              <span className="text-sm text-indigo-600 font-medium">
                {todos.filter(t => !t.completed).length} 待处理
              </span>
            )}
          </div>
          
          {priorityTodos.length > 0 ? (
            <ul className="divide-y">
              {priorityTodos.map(todo => (
                <li key={todo.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{todo.title}</h4>
                      {todo.description && (
                        <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${getPriorityClass(todo.priority)}`}>
                        {todo.priority === 'high' ? '高' : todo.priority === 'medium' ? '中' : '低'}
                      </span>
                      {todo.dueDate && (
                        <p className="text-xs text-gray-500 mt-1">
                          截止: {formatDate(todo.dueDate)}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 py-4 text-center">没有待办事项</p>
          )}
        </section>
        
        {/* 最新通知 */}
        <section className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">最新通知</h2>
            {unreadNotificationsCount > 0 && (
              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {unreadNotificationsCount} 未读
              </span>
            )}
          </div>
          
          {latestNotifications.length > 0 ? (
            <ul className="divide-y">
              {latestNotifications.map(notification => (
                <li key={notification.id} className={`py-3 ${!notification.read ? 'bg-blue-50' : ''}`}>
                  <div className="flex gap-3">
                    <span className={`inline-block w-2 h-2 rounded-full mt-2 ${getNotificationTypeClass(notification.type)}`}></span>
                    <div>
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 py-4 text-center">没有新通知</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;