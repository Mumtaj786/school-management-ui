export default function ClassList({ classes, onEdit, onDelete }) {
    return (
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Class Name</th>
            <th>Section</th>
            <th>Room</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.length === 0 ? (
            <tr><td colSpan="4" className="text-center">No classes added</td></tr>
          ) : (
            classes.map((cls, i) => (
              <tr key={i}>
                <td>{cls.className}</td>
                <td>{cls.section}</td>
                <td>{cls.room}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(cls)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(cls)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
  
  