import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TeamPage from "./pages/TeamPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateLayout from "./layouts/PrivateLayout";
import TaskPage from "./pages/TaskPage";
import StudentTaskPage from "./pages/StudentTaskPage";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import Layout from "./components/Layout"; // ajuste o caminho se necessário




function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      
      
      
      
      {/* Rotas protegidas com Sidebar */}
      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tasks" element={<TaskPage />} /> {/* Mentor */}
        <Route path="/my-tasks" element={<StudentTaskPage />} /> {/* Estudante */}
        <Route path="/teams/:teamId" element={<Layout><TeamDetailsPage /></Layout>} />
        <Route path="/team" element={<Layout><TeamPage /></Layout>} />

        
        <Route path="/teams/:id" element={<TeamDetailsPage />} /> {/* 👈 aqui */}
        

      </Route>
    </Routes>
  );
}

export default App;
