import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Customer, CustomerFormData, Todo, Notification } from './types';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import Dashboard from './components/Dashboard';
import TodoList from './components/TodoList';
import NotificationCenter from './components/NotificationCenter';
import BottomNavigation, { Page } from './components/BottomNavigation';

// 示例数据
const initialCustomers: Customer[] = [
  {
    id: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    status: 'customer',
    notes: '重要客户',
    createdAt: new Date(2023, 1, 15)
  },
  {
    id: '2',
    name: '李四',
    email: 'lisi@example.com',
    phone: '13900139000',
    status: 'lead',
    notes: '近期有购买意向',
    createdAt: new Date(2023, 2, 20)
  },
  {
    id: '3',
    name: '王五',
    email: 'wangwu@example.com',
    phone: '13700137000',
    status: 'prospect',
    notes: '需要跟进',
    createdAt: new Date(2023, 3, 5)
  }
];

const initialTodos: Todo[] = [
  {
    id: '1',
    title: '联系张三讨论合作细节',
    description: '电话联系，确认需求',
    completed: false,
    priority: 'high',
    dueDate: new Date(2023, 3, 25),
    category: '销售',
    createdAt: new Date(2023, 3, 20)
  },
  {
    id: '2',
    title: '准备李四的方案',
    description: '根据上次沟通内容准备初步方案',
    completed: false,
    priority: 'medium',
    dueDate: new Date(2023, 3, 28),
    category: '方案',
    createdAt: new Date(2023, 3, 21)
  },
  {
    id: '3',
    title: '更新客户资料',
    description: '更新CRM系统中的客户资料',
    completed: true,
    priority: 'low',
    dueDate: new Date(2023, 3, 15),
    category: '管理',
    createdAt: new Date(2023, 3, 10)
  }
];

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: '新客户添加',
    message: '张三已被添加为新客户',
    type: 'success',
    read: true,
    createdAt: new Date(2023, 3, 15)
  },
  {
    id: '2',
    title: '待办提醒',
    message: '你有一个高优先级待办即将到期',
    type: 'warning',
    read: false,
    createdAt: new Date(2023, 3, 23)
  },
  {
    id: '3',
    title: '系统更新',
    message: '系统已更新到最新版本',
    type: 'info',
    read: false,
    createdAt: new Date(2023, 3, 24)
  }
];

function App() {
  // 状态管理
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [showForm, setShowForm] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  // 检查Telegram WebApp是否可用
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      // 根据需要可以在这里初始化WebApp
    }
  }, []);
  
  // 计算未读通知数量
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // 客户管理功能
  const handleAddCustomer = (data: CustomerFormData) => {
    const newCustomer: Customer = {
      id: uuidv4(),
      ...data,
      createdAt: new Date()
    };
    
    setCustomers([...customers, newCustomer]);
    setShowForm(false);
    
    // 添加通知
    addNotification({
      title: '客户已添加',
      message: `${data.name} 已被添加为新客户`,
      type: 'success'
    });
  };

  const handleEditCustomer = (data: CustomerFormData) => {
    if (!currentCustomer) return;
    
    const updatedCustomers = customers.map(c => 
      c.id === currentCustomer.id ? { ...c, ...data } : c
    );
    
    setCustomers(updatedCustomers);
    setCurrentCustomer(null);
    setShowForm(false);
    
    // 添加通知
    addNotification({
      title: '客户已更新',
      message: `${data.name} 的信息已更新`,
      type: 'info'
    });
  };

  const handleDeleteCustomer = (id: string) => {
    const customerToDelete = customers.find(c => c.id === id);
    if (!customerToDelete) return;
    
    setCustomers(customers.filter(c => c.id !== id));
    
    // 添加通知
    addNotification({
      title: '客户已删除',
      message: `${customerToDelete.name} 已从客户列表中删除`,
      type: 'warning'
    });
  };

  // Todo 管理功能
  const handleAddTodo = () => {
    // 这里可以显示添加待办的表单
    // 简化起见，直接添加一个示例待办
    const newTodo: Todo = {
      id: uuidv4(),
      title: '新待办事项',
      description: '',
      completed: false,
      priority: 'medium',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 一周后
      category: '未分类',
      createdAt: new Date()
    };
    
    setTodos([...todos, newTodo]);
    
    // 添加通知
    addNotification({
      title: '待办已创建',
      message: '一个新的待办事项已被创建',
      type: 'info'
    });
  };

  const handleToggleTodo = (todo: Todo) => {
    const updatedTodos = todos.map(t => 
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    );
    
    setTodos(updatedTodos);
    
    if (!todo.completed) {
      // 添加通知
      addNotification({
        title: '待办已完成',
        message: `"${todo.title}" 已标记为完成`,
        type: 'success'
      });
    }
  };

  const handleEditTodo = (todo: Todo) => {
    // 这里可以显示编辑待办的表单
    console.log('编辑待办:', todo);
  };

  const handleDeleteTodo = (id: string) => {
    const todoToDelete = todos.find(t => t.id === id);
    if (!todoToDelete) return;
    
    setTodos(todos.filter(t => t.id !== id));
    
    // 添加通知
    addNotification({
      title: '待办已删除',
      message: `"${todoToDelete.title}" 已从待办列表中删除`,
      type: 'info'
    });
  };

  // 通知管理功能
  const addNotification = ({ title, message, type = 'info' }: { title: string; message: string; type?: 'info' | 'success' | 'warning' | 'error' }) => {
    const newNotification: Notification = {
      id: uuidv4(),
      title,
      message,
      type,
      read: false,
      createdAt: new Date()
    };
    
    setNotifications([newNotification, ...notifications]);
  };

  const handleMarkAsRead = (id: string) => {
    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    
    setNotifications(updatedNotifications);
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // 渲染表单
  const renderForm = () => {
    if (!showForm) return null;
    
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="max-w-md w-full">
          <CustomerForm
            onSubmit={currentCustomer ? handleEditCustomer : handleAddCustomer}
            onCancel={() => {
              setShowForm(false);
              setCurrentCustomer(null);
            }}
            initialData={currentCustomer || undefined}
            editing={!!currentCustomer}
          />
        </div>
      </div>
    );
  };

  // 渲染基于当前页面的内容
  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            customers={customers}
            todos={todos}
            notifications={notifications}
            username="用户"
            organization="您的组织"
          />
        );
      
      case 'customers':
        return (
          <div className="p-4">
            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">客户管理</h1>
              <button
                onClick={() => {
                  setCurrentCustomer(null);
                  setShowForm(true);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                添加客户
              </button>
            </div>
            
            <CustomerList
              customers={customers}
              onEdit={(customer) => {
                setCurrentCustomer(customer);
                setShowForm(true);
              }}
              onDelete={handleDeleteCustomer}
            />
          </div>
        );
      
      case 'todos':
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">待办事项</h1>
            <TodoList
              todos={todos}
              onAddTodo={handleAddTodo}
              onToggleTodo={handleToggleTodo}
              onEditTodo={handleEditTodo}
              onDeleteTodo={handleDeleteTodo}
              categories={['销售', '方案', '管理', '跟进', '未分类']}
            />
          </div>
        );
      
      case 'notifications':
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">通知</h1>
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onDeleteNotification={handleDeleteNotification}
              hasMore={false}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {renderContent()}
      <BottomNavigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        unreadNotificationsCount={unreadNotificationsCount}
      />
      {renderForm()}
    </div>
  );
}

export default App;