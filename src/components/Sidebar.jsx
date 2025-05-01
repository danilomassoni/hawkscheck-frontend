// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-8">Hawks Check</h1>
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="text-gray-700 hover:text-red-600 font-medium">
          Início
        </Link>
        <Link to="/students" className="text-gray-700 hover:text-red-600 font-medium">
          Todos os Alunos
        </Link>
        <Link to="/add-student" className="text-gray-700 hover:text-red-600 font-medium">
          Adicionar Aluno
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
