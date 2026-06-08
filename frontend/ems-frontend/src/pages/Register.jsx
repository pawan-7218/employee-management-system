import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8080/auth/register",
        user
      );

      alert("Registration successful");

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data ||
        "Registration failed"
      );
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>

      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">
          Register
        </button>

      </form>

      <br />

      <p>
        Already have an account?
        <Link to="/login"> Login</Link>
      </p>

    </div>
  );
}