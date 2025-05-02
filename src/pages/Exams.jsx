import { useState } from 'react';
import ExamForm from '../components/ExamForm';
import ExamList from '../components/ExamList';

export default function Exams() {
  const [exams, setExams] = useState([]);
  const [editingExam, setEditingExam] = useState(null);

  const addOrUpdateExam = exam => {
    if (editingExam) {
      setExams(exams.map(e => e === editingExam ? exam : e));
      setEditingExam(null);
    } else {
      setExams([...exams, exam]);
    }
  };

  const deleteExam = exam => {
    setExams(exams.filter(e => e !== exam));
  };

  return (
    <div>
      <h2>Exam Management</h2>
      <ExamForm onSubmit={addOrUpdateExam} editingExam={editingExam} cancelEdit={() => setEditingExam(null)} />
      <ExamList exams={exams} onEdit={setEditingExam} onDelete={deleteExam} />
    </div>
  );
}
