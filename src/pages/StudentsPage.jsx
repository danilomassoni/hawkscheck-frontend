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
        console.error("Erro ao carregar estudantes", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-red-600 mb-4">Lista de Alunos</h1>
      <ul className="space-y-4">
        {students.map((student) => (
          <li
            key={student.id}
            className="bg-white shadow rounded p-4 border border-gray-200"
          >
            <h2 className="font-semibold text-lg">{student.name}</h2>
            <p className="text-gray-600">{student.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsPage;
