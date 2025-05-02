import { useState } from 'react';
import TeacherForm from '../components/TeacherForm';
import TeacherList from '../components/TeacherList';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const addOrUpdateTeacher = teacher => {
    if (editingTeacher) {
      setTeachers(teachers.map(t => t === editingTeacher ? teacher : t));
      setEditingTeacher(null);
    } else {
      setTeachers([...teachers, teacher]);
    }
  };

  const deleteTeacher = teacher => {
    setTeachers(teachers.filter(t => t !== teacher));
  };
  return (
    <div>
      <h2>Teacher Management</h2>
      <TeacherForm onSubmit={addOrUpdateTeacher} editingTeacher={editingTeacher} cancelEdit={() => setEditingTeacher(null)} />
      <TeacherList teachers={teachers} onEdit={setEditingTeacher} onDelete={deleteTeacher} />
    </div>
  );
}
