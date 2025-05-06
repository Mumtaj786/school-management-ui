// import { useState, useEffect } from "react";

// export default function GradeForm() {
//   const [grades, setGrades] = useState([]);
//   const [form, setForm] = useState({ student: "", subject: "", marks: "" });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetch("/api/grades/")
//       .then(res => res.json())
//       .then(setGrades);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.student || !form.subject || !form.marks) {
//       setError("All fields are required");
//       return;
//     }
//     setError("");
//     fetch("/api/grades/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form)
//     })
//       .then(res => res.json())
//       .then(data => {
//         setGrades([...grades, data]);
//         setForm({ student: "", subject: "", marks: "" });
//       });
//   };

//   const handleDelete = (id) => {
//     fetch(`/api/grades/${id}/`, { method: "DELETE" })
//       .then(() => setGrades(grades.filter(e => e.id !== id)));
//   };

//   return (
//     <div>
//       <h5>Grade Entry</h5>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleSubmit} className="mb-3">
//         <input className="form-control mb-2" placeholder="Student ID" value={form.student} onChange={e => setForm({ ...form, student: e.target.value })} />
//         <input className="form-control mb-2" placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
//         <input className="form-control mb-2" type="number" placeholder="Marks" value={form.marks} onChange={e => setForm({ ...form, marks: e.target.value })} />
//         <button className="btn btn-success" type="submit">Submit</button>
//       </form>

//       <ul className="list-group">
//         {grades.map((g) => (
//           <li key={g.id} className="list-group-item d-flex justify-content-between">
//             {g.student} - {g.subject} - {g.marks}
//             <button className="btn btn-sm btn-danger" onClick={() => handleDelete(g.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import { useState, useEffect } from "react";

export default function GradeForm({ onSubmit }) {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    student: "",
    subject: "",
    marks: ""
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/students/")
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ student: "", subject: "", marks: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-2">
        <label className="form-label">Student</label>
        <select
          name="student"
          className="form-select"
          value={form.student}
          onChange={handleChange}
          required
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="form-label">Subject</label>
        <input
          type="text"
          className="form-control"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Marks</label>
        <input
          type="number"
          className="form-control"
          name="marks"
          value={form.marks}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Grade</button>
    </form>
  );
}
