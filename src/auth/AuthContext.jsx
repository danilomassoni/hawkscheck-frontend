import { createContext, useContext, useEffect, useState } from "react";

// Criação do contexto
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Nome, role, etc.
  const [token, setToken] = useState(null);

  // Carrega token do localStorage ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Função para login
  const login = (authData) => {
    setToken(authData.token);
    setUser({ name: authData.name, role: authData.role });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify({ name: authData.name, role: authData.role }));
  };

  // Função para logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado para usar o AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
