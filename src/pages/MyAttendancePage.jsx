import { useEffect, useState } from "react";
import api from "../api/api";

export default function MyAttendancePage() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const res = await api.get("/attendance/myattendance");
        setAttendanceList(res.data);
      } catch (err) {
        console.error("Erro ao carregar presenças:", err);
        setError("Não foi possível carregar o relatório de presenças.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) return <p className="p-6">Carregando presenças...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Minhas Presenças</h1>

      {attendanceList.length === 0 ? (
        <p className="text-gray-600">Nenhuma presença registrada.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Data</th>
                <th className="px-4 py-2">Equipe</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((attendance) => (
                <tr key={attendance.id} className="border-t">
                  <td className="px-4 py-2">
                    {new Date(attendance.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{attendance.teamName}</td>
                  <td className="px-4 py-2">
                    {attendance.present ? (
                      <span className="text-green-600 font-semibold">Presente</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Faltou</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
