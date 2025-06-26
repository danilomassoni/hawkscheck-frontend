import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    return token ? { token, name, role } : null;
  });

  const login = ({ token, name, role, email }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("role", role);
    localStorage.setItem("email", email);
    setUser({ token, name, role, email });
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) logout();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
