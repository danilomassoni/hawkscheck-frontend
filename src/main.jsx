// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Aqui você importa o arquivo CSS que contém as regras do Tailwind
import App from './App';  // Importa o componente raiz (App)
// src/main.jsx
import { AuthProvider } from './auth/AuthContext';  // Importa o provedor de autenticação 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);