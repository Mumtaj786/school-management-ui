export default function AttendanceList({ attendanceList, onEdit, onDelete }) {
  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Student</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {attendanceList.length === 0 ? (
          <tr><td colSpan="4" className="text-center">No attendance records</td></tr>
        ) : (
          attendanceList.map((attendance, i) => (
            // <tr key={i}>
            <tr key={attendance.id || i}>
              <td>{attendance.student}</td>
              <td>{attendance.date}</td>
              <td>{attendance.status}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(attendance)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(attendance)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
