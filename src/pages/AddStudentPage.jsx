import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudentPage = () => {
    const [name, setName] = useState("");
    const [rm, setRm] = useState("");
    const [team, setTeam] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

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
                navigate.push("/students");
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
    
// This code defines a React component for adding a new student. It includes form fields for the student's name, RM, and team, and handles form submission with validation and error handling. The component uses Axios to send a POST request to the server and redirects to the students page upon success.
// The component also includes loading and error states to provide feedback to the user during the submission process. The form is styled using Tailwind CSS classes for a clean and modern look.