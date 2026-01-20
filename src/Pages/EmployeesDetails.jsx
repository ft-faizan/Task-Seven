

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCompanyById } from "../Api/Api_Methods.jsx";
import { updateCompanyById } from "../Api/Api_Methods.jsx";
import styles from "../Styles/EmployeesDetails.module.css";
import Addmodal from "../Components/Employ.com/Addmodal.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmployeeToTrash } from "../Redux_Tool_Kit/trashSlice";
import { FaArrowLeft } from "react-icons/fa6";
import ConfirmAlert from "../Components/Reuseable_Components/ConformAlert.jsx";

function EmployeesDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const [open, setOpen] = useState(false);
  useEffect(() => {
    async function fetchEmployee() {
      try {
        const companyId = localStorage.getItem("userId");
        const res = await getCompanyById(companyId);

        const foundEmployee = res.data.employees.find(
          (emp) => String(emp.id) === id
        );

        setEmployee(foundEmployee);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    try {
      //  setOpen(false);
      const companyId = localStorage.getItem("userId");

      
      dispatch(
        addEmployeeToTrash({
          ...employee,
          deletedAt: Date.now(),
        })
      );

      
      const res = await getCompanyById(companyId);

      const updatedEmployees = res.data.employees.filter(
        (emp) => emp.id !== employee.id
      );

      await updateCompanyById(companyId, {
        ...res.data,
        employees: updatedEmployees,
      });

      
      navigate("/Employees");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!employee) return <div className={styles.notFound}>Employee not found</div>;

  
  const avatarLetter = employee.name?.charAt(0).toUpperCase() || "?";

  return (
    <>
    
      <div className={styles.empDetails}>
          <div className={styles.Addemp}>
                    <button
                      className={styles.AddempBtn}
                      onClick={() => navigate("/Employees")}
                    >
                      {" "}
                      <FaArrowLeft />
                          Back
                     {" "}
                    </button>
                  </div>
        <div className={styles.detailsCard}>
         
          <div className={styles.header}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>{avatarLetter}</div>
              <div className={styles.nameSection}>
                <h2 className={styles.name}>{employee.name}</h2>
                <span className={`${styles.status} ${styles[employee.status]}`}>
                  {employee.status}
                </span>
              </div>
            </div>

            <div className={styles.actions}>
              <button 
                className={styles.editBtn} 
                onClick={() => setShowModal(true)}
              >
                <span>Edit</span>
              </button>
              <button 
                className={styles.deleteBtn} 
                // onClick={handleDelete}
                onClick={() => setOpen(true)}
              >
                <span>Delete</span>
              </button>
            </div>
          </div>

         
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Email</span>
              <span className={styles.value}>{employee.email}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.label}>Role</span>
              <span className={styles.value}>{employee.role}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.label}>Department</span>
              <span className={styles.value}>{employee.department}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.label}>Salary</span>
              <span className={styles.value}>{employee.salary} LPA</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.label}>Experience</span>
              <span className={styles.value}>{employee.experience}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.label}>Joining Date</span>
              <span className={styles.value}>{employee.joiningDate}</span>
            </div>
          </div>
        </div>
      </div>
   
      <Addmodal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setLoading(true);

          (async () => {
            const companyId = localStorage.getItem("userId");
            const res = await getCompanyById(companyId);
            const updatedEmployee = res.data.employees.find(
              (emp) => String(emp.id) === id
            );
            setEmployee(updatedEmployee);
            setLoading(false);
          })();
        }}
        editData={employee}
      />
     <ConfirmAlert
  isOpen={open}
  title="Are you sure?"
  message="Do you want to delete this Profile?"
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={() => {
    handleDelete();
    setOpen(false);
  }}
  onCancel={() => setOpen(false)}
/>

    </>
  );
}

export default EmployeesDetails;




