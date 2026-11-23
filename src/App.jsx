import Login from "./components/AuthComponents/Login";
import UserDashBoard from "./components/DashBoards/UserDashBoard";

import AdminDashBoard from "./components/DashBoards/AdminDashBoard";
import { useData } from "./contexts/DataContext";

function App() {
  const { user } = useData();
  if (!user) return <Login />;
  if (user.role === "Admin") return <AdminDashBoard />;
  if (user.role === "Employee") return <UserDashBoard />;
  return null;
}

export default App;
