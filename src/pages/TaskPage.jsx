import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import api from "../api/api"; // seu cliente axios configurado

export default function TaskPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get("/users/students").then((res) => {
      setStudents(res.data);
    });
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      await api.post("/tasks", taskData);
      alert("Tarefa criada com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar tarefa.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Criar Tarefa</h1>
      <TaskForm onSubmit={handleCreateTask} students={students} />
    </div>
  );
}
