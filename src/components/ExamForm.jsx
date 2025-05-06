import { useState, useEffect } from 'react';

export default function ExamForm({ onSubmit, editingExam, cancelEdit }) {
  const [form, setForm] = useState({ examName: '', subject: '', date: '', class_name: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingExam) setForm(editingExam);
  }, [editingExam]);

  const validate = () => {
    let newErrors = {};
    if (!form.examName.trim()) newErrors.examName = "Exam name is required";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.class_name.trim()) newErrors.class_name = "Class name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
    setForm({ examName: '', subject: '', date: '', class_name: '' });
    setErrors({});
  };
  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>{editingExam ? 'Edit' : 'Add'} Exam</h5>
      <div className="row g-2 mb-2">
        <div className="col">
          <input type="text" name="examName" className="form-control" placeholder="Exam Name" value={form.examName} onChange={handleChange} />
          {errors.examName && <div className="text-danger">{errors.examName}</div>}
        </div>
        <div className="col">
          <input type="text" name="subject" className="form-control" placeholder="Subject" value={form.subject} onChange={handleChange} />
          {errors.subject && <div className="text-danger">{errors.subject}</div>}
        </div>
        <div className="col">
          <input type="date" name="date" className="form-control" value={form.date} onChange={handleChange} />
          {errors.date && <div className="text-danger">{errors.date}</div>}
        </div>
        <div className="col">
          <input type="text" name="class_name" className="form-control" placeholder="Class Name" value={form.class_name} onChange={handleChange} />
          {errors.class_name && <div className="text-danger">{errors.class_name}</div>}
        </div>
      </div>
      <button className="btn btn-success me-2" type="submit">{editingExam ? 'Update' : 'Add'}</button>
      {editingExam && <button className="btn btn-secondary" type="button" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
}
