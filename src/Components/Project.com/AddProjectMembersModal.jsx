
import { useState, useEffect } from "react";
import { getCompanyById, updateCompanyById } from "../../Api/Api_Methods";
import styles from "../../Styles/AddProjectMembersModal.module.css";

function AddProjectMembersModal({ show, onClose, project, onMemberAdded }) {
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    department: "",
  });

  useEffect(() => {
    if (!show) return;

    async function fetchEmployees() {
      const companyId = localStorage.getItem("userId");
      const res = await getCompanyById(companyId);
      setEmployees(res.data.employees || []);
    }

    fetchEmployees();
  }, [show]);

  if (!show) return null;

  const roles = [...new Set(employees.map((e) => e.role))];
  const departments = [...new Set(employees.map((e) => e.department))];

  const filteredEmployees = employees.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.role ? emp.role === filters.role : true) &&
      (filters.department ? emp.department === filters.department : true)
    );
  });

  const handleAddMember = async (employee) => {
    
    if (project.teamMembers.some((m) => m.id === employee.id)) return;

    const updatedMembers = [
      ...project.teamMembers,
      {
        id: employee.id,
        name: employee.name,
        role: employee.role,
        department: employee.department,
      },
    ];

    const companyId = localStorage.getItem("userId");
    const res = await getCompanyById(companyId);

    const updatedProjects = res.data.projects.map((p) =>
      p.id === project.id ? { ...p, teamMembers: updatedMembers } : p
    );

    await updateCompanyById(companyId, {
      ...res.data,
      projects: updatedProjects,
    });

    onMemberAdded(updatedMembers);
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Add Team Members</h3>

        {/* Filters */}
        <div className={styles.filters}>
          <input
            className={styles.input}
            placeholder="... Search by name"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          <select
            className={styles.select}
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          >
            <option value="">All Roles</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <select
            className={styles.select}
            value={filters.department}
            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Employee List */}
        <div className={styles.employeeList}>
          {filteredEmployees.length === 0 ? (
            <p className={styles.emptyText}>No employees found</p>
          ) : (
            filteredEmployees.map((emp) => {
              const alreadyAdded = project.teamMembers.some((m) => m.id === emp.id);
              const avatar = emp.name.charAt(0).toUpperCase();

              return (
                <div key={emp.id} className={styles.empRow}>
                  <div className={styles.empAvatar}>{avatar}</div>
                  <div className={styles.empInfo}>
                    <strong className={styles.empName}>{emp.name}</strong>
                    <span className={styles.coreting}><h5>Role :</h5>  <p className={styles.empRole}>{emp.role}</p> </span>
                    <span  className={styles.coreting}>    <h5>Department :</h5> <p className={styles.empDept}>{emp.department}</p></span>
                  </div>

                  <button
                    disabled={alreadyAdded}
                    onClick={() => handleAddMember(emp)}
                    className={`${styles.addBtn} ${alreadyAdded ? styles.disabled : ""}`}
                  >
                    <span>{alreadyAdded ? "Added" : "Add"}</span>
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className={styles.footer}>
          <button className={styles.closeBtn} onClick={onClose}>
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProjectMembersModal;

