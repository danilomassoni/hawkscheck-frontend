import { useAuth } from "../auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function PrivateLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <>
      <Sidebar />

      {/* Conteúdo da página com margem à esquerda para não ficar atrás da Sidebar */}
      <main className="ml-64 p-6 bg-gray-100 min-h-screen overflow-y-auto">
        <Outlet />
      </main>
    </>
  );
}
