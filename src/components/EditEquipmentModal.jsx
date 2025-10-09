import { useState } from "react";
import api from "../api/api";

export default function EditEquipmentModal({ equipment, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    patrimonyNumber: equipment.patrimonyNumber || "",
    serialNumber: equipment.serialNumber || "",
    brandModel: equipment.brandModel || "",
    condition: equipment.condition || "",
  });

  const [loading, setLoading] = useState(false);

  // Atualiza o formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Envia atualização
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.put(`/equipments/${equipment.id}`, formData);
      onSuccess(res.data);
      onClose();
    } catch (err) {
      console.error("❌ Erro ao atualizar equipamento:", err);
      alert("Erro ao atualizar equipamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          Editar Equipamento - {equipment.brandModel || equipment.name}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patrimônio */}
          <div>
            <label className="block text-sm font-medium mb-1">Número de Patrimônio</label>
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
            <label className="block text-sm font-medium mb-1">Número de Série</label>
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
            <label className="block text-sm font-medium mb-1">Marca / Modelo</label>
            <input
              type="text"
              name="brandModel"
              value={formData.brandModel}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Condição */}
          <div>
            <label className="block text-sm font-medium mb-1">Condição</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Selecione...</option>
              <option value="NOVO">Novo</option>
              <option value="BOM">Bom</option>
              <option value="REGULAR">Regular</option>
              <option value="RUIM">Ruim</option>
            </select>
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
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
