import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { user } = useAuth();

  const commonLinks = [
    { to: "/dashboard", label: "Início" },
  ];

  const mentorLinks = [
    { to: "/team", label: "Minha Equipe" },
    { to: "/students", label: "Alunos" },
  ];

  const studentLinks = [
    { to: "/profile", label: "Meu Perfil" },
    { to: "/team/view", label: "Minha Equipe" },
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
    <aside className="w-64 h-screen bg-gray-800 text-white p-4 fixed">
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
    </aside>
  );
}
