import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// APIs
export const getEmployees = () => api.get("/employees");

export const createEmployee = (employee) =>
  api.post("/employees", employee);

export const updateEmployee = (id, employee) =>
  api.put(`/employees/${id}`, employee);

export const deleteEmployee = (id) =>
  api.delete(`/employees/${id}`);