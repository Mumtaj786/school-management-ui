import { useState } from 'react';
import ClassForm from '../components/ClassForm';
import ClassList from '../components/ClassList';

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [editingClass, setEditingClass] = useState(null);

  const addOrUpdateClass = cls => {
    if (editingClass) {
      setClasses(classes.map(c => c === editingClass ? cls : c));
      setEditingClass(null);
    } else {
      setClasses([...classes, cls]);
    }
  };

  const deleteClass = cls => {
    setClasses(classes.filter(c => c !== cls));
  };

  return (
    <div>
      <h2>Class Management</h2>
      <ClassForm onSubmit={addOrUpdateClass} editingClass={editingClass} cancelEdit={() => setEditingClass(null)} />
      <ClassList classes={classes} onEdit={setEditingClass} onDelete={deleteClass} />
    </div>
  );
}

