// import AttendanceChart from "../charts/AttendanceChart";
// import GradeChart from "../charts/GradeChart";

// export default function Dashboard() {
//   return (
//     <div>
//       <h2 className="mb-4">Dashboard</h2>
//       <div className="row mb-4">
//         {["Students", "Teachers", "Classes", "Fees Collected"].map((title, i) => (
//           <div className="col-md-3" key={i}>
//             <div className={`card text-bg-${['primary', 'success', 'warning', 'info'][i]} mb-3`}>
//               <div className="card-body">
//                 <h5 className="card-title">{title}</h5>
//                 <p className="card-text">{[150, 25, 10, "₹1.5L"][i]}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      

//       <div className="row">
//         <div className="col-md-6 mb-4">
//           <AttendanceChart />
//         </div>
//         <div className="col-md-6 mb-4">
//           <GradeChart />
//         </div>
//       </div>
//     </div>
//   );

// }

import AttendanceChart from "../charts/AttendanceChart";
import GradeChart from "../charts/GradeChart";
import AttendanceForm from "../components/AttendanceForm";
import GradeForm from "../forms/GradeForm";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/attendance/")
      .then(res => res.json())
      .then(data => setAttendanceRecords(data));

    fetch("http://localhost:8000/api/grades/")
      .then(res => res.json())
      .then(data => setGrades(data));
  }, []);

  const handleAddAttendance = async (data) => {
    const res = await fetch("http://localhost:8000/api/attendance/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const newRecord = await res.json();
    setAttendanceRecords([...attendanceRecords, newRecord]);
  };

  const handleDeleteAttendance = async (id) => {
    await fetch(`http://localhost:8000/api/attendance/${id}/`, {
      method: "DELETE"
    });
    setAttendanceRecords(attendanceRecords.filter(item => item.id !== id));
  };

  const handleAddGrade = async (form) => {
    const res = await fetch("http://localhost:8000/api/grades/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const newGrade = await res.json();
    setGrades([...grades, newGrade]);
  };

  const handleDeleteGrade = async (id) => {
    await fetch(`http://localhost:8000/api/grades/${id}/`, { method: "DELETE" });
    setGrades(grades.filter(g => g.id !== id));
  };

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <div className="row mb-4">
        {["Students", "Teachers", "Classes", "Fees Collected"].map((title, i) => (
          <div className="col-md-3" key={i}>
            <div className={`card text-bg-${['primary', 'success', 'warning', 'info'][i]} mb-3`}>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{[150, 25, 10, "₹1.5L"][i]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          {/* Pass attendanceRecords from Dashboard.js */}
        <AttendanceChart attendanceRecords={attendanceRecords} />
          <AttendanceForm onSubmit={handleAddAttendance} />
          <ul className="list-group">
            {attendanceRecords.map(rec => (
              <li key={rec.id} className="list-group-item d-flex justify-content-between">
                {rec.student} - {rec.date} - {rec.status}
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteAttendance(rec.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6 mb-4">
        <GradeChart grades={grades} />
          <GradeForm onSubmit={handleAddGrade} />
          <ul className="list-group">
            {grades.map(g => (
              <li key={g.id} className="list-group-item d-flex justify-content-between">
                {g.student} - {g.subject} - {g.marks}
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteGrade(g.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
