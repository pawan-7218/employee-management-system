import { useEffect, useState } from "react";
import { createEmployee, updateEmployee } from "../services/employeeService";

import {
  Button,
  TextField,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
} from "@mui/material";

export default function EmployeeForm({
  refreshEmployees,
  selectedEmployee,
  open,
  setOpen,
}) {
  const [employee, setEmployee] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
  });

  // existing useEffect (kept same)
  useEffect(() => {
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    } else {
      setEmployee({
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        designation: "",
        salary: "",
        joiningDate: "",
      });
    }
  }, [selectedEmployee]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
        setSnackbar({
          open: true,
          message: "Employee Updated Successfully!",
          severity: "success",
        });
      } else {
        await createEmployee(employee);
        setSnackbar({
          open: true,
          message: "Employee Added Successfully!",
          severity: "success",
        });
      }

      refreshEmployees();

      // reset form
      setEmployee({
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        designation: "",
        salary: "",
        joiningDate: "",
      });

      // close dialog
      setOpen(false);
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Error while saving employee",
        severity: "error",
      });
    }
  };

  return (
    <>
      {/* ✅ DIALOG WRAPPER ADDED */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>
          {employee.id ? "Update Employee" : "Add Employee"}
        </DialogTitle>

        <DialogContent>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "grid", gap: 2 }}
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
        </DialogContent>
      </Dialog>

      {/* ✅ SNACKBAR ADDED */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}