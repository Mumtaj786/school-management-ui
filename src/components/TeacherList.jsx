export default function TeacherList({ teachers, onEdit, onDelete }) {
    return (
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length === 0 ? (
            <tr><td colSpan="4" className="text-center">No teachers found</td></tr>
  
            ) : (
                teachers.map((teacher, i) => (
                  <tr key={i}>
                    <td>{teacher.name}</td>
                    <td>{teacher.subject}</td>
                    <td>{teacher.experience} yrs</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(teacher)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => onDelete(teacher)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        );
      }
        