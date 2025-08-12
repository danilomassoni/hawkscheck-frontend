import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TeamPage from "./pages/TeamPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateLayout from "./layouts/PrivateLayout";
import TaskPage from "./pages/TaskPage";
import StudentTaskPage from "./pages/StudentTaskPage";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import TeamStudentsPage from "./pages/TeamStudentsPage";
import TeamAttendancePage from "./pages/TeamAttendancePage";
import TeamTasksPage from "./pages/TeamTasksPage";
import MyStudentsPage from "./pages/MyStudentsPage";
import StudentTeamDetailsPage from "./pages/StudentTeamDetailsPage";
import StudentTeamTasksPage from "./pages/StudentTeamTasksPage";
import MyAttendancePage from "./pages/MyAttendancePage";
import StudentDetailsPage from "./pages/StudentDetailsPage";
import StudentAttendancePage from "./pages/StudentAttendancePage";
import HistoricalStudentTasksPage from "./pages/HistoricalStudentTasksPage";
import MessagePage from "./pages/MessagePage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Rotas protegidas (com Sidebar via PrivateLayout) */}
      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/my-tasks" element={<StudentTaskPage />} />
        <Route path="/teams/:teamId" element={<TeamDetailsPage />} />
        <Route path="/teams/:teamId/students" element={<TeamStudentsPage />} />
        <Route path="/teams/:teamId/attendance" element={<TeamAttendancePage />} />
        <Route path="/teams/:teamId/tasks" element={<TeamTasksPage />} /> 
        <Route path="/my-students" element={<MyStudentsPage />} />
        <Route path="/student/team" element={<StudentTeamDetailsPage />} />
        <Route path="/student/team/:id/tasks" element={<StudentTeamTasksPage />} />
        <Route path="/student/team/:teamId/tasks" element={<StudentTeamTasksPage />} />
        <Route path="/student/my-attendance" element={<MyAttendancePage />} />
        <Route path="/student-details/:id" element={<StudentDetailsPage />} />
        <Route path="/student-attendance/:id" element={<StudentAttendancePage />} />
        <Route path="/student-tasks/:id" element={<HistoricalStudentTasksPage />} />
        <Route path="/messages" element={<MessagePage />} />

        
      </Route>
    </Routes>
  );
}

export default App;
