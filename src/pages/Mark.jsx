
import { useState } from 'react';
import MarksForm from '../components/MarksForm';
import MarksList from '../components/MarksList';

export default function Marks() {
  const [marksList, setMarksList] = useState([]);
  const [editingMark, setEditingMark] = useState(null);

  const addOrUpdateMark = mark => {
    if (editingMark) {
      setMarksList(marksList.map(m => m === editingMark ? mark : m));
      setEditingMark(null);
    } else {
      setMarksList([...marksList, mark]);
    }
  };

  const deleteMark = mark => {
    setMarksList(marksList.filter(m => m !== mark));
  };

  return (
    <div>
      <h2>Marks Management</h2>
      <MarksForm onSubmit={addOrUpdateMark} editingMark={editingMark} cancelEdit={() => setEditingMark(null)} />
      <MarksList marksList={marksList} onEdit={setEditingMark} onDelete={deleteMark} />
    </div>
  );
}

