import React from 'react';

const ReportForm = ({ form, students, exams, setForm, handleSubmit, editingId }) => {
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label>Student</label>
        <select
          className="form-control"
          value={form.student_id}
          onChange={(e) => setForm({ ...form, student_id: e.target.value })}
          required
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Exam</label>
        <select
          className="form-control"
          value={form.exam_id}
          onChange={(e) => setForm({ ...form, exam_id: e.target.value })}
          required
        >
          <option value="">Select Exam</option>
          {exams.map((e) => (
            <option key={e.id} value={e.id}>
              {e.examName} - {e.subject}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Marks</label>
        <input
          type="number"
          className="form-control"
          value={form.marks}
          onChange={(e) => setForm({ ...form, marks: e.target.value })}
          required
        />
      </div>

      <button className="btn btn-success mt-2" type="submit">
        {editingId ? 'Update' : 'Add'} Report
      </button>
    </form>
  );
};

export default ReportForm;
