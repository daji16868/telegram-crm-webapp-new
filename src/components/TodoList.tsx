import React, { useState, useEffect } from 'react';
import { Todo } from '../types/todo';

interface TodoListProps {
  initialTodos?: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ initialTodos = [] }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [newTodoDueDate, setNewTodoDueDate] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [newTodoCategory, setNewTodoCategory] = useState('工作');

  // 初始化示例待办事项数据
  useEffect(() => {
    if (todos.length === 0) {
      const defaultTodos: Todo[] = [
        {
          id: '1',
          title: '联系新客户',
          description: '联系王先生了解需求',
          completed: false,
          priority: 'high',
          category: '工作',
          dueDate: '2023-04-01',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: '准备销售报告',
          description: '完成本月销售数据报告',
          completed: false,
          priority: 'medium',
          category: '工作',
          dueDate: '2023-04-05',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: '更新客户资料',
          description: '更新客户联系方式和偏好',
          completed: true,
          priority: 'low',
          category: '工作',
          dueDate: '2023-03-28',
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          title: '预约售后服务',
          description: '为李先生预约上门服务',
          completed: false,
          priority: 'medium',
          category: '服务',
          dueDate: '2023-04-02',
          createdAt: new Date().toISOString()
        },
        {
          id: '5',
          title: '团队会议',
          description: '讨论本周销售策略',
          completed: false,
          priority: 'high',
          category: '会议',
          dueDate: '2023-03-31',
          createdAt: new Date().toISOString()
        }
      ];
      setTodos(defaultTodos);
    }
  }, [todos.length]);

  // 获取所有分类
  const categories = ['all', ...new Set(todos.map(todo => todo.category))];

  // 切换待办事项完成状态
  const toggleTodoCompletion = (todoId: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 添加新待办事项
  const addTodo = () => {
    if (newTodoTitle.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: newTodoTitle,
      description: newTodoDescription,
      completed: false,
      priority: newTodoPriority,
      category: newTodoCategory,
      dueDate: newTodoDueDate || undefined,
      createdAt: new Date().toISOString()
    };

    setTodos([...todos, newTodo]);
    resetNewTodoForm();
    setIsAddingTodo(false);
  };

  // 重置新待办事项表单
  const resetNewTodoForm = () => {
    setNewTodoTitle('');
    setNewTodoDescription('');
    setNewTodoDueDate('');
    setNewTodoPriority('medium');
    setNewTodoCategory('工作');
  };

  // 删除待办事项
  const deleteTodo = (todoId: string) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  // 根据过滤条件筛选待办事项
  const getFilteredTodos = () => {
    return todos
      .filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      })
      .filter(todo => {
        if (categoryFilter === 'all') return true;
        return todo.category === categoryFilter;
      })
      .sort((a, b) => {
        // 先按到期日期排序
        if (a.dueDate && b.dueDate) {
          if (a.dueDate < b.dueDate) return -1;
          if (a.dueDate > b.dueDate) return 1;
        } else if (a.dueDate) {
          return -1;
        } else if (b.dueDate) {
          return 1;
        }
        
        // 如果到期日期相同或都为空，则按优先级排序
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">待办事项</h2>
        {!isAddingTodo && (
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm"
            onClick={() => setIsAddingTodo(true)}
          >
            添加待办
          </button>
        )}
      </div>
      
      {/* 添加待办事项表单 */}
      {isAddingTodo && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              标题
            </label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="输入待办事项标题"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              描述 (可选)
            </label>
            <textarea
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="输入待办事项描述"
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                截止日期 (可选)
              </label>
              <input
                type="date"
                value={newTodoDueDate}
                onChange={(e) => setNewTodoDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                优先级
              </label>
              <select
                value={newTodoPriority}
                onChange={(e) => setNewTodoPriority(e.target.value as 'high' | 'medium' | 'low')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              分类
            </label>
            <input
              type="text"
              value={newTodoCategory}
              onChange={(e) => setNewTodoCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="输入分类"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
              onClick={() => {
                resetNewTodoForm();
                setIsAddingTodo(false);
              }}
            >
              取消
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={addTodo}
              disabled={!newTodoTitle.trim()}
            >
              保存
            </button>
          </div>
        </div>
      )}
      
      {/* 筛选器 */}
      <div className="mb-4 flex flex-col space-y-3">
        <div className="flex space-x-2 overflow-x-auto pb-2">
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
              filter === 'active' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setFilter('active')}
          >
            未完成
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === 'completed' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setFilter('completed')}
          >
            已完成
          </button>
        </div>
        
        {categories.length > 1 && (
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  categoryFilter === category 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}
                onClick={() => setCategoryFilter(category)}
              >
                {category === 'all' ? '所有分类' : category}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* 待办事项列表 */}
      <div className="space-y-3">
        {filteredTodos.length > 0 ? (
          filteredTodos.map(todo => (
            <div 
              key={todo.id} 
              className={`p-3 ${todo.completed ? 'bg-gray-50' : 'bg-white'} border border-gray-200 rounded-lg`}
            >
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodoCompletion(todo.id)}
                  className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                      {todo.title}
                    </h3>
                    <button 
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  {todo.description && (
                    <p className={`text-sm mt-1 ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                      {todo.description}
                    </p>
                  )}
                  
                  <div className="flex mt-2 space-x-2">
                    {todo.category && (
                      <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
                        {todo.category}
                      </span>
                    )}
                    
                    {todo.dueDate && (
                      <span className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                        截止: {todo.dueDate}
                      </span>
                    )}
                    
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                      todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                      todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {todo.priority === 'high' ? '高优先级' : 
                       todo.priority === 'medium' ? '中优先级' : '低优先级'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500">暂无待办事项</p>
        )}
      </div>
    </div>
  );
};