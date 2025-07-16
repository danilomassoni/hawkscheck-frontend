import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateTeamModal from "../components/CreateTeamModal"; // ⬅️ IMPORTAÇÃO

export default function TeamPage() {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // ⬅️ CONTROLE DO MODAL
  const navigate = useNavigate();

  const fetchTeams = async () => {
    if (user?.role === "MENTOR") {
      try {
        const res = await axios.get("http://localhost:8080/api/team/my", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setTeams(Array.isArray(res.data) ? res.data : [res.data]);
      } catch (err) {
        console.error("Erro ao buscar equipes:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [user]);

  const handleTeamCreated = () => {
    setModalOpen(false);
    fetchTeams();
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Minha Equipe</h1>

        {user?.role === "MENTOR" && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => setModalOpen(true)}
          >
            Nova Equipe
          </button>
        )}
      </div>

      {user?.role === "MENTOR" && (
        <div className="space-y-4">
          {teams.length === 0 ? (
            <p>Você ainda não criou nenhuma equipe.</p>
          ) : (
            teams.map((team) => (
              <div
                key={team.id}
                onClick={() => navigate(`/teams/${team.id}`)}
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

      {/* Modal de criação */}
      {modalOpen && (
        <CreateTeamModal
          onClose={() => setModalOpen(false)}
          onTeamCreated={handleTeamCreated}
        />
      )}
    </div>
  );
}
