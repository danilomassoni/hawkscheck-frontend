import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import api from "../api/api";

export default function TeamDetailsPage() {
  const { teamId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Requisições paralelas para otimizar tempo de carregamento
      const [taskRes, studentRes, teamRes] = await Promise.all([
        api.get("/task"), // ⚠️ Verifique se retorna todas as tarefas (ou crie endpoint específico para teamId)
        api.get(`/teams/${teamId}/students`),
        api.get(`/teams/${teamId}`),
      ]);

      const filteredTasks = taskRes.data.filter(
        (task) => task.teamId === parseInt(teamId)
      );

      setTasks(filteredTasks);
      setStudents(studentRes.data);
      setTeam(teamRes.data);
    } catch (err) {
      console.error("Erro ao buscar dados da equipe:", err);
      setError("Ocorreu um erro ao carregar os dados. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [teamId]);

  const handleCreate = async (formData) => {
    try {
      if (editTask) {
        await api.put(`/task/${editTask.id}`, formData);
      } else {
        await api.post(`/task`, {
          ...formData,
          teamId: parseInt(teamId),
        });
      }

      setShowForm(false);
      setEditTask(null);
      await fetchData();
    } catch (e) {
      console.error("Erro ao salvar a tarefa:", e);
      alert("Erro ao salvar a tarefa. Verifique os dados.");
    }
  };

  const handleDelete = async (taskId) => {
    const confirm = window.confirm("Tem certeza que deseja excluir esta tarefa?");
    if (!confirm) return;

    try {
      await api.delete(`/task/${taskId}`);
      await fetchData();
    } catch (e) {
      console.error("Erro ao deletar tarefa:", e);
      alert("Erro ao deletar tarefa.");
    }
  };

  if (loading) return <p className="p-6">Carregando dados da equipe...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        Equipe: {team?.name}
      </h1>

      {!showForm ? (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          Criar Nova Tarefa
        </button>
      ) : (
        <TaskForm
          onSubmit={handleCreate}
          students={students}
          initialData={editTask}
          onCancel={() => {
            setEditTask(null);
            setShowForm(false);
          }}
        />
      )}

      {tasks.length === 0 ? (
        <p className="text-gray-600">Nenhuma tarefa criada ainda para esta equipe.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="bg-white p-4 shadow rounded border border-gray-200">
              <h2 className="font-semibold text-lg">{task.title}</h2>
              <p className="text-sm text-gray-600">{task.topic}</p>
              <p className="text-gray-700 mt-2">{task.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                {task.startDate} até {task.endDate}
              </p>
              <p className="text-sm mt-1">
                <span className="font-medium">Status:</span> {task.status} |{" "}
                <span className="font-medium">Prioridade:</span> {task.priority}
              </p>
              <div className="space-x-2 mt-3">
                <button
                  onClick={() => {
                    setEditTask(task);
                    setShowForm(true);
                  }}
                  className="text-sm px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-black rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
