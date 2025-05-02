
import { useState, useEffect } from 'react';

export default function AttendanceForm({ onSubmit, editingAttendance, cancelEdit }) {
  const [form, setForm] = useState({ studentName: '', date: '', status: 'Present' });

  useEffect(() => {
    if (editingAttendance) setForm(editingAttendance);
  }, [editingAttendance]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm({ studentName: '', date: '', status: 'Present' });
  };


  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>{editingAttendance ? 'Edit' : 'Add'} Attendance</h5>
      <div className="row g-2 mb-2">
        <div className="col">
          <input type="text" name="studentName" className="form-control" placeholder="Student Name" value={form.studentName} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="date" name="date" className="form-control" value={form.date} onChange={handleChange} required />
        </div>
        <div className="col">
          <select name="status" className="form-control" value={form.status} onChange={handleChange}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      </div>
      <button className="btn btn-success me-2" type="submit">{editingAttendance ? 'Update' : 'Add'}</button>
      {editingAttendance && <button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
}
