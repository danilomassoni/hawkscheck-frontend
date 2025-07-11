import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function TeamStudentsPage() {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamAndStudents = async () => {
      try {
        setLoading(true);

        // Busca o nome do time
        const teamRes = await api.get(`/team/${teamId}`);
        setTeamName(teamRes.data.name);

        // Busca os alunos daquele time
        const studentsRes = await api.get(`/team/${teamId}/members`);
        setStudents(studentsRes.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar os alunos da equipe.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamAndStudents();
  }, [teamId]);

  if (loading) return <p className="p-6">Carregando alunos...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Alunos da equipe: {teamName}</h1>

      {students.length === 0 ? (
        <p>Não há alunos adicionados a essa equipe.</p>
      ) : (
        <ul className="space-y-2">
          {students.map((student) => (
            <li
              key={student.id}
              className="border rounded p-4 shadow-sm hover:shadow-md"
            >
              <p className="font-semibold">{student.name}</p>
              <p className="text-sm text-gray-600">{student.email}</p>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
      >
        Voltar
      </button>
    </div>
  );
}
