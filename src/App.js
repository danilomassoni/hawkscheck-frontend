import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import StudentsPage from "./pages/StudentsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/students" />} />
          <Route path="students" element={<StudentsPage />} />
          {/* Você pode adicionar outras rotas como presences e reports aqui */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
