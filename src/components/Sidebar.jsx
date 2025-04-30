// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom"; // Para navegação entre páginas

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Menu</h2>
      </div>
      <nav className="space-y-4">
        <ul>
          <li>
            <Link to="/" className="text-white hover:text-red-600 p-2 block">
              Home
            </Link>
          </li>
          <li>
            <Link to="/add-student" className="text-white hover:text-red-600 p-2 block">
              Adicionar Aluno
            </Link>
          </li>
          <li>
            <Link to="/students" className="text-white hover:text-red-600 p-2 block">
              Listar Alunos
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
