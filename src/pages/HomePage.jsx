import React, { useEffect, useState } from 'react';
import api from '../api/api'; // Agora puxando do arquivo de configuração

function HomePage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await api.get('/teams'); // Só coloca o endpoint relativo!
      setTeams(response.data);
    } catch (error) {
      console.error('Erro ao buscar equipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      

      {/* Conteúdo principal */}
      <main className="flex-1 bg-gray-100 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-8 text-black">Minhas Equipes</h1>

        {loading ? (
          <p className="text-gray-600">Carregando equipes...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.length > 0 ? (
              teams.map((team) => (
                <div key={team.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                  <h2 className="text-xl font-bold text-red-600">{team.name}</h2>
                  <p className="text-gray-600">{team.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Nenhuma equipe encontrada.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
