import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import StudentModal from "../components/StudentModal";

export default function MyStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchMyStudents = async () => {
    try {
      const res = await api.get("/users/my-students");
      setStudents(res.data);
    } catch (err) {
      console.error("Erro ao buscar alunos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyStudents();
  }, []);

  const handleStudentCreated = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
    setModalOpen(false);
  };

  const handleClick = (id) => {
    navigate(`/student-details/${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Meus Alunos</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          Novo Aluno
        </button>
      </div>

      {loading ? (
        <p>Carregando alunos...</p>
      ) : students.length === 0 ? (
        <p className="text-gray-600">Nenhum aluno cadastrado.</p>
      ) : (
        <ul className="space-y-2">
          {students.map((student) => (
            <li
              key={student.id}
              onClick={() => handleClick(student.id)}
              className="cursor-pointer hover:bg-gray-100 flex justify-between items-center bg-white p-4 rounded shadow"
            >
              <div>
                <p className="font-semibold">{student.name}</p>
                <p className="text-sm text-gray-500">{student.email}</p>
              </div>
              <span className="text-sm text-blue-600">
                {student.paper === "STUDENT" ? "Aluno" : student.paper}
              </span>
            </li>
          ))}
        </ul>
      )}

      <StudentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onStudentCreated={handleStudentCreated}
      />
    </div>
  );
}
