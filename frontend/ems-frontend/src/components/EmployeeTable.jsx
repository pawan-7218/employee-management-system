import { useState, useEffect } from "react";
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
  TextField,
  Pagination,
  Box,
} from "@mui/material";

export default function EmployeeTable({ employees, refreshEmployees, onEdit }) {

  // =========================
  // 🔍 SEARCH (ADDED)
  // =========================
  const [search, setSearch] = useState("");

  // =========================
  // 📄 PAGINATION (ADDED)
  // =========================
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

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

  // =========================
  // 🔍 FILTER LOGIC (ADDED)
  // =========================
  const filteredEmployees = employees.filter((emp) =>
    emp.firstName.toLowerCase().includes(search.toLowerCase())
  );

  // =========================
  // 📄 PAGINATION LOGIC (ADDED)
  // =========================
  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      {/* =========================
          🔍 SEARCH UI (ADDED)
      ========================= */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search Employee"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

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
            {paginatedEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>

                <TableCell>
                  <IconButton onClick={() => onEdit(employee)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton onClick={() => handleDelete(employee.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* =========================
          📄 PAGINATION UI (ADDED)
      ========================= */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </>
  );
}