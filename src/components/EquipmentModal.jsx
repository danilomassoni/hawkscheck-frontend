import { useState } from "react";
import api from "../api/api";

export default function EquipmentModal({ spaceId, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    patrimonyNumber: "",
    serialNumber: "",
    brandModel: "",
    condition: "",
    defaultLocation: "",
    notes: "",
    status: "IN_LOCO",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dto = { ...formData, spaceId };
      const res = await api.post("/equipments", dto);
      onSuccess(res.data);
      onClose();
    } catch (err) {
      console.error("Erro ao criar equipamento:", err);
      alert("Erro ao criar equipamento!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">Cadastrar Novo Equipamento</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Patrimônio */}
          <div>
            <label className="block text-sm font-medium">Patrimônio</label>
            <input
              type="text"
              name="patrimonyNumber"
              value={formData.patrimonyNumber}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Serial */}
          <div>
            <label className="block text-sm font-medium">Número de Série</label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          {/* Marca / Modelo */}
          <div>
            <label className="block text-sm font-medium">Marca / Modelo</label>
            <input
              type="text"
              name="brandModel"
              value={formData.brandModel}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          {/* Condição */}
          <div>
            <label className="block text-sm font-medium">Condição</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Selecione...</option>
              <option value="GOOD">Novo</option>
              <option value="REGULAR">Usado</option>
              <option value="MAINTENANCE">Danificado</option>
            </select>
          </div>

          {/* Localização padrão */}
          <div>
            <label className="block text-sm font-medium">Localização Padrão</label>
            <input
              type="text"
              name="defaultLocation"
              value={formData.defaultLocation}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Ex: Carrinho 1"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="IN_LOCO">Em Loco</option>
              <option value="LOANED">Emprestado</option>
            </select>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium">Observações</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded p-2"
              placeholder="Adicione informações adicionais aqui..."
            ></textarea>
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
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
