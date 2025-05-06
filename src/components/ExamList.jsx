export default function ExamList({ exams, onEdit, onDelete }) {
  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Exam Name</th>
          <th>Subject</th>
          <th>Date</th>
          <th>Class</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exams.length === 0 ? (
          <tr><td colSpan="5" className="text-center">No exams scheduled</td></tr>
        ) : (
          exams.map((exam, i) => (
            <tr key={i}>
              <td>{exam.examName}</td>
              <td>{exam.subject}</td>
              <td>{exam.date}</td>
              <td>{exam.class_name}</td>
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
