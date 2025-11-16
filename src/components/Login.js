

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./components.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/admin/login", {
        username,
        password,
      });

      if (res.data.status === "success") {
        setMessage("Login Successful!");
        localStorage.setItem("role", "admin"); // 🔒 store admin role
        navigate("/dashboard");
      } else {
    setMessage("Invalid Credentials");
      }

    } catch (error) {
      setMessage("Server not reachable");
      console.error(error);
    }
  };

  // ✅ Navigate to Student Details
  const handleStudentsClick = () => {
    navigate("/student");
  };

  // ✅ Navigate to Details Page
  const handleDetailsClick = () => {
    navigate("/details");
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Message Display */}
      <p>{message}</p>

      {/* ✅ Buttons Section */}
      <div className="button-group">
        <button className="student-btn" onClick={handleStudentsClick}>
          Go to Student Details
        </button>
        </div>

        <div className="button-group">

        <button className="details-btn" onClick={handleDetailsClick}>
          View All Details
        </button>
      </div>
    </div>
  );
}

export default Login;




