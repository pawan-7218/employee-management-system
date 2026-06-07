import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import { getEmployees } from "../services/employeeService";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // ✅ ADDED: Dialog control state
  const [openForm, setOpenForm] = useState(false);

  const loadEmployees = () => {
    getEmployees()
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // ✅ ADDED: Add employee handler
  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setOpenForm(true);
  };

  // ✅ ADDED: Edit employee handler
  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setOpenForm(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Dashboard</h2>

      {/* ✅ ADDED: Add Employee Button */}
      <button onClick={handleAddEmployee}>
        Add Employee
      </button>

      {/* Employee Form (UPDATED PROPS ONLY) */}
      <EmployeeForm
        refreshEmployees={loadEmployees}
        selectedEmployee={selectedEmployee}
        open={openForm}
        setOpen={setOpenForm}
      />

      {/* Employee Table (UPDATED onEdit ONLY) */}
      <EmployeeTable
        employees={employees}
        refreshEmployees={loadEmployees}
        onEdit={handleEditEmployee}
      />
    </div>
  );
}