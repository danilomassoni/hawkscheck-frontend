import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import TaskModal from "../components/TaskModal";
import EditTaskModal from "../components/EditTaskModal";

export default function TeamTasksPage() {
  const { teamId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Estados dos filtros
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchTasks = async () => {
    try {
      const taskRes = await api.get(`/task/by-team/${teamId}`);
      setTasks(taskRes.data);
      setFilteredTasks(taskRes.data); // Exibir todas inicialmente

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
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const handleTaskUpdated = async () => {
    await fetchTasks();
  };

  const aplicarFiltro = () => {
    const filtradas = tasks.filter((task) => {
      return (
        (!filterStatus || task.status === filterStatus) &&
        (!filterPriority || task.priority === filterPriority) &&
        (!filterEndDate || task.endDate === filterEndDate) &&
        (!searchText ||
          task.title.toLowerCase().includes(searchText.toLowerCase()) ||
          task.topic?.toLowerCase().includes(searchText.toLowerCase()))
      );
    });
    setFilteredTasks(filtradas);
  };

  const limparFiltro = () => {
    setFilterStatus("");
    setFilterPriority("");
    setFilterEndDate("");
    setSearchText("");
    setFilteredTasks(tasks);
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

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border p-2 rounded">
          <option value="">Status</option>
          <option value="PENDENTE">Pendente</option>
          <option value="EM_ANDAMENTO">Em andamento</option>
          <option value="CONCLUIDA">Concluída</option>
          <option value="CANCELADA">Cancelada</option>
        </select>

        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="border p-2 rounded">
          <option value="">Prioridade</option>
          <option value="BAIXA">Baixa</option>
          <option value="MEDIA">Média</option>
          <option value="ALTA">Alta</option>
          <option value="URGENTE">Urgente</option>
        </select>

        <input
          type="date"
          value={filterEndDate}
          onChange={(e) => setFilterEndDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Buscar por título ou tópico"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={aplicarFiltro}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Aplicar Filtro
        </button>

        <button
          onClick={limparFiltro}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
        >
          Limpar Filtro
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className="bg-white p-4 rounded shadow flex justify-between items-center hover:bg-gray-100 cursor-pointer"
            >
              <div>
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <span className="text-sm text-gray-500 text-right">
                Início: {task.startDate} <br />
                Fim: {task.endDate} <br />
                Status: {task.status === "NAO_INICIADA" ? "Não Iniciada" : task.status === "EM_ANDAMENTO" ? "Em Andamento" : task.status === "CONCLUIDA" ? "Concluída" : "Cancelada"} <br />
                Prioridade: {task.priority}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Modal de criação */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        teamId={teamId}
        onTaskCreated={handleTaskCreated}
      />

      {/* Modal de edição */}
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
