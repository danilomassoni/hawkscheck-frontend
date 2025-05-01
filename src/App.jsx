import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Sidebar from "./components/Sidebar";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import StudentsPage from "./pages/StudentsPage";
import AddStudentPage from "./pages/AddStudentPage";
import AddTeamPage from "./pages/AddTeamPage";
import AddUserPage from "./pages/AddUserPage";
import UsersPage from "./pages/UsersPage";
import TeamStudentsPage from "./pages/TeamStudentsPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/students"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <StudentsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-student"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AddStudentPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-team"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AddTeamPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <UsersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-user"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AddUserPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teams/:teamId/students"
                element={
                  <ProtectedRoute>
                    <TeamStudentsPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
