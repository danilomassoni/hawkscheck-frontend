import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function StudentDetailsPage() {
  const { id } = useParams();
  const [studentInfo, setStudentInfo] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/students/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Erro ao buscar dados do aluno");

        const data = await response.json();
        setStudentInfo(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar dados do aluno.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const fetchAttendance = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/attendance/student/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao buscar presenças");

      const data = await response.json();
      setAttendanceList(data);
      setShowAttendance(true);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar presenças.");
    }
  };

  if (loading) return <p className="p-4">Carregando...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Detalhes do Aluno: {studentInfo?.name}
      </h1>

      <div className="space-x-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowAttendance(false)}
        >
          Informações do Aluno
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={fetchAttendance}
        >
          Presenças
        </button>
      </div>

      {!showAttendance ? (
        <div className="bg-white shadow rounded p-4 space-y-2">
          <p><strong>Nome:</strong> {studentInfo.name}</p>
          <p><strong>Email:</strong> {studentInfo.email}</p>
          <p><strong>ID:</strong> {studentInfo.id}</p>
          {studentInfo.teamName && (
            <p><strong>Time:</strong> {studentInfo.teamName}</p>
          )}
        </div>
      ) : (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Relatório de Presenças</h2>
          {attendanceList.length === 0 ? (
            <p>Nenhuma presença registrada.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {attendanceList.map((att) => (
                <li key={att.id} className="py-2">
                  <span className="font-medium">{att.date}</span> —{" "}
                  <span
                    className={att.present ? "text-green-600" : "text-red-600"}
                  >
                    {att.present ? "Presente" : "Ausente"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
