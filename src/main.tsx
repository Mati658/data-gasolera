import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from "./context/AuthContext.tsx";
import { DatabaseProvider } from "./context/DatabaseContext.tsx";
import StorageProvider from './context/StorageContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <DatabaseProvider>
        <StorageProvider>
          <App />
        </StorageProvider>
      </DatabaseProvider>
    </AuthProvider>
  </React.StrictMode>,
)
