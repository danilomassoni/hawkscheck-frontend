import { useNavigate } from "react-router-dom";
import api from "../api/api"; // ajuste o caminho conforme seu projeto
import { createContext, useState, useContext, useEffect } from "react";
// Cria o contexto
export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // Estado do usuário (null = não autenticado)
  const [user, setUser] = useState(null);

  // Estado para carregar enquanto verifica token no localStorage
  const [loading, setLoading] = useState(true);

  // Função para login
  const login = async (email, password) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      const data = response.data;

      // Salva token no localStorage
      localStorage.setItem("token", data.token);

      // Seta dados do usuário
      setUser({
        name: data.name,
        email: data.email,
        paper: data.paper,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  

  // Função para logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Verifica token e busca dados do usuário ao montar o componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Você pode criar um endpoint tipo /api/auth/me para pegar os dados do usuário
      api
        .get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    // Aqui você pode retornar um loading spinner, por exemplo
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
