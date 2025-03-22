'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { expandWebApp } from '../../utils/telegramWebApp';
import { BottomNavigation } from '../../components/BottomNavigation';

// 任务数据接口
interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  clientId?: string;
  clientName?: string;
  assignee?: string;
}

// 模拟任务数据
const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: '跟进李总采购事宜',
    description: '讨论下一季度的采购计划和预算',
    dueDate: '2023-03-25',
    status: 'pending',
    priority: 'high',
    clientId: '101',
    clientName: '李总（北京科技有限公司）',
    assignee: '张经理'
  },
  {
    id: '2',
    title: '发送产品手册',
    description: '发送最新的产品手册和价格表',
    dueDate: '2023-03-23',
    status: 'completed',
    priority: 'medium',
    clientId: '102',
    clientName: '王总（上海贸易有限公司）',
    assignee: '张经理'
  },
  {
    id: '3',
    title: '回访客户',
    description: '了解产品使用情况，收集反馈',
    dueDate: '2023-03-20',
    status: 'overdue',
    priority: 'medium',
    clientId: '103',
    clientName: '赵总（广州电子有限公司）',
    assignee: '李销售'
  },
  {
    id: '4',
    title: '准备合同文件',
    description: '准备销售合同和相关文件',
    dueDate: '2023-03-27',
    status: 'pending',
    priority: 'high',
    clientId: '104',
    clientName: '钱总（深圳科技股份有限公司）',
    assignee: '李销售'
  },
  {
    id: '5',
    title: '安排产品演示',
    description: '安排新产品演示会议',
    dueDate: '2023-03-30',
    status: 'pending',
    priority: 'low',
    clientId: '105',
    clientName: '孙总（杭州网络科技有限公司）',
    assignee: '王销售'
  }
];

// 获取状态标签属性
const getStatusProps = (status: string) => {
  switch (status) {
    case 'pending':
      return { label: '待处理', className: 'bg-yellow-100 text-yellow-800' };
    case 'completed':
      return { label: '已完成', className: 'bg-green-100 text-green-800' };
    case 'overdue':
      return { label: '已逾期', className: 'bg-red-100 text-red-800' };
    default:
      return { label: '未知', className: 'bg-gray-100 text-gray-800' };
  }
};

// 获取优先级标签属性
const getPriorityProps = (priority: string) => {
  switch (priority) {
    case 'high':
      return { label: '高', className: 'bg-red-100 text-red-800' };
    case 'medium':
      return { label: '中', className: 'bg-blue-100 text-blue-800' };
    case 'low':
      return { label: '低', className: 'bg-green-100 text-green-800' };
    default:
      return { label: '未知', className: 'bg-gray-100 text-gray-800' };
  }
};

export default function TasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [filter, setFilter] = useState('all'); // all, pending, completed, overdue
  const [searchTerm, setSearchTerm] = useState('');

  // 页面加载时展开 Telegram WebApp
  useEffect(() => {
    expandWebApp();
  }, []);

  // 过滤任务
  const filteredTasks = tasks.filter(task => {
    // 状态过滤
    const statusFilter = filter === 'all' || task.status === filter;
    
    // 搜索过滤
    const searchFilter = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (task.clientName && task.clientName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return statusFilter && searchFilter;
  });

  // 任务点击处理
  const handleTaskClick = (taskId: string) => {
    console.log('查看任务详情:', taskId);
    // 未来实现: 跳转到任务详情页
  };

  // 添加任务
  const handleAddTask = () => {
    console.log('添加新任务');
    // 未来实现: 跳转到添加任务页面
  };

  // 完成任务
  const handleCompleteTask = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('标记任务完成:', taskId);
    
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } 
          : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 标题栏 */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">任务管理</h1>
          <button
            onClick={handleAddTask}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="添加任务"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        
        {/* 搜索栏 */}
        <div className="container mx-auto px-4 py-2">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="搜索任务、客户或说明"
            />
          </div>
        </div>
        
        {/* 过滤器 */}
        <div className="container mx-auto px-4 py-2 overflow-x-auto">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'pending' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              待处理
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'completed' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              已完成
            </button>
            <button
              onClick={() => setFilter('overdue')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'overdue' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              已逾期
            </button>
          </div>
        </div>
      </div>
      
      {/* 任务列表 */}
      <div className="container mx-auto px-4 py-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-10">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">未找到任务</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? '未找到符合搜索条件的任务。' : '当前没有' + (filter !== 'all' ? getStatusProps(filter).label : '') + '任务。'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => {
              const statusProps = getStatusProps(task.status);
              const priorityProps = getPriorityProps(task.priority);
              
              return (
                <div 
                  key={task.id}
                  className="bg-white rounded-lg shadow overflow-hidden cursor-pointer"
                  onClick={() => handleTaskClick(task.id)}
                >
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <button
                          onClick={(e) => handleCompleteTask(task.id, e)}
                          className={`h-5 w-5 rounded-full border ${
                            task.status === 'completed' 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-300'
                          } flex items-center justify-center`}
                        >
                          {task.status === 'completed' && (
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h3 className={`text-base font-medium ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                            {task.title}
                          </h3>
                          <div className="flex space-x-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${statusProps.className}`}>
                              {statusProps.label}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${priorityProps.className}`}>
                              {priorityProps.label}
                            </span>
                          </div>
                        </div>
                        
                        {task.description && (
                          <p className={`mt-1 text-sm ${task.status === 'completed' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {task.description}
                          </p>
                        )}
                        
                        {task.clientName && (
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <svg className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="truncate">{task.clientName}</span>
                          </div>
                        )}
                        
                        <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <svg className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(task.dueDate).toLocaleDateString('zh-CN')}
                          </div>
                          
                          {task.assignee && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              指派给: {task.assignee}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* 底部导航 */}
      <BottomNavigation currentPath="/tasks" />
    </div>
  );
}