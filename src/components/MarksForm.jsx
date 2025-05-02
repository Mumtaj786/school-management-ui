import { useState, useEffect } from 'react';

export default function MarksForm({ onSubmit, editingMark, cancelEdit }) {
  const [form, setForm] = useState({ studentName: '', exam: '', subject: '', marks: '' });

  useEffect(() => {
    if (editingMark) setForm(editingMark);
  }, [editingMark]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm({ studentName: '', exam: '', subject: '', marks: '' });
  };
  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>{editingMark ? 'Edit' : 'Add'} Mark</h5>
      <div className="row g-2 mb-2">
        <div className="col">
          <input type="text" name="studentName" className="form-control" placeholder="Student Name" value={form.studentName} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="text" name="exam" className="form-control" placeholder="Exam Name" value={form.exam} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="text" name="subject" className="form-control" placeholder="Subject" value={form.subject} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="number" name="marks" className="form-control" placeholder="Marks" value={form.marks} onChange={handleChange} required />
        </div>
      </div>
      <button className="btn btn-success me-2" type="submit">{editingMark ? 'Update' : 'Add'}</button>
      {editingMark && <button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
}
