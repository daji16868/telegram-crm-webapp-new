import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initTelegramApp } from './utils/telegram'

// 初始化 Telegram WebApp
initTelegramApp();

// 渲染 React 应用
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)