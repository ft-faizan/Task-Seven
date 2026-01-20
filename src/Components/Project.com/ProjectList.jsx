
import { useNavigate } from "react-router-dom";
import styles from "../../Styles/ProjectList.module.css";

function ProjectList({ projects }) {
  const navigate = useNavigate();

  if (projects.length === 0) {
    return <p className={styles.noProjects}>No projects found</p>;
  }

  return (
    <div className={styles.list}>
      {projects.map((project) => (
        <div key={project.id} className={styles.card}>
          
          <div className={styles.projectInfo}>
            <div className={styles.nameSection}>
              <h3 className={styles.name}>{project.name}</h3>
              <span className={`${styles.status} ${styles[project.status]}`}>
                {project.status}
              </span>
            </div>

            
            <div className={styles.progressSection}>
              <div className={styles.progressHeader}>
                <span className={styles.progressLabel}>Progress</span>
                <span className={styles.progressPercentage}>{project.progress}%</span>
              </div>
              <div className={styles.progressContainer}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>

         
          <div className={styles.actionSection}>
            <button
              className={styles.viewBtn}
              onClick={() => navigate(`/Projects/${project.id}`)}
            >
              <span>View Details</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
;

