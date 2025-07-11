import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import ModalAddStudent from "../components/ModalAddStudent";
import { useNavigate } from "react-router-dom";

export default function TeamDetailsPage() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const navigate = useNavigate();

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

      <div className="flex gap-4">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => setShowAddStudentModal(true)}
        >
          Adicionar Aluno
        </button>

        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
          Ver Tarefas
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => navigate(`/teams/${teamId}/students`)}
          >
          Ver Alunos
        </button>
      </div>

      {showAddStudentModal && (
        <ModalAddStudent
          teamId={teamId}
          onClose={() => setShowAddStudentModal(false)}
          onStudentAdded={() => {
            // Aqui você pode recarregar os alunos se quiser
          }}
        />
      )}
    </div>
  );
}
