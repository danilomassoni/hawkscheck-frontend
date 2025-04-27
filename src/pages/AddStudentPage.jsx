import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddStudentPage = () => {
    const [name, setName] = useState("");
    const [rm, setRm] = useState("");
    const [team, setTeam] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !rm || !team) {
            setError("All fields are required.");
            return;
        } 

        setLoading(true);
        setError("");

        axios 
            .post("http://localhost:8080/api/students", { name, rm, team}) 
            .then((response) => {
                setLoading(false);
                history.push("/students");
            })
            .cathc((err) => {
                setLoading(false);
                setError("Failed to add student. Please try again.");
                console.error(err);
            });
            };            
            return (
                <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
                  <h1 className="text-3xl font-bold text-red-600 mb-6">Adicionar Novo Aluno</h1>
            
                  {error && <div className="bg-red-200 text-red-600 p-3 mb-4 rounded">{error}</div>}
            
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Nome</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
            
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2" htmlFor="rm">RM</label>
                      <input
                        type="text"
                        id="rm"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={rm}
                        onChange={(e) => setRm(e.target.value)}
                        required
                      />
                    </div>
            
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2" htmlFor="team">Equipe</label>
                      <input
                        type="text"
                        id="team"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                        required
                      />
                    </div>
            
                    <button
                      type="submit"
                      className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300"
                      disabled={loading}
                    >
                      {loading ? "Adicionando..." : "Adicionar Aluno"}
                    </button>
                  </form>
                </div>
              );
            };

            
        export default AddStudentPage;
    











}