
import { useState, useEffect } from 'react';
// useState: lets you store and update form data.
// useEffect: runs side effects (like setting form values when editing).

export default function StudentForm({ onSubmit, editingStudent, cancelEdit }) {
  const [form, setForm] = useState({
    name: '',
    roll_number: '',
    email: '',
    class_name: ''
  });

  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   if (editingStudent) setForm(editingStudent);
  // }, [editingStudent]);
//   Minor change: when editing, make sure id is included in form data (needed for PUT request).

// You can do this by spreading editingStudent:
useEffect(() => {
  if (editingStudent) setForm({ ...editingStudent });
}, [editingStudent]);


  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Clear error when the user types
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.roll_number.match(/^\d+$/)) newErrors.roll_number = 'Roll number must be numeric';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Invalid email format';
    if (!form.class_name.trim()) newErrors.class_name = 'Class is required';
    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(form);
    setForm({ name: '', roll_number: '', email: '', class_name: '' });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>{editingStudent ? 'Edit' : 'Add'} Student</h5>
      <div className="row g-2 mb-2">
        <div className="col">
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name && 'is-invalid'}`}
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="col">
          <input
            type="text"
            name="roll_number"
            className={`form-control ${errors.roll_number && 'is-invalid'}`}
            placeholder="Roll Number"
            value={form.roll_number}
            onChange={handleChange}
            required
          />
          {errors.roll_number && <div className="invalid-feedback">{errors.roll_number}</div>}
        </div>
        <div className="col">
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email && 'is-invalid'}`}
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="col">
          <input
            type="text"
            name="class_name"
            className={`form-control ${errors.class_name && 'is-invalid'}`}
            placeholder="Class Name"
            value={form.class_name}
            onChange={handleChange}
            required
          />
          {errors.class_name && <div className="invalid-feedback">{errors.class_name}</div>}
        </div>
      </div>
      <button className="btn btn-primary me-2" type="submit">
        {editingStudent ? 'Update' : 'Add'}
      </button>
      {editingStudent && (
        <button className="btn btn-secondary" onClick={cancelEdit} type="button">
          Cancel
        </button>
      )}
    </form>
  );
}





























// What is [editingStudent]?
// This is the dependency array of the useEffect hook.

// 💡 Explanation:
// The code inside useEffect runs whenever the editingStudent prop changes.

// [editingStudent] tells React: "Run this effect only when the editingStudent value changes (e.g., a user selects a different student to edit)."

// Why is this important?
// Without the dependency array, the effect would run on every render, which is inefficient.

// With [editingStudent]:

// The form only resets when a new student is selected to edit.

// If it's null, it doesn't update the form.











// Breakdown:
// e — This is the event object passed automatically when a user types in an input field.

// e.target — Refers to the specific input element that triggered the change.

// e.target.name — Refers to the name attribute of the input element (e.g., "name", "email", "roll_number", etc.).

// e.target.value — The current value typed into the input.

//  What this line does:
// 
// setForm({ ...form, [e.target.name]: e.target.value });
// ...form — Spreads the current values in the form state (so other fields don't get lost).

// [e.target.name] — Dynamically picks which key to update (like form.name or form.email).

// e.target.value — Updates the chosen key with the new value.

