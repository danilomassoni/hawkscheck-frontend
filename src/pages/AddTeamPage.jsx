// src/pages/AddTeamPage.jsx
import React, { useState } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";

const AddTeamPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await axios.post("/teams", {
        name,
        description,
      });
      alert("Equipe adicionada com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao adicionar equipe:", error);
      alert("Erro ao adicionar equipe.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-red-600">Adicionar Equipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Nome da Equipe:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Salvar Equipe
        </button>
      </form>
    </div>
  );
};

export default AddTeamPage;
