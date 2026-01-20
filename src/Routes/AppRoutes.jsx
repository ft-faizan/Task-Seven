import { Routes, Route } from "react-router-dom";
import Carousel from "../Pages/Auth/Corasul.jsx";
import Dashboard from "../Pages/Dashboard.jsx";
import Employees from "../Pages/Employees.jsx";
import EmployeesDetails from "../Pages/EmployeesDetails.jsx";
import Projects from "../Pages/Projects.jsx";
import ProjectDetails from "../Pages/ProjectDetails.jsx";
import Trash from "../Pages/Trash.jsx";
import MainContent from "../Components/Layouts/MainContent.jsx";
function AppRoutes({ user, loading }) {
  return (
    <Routes>
      <Route path="/Auth" element={<Carousel />} />
      <Route element={<MainContent user={user} />}>
        <Route path="/Dashboard" element={<Dashboard user={user} loading={loading}/>} />
        <Route path="/Employees" element={<Employees />} />
        <Route path="/Employees/:id" element={<EmployeesDetails />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Projects/:id" element={<ProjectDetails />} />
        <Route path="/Trash" element={<Trash/>} />
      </Route>
    </Routes>
  );
}


export default AppRoutes;
