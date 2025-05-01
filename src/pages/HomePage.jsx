// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { getTeams } from "../api/api";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        setTeams(data);
      } catch (error) {
        console.error("Erro ao carregar equipes:", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-red-600 mb-4">Minhas Equipes</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teams.map((team) => (
          <li key={team.id} className="bg-white shadow-md rounded p-4 border">
            <h2 className="text-lg font-semibold">{team.name}</h2>
            <p className="text-gray-600">{team.description}</p>
            <div className="mt-4 flex gap-2">
              <Link
                to={`/teams/${team.id}/students`}
                className="text-blue-600 underline"
              >
                Ver Alunos
              </Link>
              <Link
                to={`/teams/${team.id}/add-student`}
                className="text-green-600 underline"
              >
                Adicionar Aluno
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
