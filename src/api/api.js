import axios from "axios";

// Define a base URL usando variável de ambiente
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Cria uma instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adiciona o token JWT em cada requisição, se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =================== Funções utilitárias ===================

export const login = async ({ email, password }) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data; // deve conter { token, user }
};

export const getTeams = async () => {
  const response = await api.get("/teams");
  return response.data;
};

export const getStudents = async () => {
  const response = await api.get("/students");
  return response.data;
};

export const addStudent = async (studentData) => {
  const response = await api.post("/students", studentData);
  return response.data;
};

export const getStudentsByTeam = async (teamId) => {
  const response = await api.get(`/teams/${teamId}/students`);
  return response.data;
};

export const addUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// Exporta a instância para uso direto
export default api;
