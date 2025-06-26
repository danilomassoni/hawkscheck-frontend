import { useAuth } from "../auth/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Bem-vindo ao Dashboard!</h1>
      <p className="mt-2">Nome: {user?.name}</p>
      <p>Email: {localStorage.getItem("email")}</p>
      <p>Papel: {user?.role}</p>
      <button
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        onClick={logout}
      >
        Sair
      </button>
    </div>
  );
}
