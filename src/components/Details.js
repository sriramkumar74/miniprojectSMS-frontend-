import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Details.css";

function Details() {
  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const studentRes = await axios.get("http://localhost:8080/api/students");
      const eventRes = await axios.get("http://localhost:8080/api/events");
      const teamRes = await axios.get("http://localhost:8080/api/teams");
      const matchRes = await axios.get("http://localhost:8080/api/matches");
       const res = await axios.get("http://localhost:8080/api/students/verified");
      setStudents(res.data);
      

      // setStudents(studentRes.data);
      setEvents(eventRes.data);
      setTeams(teamRes.data);
      setMatches(matchRes.data);
      
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <div className="details-page">
      <h2>All Details</h2>

      {/* Student Details */}
      <section>
        <h3>Student Details</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>game</th>
              <th>department</th>

            </tr>
          </thead>
          <tbody>
            {students.map((s ,i) => (
              <tr key={i}>
                <td>{s.name}</td>
                <td>{s.rollNo}</td>
                <td>{s.game}</td>
                <td>{s.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Event Details */}
      <section>
        <h3>Event Details</h3>
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e, i) => (
              <tr key={i}>
                <td>{e.name}</td>
                <td>{e.eventDate}</td>
                <td>{e.venue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Team Selection */}
      <section>
        <h3>Team Selection</h3>
        <table>
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Members</th>
              <th>Event</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t, i) => (
              <tr key={i}>
                <td>{t.teamName}</td>
                <td>{t.members}</td>
                <td>{t.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Match Details */}
      <section>
        <h3>Match Details</h3>
        <table>
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
              
            </tr>
          ))}
        </tbody>
        </table>
      </section>
    </div>
  );
}

export default Details;


