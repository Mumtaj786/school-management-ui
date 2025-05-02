import { useState, useEffect } from 'react';

export default function ExamForm({ onSubmit, editingExam, cancelEdit }) {
  const [form, setForm] = useState({ examName: '', subject: '', date: '' });

  useEffect(() => {
    if (editingExam) setForm(editingExam);
  }, [editingExam]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm({ examName: '', subject: '', date: '' });
  };
  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>{editingExam ? 'Edit' : 'Add'} Exam</h5>
      <div className="row g-2 mb-2">
        <div className="col">
          <input type="text" name="examName" className="form-control" placeholder="Exam Name" value={form.examName} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="text" name="subject" className="form-control" placeholder="Subject" value={form.subject} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="date" name="date" className="form-control" value={form.date} onChange={handleChange} required />
        </div>
      </div>
      <button className="btn btn-success me-2" type="submit">{editingExam ? 'Update' : 'Add'}</button>
      {editingExam && <button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
}
