import { useState, useEffect } from 'react';
import TeacherForm from '../components/TeacherForm';
import TeacherList from '../components/TeacherList';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);

// Fetch teachers on mount
useEffect(() => {
  fetch('http://localhost:8000/api/teachers/')
    .then(res => res.json())
    .then(data => setTeachers(data))
    // .catch(err => console.error('Fetch error:', err));
}, []);

  // const addOrUpdateTeacher = teacher => {
  //   if (editingTeacher) {
  //     setTeachers(teachers.map(t => t === editingTeacher ? teacher : t));
  //     setEditingTeacher(null);
  //   } else {
  //     setTeachers([...teachers, teacher]);
  //   }
  // };

  const addOrUpdateTeacher = teacher => {
    if (editingTeacher) {
      // Update teacher
      fetch(`http://localhost:8000/api/teachers/${editingTeacher.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacher),
      })
        .then(res => res.json())
        .then(updated => {
          setTeachers(teachers.map(t => t.id === updated.id ? updated : t));
          setEditingTeacher(null);
        });
    } else {
      // Add new teacher
      fetch('http://localhost:8000/api/teachers/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacher),
      })
        .then(res => res.json())
        .then(newTeacher => setTeachers([...teachers, newTeacher]));
    }
  };

  // const deleteTeacher = teacher => {
  //   setTeachers(teachers.filter(t => t !== teacher));
  // };

  
  const deleteTeacher = teacher => {
    fetch(`http://localhost:8000/api/teachers/${teacher.id}/`, { method: 'DELETE' })
      .then(() => setTeachers(teachers.filter(t => t.id !== teacher.id)));
  };
  return (
    <div>
      <h2>Teacher Management</h2>
      <TeacherForm onSubmit={addOrUpdateTeacher} editingTeacher={editingTeacher} cancelEdit={() => setEditingTeacher(null)} />
      <TeacherList teachers={teachers} onEdit={setEditingTeacher} onDelete={deleteTeacher} />
    </div>
  );
}
