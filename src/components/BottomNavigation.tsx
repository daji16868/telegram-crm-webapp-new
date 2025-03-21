import React from 'react';

export type NavPage = 'dashboard' | 'customers' | 'todos' | 'notification';

interface BottomNavigationProps {
  currentPage: NavPage;
  onChangePage: (page: NavPage) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  currentPage, 
  onChangePage 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="container mx-auto max-w-lg">
        <div className="flex justify-around items-center">
          {/* 仪表盘按钮 */}
          <button 
            className={`flex flex-col items-center justify-center w-1/4 py-1 ${
              currentPage === 'dashboard' 
                ? 'text-blue-500' 
                : 'text-gray-500'
            }`}
            onClick={() => onChangePage('dashboard')}
          >
            <div className={`w-6 h-6 flex items-center justify-center mb-1 ${
              currentPage === 'dashboard' 
                ? 'bg-blue-100 text-blue-500' 
                : 'text-gray-500'
            } rounded-full`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <span className="text-xs">仪表盘</span>
          </button>
          
          {/* 客户按钮 */}
          <button 
            className={`flex flex-col items-center justify-center w-1/4 py-1 ${
              currentPage === 'customers' 
                ? 'text-blue-500' 
                : 'text-gray-500'
            }`}
            onClick={() => onChangePage('customers')}
          >
            <div className={`w-6 h-6 flex items-center justify-center mb-1 ${
              currentPage === 'customers' 
                ? 'bg-blue-100 text-blue-500' 
                : 'text-gray-500'
            } rounded-full`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-xs">客户</span>
          </button>
          
          {/* 待办事项按钮 */}
          <button 
            className={`flex flex-col items-center justify-center w-1/4 py-1 ${
              currentPage === 'todos' 
                ? 'text-blue-500' 
                : 'text-gray-500'
            }`}
            onClick={() => onChangePage('todos')}
          >
            <div className={`w-6 h-6 flex items-center justify-center mb-1 ${
              currentPage === 'todos' 
                ? 'bg-blue-100 text-blue-500' 
                : 'text-gray-500'
            } rounded-full`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-xs">待办</span>
          </button>
          
          {/* 通知按钮 */}
          <button 
            className={`flex flex-col items-center justify-center w-1/4 py-1 ${
              currentPage === 'notification' 
                ? 'text-blue-500' 
                : 'text-gray-500'
            }`}
            onClick={() => onChangePage('notification')}
          >
            <div className={`w-6 h-6 flex items-center justify-center mb-1 ${
              currentPage === 'notification' 
                ? 'bg-blue-100 text-blue-500' 
                : 'text-gray-500'
            } rounded-full`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <span className="text-xs">通知</span>
          </button>
        </div>
      </div>
    </div>
  );
};