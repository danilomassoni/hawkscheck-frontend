import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 🔁 importação

export default function TeamPage() {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 🔁 hook para navegar

  useEffect(() => {
    if (user?.role === "MENTOR") {
      axios
        .get("http://localhost:8080/api/team/my", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setTeams(Array.isArray(res.data) ? res.data : [res.data]);
        })
        .catch((err) => {
          console.error("Erro ao buscar equipes:", err);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Minha Equipe</h1>

      {user?.role === "MENTOR" && (
        <div className="space-y-4">
          {teams.length === 0 ? (
            <p>Você ainda não criou nenhuma equipe.</p>
          ) : (
            teams.map((team) => (
              <div
                key={team.id}
                onClick={() => navigate(`/teams/${team.id}`)} // 🔁 clique leva à TeamDetailsPage
                className="bg-white shadow rounded p-4 border border-gray-200 hover:bg-gray-100 cursor-pointer transition"
              >
                <h2 className="text-xl font-semibold">{team.name}</h2>
                <p className="text-sm text-gray-600">Mentor: {team.mentorName}</p>
              </div>
            ))
          )}
        </div>
      )}

      {user?.role === "STUDENT" && (
        <div className="bg-white p-6 rounded shadow text-gray-700">
          <p>Suas tarefas da equipe aparecerão aqui em breve!</p>
        </div>
      )}
    </div>
  );
}
