import { useState, useEffect } from 'react';

export default function ClassForm({ onSubmit, editingClass, cancelEdit }) {
  const [form, setForm] = useState({ className: '', section: '', room: '' });

  useEffect(() => {
    if (editingClass) setForm(editingClass);
  }, [editingClass]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm({ className: '', section: '', room: '' });
  };
  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>{editingClass ? 'Edit' : 'Add'} Class</h5>
      <div className="row g-2 mb-2">
        <div className="col">
          <input type="text" name="className" className="form-control" placeholder="Class Name" value={form.className} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="text" name="section" className="form-control" placeholder="Section" value={form.section} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="text" name="room" className="form-control" placeholder="Room No." value={form.room} onChange={handleChange} required />
        </div>
      </div>
      <button className="btn btn-success me-2" type="submit">{editingClass ? 'Update' : 'Add'}</button>
      {editingClass && <button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
}
