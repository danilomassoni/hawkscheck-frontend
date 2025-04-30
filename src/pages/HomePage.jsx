// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar"; // Importando a barra lateral
import { getTeams } from "../api/api"; // Importando a função que busca as equipes

const HomePage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await getTeams(); // Pegando as equipes da API
        setTeams(fetchedTeams);
      } catch (error) {
        console.error("Erro ao carregar equipes", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <h1 className="text-2xl font-bold text-red-600">Olá, mundo!</h1>

      <div className="flex-1 p-6 ml-64">
        <h1 className="text-xl font-bold text-red-600 mb-4">Minhas Equipes</h1>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teams.map((team) => (
            <li
              key={team.id}
              className="bg-white shadow-md rounded p-4 border border-gray-200"
            >
              <h2 className="text-lg font-semibold">{team.name}</h2>
              <p className="text-gray-600">{team.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
