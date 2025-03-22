'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { expandWebApp } from '../../utils/telegramWebApp';
import { BottomNavigation } from '../../components/BottomNavigation';

// 客户状态名称
const STATUS_NAMES: Record<string, string> = {
  potential: '潜在客户',
  active: '跟进中',
  signed: '已签约',
  inactive: '流失客户',
  followed: '已跟进',
  notDeveloped: '未开发'
};

// 客户状态标签颜色
const STATUS_COLORS: Record<string, string> = {
  potential: 'bg-yellow-100 text-yellow-800', // 潜在客户
  active: 'bg-blue-100 text-blue-800',       // 跟进中
  signed: 'bg-green-100 text-green-800',     // 已签约
  inactive: 'bg-gray-100 text-gray-800',     // 流失客户
  followed: 'bg-green-100 text-green-800',   // 已跟进
  notDeveloped: 'bg-red-100 text-red-800'    // 未开发
};

// 客户接口
interface Customer {
  id: string;
  name: string;
  phone: string;
  telegramId?: string;
  whatsappId?: string;
  source?: string;
  notes?: string;
  status: string;
  lastContact?: string;
  followUps?: FollowUp[];
}

// 跟进记录接口
interface FollowUp {
  id: string;
  date: string;
  content: string;
  nextAction?: string;
  nextActionDate?: string;
}

