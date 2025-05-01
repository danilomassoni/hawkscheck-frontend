import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../api/api";

const AddUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [paper, setPaper] = useState("STUDENT");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser({ name, email, password, paper });
      navigate("/"); // Ou redirecione para onde quiser
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Cadastrar Usuário</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          value={paper}
          onChange={(e) => setPaper(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="ADMIN">Admin</option>
          <option value="MENTOR">Mentor</option>
          <option value="STUDENT">Student</option>
        </select>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
