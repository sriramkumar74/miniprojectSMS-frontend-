// import React, { useState } from "react";
// import axios from "axios";
// import "./StudentDetails.css";

// function VerifyStudent() {
//   const [rollNo, setRollNo] = useState("");
//   const [name, setName] = useState("");
//   const [department, setDepartment] = useState("");
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState("");

//   const handleVerify = async () => {
//     try {
//       const res = await axios.post("http://localhost:8080/api/students/verify", {
//         rollNo,
//         name,
//         department,
//       });

//       if (res.data.status === "success") {
//         setMessage(`✅ Verified: ${res.data.student.name}, Roll No: ${res.data.student.rollNo}`);
//         setStatus("success");
//       } else {
//         setMessage("❌ Invalid student details");
//         setStatus("error");
//       }
//     } catch (err) {
//       setMessage("⚠️ Server not reachable");
//       setStatus("error");
//     }
//   };

//   return (
//     <div className="student-page">
//       <h2>Verify Student</h2>
//       <form className="student-form" onSubmit={(e) => e.preventDefault()}>
//         <input
//           placeholder="Roll Number"
//           value={rollNo}
//           onChange={(e) => setRollNo(e.target.value)}
//         />
//         <input
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           placeholder="Department"
//           value={department}
//           onChange={(e) => setDepartment(e.target.value)}
//         />
//         <button type="button" onClick={handleVerify}>
//           Verify
//         </button>
//       </form>

//       <p className={`student-message ${status}`}>{message}</p>
//     </div>
//   );
// }

// export default VerifyStudent;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentDetails.css";

function VerifyStudent() {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [game, setGame] = useState("");

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [verifiedList, setVerifiedList] = useState([]);

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/students/verify", {
        rollNo,
        name,
        department,
        game
      });

      if (res.data.status === "success") {
        setMessage(`✅ Verified: ${name} (${rollNo})`);
        setStatus("success");
        fetchVerifiedStudents(); // refresh list
      } else {
        setMessage("❌ Invalid student details");
        setStatus("error");
      }
    } catch (err) {
      setMessage("⚠️ Server not reachable");
      setStatus("error");
    }
  };

  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this student?")) {
    try {
      await axios.delete(`http://localhost:8080/api/students/verified/${id}`);
      fetchVerifiedStudents(); // refresh list
      setMessage("🗑️ Student deleted successfully!");
      setStatus("success");
    } catch (err) {
      console.error("Error deleting student:", err);
      setMessage("⚠️ Unable to delete student");
      setStatus("error");
    }
  }
};


  const fetchVerifiedStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/students/verified");
      setVerifiedList(res.data);
    } catch (err) {
      console.error("Error fetching verified students:", err);
    }
  };

  useEffect(() => {
    fetchVerifiedStudents();
  }, []);

  return (
    <div className="student-page">
      <h2>Student Details</h2>

      <form className="student-form" onSubmit={(e) => e.preventDefault()}>
        <input placeholder="Roll Number" value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
        <input placeholder="Game" value={game} onChange={(e) => setGame(e.target.value)}
/>

        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button type="button" onClick={handleVerify}>Verify</button>
      </form>

      <p className={`student-message ${status}`}>{message}</p>

      {/* ✅ Show Verified Students */}
      <h3>Students List</h3>
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Department</th>
            <th>Game</th>
            <th>Phone</th>

          </tr>
        </thead>
        <tbody>
  {verifiedList.map((v, i) => (
    <tr key={i}>
      <td>{v.rollNo}</td>
      <td>{v.name}</td>
      <td>{v.department}</td>
      <td>{v.game}</td>
      <td>{v.phone}</td>

      <td>
        {/* ✅ Show Delete button only if admin */}
        {localStorage.getItem("role") === "admin" && (
          <button
            className="delete-btn"
            onClick={() => handleDelete(v.id)}
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>

        
      </table>
    </div>
  );
}

export default VerifyStudent;

