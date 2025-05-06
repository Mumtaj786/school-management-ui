// Only minor additions to make sure form handles both create and edit:when adding crud
import { useState, useEffect } from 'react';

export default function TeacherForm({ onSubmit, editingTeacher, cancelEdit }) {
  const [form, setForm] = useState({ name: '', subject: '', experience: '', email: '' });

  useEffect(() => {
    if (editingTeacher) setForm(editingTeacher);
    else setForm({ name: '', subject: '', experience: '', email:'' });
  }, [editingTeacher]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', subject: '', experience: '', email:'' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>{editingTeacher ? 'Edit' : 'Add'} Teacher</h5>
      <div className="row g-2 mb-2">
        <div className="col">
          <input type="text" name="name" className="form-control" placeholder="Name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="text" name="subject" className="form-control" placeholder="Subject" value={form.subject} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="number" name="experience" className="form-control" placeholder="Years of Experience" value={form.experience} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="email" name="email" className="form-control" placeholder="email" value={form.email} onChange={handleChange} required />
        </div>
      </div>
      <button className="btn btn-success me-2" type="submit">{editingTeacher ? 'Update' : 'Add'}</button>
      {editingTeacher && <button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
}
