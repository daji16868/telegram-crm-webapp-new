'use client';

import React from 'react';
import { CustomerInfo, MatchResult } from '../services/CustomerDuplicateService';

interface DuplicateCustomerWarningProps {
  matchResult: MatchResult;
  onBack: () => void;
}

export const DuplicateCustomerWarning: React.FC<DuplicateCustomerWarningProps> = ({ 
  matchResult, 
  onBack 
}) => {
  const { matchDetails, existingCustomer } = matchResult;
  
  // 检查哪些字段匹配了
  const matchedFields = Object.entries(matchDetails)
    .filter(([_, isMatched]) => isMatched)
    .map(([field]) => field);
  
  // 获取字段的显示名称
  const getFieldDisplayName = (field: string): string => {
    const displayNames: Record<string, string> = {
      name: '客户名称',
      phone: '手机号码',
      wechatId: '微信号',
      qqId: 'QQ号',
      telegramId: 'Telegram ID',
      whatsappId: 'WhatsApp ID',
      email: '电子邮箱'
    };
    return displayNames[field] || field;
  };
  
  if (!existingCustomer) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 标题栏 */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            onClick={onBack}
            className="mr-3 p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">重复客户警告</h1>
        </div>
      </div>
      
      {/* 警告内容 */}
      <div className="container mx-auto px-4 py-6">
        {/* 警告提示 */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">无法添加客户</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>系统中已存在与您尝试添加的客户信息完全匹配的记录。</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 匹配详情 */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-4 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">匹配详情</h2>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-700 mb-4">以下字段与系统中已有的客户记录匹配：</p>
            
            <div className="space-y-3">
              {/* 微信号 */}
              <div className="flex items-center">
                {matchDetails.wechatId ? (
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className="ml-3 text-sm text-gray-700">微信号：{matchDetails.wechatId ? existingCustomer.wechatId : '不匹配'}</span>
              </div>
              
              {/* Telegram ID */}
              <div className="flex items-center">
                {matchDetails.telegramId ? (
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className="ml-3 text-sm text-gray-700">Telegram ID：{matchDetails.telegramId ? existingCustomer.telegramId : '不匹配'}</span>
              </div>
              
              {/* WhatsApp ID */}
              <div className="flex items-center">
                {matchDetails.whatsappId ? (
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className="ml-3 text-sm text-gray-700">WhatsApp ID：{matchDetails.whatsappId ? existingCustomer.whatsappId : '不匹配'}</span>
              </div>
              
              {/* 手机号码 */}
              <div className="flex items-center">
                {matchDetails.phone ? (
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className="ml-3 text-sm text-gray-700">手机号码：{matchDetails.phone ? existingCustomer.phone : '不匹配'}</span>
              </div>
              
              {/* QQ号 */}
              <div className="flex items-center">
                {matchDetails.qqId ? (
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className="ml-3 text-sm text-gray-700">QQ号：{matchDetails.qqId ? existingCustomer.qqId : '不匹配'}</span>
              </div>
              
              {/* 客户名称 */}
              <div className="flex items-center">
                {matchDetails.name ? (
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className="ml-3 text-sm text-gray-700">客户名称：{matchDetails.name ? existingCustomer.name : '不匹配'}</span>
              </div>
            </div>
            
            <div className="mt-6 border-t pt-4">
              <p className="text-sm text-red-600 font-medium">根据系统规则，任一字段匹配即有客户，即无法添加新客户。</p>
            </div>
          </div>
        </div>
        
        {/* 已存在的客户 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">已存在的客户</h2>
          </div>
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                {existingCustomer.name.charAt(0)}
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-lg font-medium">{existingCustomer.name}</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {existingCustomer.tags?.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mt-3 grid grid-cols-1 gap-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    归属于：{existingCustomer.addedBy}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    添加时间：{existingCustomer.addedAt}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 返回按钮 */}
        <div className="mt-6">
          <button
            onClick={onBack}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            返回
          </button>
        </div>
      </div>
    </div>
  );
};