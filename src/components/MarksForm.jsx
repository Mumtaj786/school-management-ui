import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MarksForm({ onSubmit, editingMark, cancelEdit }) {
  const [form, setForm] = useState({ student: '', exam: '', subject: '', marks: '' });
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [errors, setErrors] = useState({});
  const API_URL = 'http://localhost:8000/api/'; // adjust if needed

  useEffect(() => {
    axios.get(`${API_URL}students/`).then(res => setStudents(res.data));
  axios.get(`${API_URL}exams/`).then(res => setExams(res.data));
  }, []);

  // useEffect(() => {
  //   if (editingMark) setForm(editingMark);
  // }, [editingMark]);
  useEffect(() => {
    if (editingMark) {
      setForm({
        student: editingMark.student,
        exam: editingMark.exam,
        subject: editingMark.subject || '',  // default to empty string if undefined
        marks: editingMark.marks
      });
    } else {
      setForm({ student: '', exam: '', subject:'', marks: '' });
    }
  }, [editingMark]);

  const validate = () => {
    const errs = {};
    if (!form.student) errs.student = "Student name is required.";
    if (!form.exam) errs.exam = "Exam name is required.";
    if (!form.subject) errs.subject = "Subject is required.";
    if (!form.marks || isNaN(form.marks) || form.marks < 0) errs.marks = "Valid marks required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // const handleChange = e => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   onSubmit(form);
  //   setForm({ studentName: '', exam: '', subject: '', marks: '' });
  // };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
    setForm({ student: '', exam: '', subject: '', marks: '' });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>{editingMark ? 'Edit' : 'Add'} Mark</h5>
      <div className="row g-2 mb-2">
        <div className="col">
        <select name="student" className="form-control" value={form.student} onChange={handleChange} required>
            <option value="">Select Student</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          {errors.student && <small className="text-danger">{errors.studentName}</small>}
        </div>
        <div className="col">
        <select name="exam" className="form-control" value={form.exam} onChange={handleChange} required>
            <option value="">Select Exam</option>
            {exams.map(e => (
              <option key={e.id} value={e.id}>{e.examName} - {e.subject}</option>
            ))}
          </select>
          {errors.exam && <small className="text-danger">{errors.exam}</small>}
        </div>
          <div className="col">
          <input type="text" name="subject" className="form-control" placeholder="Subject" value={form.subject} onChange={handleChange} required />
          {errors.subject && <small className="text-danger">{errors.subject}</small>}
        </div>
        <div className="col">
          <input type="number" name="marks" className="form-control" placeholder="Marks" value={form.marks} onChange={handleChange} required />
          {errors.marks && <small className="text-danger">{errors.marks}</small>}
        </div>
      </div>
      <button className="btn btn-success me-2" type="submit">{editingMark ? 'Update' : 'Add'}</button>
      {editingMark && <button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
}
