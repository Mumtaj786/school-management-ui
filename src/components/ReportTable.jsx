import React from 'react';

const ReportTable = ({ reports, handleEdit, handleDelete }) => {
  return (
    <table className="table table-bordered mt-3">
      <thead>
        <tr>
          <th>Student</th>
          <th>Exam</th>
          <th>Marks</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <tr key={report.id}>
            <td>{report.student.name}</td>
            <td>{report.exam.examName} - {report.exam.subject}</td>
            <td>{report.marks}</td>
            <td>
              <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(report)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(report.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportTable;
