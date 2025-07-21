import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api"; // cliente axios com token já configurado

export default function StudentTeamTasksPage() {
  const { id } = useParams(); // id da equipe
  const [tasks, setTasks] = useState([]);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    api.get(`/task/team/${id}`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar tarefas da equipe:", err);
      });

    // Buscar nome da equipe opcionalmente
    api.get(`/team/${id}`)
      .then((res) => {
        setTeamName(res.data.name);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados da equipe:", err);
      });
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Tarefas da Equipe {teamName || id}
      </h1>

      {tasks.length === 0 ? (
        <p>Nenhuma tarefa encontrada para esta equipe.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white p-4 rounded shadow border border-gray-200"
            >
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-sm text-gray-500">
                Data: {task.date || "Não informada"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
