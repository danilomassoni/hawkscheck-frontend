import { useAuth } from "../auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function PrivateLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex h-screen">
      {/* Sidebar à esquerda */}
      <Sidebar />

      {/* Conteúdo da página */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}