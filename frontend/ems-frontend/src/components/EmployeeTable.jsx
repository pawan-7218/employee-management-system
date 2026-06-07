import { useState,useEffect } from "react";
import { getEmployees } from "../services/employeeService";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { deleteEmployee } from "../services/employeeService";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function EmployeeTable({employees,refreshEmployees,onEdit}) {
   const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this employee?");

    if (!confirmed) return;

    try {
      console.log("Deleting ID:", id);

      await deleteEmployee(id);

      refreshEmployees();

      alert("Employee deleted successfully");
    } catch (error) {
      console.error(error);
      console.error(error.response);
      alert("Delete failed");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Actions</TableCell>

          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>
                  <IconButton
    onClick={() => onEdit(employee)}
  >
    <EditIcon />
  </IconButton>
  <IconButton
    onClick={() => handleDelete(employee.id)}
  >
    <DeleteIcon />
  </IconButton>
</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}