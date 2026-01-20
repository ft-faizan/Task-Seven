
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";
import styles from "../../Styles/MainContent.module.css";
import {
  UsernameContext,
  CompanynameContext,
} from "../../Context/UsernameContext.jsx";

function MainContent({ user, loading }) {
  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.parent}>
      <div className={styles.aside}>
        <Sidebar />
      </div>

      <main className={styles.content}>
        <UsernameContext.Provider value={user?.Username}>
          <Navbar />
        </UsernameContext.Provider>

        <CompanynameContext.Provider value={user?.CompanyName}>
          <Outlet />
        </CompanynameContext.Provider>
      </main>
    </div>
  );
}

export default MainContent;
