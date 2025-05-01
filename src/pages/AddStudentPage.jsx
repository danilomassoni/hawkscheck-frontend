// src/pages/AddStudentPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const AddStudentPage = () => {
  const navigate = useNavigate();
  const { teamId } = useParams(); // se vier da rota de uma equipe
  const [name, setName] = useState("");
  const [rm, setRm] = useState("");
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(teamId || "");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Erro ao buscar equipes:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !rm || !selectedTeamId) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await axios.post("/students", {
        name,
        rm,
        teamId: selectedTeamId,
      });
      alert("Aluno adicionado com sucesso!");
      navigate(`/teams/${selectedTeamId}/students`);
    } catch (error) {
      console.error("Erro ao adicionar aluno:", error);
      alert("Erro ao adicionar aluno.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-red-600">Adicionar Aluno</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">RM:</label>
          <input
            type="text"
            value={rm}
            onChange={(e) => setRm(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Equipe:</label>
          <select
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          >
            <option value="">Selecione uma equipe</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default AddStudentPage;
