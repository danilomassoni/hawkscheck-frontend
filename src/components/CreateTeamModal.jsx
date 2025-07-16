import { useState } from "react";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";

export default function CreateTeamModal({ onClose, onTeamCreated }) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("O nome da equipe é obrigatório.");
      return;
    }

    try {
      await api.post(
        "/team",
        { name },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      onTeamCreated(); // Atualiza a lista e fecha o modal
    } catch (err) {
      console.error("Erro ao criar equipe:", err);
      setError("Erro ao criar equipe.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow">
        <h2 className="text-xl font-bold mb-4">Criar Nova Equipe</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome da equipe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
