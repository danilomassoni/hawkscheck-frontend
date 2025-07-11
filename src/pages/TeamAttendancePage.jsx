import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function TeamAttendancePage() {
  const { teamId } = useParams();
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get(`/team/${teamId}/members`);
        setStudents(res.data);
        const initialAttendance = {};
        res.data.forEach((s) => {
          initialAttendance[s.id] = true; // Default: presente
        });
        setAttendanceMap(initialAttendance);
      } catch (e) {
        console.error("Erro ao buscar alunos:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [teamId]);

  const handleToggle = (studentId) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      teamId: parseInt(teamId),
      date,
      records: Object.entries(attendanceMap).map(([studentId, present]) => ({
        studentId: parseInt(studentId),
        present,
      })),
    };

    try {
      await api.post("/attendance", payload);
      setSuccess("Presença registrada com sucesso!");
    } catch (e) {
      console.error("Erro ao registrar presença:", e);
      alert("Erro ao registrar presença.");
    }
  };

  if (loading) return <p className="p-6">Carregando alunos...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Registrar Presença</h1>

      <div>
        <label className="font-medium">Data:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="ml-2 border p-2 rounded"
        />
      </div>

      <ul className="space-y-2">
        {students.map((student) => (
          <li key={student.id} className="flex items-center justify-between bg-white p-3 border rounded">
            <span>{student.name}</span>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={attendanceMap[student.id] || false}
                onChange={() => handleToggle(student.id)}
              />
              Presente
            </label>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Salvar Presença
      </button>

      {success && <p className="text-green-600 mt-4">{success}</p>}
    </div>
  );
}
