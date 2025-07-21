import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function StudentTeamPage() {
  const [team, setTeam] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // <== ESSENCIAL

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const res = await api.get("/team/myteamstudent");
        setTeam(res.data);
        setStudents(res.data.students || []);
      } catch (err) {
        console.error("Erro ao carregar equipe:", err);
        setError("Não foi possível carregar os dados da equipe.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) return <p className="p-6">Carregando equipe...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Minha Equipe</h1>

      <div
        className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-100"
        onClick={() => navigate(`/student/team/${team.id}/tasks`)}
      >
        <h2 className="text-xl font-semibold">Nome da Equipe: {team?.name}</h2>
        <p className="text-gray-600">Mentor: {team?.mentorName}</p>
        <p className="text-sm text-gray-500">Clique para ver as tarefas da equipe</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mt-6 mb-2">Colegas da Equipe</h2>
        {students.length === 0 ? (
          <p className="text-gray-600">Nenhum outro aluno na equipe.</p>
        ) : (
          <ul className="space-y-2">
            {students.map((student) => (
              <li
                key={student.id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
