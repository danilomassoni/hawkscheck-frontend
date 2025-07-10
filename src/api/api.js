import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Interceptor para adicionar o token JWT em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ou sessionStorage, dependendo do seu fluxo

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
