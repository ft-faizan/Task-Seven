


import styles from "../../Styles/Addmodal.module.css";
import ShowToast from "../Reuseable_Components/ShowToast.jsx";
import { useReducer, useState, useEffect } from "react";
 
const emptyData = {
  name: "",
  email: "",
  role: "",
  department: "",
  status: "",
  salary: "",
  joiningDate: "",
  experience: "",
};
 
const reducer = (state, action) => {
  return { ...state, [action.type]: action.val };
};
 
function Addmodal({ show, onClose, editData, onSubmit }) {
  const [data, dispatch] = useReducer(reducer, emptyData);
 
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
 
  
  useEffect(() => {
    if (show && editData) {
      Object.keys(emptyData).forEach((key) => {
        dispatch({ type: key, val: editData[key] || "" });
      });
    }
  }, [show, editData]);
 
 
  useEffect(() => {
    if (show && !editData) {
      Object.keys(emptyData).forEach((key) => {
        dispatch({ type: key, val: "" });
      });
    }
  }, [show, editData]);
 
  if (!show) return null;
 
  const handleSubmit = () => {
    const hasEmpty = Object.values(data).some((v) => !v);
 
    if (hasEmpty) {
      setSnackbar({
        open: true,
        message: "All fields are required!",
        severity: "error",
      });
      return;
    }
 
    onSubmit(data);
  };
 
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{editData ? "Edit Employee" : "Add New Employee"}</h3>
        </div>
 
        <div className={styles.body}>
          <div className={styles.formGrid}>
            {/* {Object.keys(emptyData).map((key) => (
              <div key={key} className={styles.field}>
                <label>{key}</label>
                <input
                  type={key === "joiningDate" ? "date" : "text"}
                  value={data[key]}
                  onChange={(e) =>
                    dispatch({ type: key, val: e.target.value })
                  }
                />
              </div>
            ))} */}
            {Object.keys(emptyData).map((key) => (
  <div key={key} className={styles.field}>
    <label>{key}</label>

    {/* STATUS DROPDOWN */}
    {key === "status" ? (
      <select
        value={data[key]}
        onChange={(e) =>
          dispatch({ type: key, val: e.target.value })
        }
      >
        <option value="">Select Status</option>
        <option value="active">active</option>
        <option value="inactive">inactive</option>
      </select>
    ) : (
      /* NORMAL INPUT */
      <input
        type={key === "joiningDate" ? "date" : "text"}
        value={data[key]}
        onChange={(e) =>
          dispatch({ type: key, val: e.target.value })
        }
      />
    )}
  </div>
))}

          </div>
        </div>
 
        <div className={styles.footer}>
          <button className={styles.primary} onClick={handleSubmit}>
            {editData ? "Save Changes" : "Add Employee"}
          </button>
          <button className={styles.secondary} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
 
      <ShowToast
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
}
 
export default Addmodal;