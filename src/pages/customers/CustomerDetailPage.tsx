'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { expandWebApp } from '../../utils/telegramWebApp';
import { BottomNavigation } from '../../components/BottomNavigation';

// 客户信息接口
interface CustomerInfo {
  id: string;
  name: string;
  phone: string;
  telegramId: string;
  whatsappId: string;
  source: string;
  notes: string;
  status: 'followed' | 'undeveloped'; // 已跟进或未开发
  addedBy?: string;
  addedAt?: string;
  tags?: string[];
  followups?: {
    id: string;
    content: string;
    date: string;
    nextFollowupDate?: string;
  }[];
}

export default function CustomerDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<CustomerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<CustomerInfo | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'followup'>('info');

  // 页面加载时展开 Telegram WebApp 并获取客户数据
  useEffect(() => {
    expandWebApp();
    fetchCustomerData();
  }, [id]);

  // 模拟获取客户数据
  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      // 这里应该是API调用，现在使用模拟数据
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 模拟客户数据
      const mockCustomer: CustomerInfo = {
        id: id || '1001',
        name: '张先生',
        phone: '13812345678',
        telegramId: 'zhang_customer',
        whatsappId: '+8613812345678',
        source: '展会推荐',
        notes: '对我们的产品很感兴趣，希望尽快安排演示',
        status: 'followed',
        addedBy: '李销售',
        addedAt: '2023-09-15',
        tags: ['重要客户', 'VIP'],
        followups: [
          {
            id: 'f1',
            content: '电话沟通了产品功能，客户表示满意',
            date: '2023-09-20',
            nextFollowupDate: '2023-10-01'
          },
          {
            id: 'f2',
            content: '发送了产品详细资料，等待客户反馈',
            date: '2023-09-25'
          }
        ]
      };
      
      setCustomer(mockCustomer);
      setEditedCustomer({...mockCustomer});
    } catch (error) {
      console.error('获取客户数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/customers');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedCustomer(customer ? {...customer} : null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!editedCustomer) return;
    
    const { name, value } = e.target;
    setEditedCustomer({
      ...editedCustomer,
      [name]: value
    });
  };

  const handleSave = async () => {
    if (!editedCustomer) return;
    
    try {
      // 这里应该是API调用，现在使用模拟数据
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 更新客户数据
      setCustomer(editedCustomer);
      setIsEditing(false);
      
      // 显示成功提示
      alert('客户信息已更新');
    } catch (error) {
      console.error('更新客户数据失败:', error);
      alert('更新失败，请稍后再试');
    }
  };

  // 获取状态标签颜色
  const getStatusColor = (status: 'followed' | 'undeveloped') => {
    switch (status) {
      case 'followed':
        return 'bg-green-100 text-green-800';
      case 'undeveloped':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取状态显示名称
  const getStatusName = (status: 'followed' | 'undeveloped') => {
    switch (status) {
      case 'followed':
        return '已跟进';
      case 'undeveloped':
        return '未开发';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow max-w-md">
          <svg className="h-16 w-16 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-lg font-medium text-gray-900">客户未找到</h2>
          <p className="mt-2 text-sm text-gray-500">无法找到该客户信息，可能已被删除或移动。</p>
          <button
            onClick={handleBack}
            className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            返回客户列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 标题栏 */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="ml-2 text-xl font-semibold">客户详情</h1>
          </div>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* 客户基本信息 */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {customer.name.charAt(0)}
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-xl font-bold text-gray-900">{customer.name}</h2>
                <div className="mt-1 flex flex-wrap gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                    {getStatusName(customer.status)}
                  </span>
                  {customer.tags?.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 标签页导航 */}
      <div className="container mx-auto px-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'info'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('info')}
            >
              基本信息
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'followup'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('followup')}
            >
              跟进记录
            </button>
          </nav>
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="container mx-auto px-4 py-4">
        {activeTab === 'info' ? (
          isEditing ? (
            // 编辑模式
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-6">
                {/* 姓名 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedCustomer?.name || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                
                {/* 电话 */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    电话 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={editedCustomer?.phone || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                
                {/* Telegram ID */}
                <div>
                  <label htmlFor="telegramId" className="block text-sm font-medium text-gray-700">
                    Telegram账号
                  </label>
                  <input
                    type="text"
                    id="telegramId"
                    name="telegramId"
                    value={editedCustomer?.telegramId || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                
                {/* WhatsApp ID */}
                <div>
                  <label htmlFor="whatsappId" className="block text-sm font-medium text-gray-700">
                    WhatsApp账号
                  </label>
                  <input
                    type="text"
                    id="whatsappId"
                    name="whatsappId"
                    value={editedCustomer?.whatsappId || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                
                {/* 客户来源 */}
                <div>
                  <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                    客户来源
                  </label>
                  <input
                    type="text"
                    id="source"
                    name="source"
                    value={editedCustomer?.source || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                
                {/* 客户状态 */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    客户状态
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={editedCustomer?.status || 'undeveloped'}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="followed">已跟进</option>
                    <option value="undeveloped">未开发</option>
                  </select>
                </div>
                
                {/* 备注 */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    备注
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={editedCustomer?.notes || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                
                {/* 操作按钮 */}
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    保存
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // 查看模式
            <div className="bg-white rounded-lg shadow">
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">电话</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.phone}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Telegram账号</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.telegramId || '未设置'}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">WhatsApp账号</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.whatsappId || '未设置'}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">客户来源</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.source || '未知'}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">添加时间</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.addedAt || '未知'}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">归属销售</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.addedBy || '未分配'}</dd>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">备注</dt>
                    <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">{customer.notes || '无'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )
        ) : (
          // 跟进记录标签页内容
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              {customer.followups && customer.followups.length > 0 ? (
                <div className="flow-root">
                  <ul className="-mb-8">
                    {customer.followups.map((followup, index) => (
                      <li key={followup.id}>
                        <div className="relative pb-8">
                          {index !== customer.followups!.length - 1 ? (
                            <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                          ) : null}
                          <div className="relative flex items-start space-x-3">
                            <div className="relative">
                              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <div className="text-sm">
                                  <div className="font-medium text-gray-900">
                                    跟进记录 #{index + 1}
                                  </div>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                  {followup.date}
                                </p>
                              </div>
                              <div className="mt-2 text-sm text-gray-700">
                                <p>{followup.content}</p>
                              </div>
                              {followup.nextFollowupDate && (
                                <div className="mt-2 text-sm text-blue-600">
                                  下次跟进：{followup.nextFollowupDate}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-6">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">暂无跟进记录</h3>
                  <p className="mt-1 text-sm text-gray-500">开始添加您的第一条跟进记录</p>
                </div>
              )}
            </div>
            
            {/* 添加跟进按钮 */}
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                添加跟进
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* 底部导航 */}
      <BottomNavigation currentPath="/customers" />
    </div>
  );
}