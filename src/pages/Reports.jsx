import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReportForm from '../components/ReportForm';
import ReportTable from '../components/ReportTable';
import ReportExport from '../components/ReportExport';

const API_BASE = 'http://localhost:8000/api/';

const ReportsPage = () => {
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({ student_id: '', exam_id: '', marks: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}students/`).then((res) => setStudents(res.data));
    axios.get(`${API_BASE}exams/`).then((res) => setExams(res.data));
    fetchReports();
  }, []);

  const fetchReports = () => {
    axios.get(`${API_BASE}reports/`).then((res) => setReports(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingId ? 'put' : 'post';
    const url = editingId
      ? `${API_BASE}reports/${editingId}/`
      : `${API_BASE}reports/`;

    axios[method](url, form).then(() => {
      fetchReports();
      setForm({ student_id: '', exam_id: '', marks: '' });
      setEditingId(null);
    });
  };

  const handleEdit = (report) => {
    setForm({
      student_id: report.student.id,
      exam_id: report.exam.id,
      marks: report.marks,
    });
    setEditingId(report.id);
  };

  const handleDelete = (id) => {
    axios.delete(`${API_BASE}reports/${id}/`).then(fetchReports);
  };

  return (
    <div className="container mt-4">
      <h2>Student Reports</h2>

      <ReportForm
        form={form}
        students={students}
        exams={exams}
        setForm={setForm}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />

      <ReportExport reports={reports} />

      <ReportTable
        reports={reports}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ReportsPage;
