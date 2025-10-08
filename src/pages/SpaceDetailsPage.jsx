import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import EquipmentModal from "../components/EquipmentModal";
import LoanModal from "../components/LoanModal";

export default function SpaceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [space, setSpace] = useState(null);
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  // 🔹 Carrega espaço e equipamentos
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const spaceRes = await api.get(`/spaces/${id}`);
        setSpace(spaceRes.data);

        const eqRes = await api.get(`/equipments/space/${id}`);
        setEquipments(eqRes.data);
      } catch (err) {
        console.error("Erro ao carregar espaço ou equipamentos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // 🔹 Excluir equipamento
  const handleDeleteEquipment = async (equipmentId) => {
    if (!window.confirm("Deseja realmente excluir este equipamento?")) return;
    try {
      await api.delete(`/equipments/${equipmentId}`);
      setEquipments(equipments.filter((eq) => eq.id !== equipmentId));
    } catch (err) {
      console.error("Erro ao excluir equipamento:", err);
      alert("Erro ao excluir equipamento.");
    }
  };

  // 🔹 Abrir modal de empréstimo
  const handleOpenLoanModal = (equipment) => {
    setSelectedEquipment(equipment);
    setIsLoanModalOpen(true);
  };

  // 🔹 Registrar devolução
  const handleReturnEquipment = async (equipmentId) => {
    if (!window.confirm("Confirmar devolução deste equipamento?")) return;
    try {
      await api.put(`/equipments/${equipmentId}/return`);
      const updated = equipments.map((eq) =>
        eq.id === equipmentId ? { ...eq, status: "IN_LOCO", loanDate: null, collaboratorName: null } : eq
      );
      setEquipments(updated);
    } catch (err) {
      console.error("Erro ao registrar devolução:", err);
      alert("Erro ao registrar devolução.");
    }
  };

  if (loading) {
    return <p className="p-6">Carregando espaço...</p>;
  }

  if (!space) {
    return <p className="p-6 text-red-500">Espaço não encontrado!</p>;
  }

  return (
    <div className="p-6">
      {/* Botão de voltar */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
      >
        Voltar
      </button>

      {/* Informações do espaço */}
      <h1 className="text-2xl font-bold mb-2">{space.name}</h1>
      <p className="text-gray-600 mb-6">
        Localização: {space.location} • Tipo: {space.usageType}
      </p>

      {/* Cabeçalho da tabela */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Equipamentos</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          Novo Equipamento
        </button>
      </div>

      {/* Tabela de equipamentos */}
      <table className="w-full bg-white shadow-md rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Patrimônio</th>
            <th className="p-3 text-left">Serial</th>
            <th className="p-3 text-left">Marca / Modelo</th>
            <th className="p-3 text-left">Condição</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Colaborador</th>
            <th className="p-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipments.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-4 text-center text-gray-500">
                Nenhum equipamento cadastrado neste espaço.
              </td>
            </tr>
          ) : (
            equipments.map((eq) => (
              <tr key={eq.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{eq.patrimonyNumber}</td>
                <td className="p-3">{eq.serialNumber}</td>
                <td className="p-3">{eq.brandModel}</td>
                <td className="p-3">{eq.condition}</td>
                <td className="p-3">
                  {eq.status === "LOANED" ? (
                    <span className="text-yellow-600 font-semibold">Emprestado</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Em Loco</span>
                  )}
                </td>
                <td className="p-3">
                  {eq.status === "LOANED" ? eq.collaboratorName || "—" : "—"}
                </td>
                <td className="p-3 text-center space-x-2">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteEquipment(eq.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Excluir
                  </button>

                  {eq.status === "IN_LOCO" ? (
                    <button
                      onClick={() => handleOpenLoanModal(eq)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Locar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReturnEquipment(eq.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Devolver
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal de novo equipamento */}
      {isModalOpen && (
        <EquipmentModal
          spaceId={space.id}
          onClose={() => setIsModalOpen(false)}
          onSuccess={(newEq) => setEquipments([...equipments, newEq])}
        />
      )}

      {/* Modal de empréstimo */}
      {isLoanModalOpen && selectedEquipment && (
        <LoanModal
          equipment={selectedEquipment}
          onClose={() => {
            setIsLoanModalOpen(false);
            setSelectedEquipment(null);
          }}
          onSuccess={(updatedEquipment) => {
            const updatedList = equipments.map((eq) =>
              eq.id === updatedEquipment.id ? updatedEquipment : eq
            );
            setEquipments(updatedList);
          }}
        />
      )}
    </div>
  );
}
