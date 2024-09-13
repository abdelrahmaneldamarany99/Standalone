import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CustomersContextProvider } from './context/CustomerContext'
import { AuthContextProvider } from './context/AuthContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CustomersContextProvider>
        <App />
      </CustomersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)

