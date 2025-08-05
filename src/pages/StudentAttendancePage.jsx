import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function StudentAttendancePage() {
  const { id } = useParams();
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAttendance = async () => {
    try {
      const res = await api.get(`/attendance/student/${id}`);
      setAttendances(res.data);
    } catch (err) {
      console.error("Erro ao buscar presenças:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [id]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Relatório de Presenças</h1>

      {loading ? (
        <p>Carregando presenças...</p>
      ) : attendances.length === 0 ? (
        <p className="text-gray-600">Nenhuma presença registrada.</p>
      ) : (
        <table className="w-full table-auto bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Data</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((attendance) => (
              <tr key={attendance.id} className="border-t">
                <td className="p-3">{attendance.date}</td>
                <td className="p-3">
                  {attendance.present ? (
                    <span className="text-green-600">Presente</span>
                  ) : (
                    <span className="text-red-600">Faltou</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
