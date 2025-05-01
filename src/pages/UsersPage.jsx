import React, { useEffect, useState } from "react";
import { getUsers } from "../api/api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-700 mb-4">Usuários</h1>
      <table className="min-w-full border rounded">
        <thead>
          <tr className="bg-red-600 text-white">
            <th className="p-2 text-left">Nome</th>
            <th className="p-2 text-left">E-mail</th>
            <th className="p-2 text-left">Papel</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-100">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.paper}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
