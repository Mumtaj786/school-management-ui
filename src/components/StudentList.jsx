export default function StudentList({ students, onEdit, onDelete }) {
  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Grade</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.length === 0 ? (
          <tr><td colSpan="4" className="text-center">No students</td></tr>
          ) : (
            students.map((student, i) => (
              <tr key={i}>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>{student.age}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(student)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(student)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
  