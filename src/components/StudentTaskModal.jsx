import { useEffect, useState } from "react";
import api from "../api/api";

export default function StudentTaskModal({ isOpen, onClose, task, onStatusUpdated }) {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Novos estados para mensagens
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (task) {
      setStatus(task.status);
      fetchMessages();  // busca mensagens sempre que a task muda
    }
  }, [task]);

  // Função para buscar mensagens da task
  const fetchMessages = async () => {
    try {
      const res = await api.get(`/messages/task/${task.id}?page=0&size=50`);
      setMessages(res.data.content);
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.put(`/task/${task.id}/status`, { status });
      alert("Status atualizado com sucesso.");
      onStatusUpdated();
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
      alert("Erro ao atualizar status.");
    } finally {
      setSubmitting(false);
    }
  };

  // Função para enviar mensagem
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await api.post(`/messages/${task.id}/messages`, { content: newMessage });
      // adiciona nova mensagem no topo da lista
      setMessages((prev) => [res.data, ...prev]);
      setNewMessage("");
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      alert("Erro ao enviar mensagem.");
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-xl max-h-[90vh] overflow-y-auto">
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

        {/* Módulo de mensagens */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Mensagens</h3>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              className="flex-1 p-2 border rounded"
              placeholder="Escreva uma mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Enviar
            </button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {messages.length === 0 && (
              <p className="text-gray-500">Nenhuma mensagem registrada ainda.</p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className="border rounded p-2 bg-gray-50">
                <p>{msg.content}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {msg.authorName} — {new Date(msg.timestamp).toLocaleString("pt-BR")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
