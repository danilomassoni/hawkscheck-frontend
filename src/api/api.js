// src/api/api.js
import axios from "axios";

// Cria uma instância do Axios com baseURL do seu backend
const api = axios.create({
  baseURL: "http://localhost:8080/api", // ajuste se sua porta ou endpoint mudar
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
