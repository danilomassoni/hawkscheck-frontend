import { useEffect, useState } from "react";
import api from "../api/api";
import StudentTaskModal from "../components/StudentTaskModal";

const statusLabels = {
  NAO_INICIADA: "Não Iniciada",
  EM_ANDAMENTO: "Em Andamento",
  CONCLUIDA: "Concluída",
  CANCELADA: "Cancelada",
};

export default function StudentTeamTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filterStudent, setFilterStudent] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const teamRes = await api.get("/team/myteamstudent");
      const team = teamRes.data;
      setTeamName(team.name);
      setStudents(team.students || []);

      const taskRes = await api.get(`/task/by-team/${team.id}`);
      setTasks(taskRes.data);
      setFilteredTasks(taskRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const aplicarFiltro = () => {
    const filtradas = tasks.filter((task) => {
      const studentNames = task.studentNames || [];
      const alunoIncluido = filterStudent
        ? studentNames.some((name) =>
            name.toLowerCase().includes(filterStudent.toLowerCase())
          )
        : true;
      return (
        (!filterStatus || task.status === filterStatus) &&
        (!filterPriority || task.priority === filterPriority) &&
        (!filterEndDate || task.endDate === filterEndDate) &&
        (!searchText ||
          task.title.toLowerCase().includes(searchText.toLowerCase()) ||
          task.topic?.toLowerCase().includes(searchText.toLowerCase())) &&
        alunoIncluido
      );
    });
    setFilteredTasks(filtradas);
  };

  const limparFiltro = () => {
    setFilterStatus("");
    setFilterPriority("");
    setFilterEndDate("");
    setSearchText("");
    setFilterStudent("");
    setFilteredTasks(tasks);
  };

  const groupedTasks = {
    NAO_INICIADA: [],
    EM_ANDAMENTO: [],
    CONCLUIDA: [],
    CANCELADA: [],
  };

  filteredTasks.forEach((task) => {
    if (groupedTasks[task.status]) {
      groupedTasks[task.status].push(task);
    }
  });

  if (loading) return <p className="p-6">Carregando tarefas...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tarefas da Equipe {teamName}</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border p-2 rounded">
          <option value="">Status</option>
          <option value="NAO_INICIADA">Não Iniciada</option>
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

        <input
          type="text"
          placeholder="Filtrar por aluno"
          value={filterStudent}
          onChange={(e) => setFilterStudent(e.target.value)}
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

      {/* Exibição em colunas por status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="bg-gray-100 rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">{statusLabels[status]}</h2>
            {tasks.length === 0 ? (
              <p className="text-sm text-gray-500">Sem tarefas</p>
            ) : (
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    onClick={() => {
                      setSelectedTask(task);
                      setModalOpen(true);
                    }}
                    className="bg-white p-3 rounded shadow hover:bg-gray-50 cursor-pointer"
                  >
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-xs text-gray-600">{task.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Início: {task.startDate} <br />
                      Fim: {task.endDate} <br />
                      Prioridade: {task.priority} <br />
                      Alunos: {task.studentNames?.join(", ") || "Não atribuídos"}
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
        onStatusUpdated={fetchData}
      />
    </div>
  );
}
