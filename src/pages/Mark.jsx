
import { useState, useEffect } from 'react';
import axios from 'axios';
import MarksForm from '../components/MarksForm';
import MarksList from '../components/MarksList';

export default function Marks() {
  const [marksList, setMarksList] = useState([]);
  const [editingMark, setEditingMark] = useState(null);
  const API_URL = 'http://localhost:8000/api/marks/'; // adjust if needed

  const fetchMarks = async () => {
    const res = await axios.get(API_URL);
    setMarksList(res.data);
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  // const addOrUpdateMark = mark => {
  //   if (editingMark) {
  //     setMarksList(marksList.map(m => m === editingMark ? mark : m));
  //     setEditingMark(null);
  //   } else {
  //     setMarksList([...marksList, mark]);
  //   }
  // };

  const addOrUpdateMark = async (mark) => {
    if (editingMark) {
      const res = await axios.put(`${API_URL}${editingMark.id}/`, mark);
      setMarksList(marksList.map(m => m.id === editingMark.id ? res.data : m));
      setEditingMark(null);
    } else {
      const res = await axios.post(API_URL, mark);
      setMarksList([...marksList, res.data]);
    }
  };



  // const deleteMark = mark => {
  //   setMarksList(marksList.filter(m => m !== mark));
  // };

  
  const deleteMark = async (mark) => {
    if (window.confirm("Are you sure you want to delete this mark?")) {
      await axios.delete(`${API_URL}${mark.id}/`);
      setMarksList(marksList.filter(m => m.id !== mark.id));
    }
  };

  return (
    <div>
      <h2>Marks Management</h2>
      <MarksForm onSubmit={addOrUpdateMark} editingMark={editingMark} cancelEdit={() => setEditingMark(null)} />
      <MarksList marksList={marksList} onEdit={setEditingMark} onDelete={deleteMark} />
    </div>
  );
}

