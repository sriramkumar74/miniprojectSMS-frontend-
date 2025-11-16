
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import AdminDashboard from "./components/AdminDashboard";
// import StudentDetails from "./components/StudentDetails";
// import EventDetails from "./components/EventDetails";
// import TeamSelection from "./components/TeamSelection";
// import MatchDetails from "./components/MatchDetails";
// import Details from "./components/Details"; 

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//          <Route path="/details" element={<Details />} /> {/* ⬅️ new route */}
//         <Route path="/dashboard" element={<AdminDashboard />} />
//         <Route path="/students" element={<StudentDetails />} />
//         <Route path="/events" element={<EventDetails />} />
//         <Route path="/teams" element={<TeamSelection />} />
//         <Route path="/matches" element={<MatchDetails />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import StudentDetails from "./components/StudentDetails";
import EventDetails from "./components/EventDetails";
import TeamSelection from "./components/TeamSelection";
import MatchDetails from "./components/MatchDetails";
import Details from "./components/Details"; 
import VerifyStudent from "./components/VerifyStudent";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Login Page */}
        <Route path="/" element={<Login />} />
        <Route path="/details" element={<Details />} /> 
         {/* ✅ Admin Module Pages */}
        <Route path="/student" element={<StudentDetails />} />

        {/* ✅ Admin Dashboard */}
        <Route path="/dashboard" element={<AdminDashboard />} />

       
        
        <Route path="/admin/students" element={<VerifyStudent />} />
        <Route path="/admin/events" element={<EventDetails />} />
        <Route path="/admin/team" element={<TeamSelection />} />
        <Route path="/admin/matches" element={<MatchDetails />} />
      </Routes>
    </Router>
  );
}

export default App;





