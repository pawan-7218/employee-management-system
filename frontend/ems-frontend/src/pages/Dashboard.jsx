import EmployeeTable from "../components/EmployeeTable";

export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Dashboard</h2>
      <EmployeeTable />
    </div>
  );
}