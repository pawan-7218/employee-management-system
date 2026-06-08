import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setToken }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        username,
        password
      });

      const token = res.data;

      localStorage.setItem("token", token);
      setToken(token);
const payload = JSON.parse(atob(token.split(".")[1]));

localStorage.setItem("role", payload.role);
      navigate("/dashboard"); // 🔥 redirect

    } catch (error) {
      alert("Invalid login");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

<p>
  Don't have an account?
  <Link to="/register"> Register</Link>
</p>
    </div>
  );
}