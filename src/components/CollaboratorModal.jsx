import { useState, useEffect } from "react";

export default function CollaboratorModal({ isOpen, onClose, onSave, collaborator }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    nif: "",
    rg: "",
    cpf: "",
  });

  useEffect(() => {
    if (collaborator) {
      setFormData(collaborator);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        role: "",
        nif: "",
        rg: "",
        cpf: "",
      });
    }
  }, [collaborator]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">
          {collaborator ? "Editar Colaborador" : "Novo Colaborador"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="firstName"
            placeholder="Nome"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Sobrenome"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Função"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="nif"
            placeholder="NIF"
            value={formData.nif}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="rg"
            placeholder="RG"
            value={formData.rg}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
