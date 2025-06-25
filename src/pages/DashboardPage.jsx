import { useAuth } from "../auth/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-md">
        <h1 className="text-2xl font-bold">Bem-vindo ao Dashboard!</h1>

        {user ? (
          <>
            <p className="text-gray-700">
              <strong>Nome:</strong> {user.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-700">
              <strong>Papel:</strong> {user.role}
            </p>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            >
              Sair
            </button>
          </>
        ) : (
          <p className="text-red-500">Usuário não autenticado.</p>
        )}
      </div>
    </div>
  );
}
