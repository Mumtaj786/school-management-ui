
import { useState, useEffect } from 'react';

export default function StudentForm({ onSubmit, editingStudent, cancelEdit }) {
  const [form, setForm] = useState({ name: '', grade: '', age: '' });

  useEffect(() => {
    if (editingStudent) setForm(editingStudent);
  }, [editingStudent]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', grade: '', age: '' });
  };
return (
    <form onSubmit={handleSubmit} className="mb-3">
<h5>{editingStudent ? 'Edit' : 'Add'} Student</h5>
      <div className="row g-2 mb-2">
        <div className="col">
          <input type="text" name="name" className="form-control" placeholder="Name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="text" name="grade" className="form-control" placeholder="Grade" value={form.grade} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="number" name="age" className="form-control" placeholder="Age" value={form.age} onChange={handleChange} required />
        </div>
      </div>
      <button className="btn btn-primary me-2" type="submit">{editingStudent ? 'Update' : 'Add'}</button>
      {editingStudent && <button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
}
