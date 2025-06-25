// src/auth/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Verifica token ao carregar a aplicação
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data);
    } catch (err) {
      console.error("Erro ao buscar dados do usuário:", err);
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      const { token, name, role, email: userEmail } = response.data;

      localStorage.setItem("token", token);
      setUser({ name, role, email: userEmail });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Credenciais inválidas");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
