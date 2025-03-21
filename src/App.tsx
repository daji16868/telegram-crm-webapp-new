import React, { useState, useEffect } from 'react'
import { CustomerForm } from './components/CustomerForm'
import { CustomerList } from './components/CustomerList'
import { Customer, CustomerFormData } from './types/customer'
import { WebApp } from './utils/telegram'
import { Dashboard } from './components/Dashboard'
import { BottomNavigation, NavPage } from './components/BottomNavigation'
import { TodoList } from './components/TodoList'
import { NotificationCenter } from './components/NotificationCenter'

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [currentPage, setCurrentPage] = useState<NavPage>('dashboard')

  useEffect(() => {
    console.log('App loaded!')
    if (WebApp) {
      console.log('Telegram WebApp is available')
      // 初始化Telegram WebApp
      WebApp.enableClosingConfirmation()
      WebApp.ready()
      WebApp.expand()
    } else {
      console.log('Telegram WebApp is not available')
    }
  }, [])

  const handleSubmit = (formData: CustomerFormData) => {
    if (editingCustomer) {
      // 更新现有客户
      const updatedCustomers = customers.map(customer =>
        customer.id === editingCustomer.id
          ? { ...customer, ...formData }
          : customer
      )
      setCustomers(updatedCustomers)
      setEditingCustomer(null)
    } else {
      // 添加新客户
      const newCustomer: Customer = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      }
      setCustomers([...customers, newCustomer])
    }
    setIsFormVisible(false)

    if (WebApp) {
      console.log('Sending data to Telegram', formData)
      WebApp.sendData(JSON.stringify({
        action: 'add_customer',
        customer: formData
      }))
      // 不要自动关闭WebApp，让用户可以继续使用
      // WebApp.close()
    }
  }

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer)
    setIsFormVisible(true)
  }

  const handleDelete = (customer: Customer) => {
    const updatedCustomers = customers.filter(c => c.id !== customer.id)
    setCustomers(updatedCustomers)
  }

  const handleAddCustomer = () => {
    setEditingCustomer(null)
    setIsFormVisible(true)
  }

  const handleBackFromForm = () => {
    setIsFormVisible(false)
    setEditingCustomer(null)
  }

  // 渲染当前页面内容
  const renderPageContent = () => {
    // 如果表单可见，则优先显示表单
    if (isFormVisible) {
      return (
        <div className="mb-20">
          <div className="flex items-center mb-4">
            <button 
              className="mr-2 p-2 bg-gray-100 rounded-full" 
              onClick={handleBackFromForm}
            >
              <span className="block w-4 h-4 border-l-2 border-b-2 border-gray-500 transform rotate-45"></span>
            </button>
            <h2 className="text-xl font-semibold">{editingCustomer ? '编辑客户' : '添加客户'}</h2>
          </div>
          <CustomerForm
            onSubmit={handleSubmit}
            initialData={editingCustomer || undefined}
          />
        </div>
      )
    }

    // 根据当前页面渲染对应内容
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="mb-20">
            <Dashboard customers={customers} username="张经理" organization="优先客户管理" />
          </div>
        )
      case 'customers':
        return (
          <div className="mb-20">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">我的客户</h2>
                <button 
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm"
                  onClick={handleAddCustomer}
                >
                  添加客户
                </button>
              </div>
              <CustomerList
                customers={customers}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        )
      case 'todos':
        return <TodoList />
      case 'notification':
        return <NotificationCenter />
      default:
        return <div>页面不存在</div>
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-4 pb-20 max-w-lg">
        {/* 顶部导航栏 */}
        <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow">
          <h1 className="text-xl font-bold">CRM管理系统</h1>
          <div className="flex items-center">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <span className="block w-5 h-5 bg-gray-300 rounded-full"></span>
            </button>
            <button className="ml-2 p-2 text-gray-500 hover:text-gray-700">
              <span className="block w-5 h-5 bg-gray-300 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* 页面内容 */}
        {renderPageContent()}
      </div>

      {/* 底部导航栏 */}
      {!isFormVisible && (
        <BottomNavigation currentPage={currentPage} onChangePage={setCurrentPage} />
      )}
    </div>
  )
}

export default App