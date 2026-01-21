


 
import { useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import AddProjectModal from "../Components/Project.com/AddProjectModal.jsx";
import styles from "../Styles/Projects.module.css";
import { getCompanyById, updateCompanyById } from "../Api/Api_Methods.jsx";
import ProjectList from "../Components/Project.com/ProjectList.jsx";
import ProjectFilters from "../Components/Project.com/ProjectFilters.jsx";
function Projects() {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });
 
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
 
  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "",
    });
  };
 
  // const statuses = [...new Set(projects.map((p) => p.status))];
 
  const statuses = [...new Set(projects.map((p) => p.status))];
 
const filteredProjects = projects.filter((project) => {
  return (
    project.name
      .toLowerCase()
      .includes(filters.search.toLowerCase()) &&
    (filters.status ? project.status === filters.status : true)
  );
});
 
 
 
  useEffect(() => {
    async function loadProjects() {
      const companyId = localStorage.getItem("userId");
 
      if (!companyId) {
        console.error("Company ID not found in localStorage");
        return;
      }
 
      const res = await getCompanyById(companyId);
      setProjects(res.data.projects || []);
    }
 
    loadProjects();
  }, []);
 
 
 
 
  const handleProjectSubmit = async (formData) => {
  try {
    const companyId = localStorage.getItem("userId");
    const res = await getCompanyById(companyId);
    const company = res.data;
 
    const newProject = {
      id: Date.now(),
      ...formData,
      budget: Number(formData.budget || 0),
      progress: Number(formData.progress || 0),
      teamMembers: [],
      createdAt: new Date().toISOString(),
    };
 
    const updatedProjects = [...(company.projects || []), newProject];
 
    await updateCompanyById(companyId, {
      ...company,
      projects: updatedProjects,
    });
 
    setProjects(updatedProjects);   // ✅ UI update
    setShowModal(false);            // ✅ close modal
  } catch (err) {
    console.error("Add project failed", err);
  }
};
 
  return (
    <>
      <div className={styles.Projects}>
        <div className={styles.Pfit}>
          <div className={styles.Addemp}>
            <button
              onClick={() => setShowModal(true)}
              className={styles.AddempBtn}
            >
              {" "}
              <IoIosAddCircle />
              Add New Project{" "}
            </button>
          </div>
          <ProjectFilters
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
            statuses={statuses}
          />
          {/* <ProjectList projects={projects} /> */}
          <div className={styles.Emplist}>
          <ProjectList projects={filteredProjects} />
          </div>
        </div>
      </div>
      {/* <AddProjectModal show={showModal} onClose={() => setShowModal(false)} /> */}
      <AddProjectModal
  show={showModal}
  onClose={() => setShowModal(false)}
  onSubmit={handleProjectSubmit}
/>
 
    </>
  );
}
 
export default Projects;