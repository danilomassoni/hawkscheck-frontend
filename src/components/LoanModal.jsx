import { useEffect, useState } from "react";
import api from "../api/api";

export default function LoanModal({ equipment, onClose, onSuccess }) {
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCollaborators, setLoadingCollaborators] = useState(true);
  const [formData, setFormData] = useState({
    collaboratorId: "",
    loanDate: new Date().toISOString().slice(0, 19),
    signedPaper: false,
    notes: "",
  });

  // 🔹 Busca lista de colaboradores no backend
  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        console.log("🔍 Buscando colaboradores...");
        const res = await api.get("/collaborators");
        console.log("✅ Colaboradores carregados:", res.data);
        setCollaborators(res.data);
      } catch (err) {
        console.error("❌ Erro ao carregar colaboradores:", err);
        alert("Erro ao carregar colaboradores.");
      } finally {
        setLoadingCollaborators(false);
      }
    };

    fetchCollaborators();
  }, []);

  // 🔹 Atualiza o formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Envia o empréstimo
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.collaboratorId) {
    alert("Selecione um colaborador antes de confirmar.");
    return;
  }

  setLoading(true);
  try {
    // Garante o formato LocalDateTime (com hora)
    const payload = {
      ...formData,
      loanDate: `${formData.loanDate}T00:00:00`
    };

    console.log("📦 Enviando empréstimo:", payload);
    const res = await api.put(`/equipments/${equipment.id}/loan`, payload);
    console.log("✅ Empréstimo registrado:", res.data);
    onSuccess(res.data);
    onClose();
  } catch (err) {
    console.error("❌ Erro ao registrar empréstimo:", err);
    alert("Erro ao registrar empréstimo.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          Registrar Empréstimo - {equipment?.brandModel || equipment?.name || "Equipamento"}
        </h2>

        {loadingCollaborators ? (
          <p className="text-center text-gray-600">Carregando colaboradores...</p>
        ) : collaborators.length === 0 ? (
          <p className="text-center text-red-500">Nenhum colaborador cadastrado.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Data do empréstimo */}
            <div>
              <label className="block text-sm font-medium mb-1">Data de Empréstimo</label>
              <input
                type="date"
                name="loanDate"
                value={formData.loanDate}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            {/* Colaborador */}
            <div>
              <label className="block text-sm font-medium mb-1">Colaborador Responsável</label>
              <select
                name="collaboratorId"
                value={formData.collaboratorId}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              >
                <option value="">Selecione...</option>
                {collaborators.map((c) => {
                const displayName =
                  c.name ||
                  c.fullName ||
                  c.user?.name ||
                  c.user?.fullName ||
                  c.user?.username ||
                  `Colaborador ${c.id}`;
                return (
                  <option key={c.id} value={c.id}>
                    {c.fullName || `${c.firstName} ${c.lastName}` || `Colaborador ${c.id}`}
                  </option>
                );
              })}
              </select>
            </div>

            {/* Assinatura */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="signedPaper"
                checked={formData.signedPaper}
                onChange={handleChange}
              />
              <label className="text-sm">Papel de empréstimo assinado</label>
            </div>

            {/* Observações */}
            <div>
              <label className="block text-sm font-medium mb-1">Observações</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full border rounded p-2"
                placeholder="Informações adicionais..."
              />
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-3 mt-5">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                {loading ? "Salvando..." : "Confirmar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
