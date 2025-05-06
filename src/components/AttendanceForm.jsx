
import { useState, useEffect } from 'react';

export default function AttendanceForm({ onSubmit, editingAttendance, cancelEdit }) {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    student: '',
    date: '',
    status: 'Present',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingAttendance) setForm(editingAttendance);
    else setForm({ student: '', date: '', status: 'Present' });
  }, [editingAttendance]);
  //Fetch students from backend
  useEffect(() => {
    fetch('http://localhost:8000/api/students/')
      .then(res => res.json())
      .then(data => {
        console.log('Student data:', data);  // Add this to inspect structure
        setStudents(Array.isArray(data) ? data : data.data || []);
      })
      .catch(err => {
        console.error('Error fetching students', err);
        setStudents([]); // fallback
      });
  }, []);
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errs = {};
    if (!form.student) {
      errs.student = 'Student name is required';
    }
    
    if (!form.date) errs.date = 'Date is required';
    return errs;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit(form);
    setForm({ student: '', date: '', status: 'Present' });
  };


  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>{editingAttendance ? 'Edit' : 'Add'} Attendance</h5>
      <div className="row g-2 mb-2">
        <div className="col">
        <select
            name="student"
            className={`form-control ${errors.student ? 'is-invalid' : ''}`}
            value={form.student}
            onChange={handleChange}
          >
            <option value="">-- Select Student --</option>
            {Array.isArray(students) && students.map(student => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
            ))}
          </select>
          {errors.student && <div className="invalid-feedback">{errors.student}</div>}
        </div>
        <div className="col">
        <input
            type="date"
            name="date"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            value={form.date}
            onChange={handleChange}
          />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>
        <div className="col">
          <select name="status" className="form-control" value={form.status} onChange={handleChange}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      </div>
      <button className="btn btn-success me-2" type="submit">
        {editingAttendance ? 'Update' : 'Add'}
      </button>
      {editingAttendance && (
        <button className="btn btn-secondary" type="button" onClick={cancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}
