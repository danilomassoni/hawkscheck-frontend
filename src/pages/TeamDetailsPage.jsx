import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function TeamDetailsPage() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/team/${teamId}`);
        setTeam(res.data);
      } catch (err) {
        console.error("Erro ao carregar equipe:", err);
        setError("Não foi possível carregar os dados da equipe.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  if (loading) return <p className="p-6">Carregando equipe...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Equipe: {team?.name}</h1>
    </div>
  );
}
