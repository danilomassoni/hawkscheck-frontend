import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import ModalAddStudent from "../components/ModalAddStudent";

export default function TeamDetailsPage() {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/team/${teamId}`);
        setTeam(res.data);
      } catch (err) {
        console.error("Erro ao carregar equipe:", err);
        setError("Não foi possível carregar os dados da equipe.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  if (loading) return <p className="p-6">Carregando equipe...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Equipe: {team?.name}</h1>

      <div className="flex gap-4 flex-wrap">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => setShowAddStudentModal(true)}
        >
          Adicionar Aluno
        </button>

        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          onClick={() => navigate(`/teams/${teamId}/tasks`)}
        >
          Ver Tarefas
        </button>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => navigate(`/teams/${teamId}/students`)}
        >
          Ver Alunos
        </button>

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          onClick={() => navigate(`/teams/${teamId}/attendance`)}
        >
          Registrar Presença
        </button>
      </div>

      {showAddStudentModal && (
        <ModalAddStudent
          teamId={teamId}
          onClose={() => setShowAddStudentModal(false)}
          onStudentAdded={() => {
            // recarregar alunos se necessário
          }}
        />
      )}
    </div>
  );
}
