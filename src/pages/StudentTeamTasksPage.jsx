import { useEffect, useState } from "react";
import api from "../api/api";
import StudentTaskModal from "../components/StudentTaskModal"; // ✅ importe o modal

const statusLabels = {
  NAO_INICIADA: "Não Iniciada",
  EM_ANDAMENTO: "Em Andamento",
  CONCLUIDA: "Concluída",
  CANCELADA: "Cancelada",
};

export default function StudentTeamTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null); // ✅ novo estado para tarefa selecionada
  const [modalOpen, setModalOpen] = useState(false);      // ✅ estado para abrir o modal

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const teamRes = await api.get("/team/myteamstudent");
        const team = teamRes.data;
        setTeamName(team.name);

        const taskRes = await api.get(`/task/by-team/${team.id}`);
        setTasks(taskRes.data);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const groupedTasks = {
    NAO_INICIADA: [],
    EM_ANDAMENTO: [],
    CONCLUIDA: [],
    CANCELADA: [],
  };

  tasks.forEach((task) => {
    if (groupedTasks[task.status]) {
      groupedTasks[task.status].push(task);
    }
  });

  if (loading) return <p className="p-6">Carregando tarefas...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tarefas da Equipe {teamName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="bg-gray-100 rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">
              {statusLabels[status]}
            </h2>
            {tasks.length === 0 ? (
              <p className="text-sm text-gray-500">Sem tarefas</p>
            ) : (
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="bg-white p-3 rounded shadow hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleTaskClick(task)} // ✅ clique mostra modal
                  >
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-xs text-gray-600">{task.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Início: {task.startDate} <br />
                      Fim: {task.endDate} <br />
                      Prioridade: {task.priority}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <StudentTaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
}
