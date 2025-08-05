import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function StudentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStudent = async () => {
    try {
      const res = await api.get(`/users/${id}`);
      setStudent(res.data);
    } catch (err) {
      console.error("Erro ao buscar dados do aluno:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const handleViewAttendance = () => {
    navigate(`/student-attendance/${id}`);
  };

  if (loading) return <p className="p-6">Carregando dados do aluno...</p>;
  if (!student) return <p className="p-6 text-red-600">Aluno não encontrado.</p>;

  return (
    <div className="p-6 gap-4 space-y-4 flex-wrap">
      <h1 className="text-2xl font-bold">Detalhes do Aluno</h1>
      <div className="bg-white p-4 rounded shadow space-y-2">
        <p><strong>Nome:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Função:</strong> {student.paper}</p>
      </div>
      
      <div className="flex flex-wrap gap-4">
      <button
        onClick={handleViewAttendance}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Ver Presenças
      </button>

      <button
        onClick={() => navigate(`/student-tasks/${id}`)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
      >
        Histórico de Tarefas
      </button>
    </div>
    </div>
    
  );
}
