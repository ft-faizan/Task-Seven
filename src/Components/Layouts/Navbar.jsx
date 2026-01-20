import { useContext, useState } from "react";
import styles from "../../Styles/Navbar.module.css";
import { useLocation } from "react-router-dom";
import { UsernameContext } from "../../Context/UsernameContext.jsx"; 
import ConfirmAlert from "../Reuseable_Components/ConformAlert.jsx";
function Navbar() {
  const [open, setOpen] = useState(false);
   
  const handalonLogout = () => {
    console.log("logout");
    localStorage.clear("userId"); 
    window.location.reload();
    setOpen(false);
  };

  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/Dashboard":
        return "Dashboard";
      case "/Employees":
        return "Employees";
      case "/Projects":
        return "Projects";
        case "/Trash":
        return "Trash";
      default:
        return "Dashboard";
    }
  };
  const Username = useContext(UsernameContext);


const avatarLetter = Username
  ? Username.charAt(0).toUpperCase()
  : "?";

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.nav1}>
          <h1>{getTitle()}</h1>
        </div>
        <div className={styles.nav2}>
          <div className={styles.usersection}>
            <div className={styles.useravatar}>{avatarLetter}</div>
            <div className={styles.usernnfo}>
              <div className={styles.username}>{Username}</div>

              <button
                className={styles.profilebtn}
                onClick={() => setOpen(true)}
              >
                Sign-Out
              </button>
              <ConfirmAlert
                isOpen={open}
                title="Are you sure?"
                message="Do you want to logout."
                confirmText="Logout"
                cancelText="Cancel"
                onConfirm={handalonLogout}
                onCancel={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
