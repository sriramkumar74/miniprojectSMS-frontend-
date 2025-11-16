

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TeamSelection.css";

function TeamSelection() {
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({ teamName: "", members: "", event: "" });

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/teams");
      setTeams(res.data);
    } catch (err) {
      console.error("Error loading teams:", err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/teams", form);
      alert("Team added successfully!");
      setForm({ teamName: "", members: "", event: "" });
      loadTeams();
    } catch (err) {
      console.error("Error adding team:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/teams/${id}`);
      alert("Team deleted successfully!");
      loadTeams();
    } catch (err) {
      console.error("Error deleting team:", err);
    }
  };

  return (
    <div className="team-page">
      <h2>Team Selection</h2>

      <form onSubmit={handleSubmit} className="team-form">
        <input
          name="teamName"
          placeholder="Team Name"
          value={form.teamName}
          onChange={handleChange}
          required
        />
        <input
          name="members"
          placeholder="Team Members"
          value={form.members}
          onChange={handleChange}
          required
        />
        <input
          name="event"
          placeholder="game"
          value={form.event}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Team</button>
      </form>

      <table className="team-table">
        <thead>
          <tr>
           
            <th>Team Name</th>
            <th>Members</th>
            <th>Game</th>
            
          </tr>
        </thead>
        <tbody>
          {teams.map((t) => (
            <tr key={t.id}>
              
              <td>{t.teamName}</td>
              <td>{t.members}</td>
              <td>{t.event}</td>
              <td>
                <button onClick={() => handleDelete(t.id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamSelection;

