import { useAuth } from "../auth/AuthContext";
import DashboardAdminPage from "./DashboardAdminPage";
import DashboardMentorPage from "./DashboardMentorPage";
import DashboardStudentPage from "./DashboardStudentPage";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return <div>Carregando...</div>;

  switch (user.role) {
    case "ADMIN":
      return <DashboardAdminPage />;
    case "MENTOR":
      return <DashboardMentorPage />;
    case "STUDENT":
      return <DashboardStudentPage />;
    default:
      return <div>Permissão desconhecida</div>;
  }
}
