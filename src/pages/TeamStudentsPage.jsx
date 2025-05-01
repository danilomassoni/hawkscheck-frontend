// src/pages/TeamStudentsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStudents } from "../api/api";

const TeamStudentsPage = () => {
  const { teamId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchTeamStudents = async () => {
      try {
        const allStudents = await getStudents();
        const filtered = allStudents.filter((s) => s.teamId == teamId);
        setStudents(filtered);
      } catch (error) {
        console.error("Erro ao carregar alunos da equipe:", error);
      }
    };

    fetchTeamStudents();
  }, [teamId]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-red-600 mb-4">Alunos da Equipe</h1>
      <Link
        to={`/teams/${teamId}/add-student`}
        className="mb-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Adicionar Aluno
      </Link>
      <ul className="space-y-2">
        {students.map((student) => (
          <li key={student.id} className="border p-3 rounded shadow-sm">
            {student.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamStudentsPage;
