
export default function MarksList({ marksList, onEdit, onDelete }) {
  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Student</th>
          <th>Exam</th>
          <th>Subject</th>
          <th>Marks</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {marksList.length === 0 ? (
          <tr><td colSpan="5" className="text-center">No marks added</td></tr>
        ) : (
          // marksList.map((mark, i) => (
          //   <tr key={i}>
            marksList.map((mark) => (
            <tr key={mark.id}>
              <td>{mark.student}</td>
              <td>{mark.exam}</td>
              <td>{mark.subject}</td>
              <td>{mark.marks}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(mark)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(mark)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

