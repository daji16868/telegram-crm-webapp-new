import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initTelegramApp } from './utils/telegramWebApp';

// 身份验证相关页面
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import PendingApprovalPage from './pages/auth/PendingApprovalPage';

// 主要功能页面
import DashboardPage from './pages/dashboard/DashboardPage';
import CustomersPage from './pages/customers/CustomersPage';

function App() {
  // 初始化 Telegram WebApp
  useEffect(() => {
    initTelegramApp();
  }, []);

  return (
    <Router>
      <Routes>
        {/* 身份验证路由 */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/pending-approval" element={<PendingApprovalPage />} />
        
        {/* 主要功能路由 */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        
        {/* 添加客户和客户详情页面（待实现） */}
        <Route path="/customers/add" element={<div className="p-4">添加客户页面（待实现）</div>} />
        <Route path="/customers/:id" element={<div className="p-4">客户详情页面（待实现）</div>} />
        
        {/* 任务页面（待实现） */}
        <Route path="/tasks" element={<div className="p-4">任务页面（待实现）</div>} />
        <Route path="/tasks/follow-ups" element={<div className="p-4">待跟进任务（待实现）</div>} />
        
        {/* 组织页面（待实现） */}
        <Route path="/organization" element={<div className="p-4">组织架构页面（待实现）</div>} />
        
        {/* 设置页面（待实现） */}
        <Route path="/settings" element={<div className="p-4">设置页面（待实现）</div>} />
        
        {/* 重定向首页到登录页面或者仪表盘 */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        
        {/* 404页面 */}
        <Route path="*" element={<div className="p-4 text-center">页面不存在</div>} />
      </Routes>
    </Router>
  );
}

export default App;