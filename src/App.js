import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // seu menu lateral
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import AddStudentPage from './pages/AddStudentPage';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar /> {/* A barra lateral sempre visível */}
        
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/add-student" element={<AddStudentPage />} />
            {/* Adicione outras rotas aqui */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
