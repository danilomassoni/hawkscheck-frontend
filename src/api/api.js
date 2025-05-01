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

// Funções utilitárias para chamadas específicas
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



// Exporta a instância caso precise usar diretamente
export default api;

