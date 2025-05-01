// src/pages/AddStudentPage.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addStudent } from "../api/api";

const AddStudentPage = () => {
  const [name, setName] = useState("");
  const { teamId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = { name };
    if (teamId) studentData.teamId = teamId;

    try {
      await addStudent(studentData);
      navigate(teamId ? `/teams/${teamId}/students` : "/students");
    } catch (error) {
      console.error("Erro ao adicionar aluno:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-red-600 mb-4">Adicionar Aluno</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome do aluno"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default AddStudentPage;
