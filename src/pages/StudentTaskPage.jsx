import { useEffect, useState } from "react";
import api from "../api/api";

export default function StudentTasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks/my-tasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Minhas Tarefas</h1>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold text-lg">{task.title}</h2>
            <p><strong>Tema:</strong> {task.topic}</p>
            <p><strong>Descrição:</strong> {task.description}</p>
            <p><strong>Prazo:</strong> {task.startDate} até {task.endDate}</p>
            <p><strong>Prioridade:</strong> {task.priority}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Mentor:</strong> {task.mentorName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
