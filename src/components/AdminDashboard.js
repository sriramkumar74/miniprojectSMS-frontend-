import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="button-grid">
        <button className="module-btn" onClick={() => navigate("/admin/students")}>
          📘 Student Details
        </button>
        <button className="module-btn" onClick={() => navigate("/admin/events")}>
          🎯 Event Details
        </button>
        <button className="module-btn" onClick={() => navigate("/admin/team")}>
          🏆 Team Selection
        </button>
        <button className="module-btn" onClick={() => navigate("/admin/matches")}>
          ⚽ Match Details
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;



