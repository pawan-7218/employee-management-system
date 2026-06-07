import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Employee Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
}