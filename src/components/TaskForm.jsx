import { useState } from "react";

export default function TaskForm({ onSubmit, students }) {
  const [form, setForm] = useState({
    title: "",
    topic: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "BAIXA",
    status: "NAO_INICIADA",
    assignedStudentIds: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const id = parseInt(value);
    setForm((prev) => ({
      ...prev,
      assignedStudentIds: checked
        ? [...prev.assignedStudentIds, id]
        : prev.assignedStudentIds.filter((sid) => sid !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" placeholder="Título" onChange={handleChange} className="w-full p-2" required />
      <input name="topic" placeholder="Tema" onChange={handleChange} className="w-full p-2" required />
      <textarea name="description" placeholder="Descrição" onChange={handleChange} className="w-full p-2" />
      <input type="date" name="startDate" onChange={handleChange} className="w-full p-2" required />
      <input type="date" name="endDate" onChange={handleChange} className="w-full p-2" required />

      <select name="priority" onChange={handleChange} className="w-full p-2">
        <option value="BAIXA">Baixa</option>
        <option value="MEDIA">Média</option>
        <option value="ALTA">Alta</option>
        <option value="URGENTE">Urgente</option>
      </select>

      <select name="status" onChange={handleChange} className="w-full p-2">
        <option value="NAO_INICIADA">Não Iniciada</option>
        <option value="EM_ANDAMENTO">Em Andamento</option>
        <option value="CONCLUIDA">Concluída</option>
        <option value="CANCELADA">Cancelada</option>
      </select>

      <div>
        <p className="font-semibold">Atribuir a:</p>
        {students.map((student) => (
          <label key={student.id} className="block">
            <input
              type="checkbox"
              value={student.id}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            {student.name}
          </label>
        ))}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Criar Tarefa
      </button>
    </form>
  );
}
