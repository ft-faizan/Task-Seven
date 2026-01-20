

import styles from "../../Styles/Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

// ICONS
import { PiGraphBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { GrProjects } from "react-icons/gr";
import { BsTrash } from "react-icons/bs";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`${styles.sidebar} ${!isOpen ? styles.collapsed : ""}`}>
      
     
      {/* <button className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
        <FiMenu />
      </button> */}

      
      <div className={styles.Branding}>
        <img className={styles.logo} src="/public/finallogo.png" alt="logo" />
        
        {isOpen && <h1>Prime Bord</h1>}
       
      </div>

      {/* <div className={styles.navsectiontitle}>Menu</div> */}
      <div className={styles.sidbuttons}>
          <div className={styles.navsectiontitle}>Menu</div>
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            `${styles.buts} ${isActive ? styles.active : ""}`
          }
        >
          <h2>
            <PiGraphBold />
            {isOpen && <span>Dashboard</span>}
          </h2>
        </NavLink>

        <NavLink
          to="/Employees"
          className={({ isActive }) =>
            `${styles.buts} ${isActive ? styles.active : ""}`
          }
        >
          <h2>
            <CgProfile />
            {isOpen && <span>Employees</span>}
          </h2>
        </NavLink>

        <NavLink
          to="/Projects"
          className={({ isActive }) =>
            `${styles.buts} ${isActive ? styles.active : ""}`
          }
        >
          <h2>
            <GrProjects />
            {isOpen && <span>Projects</span>}
          </h2>
        </NavLink>

        <NavLink
          to="/Trash"
          className={({ isActive }) =>
            `${styles.buts} ${isActive ? styles.active : ""}`
          }
        >
          <h2>
          <BsTrash />
            {isOpen && <span>Trash</span>}
          </h2>
        </NavLink>

      </div>
    </div>
  );
}

export default Sidebar;
