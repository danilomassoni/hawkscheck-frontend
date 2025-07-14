import { useEffect, useState } from "react";
import api from "../api/api";

export default function EditTaskModal({ task, onClose, onSave }) {
  const [form, setForm] = useState({ ...task });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await api.get(`/team/${task.teamId}/members`);
      setStudents(res.data);
    };
    fetchStudents();
  }, [task.teamId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (studentId) => {
    setForm((prev) => {
      const selected = new Set(prev.studentIds);
      if (selected.has(studentId)) {
        selected.delete(studentId);
      } else {
        selected.add(studentId);
      }
      return { ...prev, studentIds: Array.from(selected) };
    });
  };

  const handleSubmit = async () => {
    try {
      await api.put(`/task/${task.id}`, form);
      onSave();
      onClose();
    } catch (e) {
      console.error("Erro ao atualizar tarefa:", e);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Tem certeza que deseja excluir esta tarefa?");
    if (!confirmed) return;

    try {
      await api.delete(`/task/${task.id}`);
      onSave(); // atualiza a lista no TeamTasksPage
      onClose();
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Editar Tarefa</h2>

        <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 mb-2 border rounded" placeholder="Título" />
        <input name="topic" value={form.topic} onChange={handleChange} className="w-full p-2 mb-2 border rounded" placeholder="Tópico" />
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 mb-2 border rounded" placeholder="Descrição" />

        <div className="flex gap-2 mb-2">
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="p-2 border rounded" />
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="p-2 border rounded" />
        </div>

        <select name="priority" value={form.priority} onChange={handleChange} className="w-full p-2 mb-2 border rounded">
            <option value="BAIXA">Baixa</option>
            <option value="MEDIA">Média</option>
            <option value="ALTA">Alta</option>
            <option value="URGENTE">Urgente</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 mb-2 border rounded">
            <option value="NAO_INICIADA">Não Iniciada</option>
            <option value="EM_ANDAMENTO">Em andamento</option>
            <option value="CONCLUIDA">Concluída</option>
            <option value="CANCELADA">Cancelada</option>
        </select>

        <div className="mb-2">
          <p className="font-semibold mb-1">Alunos:</p>
          {students.map((student) => (
            <label key={student.id} className="block">
              <input
                type="checkbox"
                checked={form.studentIds?.includes(student.id)}
                onChange={() => handleCheckboxChange(student.id)}
              />
              <span className="ml-2">{student.name}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Excluir
            </button>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">Cancelar</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-600 text-white">Salvar</button>
        </div>
      </div>
    </div>
    </div>
  );
}
