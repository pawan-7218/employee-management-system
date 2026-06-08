import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function PrivateRoute({ token, children }) {
  return token ? children : <Navigate to="/login" />;
}

export default function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>

      {/* Navbar only when logged in */}
      {token && <Navbar />}

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login setToken={setToken} />}
        />
         <Route
    path="/register"
    element={<Register />}
  />

        {/* DASHBOARD (PROTECTED) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute token={token}>
              <Dashboard setToken={setToken} />
            </PrivateRoute>
          }
        />

        {/* DEFAULT ROUTE */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>

    </BrowserRouter>
  );
}