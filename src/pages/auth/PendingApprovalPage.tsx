'use client';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { expandWebApp } from '../../utils/telegramWebApp';

export default function PendingApprovalPage() {
  const navigate = useNavigate();

  // 页面加载时展开 Telegram WebApp
  useEffect(() => {
    expandWebApp();
  }, []);

  const goToLogin = () => {
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-blue-100">
            <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">申请已提交</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            您的账号申请已成功提交，正在等待管理员审核
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">审核中</h3>
              <p className="mt-1 text-sm text-gray-500">
                管理员通常会在1-2个工作日内完成审核
              </p>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">
                审核通过后，我们将通过您提供的邮箱通知您。届时，您可以使用您注册的用户名和密码登录系统。
              </p>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">
                如有任何问题，请联系管理员:
                <a href="mailto:admin@example.com" className="ml-1 text-blue-600 hover:text-blue-500">
                  admin@example.com
                </a>
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={goToLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              返回登录页面
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}