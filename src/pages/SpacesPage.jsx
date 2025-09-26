import { useEffect, useState } from "react";
import api from "../api/api";
import SpaceForm from "../components/SpaceForm";

export default function SpacesPage() {
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null); // espaço para editar
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Buscar todos os espaços ao carregar a página
  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      const res = await api.get("/spaces");
      setSpaces(res.data);
    } catch (err) {
      console.error("Erro ao carregar espaços:", err);
    }
  };

  const handleCreate = () => {
    setSelectedSpace(null);
    setIsModalOpen(true);
  };

  const handleEdit = (space) => {
    setSelectedSpace(space);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este espaço?")) return;
    try {
      await api.delete(`/spaces/${id}`);
      fetchSpaces();
    } catch (err) {
      console.error("Erro ao excluir espaço:", err);
      alert("Erro ao excluir espaço.");
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedSpace) {
        // Editar
        await api.put(`/spaces/${selectedSpace.id}`, data);
        alert("Espaço atualizado com sucesso!");
      } else {
        // Criar
        await api.post("/spaces", data);
        alert("Espaço criado com sucesso!");
      }
      setIsModalOpen(false);
      fetchSpaces();
    } catch (err) {
      console.error("Erro ao salvar espaço:", err);
      alert("Erro ao salvar espaço.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Espaços</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Novo Espaço
        </button>
      </div>

      {/* Tabela de espaços */}
      <table className="w-full bg-white shadow-md rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Localização</th>
            <th className="p-3 text-left">Tipo de Uso</th>
            <th className="p-3 text-left">Criado em</th>
            <th className="p-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {spaces.map((space) => (
            <tr key={space.id} className="border-b">
              <td className="p-3">{space.name}</td>
              <td className="p-3">{space.location}</td>
              <td className="p-3">{space.usageType}</td>
              <td className="p-3">
                {new Date(space.createdAt).toLocaleDateString("pt-BR")}
              </td>
              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => handleEdit(space)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(space.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}

          {spaces.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                Nenhum espaço cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <SpaceForm
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={selectedSpace}
        />
      )}
    </div>
  );
}
