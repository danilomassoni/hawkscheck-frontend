import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import TaskModal from "../components/TaskModal";
import EditTaskModal from "../components/EditTaskModal";

export default function TeamTasksPage() {
  const { teamId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // para edição

  const fetchTasks = async () => {
    try {
      const taskRes = await api.get(`/task/by-team/${teamId}`);
      setTasks(taskRes.data);

      const teamRes = await api.get(`/team/${teamId}`);
      setTeamName(teamRes.data.name);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [teamId]);

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleTaskUpdated = async () => {
    await fetchTasks();
  };

  if (loading) return <p className="p-6">Carregando tarefas...</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tarefas da Equipe {teamName}</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Nova Tarefa
        </button>
      </div>

      {tasks.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              onClick={() => setSelectedTask(task)} // ← Clique ativa modal de edição
              className="bg-white p-4 rounded shadow flex justify-between items-center hover:bg-gray-100 cursor-pointer"
            >
              <div>
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <span className="text-sm text-gray-500 text-right">
                Início: {task.startDate} <br />
                Fim: {task.endDate}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Modal de criação de nova tarefa */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        teamId={teamId}
        onTaskCreated={handleTaskCreated}
      />

      {/* Modal de edição de tarefa existente */}
      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={handleTaskUpdated}
        />
      )}
    </div>
  );
}
