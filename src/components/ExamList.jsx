
export default function ExamList({ exams, onEdit, onDelete }) {
  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Exam Name</th>
          <th>Subject</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exams.length === 0 ? (
          <tr><td colSpan="4" className="text-center">No exams scheduled</td></tr>
        ) : (
          exams.map((exam, i) => (
            <tr key={i}>
              <td>{exam.examName}</td>
              <td>{exam.subject}</td>
              <td>{exam.date}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(exam)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(exam)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

