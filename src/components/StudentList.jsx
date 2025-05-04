// Show students with Edit/Delete buttons
import axios from 'axios';
import { useEffect } from 'react';

export default function StudentList({ students, onEdit, onDelete }) {
  // Fetch data only if students prop is not available (e.g., if it's an empty array)
  useEffect(() => {
    if (students.length === 0) {
      axios.get('http://localhost:8000/api/students/')
        .then(response => {
          // Here you can either pass the data back to the parent component via a callback
          // or update the state in the parent where students are stored
          console.log(response.data); // If you need to pass this to parent, use a callback
        })
        .catch(error => {
          console.error("Error fetching students:", error);
        });
    }
  }, [students]);

  function markAttendance(studentId, status) {
    axios.post('http://localhost:8000/api/attendance/', {
      student: studentId,
      date: new Date().toISOString().split("T")[0],  // today
      status: status
    }).then(res => {
      alert("Attendance marked!");
    }).catch(err => {
      console.error("Error:", err);
    });
  }

  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Roll Number</th>
          <th>Email</th>
          <th>Class Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.length === 0 ? (
          <tr><td colSpan="4" className="text-center">No students</td></tr>
        ) : (
          students.map(student => (
              <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.roll_number}</td>
              <td>{student.email}</td>
              <td>{student.class_name}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(student)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(student)}>Delete</button>
                <button className="btn btn-sm btn-primary" onClick={() => markAttendance(student.id, 'Present')}>Mark Present</button>
                <button className="btn btn-sm btn-secondary" onClick={() => markAttendance(student.id, 'Absent')}>Mark Absent</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}



// <tbody>
// {students.map(student => (
//   <tr key={student.id}>
//     <td>{student.name}</td>
//     <td>{student.roll_number}</td>
//     <td>{student.email}</td>
//     <td>{student.class_name}</td>
//     <td>
//       <button className="btn btn-sm btn-info me-1" onClick={() => onEdit(student)}>Edit</button>
//       <button className="btn btn-sm btn-danger" onClick={() => onDelete(student)}>Delete</button>
//     </td>
//   </tr>
// ))}
// </tbody>