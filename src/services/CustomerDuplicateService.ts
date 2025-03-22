// 客户查重服务

// 客户信息接口
export interface CustomerInfo {
  id?: string;
  name: string;
  phone?: string;
  wechatId?: string;
  qqId?: string;
  telegramId?: string; // 添加Telegram ID字段
  whatsappId?: string; // 添加WhatsApp ID字段
  email?: string;
  company?: string;
  position?: string;
  source?: string; // 添加客户来源字段
  notes?: string; // 添加客户备注字段
  status?: 'followed' | 'undeveloped'; // 添加客户状态字段
  addedBy?: string;
  addedAt?: string;
  tags?: string[];
}

// 匹配结果接口
export interface MatchResult {
  isMatch: boolean;
  matchDetails: {
    name: boolean;
    phone: boolean;
    wechatId: boolean;
    qqId: boolean;
    telegramId: boolean; // 添加Telegram ID匹配
    whatsappId: boolean; // 添加WhatsApp ID匹配
    email: boolean;
  };
  existingCustomer?: CustomerInfo;
}

// 模拟客户数据库
const mockCustomers: CustomerInfo[] = [
  {
    id: '1001',
    name: '李先生',
    phone: '13812345678',
    wechatId: 'li123',
    qqId: '12345678',
    telegramId: '@li_customer',
    whatsappId: '+8613812345678',
    email: 'li@example.com',
    company: '集团A',
    position: '经理',
    source: '展会推荐',
    notes: '对我们的产品很感兴趣',
    status: 'followed',
    addedBy: '张经理',
    addedAt: '2023-06-14',
    tags: ['集团A', '项目B', '小组C']
  },
  {
    id: '1002',
    name: '王女士',
    phone: '13987654321',
    wechatId: 'wang456',
    qqId: '87654321',
    telegramId: '@wang_customer',
    whatsappId: '+8613987654321',
    email: 'wang@example.com',
    company: '集团B',
    position: '总监',
    source: '朋友介绍',
    notes: '需要详细了解产品功能',
    status: 'undeveloped',
    addedBy: '李经理',
    addedAt: '2023-05-20',
    tags: ['集团B', '项目A']
  },
  {
    id: '1003',
    name: '张先生',
    phone: '13765432198',
    wechatId: 'zhang789',
    qqId: '56781234',
    telegramId: '@zhang_customer',
    whatsappId: '+8613765432198',
    email: 'zhang@example.com',
    company: '集团C',
    position: '董事',
    source: '官网咨询',
    notes: '有合作意向',
    status: 'followed',
    addedBy: '王总监',
    addedAt: '2023-04-15',
    tags: ['集团C', '项目C']
  }
];

/**
 * 检查客户是否重复
 * 规则：只要有一个字段匹配，就认为是重复客户
 */
export const checkDuplicate = async (customer: CustomerInfo): Promise<MatchResult> => {
  // 在实际应用中，这里应该是API调用
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 默认匹配结果
  const matchResult: MatchResult = {
    isMatch: false,
    matchDetails: {
      name: false,
      phone: false,
      wechatId: false,
      qqId: false,
      telegramId: false,
      whatsappId: false,
      email: false
    }
  };
  
  // 检查是否有匹配的客户
  for (const existingCustomer of mockCustomers) {
    let hasMatch = false;
    
    // 检查名称是否匹配
    if (customer.name && existingCustomer.name && customer.name === existingCustomer.name) {
      matchResult.matchDetails.name = true;
      hasMatch = true;
    }
    
    // 检查电话是否匹配
    if (customer.phone && existingCustomer.phone && customer.phone === existingCustomer.phone) {
      matchResult.matchDetails.phone = true;
      hasMatch = true;
    }
    
    // 检查微信号是否匹配
    if (customer.wechatId && existingCustomer.wechatId && customer.wechatId === existingCustomer.wechatId) {
      matchResult.matchDetails.wechatId = true;
      hasMatch = true;
    }
    
    // 检查QQ号是否匹配
    if (customer.qqId && existingCustomer.qqId && customer.qqId === existingCustomer.qqId) {
      matchResult.matchDetails.qqId = true;
      hasMatch = true;
    }
    
    // 检查Telegram ID是否匹配
    if (customer.telegramId && existingCustomer.telegramId && customer.telegramId === existingCustomer.telegramId) {
      matchResult.matchDetails.telegramId = true;
      hasMatch = true;
    }
    
    // 检查WhatsApp ID是否匹配
    if (customer.whatsappId && existingCustomer.whatsappId && customer.whatsappId === existingCustomer.whatsappId) {
      matchResult.matchDetails.whatsappId = true;
      hasMatch = true;
    }
    
    // 检查邮箱是否匹配
    if (customer.email && existingCustomer.email && customer.email === existingCustomer.email) {
      matchResult.matchDetails.email = true;
      hasMatch = true;
    }
    
    // 如果有任何一个字段匹配，则认为是重复客户
    if (hasMatch) {
      matchResult.isMatch = true;
      matchResult.existingCustomer = existingCustomer;
      break;
    }
  }
  
  return matchResult;
};

/**
 * 获取客户列表
 */
export const getCustomers = async (): Promise<CustomerInfo[]> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...mockCustomers];
};

/**
 * 添加客户
 */
export const addCustomer = async (customer: CustomerInfo): Promise<CustomerInfo> => {
  // 先检查是否有重复
  const duplicateCheck = await checkDuplicate(customer);
  
  if (duplicateCheck.isMatch) {
    throw new Error('客户信息重复');
  }
  
  // 添加客户信息
  const newCustomer = {
    ...customer,
    id: `${1000 + mockCustomers.length + 1}`,
    addedAt: new Date().toISOString().split('T')[0]
  };
  
  // 在实际应用中，这里应该是API调用
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 添加到模拟数据中
  mockCustomers.push(newCustomer);
  
  return newCustomer;
};