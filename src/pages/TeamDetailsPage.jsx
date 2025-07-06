import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import api from "../api/api";

export default function TeamDetailsPage() {
  const { teamId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchData = async () => {
    const taskRes = await api.get(`/tasks/by-team/${teamId}`);
    const studentRes = await api.get(`/teams/${teamId}/students`);
    setTasks(taskRes.data);
    setStudents(studentRes.data);
  };

  useEffect(() => {
    fetchData();
  }, [teamId]);

  const handleCreate = async (formData) => {
    try {
      if (editTask) {
        await api.put(`/tasks/${editTask.id}`, formData);
      } else {
        await api.post(`/tasks`, { ...formData, teamId: parseInt(teamId) });
      }
      setShowForm(false);
      setEditTask(null);
      await fetchData();
    } catch (e) {
      console.error("Erro ao criar/editar tarefa", e);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      await api.delete(`/tasks/${taskId}`);
      await fetchData();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Tarefas da Equipe</h1>

      {!showForm ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowForm(true)}
        >
          Criar Nova Tarefa
        </button>
      ) : (
        <TaskForm
          onSubmit={handleCreate}
          students={students}
          initialData={editTask}
        />
      )}

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="bg-white p-4 shadow rounded">
            <h2 className="font-semibold">{task.title}</h2>
            <p>{task.topic}</p>
            <p>{task.description}</p>
            <p>
              {task.startDate} até {task.endDate}
            </p>
            <p>Status: {task.status} | Prioridade: {task.priority}</p>
            <div className="space-x-2 mt-2">
              <button
                onClick={() => {
                  setEditTask(task);
                  setShowForm(true);
                }}
                className="text-sm px-3 py-1 bg-yellow-400 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
