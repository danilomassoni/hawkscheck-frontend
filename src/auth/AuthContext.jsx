import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Criação do contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name, email, paper }
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Ao iniciar, busca token e decodifica se existir
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decoded = jwt_decode(storedToken);
      setUser({
        name: decoded.name,
        email: decoded.sub,
        paper: decoded.paper,
      });
      setToken(storedToken);
    }
  }, []);

  const login = (data) => {
    const { token } = data;
    const decoded = jwt_decode(token);

    const userData = {
      name: decoded.name,
      email: decoded.sub,
      paper: decoded.paper,
    };

    setUser(userData);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const isAdmin = () => user?.paper === "ADMIN";
  const isMentor = () => user?.paper === "MENTOR";
  const isStudent = () => user?.paper === "STUDENT";

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin, isMentor, isStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook de acesso
export const useAuth = () => useContext(AuthContext);
