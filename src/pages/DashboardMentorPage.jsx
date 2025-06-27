import { useAuth } from "../auth/AuthContext";

export default function DashboardMentorPage() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Dashboard!</h1>

      <div className="space-y-2">
        <p><strong>Nome:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email || localStorage.getItem("email")}</p>
        <p><strong>Papel:</strong> {user?.role}</p>
        <h1 className="text-2xl font-bold">Painel do Mentor</h1>
      <p>Gerencie estudantes e ações.</p>
      </div>

      <button
        onClick={logout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
      >
        Sair
      </button>
    </div>
  );
}
