import { useState } from 'react';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const addOrUpdateStudent = student => {
    if (editingStudent) {
      setStudents(students.map(s => s === editingStudent ? student : s));
      setEditingStudent(null);
    } else {
      setStudents([...students, student]);
    }
  };

  const deleteStudent = student => {
    setStudents(students.filter(s => s !== student));
  };

  return (
    <div>
      <h2>Student Management</h2>
      <StudentForm onSubmit={addOrUpdateStudent} editingStudent={editingStudent} cancelEdit={() => setEditingStudent(null)} />
      <StudentList students={students} onEdit={setEditingStudent} onDelete={deleteStudent} />
    </div>
  );
}

