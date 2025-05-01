// src/pages/StudentsPage.jsx
import React, { useEffect, useState } from "react";
import { getStudents } from "../api/api";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Erro ao carregar alunos:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-red-600 mb-4">Todos os Alunos</h1>
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

export default StudentsPage;
