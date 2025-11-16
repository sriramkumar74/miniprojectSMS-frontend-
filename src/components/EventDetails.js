
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./EventDetails.css";

// function EventDetails() {
//   const [events, setEvents] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     eventDate: "",
//     venue: "",
//   });

//   // Fetch all events from backend when page loads
//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/events");
//       setEvents(res.data);
//     } catch (err) {
//       console.error("Error fetching events:", err);
//     }
//   };

//   // Handle input changes
//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   // Submit form to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8080/api/events", form);
//       setEvents([...events, res.data]); // add new event to list
//       setForm({ name: "", description: "", eventDate: "", venue: "" });
//     } catch (err) {
//       console.error("Error saving event:", err);
//     }
//   };

//   return (
//     <div className="event-page">
//       <h2>🏟️ Event Management</h2>

//       <form onSubmit={handleSubmit} className="event-form">
//         <input
//           type="text"
//           name="name"
//           placeholder="Event Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
        
//         <input
//           type="date"
//           name="eventDate"
//           value={form.eventDate}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="venue"
//           placeholder="Venue"
//           value={form.venue}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Add Event</button>
//       </form>

//       <div className="event-list">
//         <h3>📋 Event List</h3>
//         {events.length === 0 ? (
//           <p>No events added yet.</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>Event Name</th>
//                 <th>Date</th>
//                 <th>Venue</th>
//               </tr>
//             </thead>
//             <tbody>
//               {events.map((e) => (
//                 <tr key={e.id}>
//                   <td>{e.name}</td>
//                   <td>{e.eventDate}</td>
//                   <td>{e.venue}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default EventDetails;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EventDetails.css";

function EventDetails() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    eventDate: "",
    venue: "",
  });

  // Load all events on page load
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/events", form);
      setEvents([...events, res.data]); // add to list without reload
      setForm({ name: "", description: "", eventDate: "", venue: "" });
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:8080/api/events/${id}`);
        setEvents(events.filter((e) => e.id !== id));
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    }
  };

  return (
    <div className="event-page">
      <h2>🎯 Event Management</h2>

      <form onSubmit={handleSubmit} className="event-form">
        <input
          name="name"
          placeholder="Event Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="eventDate"
          placeholder="Event Date"
          value={form.eventDate}
          onChange={handleChange}
          required
        />
        <input
          name="venue"
          placeholder="Venue"
          value={form.venue}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Event</button>
      </form>

      <h3>📅 Event List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{e.description}</td>
              <td>{e.eventDate}</td>
              <td>{e.venue}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(e.id)}>
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventDetails;


