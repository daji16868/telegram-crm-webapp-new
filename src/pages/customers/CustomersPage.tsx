'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { expandWebApp } from '../../utils/telegramWebApp';
import { BottomNavigation } from '../../components/BottomNavigation';

// 模拟客户数据
const MOCK_CUSTOMERS = [
  { 
    id: '1', 
    name: '王小明', 
    company: '北京科技有限公司', 
    position: '采购经理',
    phone: '13812345678',
    telegramId: 'wang_xiaoming',
    whatsappId: '+8613812345678',
    email: 'xiaoming@example.com',
    status: 'undeveloped', // 未开发
    source: '展会推荐',
    notes: '对我们的产品很感兴趣',
    lastContact: '2023-03-18'
  },
  { 
    id: '2', 
    name: '李娜', 
    company: '上海贸易有限公司', 
    position: '销售总监',
    phone: '13987654321',
    telegramId: 'lina_sh',
    whatsappId: '+8613987654321',
    email: 'lina@example.com',
    status: 'followed', // 已跟进
    source: '朋友介绍',
    notes: '已经进行过初步接洽',
    lastContact: '2023-03-20'
  },
  { 
    id: '3', 
    name: '张伟', 
    company: '广州电子科技有限公司', 
    position: '技术总监',
    phone: '15812345678',
    telegramId: 'zhang_wei',
    whatsappId: '+8615812345678',
    email: 'zhangwei@example.com',
    status: 'undeveloped', // 未开发
    source: '官网咨询',
    notes: '还没有正式跟进',
    lastContact: '2023-02-15'
  },
  { 
    id: '4', 
    name: '刘芳', 
    company: '深圳网络科技有限公司', 
    position: '市场经理',
    phone: '13612345678',
    telegramId: 'liu_fang',
    whatsappId: '+8613612345678',
    email: 'liufang@example.com',
    status: 'followed', // 已跟进
    source: '社交媒体',
    notes: '有购买意向',
    lastContact: '2023-03-21'
  },
  { 
    id: '5', 
    name: '陈晓', 
    company: '杭州软件有限公司', 
    position: '产品经理',
    phone: '13712345678',
    telegramId: 'chen_xiao',
    whatsappId: '+8613712345678',
    email: 'chenxiao@example.com',
    status: 'followed', // 已跟进
    source: '老客户推荐',
    notes: '已经达成初步合作意向',
    lastContact: '2023-03-19'
  }
];

// 客户状态标签颜色
const STATUS_COLORS: Record<string, string> = {
  undeveloped: 'bg-yellow-100 text-yellow-800', // 未开发
  followed: 'bg-green-100 text-green-800',     // 已跟进
};

// 客户状态名称
const STATUS_NAMES: Record<string, string> = {
  undeveloped: '未开发',
  followed: '已跟进',
};

export default function CustomersPage() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

  // 页面加载时展开 Telegram WebApp
  useEffect(() => {
    expandWebApp();
  }, []);

  // 过滤和排序客户
  const filteredAndSortedCustomers = customers
    .filter(customer => {
      // 搜索过滤
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.company && customer.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        customer.phone.includes(searchTerm) ||
        (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.telegramId && customer.telegramId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.whatsappId && customer.whatsappId.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // 状态过滤
      const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // 排序
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'company':
          comparison = (a.company || '').localeCompare(b.company || '');
          break;
        case 'lastContact':
          comparison = new Date(a.lastContact).getTime() - new Date(b.lastContact).getTime();
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // 点击客户项
  const handleCustomerClick = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  // 添加新客户
  const handleAddCustomer = () => {
    navigate('/customers/add');
  };

  // 切换排序方向
  const handleSortOrderToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // 设置排序字段
  const handleSortByChange = (field: string) => {
    if (sortBy === field) {
      handleSortOrderToggle();
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 标题栏 */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">客户管理</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>
        
        {/* 搜索栏 */}
        <div className="container mx-auto px-4 py-2">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="搜索客户名称、电话或Telegram账号"
            />
          </div>
        </div>
        
        {/* 过滤和排序选项 */}
        {showFilters && (
          <div className="container mx-auto px-4 py-2 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 mb-3">
              <button
                onClick={() => setFilterStatus('all')}
                className={`text-xs px-3 py-1 rounded-full border ${
                  filterStatus === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setFilterStatus('undeveloped')}
                className={`text-xs px-3 py-1 rounded-full border ${
                  filterStatus === 'undeveloped' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300'
                }`}
              >
                未开发
              </button>
              <button
                onClick={() => setFilterStatus('followed')}
                className={`text-xs px-3 py-1 rounded-full border ${
                  filterStatus === 'followed' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300'
                }`}
              >
                已跟进
              </button>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <div>排序方式:</div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleSortByChange('name')}
                  className={`${sortBy === 'name' ? 'font-semibold text-blue-600' : ''}`}
                >
                  姓名
                  {sortBy === 'name' && (
                    <span className="ml-1">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleSortByChange('company')}
                  className={`${sortBy === 'company' ? 'font-semibold text-blue-600' : ''}`}
                >
                  公司
                  {sortBy === 'company' && (
                    <span className="ml-1">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleSortByChange('lastContact')}
                  className={`${sortBy === 'lastContact' ? 'font-semibold text-blue-600' : ''}`}
                >
                  最近联系
                  {sortBy === 'lastContact' && (
                    <span className="ml-1">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 客户列表 */}
      <div className="container mx-auto px-4 py-4">
        {filteredAndSortedCustomers.length === 0 ? (
          <div className="text-center py-10">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">未找到客户</h3>
            <p className="mt-1 text-sm text-gray-500">未找到符合条件的客户记录，请尝试其他搜索条件。</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {filteredAndSortedCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => handleCustomerClick(customer.id)}
                className="border-b border-gray-100 last:border-b-0 p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">{customer.name}</h3>
                    {customer.company && <p className="text-sm text-gray-500 mt-1">{customer.company}</p>}
                    {customer.position && <p className="text-sm text-gray-500">{customer.position}</p>}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[customer.status]}`}>
                    {STATUS_NAMES[customer.status]}
                  </span>
                </div>
                <div className="flex flex-wrap mt-2 text-sm text-gray-500">
                  <div className="flex items-center mr-4 mb-1">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {customer.phone}
                  </div>
                  {customer.telegramId && (
                    <div className="flex items-center mr-4 mb-1">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {customer.telegramId}
                    </div>
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  最近联系: {new Date(customer.lastContact).toLocaleDateString('zh-CN')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* 添加客户浮动按钮 */}
      <button
        onClick={handleAddCustomer}
        className="fixed right-5 bottom-20 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
      
      {/* 底部导航 */}
      <BottomNavigation currentPath="/customers" />
    </div>
  );
}