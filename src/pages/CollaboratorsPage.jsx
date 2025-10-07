import { useEffect, useState } from "react";
import api from "../api/api";
import CollaboratorModal from "../components/CollaboratorModal";

export default function CollaboratorsPage() {
  const [collaborators, setCollaborators] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollaborator, setEditingCollaborator] = useState(null);

  useEffect(() => {
    fetchCollaborators();
  }, []);

  const fetchCollaborators = async () => {
    try {
      const res = await api.get("/collaborators");
      setCollaborators(res.data);
    } catch (err) {
      console.error("Erro ao buscar colaboradores:", err);
    }
  };

  const handleSave = async (collaboratorData) => {
    try {
      if (editingCollaborator) {
        await api.put(`/collaborators/${editingCollaborator.id}`, collaboratorData);
      } else {
        await api.post("/collaborators", collaboratorData);
      }
      await fetchCollaborators();
      setIsModalOpen(false);
      setEditingCollaborator(null);
    } catch (err) {
      console.error("Erro ao salvar colaborador:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir este colaborador?")) return;
    try {
      await api.delete(`/collaborators/${id}`);
      await fetchCollaborators();
    } catch (err) {
      console.error("Erro ao excluir colaborador:", err);
    }
  };

  const openNewCollaboratorModal = () => {
    setEditingCollaborator(null);
    setIsModalOpen(true);
  };

  const openEditCollaboratorModal = (collaborator) => {
    setEditingCollaborator(collaborator);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Gerenciamento de Colaboradores
      </h1>

      <button
        onClick={openNewCollaboratorModal}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mb-6"
      >
        Novo Colaborador
      </button>

      {collaborators.length === 0 ? (
        <p className="text-gray-600">Nenhum colaborador cadastrado ainda.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border p-2 text-left">Nome</th>
                <th className="border p-2 text-left">Função</th>
                <th className="border p-2 text-left">NIF</th>
                <th className="border p-2 text-left">RG</th>
                <th className="border p-2 text-left">CPF</th>
                <th className="border p-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {collaborators.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="border p-2">{c.firstName} {c.lastName}</td>
                  <td className="border p-2">{c.role}</td>
                  <td className="border p-2">{c.nif}</td>
                  <td className="border p-2">{c.rg}</td>
                  <td className="border p-2">{c.cpf}</td>
                  <td className="border p-2 text-center space-x-2">
                    <button
                      onClick={() => openEditCollaboratorModal(c)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <CollaboratorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          collaborator={editingCollaborator}
        />
      )}
    </div>
  );
}
