// import React, { useState } from "react";
// import "./MatchDetails.css";

// function MatchDetails() {
//   const [matches, setMatches] = useState([]);
//   const [form, setForm] = useState({ teamA: "", teamB: "", date: "", result: "" });

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setMatches([...matches, form]);
//     setForm({ teamA: "", teamB: "", date: "", result: "" });
//   };

//   return (
//     <div className="match-page">
//       <h2>Match Details</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="teamA" placeholder="Team A" value={form.teamA} onChange={handleChange} />
//         <input name="teamB" placeholder="Team B" value={form.teamB} onChange={handleChange} />
//         <input name="date" placeholder="Date" value={form.date} onChange={handleChange} />
//         <input name="result" placeholder="Result" value={form.result} onChange={handleChange} />
//         <button type="submit">Add Match</button>
//       </form>

//       <table>
//         <thead>
//           <tr>
//             <th>Team A</th>
//             <th>Team B</th>
//             <th>Date</th>
//             <th>Result</th>
//           </tr>
//         </thead>
//         <tbody>
//           {matches.map((m, i) => (
//             <tr key={i}>
//               <td>{m.teamA}</td>
//               <td>{m.teamB}</td>
//               <td>{m.date}</td>
//               <td>{m.result}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default MatchDetails;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MatchDetails.css";

function MatchDetails() {
  const [matches, setMatches] = useState([]);
  const [form, setForm] = useState({
    teamA: "",
    teamB: "",
    matchDate: "",
    venue: "",
  });

  useEffect(() => {
    fetchMatches();
  }, []);

  // Fetch all matches
  const fetchMatches = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/matches");
      setMatches(res.data);
    } catch (err) {
      console.error("Error fetching matches:", err);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.teamA || !form.teamB || !form.matchDate || !form.venue) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/matches", form);
      alert("✅ Match added successfully!");
      setForm({ teamA: "", teamB: "", matchDate: "", venue: "" });
      fetchMatches();
    } catch (err) {
      console.error("Error saving match:", err);
      alert("⚠️ Error saving match!");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this match?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/matches/${id}`);
      alert("🗑️ Match deleted successfully!");
      fetchMatches();
    } catch (err) {
      console.error("Error deleting match:", err);
    }
  };

  return (
    <div className="match-page">
      <h2>🏏 Match Details</h2>

      <form onSubmit={handleSubmit} className="match-form">
        <input
          type="text"
          name="teamA"
          placeholder="Team A"
          value={form.teamA}
          onChange={handleChange}
        />
        <input
          type="text"
          name="teamB"
          placeholder="Team B"
          value={form.teamB}
          onChange={handleChange}
        />
        <input
          type="date"
          name="matchDate"
          value={form.matchDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={form.venue}
          onChange={handleChange}
        />
        <button type="submit">Add Match</button>
      </form>

      <table className="match-table">
        <thead>
          <tr>
            
            <th>Team A</th>
            <th>Team B</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => (
            <tr key={m.id}>
              
              <td>{m.teamA}</td>
              <td>{m.teamB}</td>
              <td>{m.matchDate}</td>
              <td>{m.venue}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(m.id)}
                >
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

export default MatchDetails;