export default function CustomerDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);
  const [showAddFollowUp, setShowAddFollowUp] = useState(false);
  const [newFollowUp, setNewFollowUp] = useState({ content: '', nextAction: '', nextActionDate: '' });

  // 页面加载时展开 Telegram WebApp
  useEffect(() => {
    expandWebApp();
    
    // 获取客户详情数据
    fetchCustomerDetails();
  }, [id]);

  // 模拟获取客户详情数据
  const fetchCustomerDetails = () => {
    setLoading(true);
    
    // 模拟API请求延迟
    setTimeout(() => {
      // 模拟客户数据
      const mockCustomer: Customer = {
        id: id || '1',
        name: '王小明',
        phone: '13812345678',
        telegramId: '@xiaoming',
        whatsappId: '+8613812345678',
        source: '官网咨询',
        notes: '对我们的产品很感兴趣，特别是企业版功能',
        status: 'active',
        lastContact: '2023-05-15',
        followUps: [
          {
            id: 'f1',
            date: '2023-05-15',
            content: '首次电话联系，介绍了我们的产品特点',
            nextAction: '安排线上演示',
            nextActionDate: '2023-05-20'
          },
          {
            id: 'f2',
            date: '2023-05-20',
            content: '进行了产品演示，客户提出了一些功能需求',
            nextAction: '跟进报价单',
            nextActionDate: '2023-05-25'
          }
        ]
      };
      
      setCustomer(mockCustomer);
      setLoading(false);
    }, 800);
  };

  // 返回客户列表
  const handleBack = () => {
    navigate('/customers');
  };

  // 编辑客户
  const handleEdit = () => {
    setIsEditing(true);
    setEditedCustomer({...customer} as Customer);
  };

  // 保存客户编辑
  const handleSave = () => {
    if (editedCustomer) {
      // 在实际应用中，这里应该调用API保存修改
      setCustomer(editedCustomer);
      setIsEditing(false);
      setEditedCustomer(null);
    }
  };

  // 取消编辑
  const handleCancel = () => {
    setIsEditing(false);
    setEditedCustomer(null);
  };

  // 处理客户字段变更
  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (editedCustomer) {
      setEditedCustomer({
        ...editedCustomer,
        [e.target.name]: e.target.value
      });
    }
  };

  // 添加跟进记录
  const handleAddFollowUp = () => {
    setShowAddFollowUp(true);
  };

  // 保存新跟进记录
  const handleSaveFollowUp = () => {
    if (customer && newFollowUp.content) {
      const today = new Date().toISOString().split('T')[0];
      const newFollowUpEntry: FollowUp = {
        id: `f${Date.now()}`,
        date: today,
        content: newFollowUp.content,
        nextAction: newFollowUp.nextAction,
        nextActionDate: newFollowUp.nextActionDate
      };
      
      const updatedFollowUps = [...(customer.followUps || []), newFollowUpEntry];
      setCustomer({
        ...customer,
        followUps: updatedFollowUps,
        lastContact: today
      });
      
      setNewFollowUp({ content: '', nextAction: '', nextActionDate: '' });
      setShowAddFollowUp(false);
    }
  };

  // 取消添加跟进记录
  const handleCancelFollowUp = () => {
    setNewFollowUp({ content: '', nextAction: '', nextActionDate: '' });
    setShowAddFollowUp(false);
  };

  // 处理跟进记录字段变更
  const handleFollowUpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewFollowUp({
      ...newFollowUp,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="mt-4 text-xl font-medium text-gray-900">未找到客户</h2>
        <p className="mt-1 text-gray-500">无法获取客户详情信息</p>
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
        >
          返回客户列表
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 标题栏 */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            onClick={handleBack}
            className="mr-3 p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">客户详情</h1>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="ml-auto px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
            >
              编辑
            </button>
          )}
        </div>
      </div>
      
      {/* 客户详情内容 */}
      <div className="container mx-auto px-4 py-4">
        {isEditing ? (
          /* 编辑表单 */
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              {/* 姓名 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  客户姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedCustomer?.name || ''}
                  onChange={handleCustomerChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                  onChange={handleCustomerChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              {/* Telegram账号 */}
              <div>
                <label htmlFor="telegramId" className="block text-sm font-medium text-gray-700">
                  Telegram账号
                </label>
                <input
                  type="text"
                  id="telegramId"
                  name="telegramId"
                  value={editedCustomer?.telegramId || ''}
                  onChange={handleCustomerChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              {/* WhatsApp账号 */}
              <div>
                <label htmlFor="whatsappId" className="block text-sm font-medium text-gray-700">
                  WhatsApp账号
                </label>
                <input
                  type="text"
                  id="whatsappId"
                  name="whatsappId"
                  value={editedCustomer?.whatsappId || ''}
                  onChange={handleCustomerChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                  onChange={handleCustomerChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                  value={editedCustomer?.status || 'notDeveloped'}
                  onChange={handleCustomerChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="followed">已跟进</option>
                  <option value="notDeveloped">未开发</option>
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
                  rows={3}
                  value={editedCustomer?.notes || ''}
                  onChange={handleCustomerChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={handleSave}
                className="flex-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                保存
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                取消
              </button>
            </div>
          </div>
        ) : (
          /* 详情视图 */
          <div className="space-y-4">
            {/* 基本信息卡片 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">基本信息</h2>
                <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[customer.status]}`}>
                  {STATUS_NAMES[customer.status] || customer.status}
                </span>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">姓名</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">电话</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <a href={`tel:${customer.phone}`} className="text-blue-600 hover:underline">{customer.phone}</a>
                    </dd>
                  </div>
                  {customer.telegramId && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Telegram</dt>
                      <dd className="mt-1 text-sm text-gray-900">{customer.telegramId}</dd>
                    </div>
                  )}
                  {customer.whatsappId && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">WhatsApp</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <a href={`https://wa.me/${customer.whatsappId.replace(/\D/g, '')}`} className="text-blue-600 hover:underline">{customer.whatsappId}</a>
                      </dd>
                    </div>
                  )}
                  {customer.source && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">客户来源</dt>
                      <dd className="mt-1 text-sm text-gray-900">{customer.source}</dd>
                    </div>
                  )}
                  {customer.lastContact && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">最近联系</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(customer.lastContact).toLocaleDateString('zh-CN')}
                      </dd>
                    </div>
                  )}
                </dl>
                {customer.notes && (
                  <div className="mt-6">
                    <dt className="text-sm font-medium text-gray-500">备注</dt>
                    <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{customer.notes}</dd>
                  </div>
                )}
              </div>
            </div>
            
            {/* 跟进记录卡片 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">跟进记录</h2>
                <button
                  onClick={handleAddFollowUp}
                  className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                >
                  添加记录
                </button>
              </div>
              
              {showAddFollowUp && (
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6 bg-gray-50">
                  <h3 className="text-md font-medium text-gray-900 mb-4">新增跟进记录</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        跟进内容 <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="content"
                        name="content"
                        rows={3}
                        value={newFollowUp.content}
                        onChange={handleFollowUpChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="请输入跟进内容..."
                      />
                    </div>
                    <div>
                      <label htmlFor="nextAction" className="block text-sm font-medium text-gray-700">
                        下一步计划
                      </label>
                      <input
                        type="text"
                        id="nextAction"
                        name="nextAction"
                        value={newFollowUp.nextAction}
                        onChange={handleFollowUpChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="下一步行动计划..."
                      />
                    </div>
                    <div>
                      <label htmlFor="nextActionDate" className="block text-sm font-medium text-gray-700">
                        计划日期
                      </label>
                      <input
                        type="date"
                        id="nextActionDate"
                        name="nextActionDate"
                        value={newFollowUp.nextActionDate}
                        onChange={handleFollowUpChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-5 flex space-x-3">
                    <button
                      onClick={handleSaveFollowUp}
                      disabled={!newFollowUp.content}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      保存
                    </button>
                    <button
                      onClick={handleCancelFollowUp}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      取消
                    </button>
                  </div>
                </div>
              )}
              
              <div className="border-t border-gray-200">
                {customer.followUps && customer.followUps.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {customer.followUps.map((followUp, index) => (
                      <li key={followUp.id} className="px-4 py-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(followUp.date).toLocaleDateString('zh-CN')}
                          </p>
                          <span className="text-xs text-gray-500">#{customer.followUps!.length - index}</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">{followUp.content}</p>
                        {(followUp.nextAction || followUp.nextActionDate) && (
                          <div className="mt-3 flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>
                              {followUp.nextAction}
                              {followUp.nextActionDate && ` (${new Date(followUp.nextActionDate).toLocaleDateString('zh-CN')})`}
                            </span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-5 text-center text-sm text-gray-500">
                    暂无跟进记录
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 底部导航 */}
      <BottomNavigation currentPath="/customers" />
    </div>
  );
}