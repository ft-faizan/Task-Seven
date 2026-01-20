

import { useEffect, useState } from "react";
import styles from "../../Styles/OverView.module.css";
import { getCompanyById } from "../../Api/Api_Methods";

function OverView() {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const companyId = localStorage.getItem("userId");
        const res = await getCompanyById(companyId);

        setEmployees(res.data.employees || []);
        setProjects(res.data.projects || []);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  
  const departmentMap = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  const departmentData = Object.entries(departmentMap);

  
  const totalEmployees = employees.length;

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading overview...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Overview</h1>
       
      </div>

      <div className={styles.wrapper}>
        
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Department Distribution</h3>
              {/* <p className={styles.cardSubtitle}>
                {totalEmployees} employees across {departmentData.length} departments
              </p> */}
            </div>
            <div className={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className={styles.cardContent}>
            {departmentData.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No DPT data available</p>
              </div>
            ) : (
              departmentData.map(([dept, count]) => {
                const percentage = ((count / totalEmployees) * 100).toFixed(1);
                
                return (
                  <div key={dept} className={styles.row}>
                    <div className={styles.rowTop}>
                      <span className={styles.rowLabel}>{dept}</span>
                      <span className={styles.rowValue}>
                        {count} {count === 1 ? "employee" : "employees"} ({percentage}%)
                      </span>
                    </div>

                    <div className={styles.progressBar}>
                      <div
                        className={`${styles.progress} ${styles.departmentProgress}`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT CArd  */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Project Status Overview</h3>
              {/* <p className={styles.cardSubtitle}>
                {projects.length} active {projects.length === 1 ? "project" : "projects"}
              </p> */}
            </div>
            <div className={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="22 4 12 14.01 9 11.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className={styles.cardContent}>
            {projects.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No projects available</p>
              </div>
            ) : (
              projects.map((project) => {
                const avatar = project.name?.charAt(0).toUpperCase() || "P";
                
                return (
                  <div key={project.id} className={styles.row}>
                    <div className={styles.rowTop}>
                      <div className={styles.projectInfo}>
                        <div className={styles.projectAvatar}>{avatar}</div>
                        <div className={styles.ggc}>
                          <span className={styles.rowLabel}>{project.name}</span>
                          <span className={`${styles.status} ${styles[project.status]}`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                      <span className={styles.rowValue}>{project.progress}%</span>
                    </div>

                    <div className={styles.progressBar}>
                      <div
                        className={`${styles.progress} ${styles.projectProgress}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverView;