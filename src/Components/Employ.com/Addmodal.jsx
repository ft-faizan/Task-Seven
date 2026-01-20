import styles from "../../Styles/Addmodal.module.css";
import { getCompanyById, updateCompanyById } from "../../Api/Api_Methods.jsx";
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

// we want to creat this in outside
const reducer = (data, action) => {
  // console.log("reducer called",data,action);
  // console.log("action",action);
  return { ...data, [action.type]: action.val };
};
function Addmodal({ show, onClose, editData }) {
  

  const [data, dispatch] = useReducer(reducer, emptyData);

  console.log("datas", data);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });




useEffect(() => {
  if (show && editData) {
    Object.keys(editData).forEach((key) => {
      if (key in emptyData) {
        dispatch({ type: key, val: editData[key] });
      }
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
  

  const handleSubmit = async () => {
   
    if (
      !data.name ||
      !data.email ||
      !data.role ||
      !data.department ||
      !data.status ||
      !data.salary ||
      !data.joiningDate ||
      !data.experience
    ) {
      setSnackbar({
        open: true,
        message: "All fields are required!",
        severity: "error",
      });
      return;
    }

    try {
      const companyId = localStorage.getItem("userId");
      const res = await getCompanyById(companyId);
      const company = res.data;

      let updatedEmployees;

      if (editData) {
        
        updatedEmployees = company.employees.map((emp) =>
          emp.id === editData.id ? { ...emp, ...data } : emp
        );
      } else {
        
        const newEmployee = {
          id: Date.now(),
          ...data,
          createdAt: new Date().toISOString(),
        };

        updatedEmployees = [...(company.employees || []), newEmployee];
      }

      await updateCompanyById(companyId, {
        ...company,
        employees: updatedEmployees,
      });

      setSnackbar({
        open: true,
        message: editData
          ? "Employee updated successfully"
          : "Employee added successfully",
        severity: "success",
      });

      setTimeout(() => {
        onClose();
         window.location.reload();
      }, 800);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Operation failed",
        severity: "error",
      });
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
          <form className={styles.formGrid}>
            <div className={styles.field}>
              <label>Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) =>
                  dispatch({ val: e.target.value, type: "name" })
                }
                placeholder="Employee name"
              />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) =>
                  dispatch({ val: e.target.value, type: "email" })
                }
                placeholder="Email address"
              />
            </div>

            <div className={styles.field}>
              <label>Role</label>
              <input
                type="text"
                value={data.role}
                onChange={(e) =>
                  dispatch({ val: e.target.value, type: "role" })
                }
                placeholder="Role"
              />
            </div>

            <div className={styles.field}>
              <label>Department</label>
              <input
                type="text"
                value={data.department}
                onChange={(e) =>
                  dispatch({ val: e.target.value, type: "department" })
                }
                placeholder="Department"
              />
            </div>

            <div className={styles.field}>
              <label>Status</label>
              <select
               value={data.status}
                onChange={(e) =>
                  dispatch({ val: e.target.value, type: "status" })
                }
              >
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Annual Salary (LPA)</label>
              <input
                type="number"
                value={data.salary}
                onChange={(e) =>
                  dispatch({ val: e.target.value, type: "salary" })
                }
                placeholder="e.g. 6.5"
              />
            </div>
            <div className={styles.field}>
              <label>Experience</label>
              <input
                type="text"
                value={data.experience}
                onChange={(e) =>
                  dispatch({ val: e.target.value, type: "experience" })
                }
                placeholder="Experience"
              />
            </div>
            <div className={styles.field}>
              <label>Joining Date</label>
              <input
                type="date"
                value={data.joiningDate}
                onChange={(e) =>
                  dispatch({ val: e.target.value, type: "joiningDate" })
                }
              />
            </div>
          </form>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.primary}
            onClick={handleSubmit}
          >
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
