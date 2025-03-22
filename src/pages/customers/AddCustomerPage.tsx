'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { expandWebApp } from '../../utils/telegramWebApp';
import { CustomerInfo, MatchResult, checkDuplicate, addCustomer } from '../../services/CustomerDuplicateService';
import { DuplicateCustomerWarning } from '../../components/DuplicateCustomerWarning';

// 客户表单接口
interface CustomerFormData {
  name: string;
  company: string;
  position: string;
  phone: string;
  wechatId: string; // 添加微信号字段
  qqId: string; // 添加QQ号字段
  email: string;
  status: 'potential' | 'active' | 'signed' | 'inactive';
  source: string;
  notes: string;
}

export default function AddCustomerPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    company: '',
    position: '',
    phone: '',
    wechatId: '', // 初始化微信号
    qqId: '', // 初始化QQ号
    email: '',
    status: 'potential',
    source: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 重复客户检查状态
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [duplicateMatchResult, setDuplicateMatchResult] = useState<MatchResult | null>(null);

  // 页面加载时展开 Telegram WebApp
  useEffect(() => {
    expandWebApp();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // 清除该字段的错误
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '姓名不能为空';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = '公司名称不能为空';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = '电话不能为空';
    } else if (!/^\\d{7,15}$/.test(formData.phone.replace(/[-\\s]/g, ''))) {
      newErrors.phone = '请输入有效的电话号码';
    }
    
    if (formData.email && !/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        // 转换为CustomerInfo格式
        const customerInfo: CustomerInfo = {
          name: formData.name,
          phone: formData.phone,
          wechatId: formData.wechatId,
          qqId: formData.qqId,
          email: formData.email,
          company: formData.company,
          position: formData.position,
          addedBy: '当前用户', // 在实际应用中，这应该是从用户上下文获取
          tags: []
        };
        
        // 检查是否有重复客户
        const result = await checkDuplicate(customerInfo);
        
        if (result.isMatch) {
          // 如果发现重复客户，显示警告
          setDuplicateMatchResult(result);
          setShowDuplicateWarning(true);
          setIsSubmitting(false);
          return;
        }
        
        // 没有重复，添加客户
        await addCustomer(customerInfo);
        
        // 成功后返回客户列表页面
        navigate('/customers');
      } catch (error) {
        console.error('添加客户失败:', error);
        alert('添加客户失败，请稍后再试');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    navigate('/customers');
  };
  
  // 处理从重复警告页面返回
  const handleBackFromWarning = () => {
    setShowDuplicateWarning(false);
    setDuplicateMatchResult(null);
  };
  
  // 如果显示重复警告，则渲染警告组件
  if (showDuplicateWarning && duplicateMatchResult) {
    return (
      <DuplicateCustomerWarning 
        matchResult={duplicateMatchResult} 
        onBack={handleBackFromWarning} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* 标题栏 */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            onClick={handleCancel}
            className="mr-3 p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">添加客户</h1>
        </div>
      </div>
      
      {/* 客户表单 */}
      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            {/* 姓名 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                姓名 <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm ${
                    errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  } sm:text-sm`}
                  placeholder="请输入客户姓名"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
            </div>
            
            {/* 公司 */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                公司名称 <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm ${
                    errors.company ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  } sm:text-sm`}
                  placeholder="请输入公司名称"
                />
                {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
              </div>
            </div>
            
            {/* 职位 */}
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                职位
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="请输入职位"
                />
              </div>
            </div>
            
            {/* 电话 */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                电话 <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm ${
                    errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  } sm:text-sm`}
                  placeholder="请输入电话号码"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>
            </div>
            
            {/* 微信号 - 新增字段 */}
            <div>
              <label htmlFor="wechatId" className="block text-sm font-medium text-gray-700">
                微信号
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="wechatId"
                  name="wechatId"
                  value={formData.wechatId}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="请输入微信号"
                />
              </div>
            </div>
            
            {/* QQ号 - 新增字段 */}
            <div>
              <label htmlFor="qqId" className="block text-sm font-medium text-gray-700">
                QQ号
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="qqId"
                  name="qqId"
                  value={formData.qqId}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="请输入QQ号"
                />
              </div>
            </div>
            
            {/* 邮箱 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                邮箱
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm ${
                    errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  } sm:text-sm`}
                  placeholder="请输入邮箱地址"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
            </div>
            
            {/* 客户状态 */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                客户状态
              </label>
              <div className="mt-1">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="potential">潜在客户</option>
                  <option value="active">跟进中</option>
                  <option value="signed">已签约</option>
                  <option value="inactive">流失客户</option>
                </select>
              </div>
            </div>
            
            {/* 客户来源 */}
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                客户来源
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="请输入客户来源"
                />
              </div>
            </div>
            
            {/* 备注 */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                备注
              </label>
              <div className="mt-1">
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="请输入备注信息"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '保存中...' : '保存客户'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}