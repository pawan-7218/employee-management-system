import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import { getEmployees } from "../services/employeeService";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [openForm, setOpenForm] = useState(false);

  const navigate = useNavigate(); // ✅ ADDED

  const loadEmployees = () => {
    getEmployees()
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // ✅ ADDED: redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setOpenForm(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setOpenForm(true);
  };

  // ✅ ADDED: Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* HEADER ADDED (NOT CHANGING YOUR FLOW) */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2>Employee Dashboard</h2>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* YOUR ORIGINAL CODE (UNCHANGED) */}
      
  {isAdmin() && (<button onClick={handleAddEmployee}>
    Add Employee
  </button>)}
  



      <EmployeeForm
        refreshEmployees={loadEmployees}
        selectedEmployee={selectedEmployee}
        open={openForm}
        setOpen={setOpenForm}
      />

      <EmployeeTable
        employees={employees}
        refreshEmployees={loadEmployees}
        onEdit={handleEditEmployee}
      />

    </div>
  );
}