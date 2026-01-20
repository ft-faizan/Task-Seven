

import styles from "../Styles/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { CompanynameContext } from "../Context/UsernameContext";
import { useContext, useEffect, useState } from "react";
import OverView from "../Components/Dashbord.com/OverView.jsx";
import { getCompanyById } from "../Api/Api_Methods.jsx";

// icons
import { CgProfile } from "react-icons/cg";
import { GrProjects } from "react-icons/gr";
import { FaCalendarCheck } from "react-icons/fa";

function Dashboard({ user, loading }) {
  const navigate = useNavigate();
  const CompanyName = useContext(CompanynameContext);

  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/Auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const companyId = localStorage.getItem("userId");
        if (!companyId) return;

        const res = await getCompanyById(companyId);
        setEmployees(res.data.employees || []);
        setProjects(res.data.projects || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setDataLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Calculate statistics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === "active").length;

  const activeProjects = projects.filter((p) => p.status === "in-progress").length;
  const finishedProjects = projects.filter((p) => p.status === "completed").length;
  const holdProjects = projects.filter((p) => p.status === "on-hold").length;

  const activeEmployeesInProjects = new Set(
    projects.flatMap((p) => (p.teamMembers || []).map((m) => m.id))
  ).size;

  return (
    <div className={styles.Dashboard}>
      <div className={styles.container}>
        {/* Welcome Header */}
        <div className={styles.welcomeSection}>
          <div className={styles.welcomeText}>
            <h1 className={styles.companyName}>{CompanyName}</h1>
            <p className={styles.welcomeSubtitle}>
              Welcome back! Here's what's happening today.
            </p>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className={styles.statsGrid}>
          {/* Card 1: Employees */}
          <div className={styles.statCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardLeft}>
                <div className={styles.cardStats}>
                  <div className={styles.statGroup}>
                    <span className={styles.statLabel}>Active Employees</span>
                    <span className={styles.statValue}>{activeEmployees}</span>
                  </div>
                  <div className={styles.statDivider}></div>
                  <div className={styles.statGroup}>
                    <span className={styles.statLabel}>Total Employees</span>
                    <span className={styles.statValueSecondary}>{totalEmployees}</span>
                  </div>
                </div>
              </div>
              <div className={styles.cardIcon}>
                <CgProfile />
              </div>
            </div>
            <div className={styles.cardProgress}>
              <div className={styles.progressBar}>
                <div
                  className={`${styles.progressFill} ${styles.employeeProgress}`}
                  style={{
                    width: `${totalEmployees > 0 ? (activeEmployees / totalEmployees) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <span className={styles.progressLabel}>
                {totalEmployees > 0
                  ? `${Math.round((activeEmployees / totalEmployees) * 100)}% Active`
                  : "No data"}
              </span>
            </div>
          </div>

          {/* Card 2: Projects */}
          <div className={styles.statCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardLeft}>
                <div className={styles.cardStats}>
                  <div className={styles.statGroup}>
                    <span className={styles.statLabel}>Active Projects</span>
                    <span className={styles.statValue}>{activeProjects}</span>
                  </div>
                  <div className={styles.statDivider}></div>
                  <div className={styles.statGroup}>
                    <span className={styles.statLabel}>Team Members Working</span>
                    <span className={styles.statValueSecondary}>
                      {activeEmployeesInProjects}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.cardIcon}>
                <GrProjects />
              </div>
            </div>
            <div className={styles.cardProgress}>
              <div className={styles.progressBar}>
                <div
                  className={`${styles.progressFill} ${styles.projectProgress}`}
                  style={{
                    width: `${projects.length > 0 ? (activeProjects / projects.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <span className={styles.progressLabel}>
                {projects.length > 0
                  ? `${Math.round((activeProjects / projects.length) * 100)}% In Progress`
                  : "No projects"}
              </span>
            </div>
          </div>

          {/* Card 3: Project Status */}
          <div className={styles.statCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardLeft}>
                <div className={styles.cardStats}>
                  <div className={styles.statGroup}>
                    <span className={styles.statLabel}>Finished Projects</span>
                    <span className={styles.statValue}>{finishedProjects}</span>
                  </div>
                  <div className={styles.statDivider}></div>
                  <div className={styles.statGroup}>
                    <span className={styles.statLabel}>On Hold Projects</span>
                    <span className={styles.statValueSecondary}>{holdProjects}</span>
                  </div>
                </div>
              </div>
              <div className={styles.cardIcon}>
                <FaCalendarCheck />
              </div>
            </div>
            <div className={styles.cardProgress}>
              <div className={styles.progressBar}>
                <div
                  className={`${styles.progressFill} ${styles.completedProgress}`}
                  style={{
                    width: `${projects.length > 0 ? (finishedProjects / projects.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <span className={styles.progressLabel}>
                {projects.length > 0
                  ? `${Math.round((finishedProjects / projects.length) * 100)}% Completed`
                  : "No projects"}
              </span>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className={styles.overviewSection}>
          <OverView />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

