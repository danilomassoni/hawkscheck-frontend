// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import StudentsPage from "./pages/StudentsPage";
import AddStudentPage from "./pages/AddStudentPage";
import TeamStudentsPage from "./pages/TeamStudentsPage";

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/add-student" element={<AddStudentPage />} />
            <Route path="/teams/:teamId/add-student" element={<AddStudentPage />} />
            <Route path="/teams/:teamId/students" element={<TeamStudentsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
