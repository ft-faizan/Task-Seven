
import styles from "../Styles/Employees.module.css";
import { IoIosAddCircle } from "react-icons/io";
import { useState, useEffect } from "react";
import Addmodal from "../Components/Employ.com/Addmodal.jsx";
import EmployeeList from "../Components/Employ.com/EmployeeList.jsx";
import EmployeeFilters from "../Components/Employ.com/EmployeeFilters.jsx";
import { getCompanyById, updateCompanyById } from "../Api/Api_Methods.jsx";
import { useDispatch } from "react-redux";
import { addEmployeeToTrash } from "../Redux_Tool_Kit/trashSlice";
 
function Employees() {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const dispatch = useDispatch();
 
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    department: "",
    status: "",
  });
 
  // 🔹 Load employees
  useEffect(() => {
    async function loadEmployees() {
      const companyId = localStorage.getItem("userId");
      const res = await getCompanyById(companyId);
      setEmployees(res.data.employees || []);
    }
    loadEmployees();
  }, []);
 
  // 🔹 Filters
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
 
  const handleClearFilters = () => {
    setFilters({
      search: "",
      role: "",
      department: "",
      status: "",
    });
  };
 
  const roles = [...new Set(employees.map((e) => e.role))];
  const departments = [...new Set(employees.map((e) => e.department))];
 
  const filteredEmployees = employees.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.role ? emp.role === filters.role : true) &&
      (filters.department ? emp.department === filters.department : true) &&
      (filters.status ? emp.status === filters.status : true)
    );
  });
 
  // 🔹 Edit
  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
    setShowModal(true);
  };
 
  // 🔹 Delete
  const handleDelete = async (employee) => {
    try {
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
 
      setEmployees(updatedEmployees);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };
 
  // 🔹 ADD / EDIT submit (IMPORTANT)
  const handleEmployeeSubmit = async (formData) => {
    try {
      const companyId = localStorage.getItem("userId");
      const res = await getCompanyById(companyId);
      const company = res.data;
 
      let updatedEmployees;
 
      if (selectedEmployee) {
        // ✏️ EDIT
        updatedEmployees = company.employees.map((emp) =>
          emp.id === selectedEmployee.id
            ? { ...emp, ...formData }
            : emp
        );
      } else {
        // ➕ ADD
        updatedEmployees = [
          ...(company.employees || []),
          {
            id: Date.now(),
            ...formData,
            createdAt: new Date().toISOString(),
          },
        ];
      }
 
      await updateCompanyById(companyId, {
        ...company,
        employees: updatedEmployees,
      });
 
      setEmployees(updatedEmployees);
      setShowModal(false);
      setSelectedEmployee(null);
    } catch (err) {
      console.error("Save failed", err);
    }
  };
 
  return (
    <>
      <div className={styles.employees}>
        <div className={styles.Efit}>
          <div className={styles.Addemp}>
            <button
              className={styles.AddempBtn}
              onClick={() => {
                setSelectedEmployee(null);
                setShowModal(true);
              }}
            >
              <IoIosAddCircle /> Add New Employee
            </button>
          </div>
 
          <EmployeeFilters
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
            roles={roles}
            departments={departments}
          />
 
          <EmployeeList
            employees={[...filteredEmployees].reverse()}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
 
      {/* MODAL */}
      <Addmodal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedEmployee(null);
        }}
        editData={selectedEmployee}
        onSubmit={handleEmployeeSubmit}
      />
    </>
  );
}
 
export default Employees;