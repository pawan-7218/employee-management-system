import { useEffect,useState } from "react";
import { createEmployee,updateEmployee } from "../services/employeeService";

import {
  Button,
  TextField,
  Paper,
  Typography,
  Box,
} from "@mui/material";

export default function EmployeeForm({ refreshEmployees,
  selectedEmployee,}) {
  const [employee, setEmployee] = useState({
    id:null,
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
  });
  useEffect(() => {
  if (selectedEmployee) {
    setEmployee(selectedEmployee);
  }
}, [selectedEmployee]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     if (employee.id) {
  await updateEmployee(employee.id, employee);
  alert("Employee Updated Successfully!");
} else {
  await createEmployee(employee);
  alert("Employee Added Successfully!");
}
refreshEmployees();
      

      setEmployee({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        designation: "",
        salary: "",
        joiningDate: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error adding employee");
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add Employee
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "grid",
          gap: 2,
        }}
      >
        <TextField
          label="First Name"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
        />

        <TextField
          label="Last Name"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
        />

        <TextField
          label="Email"
          name="email"
          value={employee.email}
          onChange={handleChange}
        />

        <TextField
          label="Department"
          name="department"
          value={employee.department}
          onChange={handleChange}
        />

        <TextField
          label="Designation"
          name="designation"
          value={employee.designation}
          onChange={handleChange}
        />

        <TextField
          label="Salary"
          name="salary"
          type="number"
          value={employee.salary}
          onChange={handleChange}
        />

        <TextField
          name="joiningDate"
          type="date"
          value={employee.joiningDate}
          onChange={handleChange}
        />
<Button variant="contained" type="submit">
  {employee.id ? "Update Employee" : "Add Employee"}
</Button>
      </Box>
    </Paper>
  );
}