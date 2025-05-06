import { useState, useEffect } from 'react';
import axios from 'axios';
import ExamForm from '../components/ExamForm';
import ExamList from '../components/ExamList';

export default function Exams() {
  const [exams, setExams] = useState([]);
  const [editingExam, setEditingExam] = useState(null);

  const API_URL = 'http://localhost:8000/api/exams/'; // adjust if needed

    // Fetch exams on mount
    useEffect(() => {
      fetchExams();
    }, []);
  
    const fetchExams = async () => {
      try {
        const res = await axios.get(API_URL);
        setExams(res.data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

  // const addOrUpdateExam = exam => {
  //   if (editingExam) {
  //     setExams(exams.map(e => e === editingExam ? exam : e));
  //     setEditingExam(null);
  //   } else {
  //     setExams([...exams, exam]);
  //   }
  // };

  const addOrUpdateExam = async (exam) => {
    try {
      if (editingExam) {
        const res = await axios.put(`${API_URL}${editingExam.id}/`, exam);
        setExams(exams.map(e => e.id === editingExam.id ? res.data : e));
        setEditingExam(null);
      } else {
        const res = await axios.post(API_URL, exam);
        setExams([...exams, res.data]);
      }
    } catch (error) {
      console.error('Add/Update error:', error);
    }
  };


  // const deleteExam = exam => {
  //   setExams(exams.filter(e => e !== exam));
  // };
  const deleteExam = async (exam) => {
    try {
      await axios.delete(`${API_URL}${exam.id}/`);
      setExams(exams.filter(e => e.id !== exam.id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
      <div className="container mt-4">
      <h2>Exam Management</h2>
      <ExamForm onSubmit={addOrUpdateExam} editingExam={editingExam} cancelEdit={() => setEditingExam(null)} />
      <ExamList exams={exams} onEdit={setEditingExam} onDelete={deleteExam} />
    </div>
  );
}
