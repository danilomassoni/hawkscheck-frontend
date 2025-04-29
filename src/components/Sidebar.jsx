import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, Plus } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-6 border-r">
      <h2 className="text-2xl font-bold text-red-600 mb-6">HawksCheck</h2>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 ${
              isActive ? "bg-gray-200 font-semibold" : ""
            }`
          }
        >
          <Home className="w-5 h-5" />
          Início
        </NavLink>
        <NavLink
          to="/students"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 ${
              isActive ? "bg-gray-200 font-semibold" : ""
            }`
          }
        >
          <Users className="w-5 h-5" />
          Alunos
        </NavLink>
        <NavLink
          to="/students/add"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 ${
              isActive ? "bg-gray-200 font-semibold" : ""
            }`
          }
        >
          <Plus className="w-5 h-5" />
          Adicionar Aluno
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
