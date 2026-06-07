import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import { getEmployees } from "../services/employeeService";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const loadEmployees = () => {
    getEmployees()
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Dashboard</h2>

      <EmployeeForm refreshEmployees={loadEmployees} selectedEmployee={selectedEmployee} />

      <EmployeeTable  employees={employees}
  refreshEmployees={loadEmployees}    onEdit={setSelectedEmployee}/>
    </div>
  );
}