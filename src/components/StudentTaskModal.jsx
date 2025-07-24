import { useEffect, useState } from "react";
import api from "../api/api";

export default function StudentTaskModal({ isOpen, onClose, task, onStatusUpdated }) {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setStatus(task.status);
    }
  }, [task]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.put(`/task/${task.id}/status`, { status });
      alert("Status atualizado com sucesso.");
      onStatusUpdated(); // Notifica o parent para recarregar a lista
      onClose();         // Fecha o modal
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
      alert("Erro ao atualizar status.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">Detalhes da Tarefa</h2>
        <div className="space-y-2">
          <p><strong>Título:</strong> {task.title}</p>
          <p><strong>Tópico:</strong> {task.topic}</p>
          <p><strong>Descrição:</strong> {task.description}</p>
          <p><strong>Início:</strong> {task.startDate}</p>
          <p><strong>Fim:</strong> {task.endDate}</p>
          <p><strong>Prioridade:</strong> {task.priority}</p>
          <p><strong>Alunos:</strong> {task.studentNames?.join(", ") || "N/A"}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block font-medium">Status:</label>
            <select
              value={status}
              onChange={handleStatusChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="NAO_INICIADA">Não Iniciada</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="CONCLUIDA">Concluída</option>
              <option value="CANCELADA">Cancelada</option>
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-500"
            >
              Fechar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
            >
              {submitting ? "Atualizando..." : "Atualizar Status"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
