import styles from "../Styles/Employees.module.css";
import { IoIosAddCircle } from "react-icons/io";
import { useState, useEffect } from "react";
import Addmodal from "../Components/Employ.com/Addmodal.jsx";
import EmployeeList from "../Components/Employ.com/EmployeeList.jsx";
import EmployeeFilters from "../Components/Employ.com/EmployeeFilters.jsx";
import { getCompanyById } from "../Api/Api_Methods.jsx";


import { useDispatch } from "react-redux";
import { addEmployeeToTrash } from "../Redux_Tool_Kit/trashSlice";
import { updateCompanyById} from "../Api/Api_Methods.jsx";


// import { Link } from "react-router-dom";
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

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
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


  const handleClearFilters = () => {
  setFilters({
    search: "",
    role: "",
    department: "",
    status: "",
  });
};


  useEffect(() => {
    async function loadEmployees() {
      const companyId = localStorage.getItem("userId");
      const res = await getCompanyById(companyId);
      setEmployees(res.data.employees || []);
    }

    loadEmployees();
  }, []);

  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
    setShowModal(true);
  };

  //  const userData = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "q3tE5@example.com",
  //   },
  //   {
  //     id: 2,
  //     name: "Jfas Doe",
  //     email: "2Tt1b@example.com",
  //   },
  //  ]

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
  } catch (error) {
    console.error("Delete failed", error);
  }
};
 

  return (
    <>
      <div className={styles.employees}>
        <div className={styles.Efit}>
          <div className={styles.Addemp}>
            <button
              className={styles.AddempBtn}
              onClick={() => setShowModal(true)}
            >
              {" "}
              <IoIosAddCircle />
              Add New Employee{" "}
            </button>
          </div>
         <div className={styles.EmpF}>
          <EmployeeFilters
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
            roles={roles}
            departments={departments}
          />
         </div>
          {/* <EmployeeList
            employees={[...employees].reverse()}
            onEdit={handleEdit}
          /> */} 
          <div className={styles.Emplist}>
                 
          <EmployeeList
            employees={[...filteredEmployees].reverse()}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
         </div>
          {/* {
            userData.map((item)=>(
              <div>
                <h3><Link to={"/Employees/"+item.id}>{item.name} </Link></h3>
              </div>
            ))
          } */}
        </div>
      </div>
      {/* this a modal to add employee */}
      {/* <Addmodal show={showModal} onClose={() => setShowModal(false)} /> */}
      <Addmodal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedEmployee(null);
          
        }}
        editData={selectedEmployee}
      />
    </>
  );
}

export default Employees;
