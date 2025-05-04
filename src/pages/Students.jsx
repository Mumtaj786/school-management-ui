import { useState, useEffect } from 'react';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const API_URL = 'http://localhost:8000/api/students/'; // adjust if needed

  // 🔽 Fetch students on load
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const addOrUpdateStudent = student => {
    // if (editingStudent) {
    //   setStudents(students.map(s => s === editingStudent ? student : s));
    //   setEditingStudent(null);
    // } else {
    //   setStudents([...students, student]);
    // }
    if (editingStudent) {
      // 🔄 UPDATE
      fetch(`${API_URL}${editingStudent.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      })
        .then(res => res.json())
        .then(updated => {
          setStudents(students.map(s => s.id === updated.id ? updated : s));
          setEditingStudent(null);
        });
    } else {
      // ➕ CREATE
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      })
        .then(res => res.json())
        .then(newStudent => setStudents([...students, newStudent]));
    }
  };

  // const deleteStudent = student => {
  //   setStudents(students.filter(s => s !== student));
  // };
  const deleteStudent = student => {
    fetch(`${API_URL}${student.id}/`, {
      method: 'DELETE',
    }).then(() => {
      setStudents(students.filter(s => s.id !== student.id));
    });
  };
  return (
    <div>
      <h2>Student Management</h2>
      <StudentForm
        onSubmit={addOrUpdateStudent}
        editingStudent={editingStudent}
        cancelEdit={() => setEditingStudent(null)}
      />
      <StudentList
        students={students}
        onEdit={setEditingStudent}
        onDelete={deleteStudent}
      />
    </div>
  );
}

