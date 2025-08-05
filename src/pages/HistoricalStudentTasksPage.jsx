import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function HistoricalStudentTasksPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(`/task/by-student/${id}`);
        setTasks(res.data);
      } catch (err) {
        console.error("Erro ao buscar tarefas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [id]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Histórico de Tarefas do Aluno</h1>

      {loading ? (
        <p>Carregando tarefas...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-600">Nenhuma tarefa encontrada para este aluno.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-4 rounded shadow border border-gray-200"
            >
              <div className="flex-1 space-y-1 md:space-y-0 md:space-x-6 md:flex md:items-center">
                <p className="font-semibold text-lg text-blue-800">{task.title}</p>
                <span className="text-sm px-2 py-1 rounded bg-gray-100 border text-gray-700">
                  {task.status}
                </span>
                <span className="text-sm text-gray-600">
                  {task.startDate} → {task.endDate}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  Prioridade: {task.priority}
                </span>
              </div>
              <div className="mt-2 md:mt-0 text-sm text-gray-700">{task.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
