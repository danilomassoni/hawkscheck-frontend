import { useEffect, useState } from "react";
import api from "../api/api";

export default function ModalAddStudent({ teamId, onClose, onStudentAdded }) {
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/users/students");
        setStudents(res.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar estudantes.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleAdd = async () => {
    if (!selectedId) return alert("Selecione um aluno.");
    try {
      await api.post(`/team/${teamId}/add-student/${selectedId}`);
      onStudentAdded();
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar aluno.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Adicionar Aluno à Equipe</h2>

        {loading ? (
          <p>Carregando estudantes...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <select
            onChange={(e) => setSelectedId(e.target.value)}
            value={selectedId || ""}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Selecione um aluno</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.email})
              </option>
            ))}
          </select>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
