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
import AddCustomerPage from './pages/customers/AddCustomerPage';
import OrganizationPage from './pages/organization/OrganizationPage';
import TasksPage from './pages/tasks/TasksPage';
import SettingsPage from './pages/settings/SettingsPage';

function App() {
  // 初始化 Telegram WebApp
  useEffect(() => {
    initTelegramApp();
  }, []);

  return (
    <Router>
      <Routes>
        {/* 身份验证路由 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pending-approval" element={<PendingApprovalPage />} />
        
        {/* 主要功能路由 */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/add" element={<AddCustomerPage />} />
        
        {/* 客户详情页面（待实现） */}
        <Route path="/customers/:id" element={<div className="p-4">客户详情页面（待实现）</div>} />
        
        {/* 任务页面 */}
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/follow-ups" element={<div className="p-4">待跟进任务（待实现）</div>} />
        
        {/* 组织页面 */}
        <Route path="/organization" element={<OrganizationPage />} />
        
        {/* 设置页面 */}
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* 重定向首页到登录页面或者仪表盘 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 404页面 */}
        <Route path="*" element={<div className="p-4 text-center">页面不存在</div>} />
      </Routes>
    </Router>
  );
}

export default App;