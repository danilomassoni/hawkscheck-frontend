import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import ModalAddStudent from "../components/ModalAddStudent";

export default function TeamDetailsPage() {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [students, setStudents] = useState([]);
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

    const fetchStudents = async () => {
      try {
        const res = await api.get(`/team/${teamId}/members`);
        setStudents(res.data);
      } catch (err) {
        console.error("Erro ao buscar alunos da equipe:", err);
      }
    };

    fetchTeam();
    fetchStudents();
  }, [teamId]);

  const fetchStudents = async () => {
    try {
      const res = await api.get(`/team/${teamId}/members`);
      setStudents(res.data);
    } catch (err) {
      console.error("Erro ao buscar alunos da equipe:", err);
    }
  };

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

      <div>
        <h2 className="text-lg font-semibold mt-6 mb-2">Alunos da Equipe</h2>
        {students.length === 0 ? (
          <p className="text-gray-600">Nenhum aluno na equipe.</p>
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

      {showAddStudentModal && (
        <ModalAddStudent
          teamId={teamId}
          onClose={() => setShowAddStudentModal(false)}
          onStudentAdded={() => {
            fetchStudents(); // recarrega a lista de alunos
            setShowAddStudentModal(false);
          }}
        />
      )}
    </div>
  );
}
