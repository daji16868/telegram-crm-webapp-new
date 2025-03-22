'use client';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface BottomNavigationProps {
  currentPath: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentPath }) => {
  const navigate = useNavigate();
  const [showAddOptions, setShowAddOptions] = useState(false);
  
  const isActive = (path: string) => {
    return currentPath === path || currentPath.startsWith(path + '/');
  };
  
  const handleAddClick = () => {
    setShowAddOptions(!showAddOptions);
  };
  
  const handleOptionClick = (path: string) => {
    setShowAddOptions(false);
    navigate(path);
  };

  return (
    <>
      {/* 添加选项浮层 */}
      {showAddOptions && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setShowAddOptions(false)}
        >
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-2">
              <button
                onClick={() => handleOptionClick('/customers/add')}
                className="w-full text-left px-4 py-3 flex items-center hover:bg-gray-50 rounded-md"
              >
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>添加客户</span>
              </button>
              
              <button
                onClick={() => handleOptionClick('/tasks/add')}
                className="w-full text-left px-4 py-3 flex items-center hover:bg-gray-50 rounded-md"
              >
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span>添加任务</span>
              </button>
              
              <button
                onClick={() => handleOptionClick('/notes/add')}
                className="w-full text-left px-4 py-3 flex items-center hover:bg-gray-50 rounded-md"
              >
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>添加笔记</span>
              </button>
              
              <button
                onClick={() => handleOptionClick('/organization/member/add')}
                className="w-full text-left px-4 py-3 flex items-center hover:bg-gray-50 rounded-md"
              >
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>添加成员</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 底部导航栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="grid grid-cols-5 h-16">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center justify-center ${
              isActive('/dashboard') ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <svg 
              className="w-6 h-6" 
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
            <span className="text-xs mt-1">首页</span>
          </Link>

          <Link
            to="/customers"
            className={`flex flex-col items-center justify-center ${
              isActive('/customers') ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <span className="text-xs mt-1">客户</span>
          </Link>

          {/* 中间的添加按钮 */}
          <button
            onClick={handleAddClick}
            className="relative flex flex-col items-center justify-center focus:outline-none"
          >
            <div className="absolute -top-5 bg-blue-600 rounded-full p-3 shadow-lg">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                />
              </svg>
            </div>
            <span className="text-xs mt-8 text-gray-500">添加</span>
          </button>

          <Link
            to="/organization"
            className={`flex flex-col items-center justify-center ${
              isActive('/organization') ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
              />
            </svg>
            <span className="text-xs mt-1">组织</span>
          </Link>

          <Link
            to="/settings"
            className={`flex flex-col items-center justify-center ${
              isActive('/settings') ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            <span className="text-xs mt-1">设置</span>
          </Link>
        </div>
      </div>
    </>
  );
};