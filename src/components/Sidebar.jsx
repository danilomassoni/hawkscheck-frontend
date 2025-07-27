import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const commonLinks = [{ to: "/dashboard", label: "Início" }];

  const mentorLinks = [
    { to: "/team", label: "Minha Equipe" },
    { to: "/my-students", label: "Alunos" },
  ];

  const studentLinks = [
    { to: "/profile", label: "Meu Perfil" },
    { to: "/student/team", label: "Minha Equipe" },
    { to: "/student/my-attendance", label: "Minhas Presenças" },
  ];

  const adminLinks = [
    { to: "/admin/users", label: "Gerenciar Usuários" },
    { to: "/admin/reports", label: "Relatórios" },
  ];

  const getRoleLinks = () => {
    switch (user?.role) {
      case "MENTOR":
        return mentorLinks;
      case "STUDENT":
        return studentLinks;
      case "ADMIN":
        return adminLinks;
      default:
        return [];
    }
  };

  const links = [...commonLinks, ...getRoleLinks()];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col justify-between fixed">
      <div>
        <h2 className="text-xl font-bold mb-6">HawksCheck</h2>
        <nav className="space-y-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block hover:bg-gray-700 px-3 py-2 rounded"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-6 border-t border-gray-700 pt-4">
        <p className="text-sm mb-2">
          <span className="block font-semibold">{user?.name}</span>
          <span className="text-xs text-gray-400 uppercase">{user?.role}</span>
        </p>
        <button
          onClick={logout}
          className="w-full text-left text-red-400 hover:text-red-300 hover:underline text-sm"
        >
          Sair
        </button>
      </div>
    </aside>
  );
}
