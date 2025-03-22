'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { expandWebApp } from '../../utils/telegramWebApp';
import { BottomNavigation } from '../../components/BottomNavigation';

// 模拟组织数据
const MOCK_DEPARTMENTS = [
  {
    id: 1,
    name: '管理层',
    memberCount: 3,
    customerCount: 45,
    leader: '张总',
    members: [
      { id: 101, name: '张总', position: 'CEO', avatar: 'ZT' },
      { id: 102, name: '王总', position: 'CTO', avatar: 'WT' },
      { id: 103, name: '李总', position: 'CFO', avatar: 'LT' }
    ]
  },
  {
    id: 2,
    name: '销售部',
    memberCount: 8,
    customerCount: 156,
    leader: '陈经理',
    members: [
      { id: 201, name: '陈经理', position: '销售总监', avatar: 'CM' },
      { id: 202, name: '赵销售', position: '销售经理', avatar: 'ZX' },
      { id: 203, name: '钱销售', position: '销售代表', avatar: 'QX' },
      { id: 204, name: '孙销售', position: '销售代表', avatar: 'SX' }
    ]
  },
  {
    id: 3,
    name: '市场部',
    memberCount: 5,
    customerCount: 82,
    leader: '吴经理',
    members: [
      { id: 301, name: '吴经理', position: '市场总监', avatar: 'WJ' },
      { id: 302, name: '郑市场', position: '市场专员', avatar: 'ZS' },
      { id: 303, name: '王市场', position: '市场专员', avatar: 'WS' }
    ]
  },
  {
    id: 4,
    name: '技术部',
    memberCount: 12,
    customerCount: 64,
    leader: '刘经理',
    members: [
      { id: 401, name: '刘经理', position: '技术总监', avatar: 'LJ' },
      { id: 402, name: '张开发', position: '高级工程师', avatar: 'ZK' },
      { id: 403, name: '李开发', position: '工程师', avatar: 'LK' }
    ]
  }
];

export default function OrganizationPage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState(MOCK_DEPARTMENTS);
  const [expandedDept, setExpandedDept] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 页面加载时展开 Telegram WebApp
  useEffect(() => {
    expandWebApp();
  }, []);

  // 切换部门展开/折叠状态
  const toggleDepartment = (deptId: number) => {
    if (expandedDept === deptId) {
      setExpandedDept(null);
    } else {
      setExpandedDept(deptId);
    }
  };

  // 过滤部门和成员
  const filteredDepartments = departments.filter(dept => {
    const deptMatch = dept.name.toLowerCase().includes(searchTerm.toLowerCase());
    const memberMatch = dept.members.some(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return deptMatch || memberMatch;
  });

  // 点击部门
  const handleDepartmentClick = (deptId: number) => {
    toggleDepartment(deptId);
  };

  // 点击成员
  const handleMemberClick = (memberId: number) => {
    console.log('查看成员详情:', memberId);
    // 未来实现: 跳转到成员详情页
  };

  // 添加部门
  const handleAddDepartment = () => {
    console.log('添加部门');
    // 未来实现: 跳转到添加部门页面
  };

  // 添加成员
  const handleAddMember = () => {
    console.log('添加成员');
    // 未来实现: 跳转到添加成员页面
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 标题栏 */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">组织架构</h1>
          <div className="flex">
            <button
              onClick={handleAddMember}
              className="p-2 rounded-full hover:bg-gray-100 mr-2"
              aria-label="添加成员"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </button>
            <button
              onClick={handleAddDepartment}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="添加部门"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </button>
          </div>
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
              placeholder="搜索部门或成员"
            />
          </div>
        </div>
      </div>
      
      {/* 组织架构内容 */}
      <div className="container mx-auto px-4 py-4">
        {filteredDepartments.length === 0 ? (
          <div className="text-center py-10">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">未找到部门</h3>
            <p className="mt-1 text-sm text-gray-500">未找到符合条件的部门或成员信息。</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDepartments.map((dept) => (
              <div key={dept.id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* 部门标题 */}
                <div 
                  className="p-4 border-b border-gray-100 flex justify-between items-center cursor-pointer"
                  onClick={() => handleDepartmentClick(dept.id)}
                >
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">{dept.name}</h3>
                      <p className="text-sm text-gray-500">
                        成员: {dept.memberCount} | 客户: {dept.customerCount} | 负责人: {dept.leader}
                      </p>
                    </div>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedDept === dept.id ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {/* 部门成员列表 */}
                {expandedDept === dept.id && (
                  <div className="p-4 bg-gray-50">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">部门成员</h4>
                    <div className="space-y-2">
                      {dept.members.map((member) => (
                        <div 
                          key={member.id}
                          onClick={() => handleMemberClick(member.id)}
                          className="flex items-center p-3 bg-white rounded-md border border-gray-200 cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-medium mr-3">
                            {member.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {member.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {member.position}
                            </p>
                          </div>
                          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* 底部导航 */}
      <BottomNavigation currentPath="/organization" />
    </div>
  );
}