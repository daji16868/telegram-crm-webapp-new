import React, { useState, useMemo } from 'react';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onAddTodo: () => void;
  onToggleTodo: (todo: Todo) => void;
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
  categories?: string[];
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onAddTodo,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
  categories = []
}) => {
  const [filterCompleted, setFilterCompleted] = useState<boolean | null>(false);
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'createdAt'>('dueDate');

  // 提取所有类别
  const allCategories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    
    todos.forEach(todo => {
      if (todo.category) {
        uniqueCategories.add(todo.category);
      }
    });
    
    // 如果有传入预定义的类别，也添加到集合中
    categories.forEach(category => {
      uniqueCategories.add(category);
    });
    
    return Array.from(uniqueCategories).sort();
  }, [todos, categories]);

  // 过滤和排序待办事项
  const filteredTodos = useMemo(() => {
    // 过滤
    let result = todos.filter(todo => {
      // 按完成状态过滤
      if (filterCompleted !== null && todo.completed !== filterCompleted) {
        return false;
      }
      
      // 按优先级过滤
      if (filterPriority !== 'all' && todo.priority !== filterPriority) {
        return false;
      }
      
      // 按类别过滤
      if (filterCategory !== 'all' && todo.category !== filterCategory) {
        return false;
      }
      
      return true;
    });
    
    // 排序
    result = [...result].sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === 'priority') {
        const priorityMap: Record<string, number> = {
          'high': 0,
          'medium': 1,
          'low': 2
        };
        return priorityMap[a.priority] - priorityMap[b.priority];
      } else {
        // createdAt
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
    
    return result;
  }, [todos, filterCompleted, filterPriority, filterCategory, sortBy]);

  // 获取待办事项数量统计
  const todoStats = useMemo(() => {
    const completed = todos.filter(todo => todo.completed).length;
    const pending = todos.length - completed;
    
    return { total: todos.length, completed, pending };
  }, [todos]);
  
  // 优先级标签显示
  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return priority;
    }
  };
  
  // 优先级类名
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // 格式化日期
  const formatDate = (date: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('zh-CN');
  };
  
  // 检查待办是否过期
  const isOverdue = (dueDate: Date, completed: boolean) => {
    if (completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dueDate) < today;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">待办事项</h2>
        <div className="flex space-x-2">
          <span className="text-sm text-gray-500">{todoStats.pending} 待办 / {todoStats.completed} 已完成</span>
          <button
            onClick={onAddTodo}
            className="p-1 rounded-full bg-indigo-500 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* 过滤和排序选项 */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex-1 min-w-[100px]">
          <select
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
            value={filterCompleted === null ? 'all' : filterCompleted ? 'completed' : 'pending'}
            onChange={(e) => {
              const val = e.target.value;
              setFilterCompleted(
                val === 'all' ? null : val === 'completed'
              );
            }}
          >
            <option value="all">所有状态</option>
            <option value="pending">待完成</option>
            <option value="completed">已完成</option>
          </select>
        </div>
        
        <div className="flex-1 min-w-[100px]">
          <select
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">所有优先级</option>
            <option value="high">高优先级</option>
            <option value="medium">中优先级</option>
            <option value="low">低优先级</option>
          </select>
        </div>
        
        {allCategories.length > 0 && (
          <div className="flex-1 min-w-[100px]">
            <select
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">所有类别</option>
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        )}
        
        <div className="flex-1 min-w-[100px]">
          <select
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="dueDate">按截止日期</option>
            <option value="priority">按优先级</option>
            <option value="createdAt">按创建时间</option>
          </select>
        </div>
      </div>
      
      {/* 待办事项列表 */}
      {filteredTodos.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {filteredTodos.map(todo => (
            <li key={todo.id} className={`py-4 ${todo.completed ? 'opacity-60' : ''}`}>
              <div className="flex items-start gap-3">
                <div>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggleTodo(todo)}
                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                      {todo.title}
                    </h3>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(todo.priority)}`}>
                        {getPriorityLabel(todo.priority)}
                      </span>
                      
                      <div className="relative group">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                        
                        <div className="hidden group-hover:block absolute right-0 w-32 bg-white shadow-lg rounded-md py-1 z-10">
                          <button
                            onClick={() => onEditTodo(todo)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            编辑
                          </button>
                          <button
                            onClick={() => onDeleteTodo(todo.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            删除
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {todo.description && (
                    <p className="mt-1 text-sm text-gray-600">
                      {todo.description}
                    </p>
                  )}
                  
                  <div className="mt-2 flex items-center text-xs text-gray-500 space-x-3">
                    {todo.dueDate && (
                      <div className={isOverdue(todo.dueDate, todo.completed) ? 'text-red-600 font-medium' : ''}>
                        <span>截止: {formatDate(todo.dueDate)}</span>
                        {isOverdue(todo.dueDate, todo.completed) && (
                          <span className="ml-1">(已过期)</span>
                        )}
                      </div>
                    )}
                    
                    {todo.category && (
                      <div className="bg-gray-100 px-2 py-1 rounded">
                        {todo.category}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-8 text-center text-gray-500">
          没有找到符合条件的待办事项
        </div>
      )}
    </div>
  );
};

export default TodoList;