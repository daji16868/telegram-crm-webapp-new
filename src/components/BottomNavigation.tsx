import React from 'react';

export type Page = 'dashboard' | 'customers' | 'todos' | 'notifications';

interface BottomNavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  unreadNotificationsCount?: number;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  currentPage, 
  onPageChange,
  unreadNotificationsCount = 0
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 pb-safe">
      <div className="flex justify-around items-center">
        <button 
          onClick={() => onPageChange('dashboard')}
          className={`flex flex-col items-center pt-2 pb-2 ${currentPage === 'dashboard' ? 'text-indigo-600' : 'text-gray-600'}`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
            />
          </svg>
          <span className="text-xs mt-1">仪表盘</span>
        </button>
        
        <button 
          onClick={() => onPageChange('customers')}
          className={`flex flex-col items-center pt-2 pb-2 ${currentPage === 'customers' ? 'text-indigo-600' : 'text-gray-600'}`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
          <span className="text-xs mt-1">客户</span>
        </button>
        
        <button 
          onClick={() => onPageChange('todos')}
          className={`flex flex-col items-center pt-2 pb-2 ${currentPage === 'todos' ? 'text-indigo-600' : 'text-gray-600'}`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
            />
          </svg>
          <span className="text-xs mt-1">待办</span>
        </button>
        
        <button 
          onClick={() => onPageChange('notifications')}
          className={`flex flex-col items-center pt-2 pb-2 relative ${currentPage === 'notifications' ? 'text-indigo-600' : 'text-gray-600'}`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
            />
          </svg>
          
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
            </span>
          )}
          
          <span className="text-xs mt-1">通知</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;