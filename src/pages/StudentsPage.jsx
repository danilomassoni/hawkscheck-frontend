import { useEffect, useState } from "react";
import axios from "axios"; 

const StudentsPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/students")
      .then(response => {
        setStudents(response.data);
    })
      .catch(error => {
        console.error("Error fetching students: ", error);
      });

}, []);

return (
<div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-red-600">Lista de Alunos</h1>

        {/* Botão de adicionar aluno */}
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          + Adicionar Aluno
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nome</th>
              <th className="py-3 px-6 text-left">RM</th>
              <th className="py-3 px-6 text-left">Equipe</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{student.id}</td>
                <td className="py-3 px-6">{student.name}</td>
                <td className="py-3 px-6">{student.rm}</td>
                <td className="py-3 px-6">{student.team}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default StudentsPage;