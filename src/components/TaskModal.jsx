import { useEffect, useState } from "react";
import api from "../api/api";

export default function TaskModal({ isOpen, onClose, teamId, onTaskCreated }) {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    topic: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "MEDIUM",
    status: "PENDING",
    studentIds: [],
  });

  useEffect(() => {
    if (isOpen && teamId) {
      api.get(`/team/${teamId}/members`)
        .then((res) => setStudents(res.data))
        .catch((err) => console.error("Erro ao buscar membros:", err));
    }
  }, [isOpen, teamId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => Number(o.value));
    setForm((prev) => ({ ...prev, studentIds: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, teamId: Number(teamId) };

    try {
      const res = await api.post("/task", payload);
      onTaskCreated(res.data); // callback para atualizar a lista
      onClose();
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      alert("Erro ao criar tarefa.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">Nova Tarefa</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Título" required className="w-full p-2 border rounded" />
          <input name="topic" value={form.topic} onChange={handleChange} placeholder="Tópico" className="w-full p-2 border rounded" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descrição" className="w-full p-2 border rounded" rows="4" />
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label>Início:</label>
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="flex-1">
              <label>Fim:</label>
              <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label>Prioridade:</label>
              <select name="priority" value={form.priority} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="BAIXA">Baixa</option>
                <option value="MEDIA">Média</option>
                <option value="ALTA">Alta</option>
                <option value="URGENTE">Urgente</option>
              </select>
            </div>
            <div className="flex-1">
              <label>Status:</label>
              <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="NAO_INICIADA">Não Iniciada</option>
                <option value="EM_ANDAMENTO">Em andamento</option>
                <option value="CONCLUIDA">Concluída</option>
                <option value="CANCELADA">Cancelada</option>
              </select>
            </div>
          </div>

          <div>
            <label>Alunos atribuídos:</label>
            <select multiple value={form.studentIds.map(String)} onChange={handleMultiSelect} className="w-full p-2 border rounded h-32">
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border border-gray-500">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Criar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
