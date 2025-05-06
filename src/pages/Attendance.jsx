import { useState, useEffect } from 'react';
import AttendanceForm from '../components/AttendanceForm';
import AttendanceList from '../components/AttendanceList';

export default function Attendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const API_URL = 'http://localhost:8000/api/attendance/';

// Load attendance records from backend
useEffect(() => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => setAttendanceList(data))
    .catch(err => console.error('Fetch error:', err));
}, []);

  // const addOrUpdateAttendance = attendance => {
  //   if (editingAttendance) {
  //     setAttendanceList(attendanceList.map(a => a === editingAttendance ? attendance : a));
  //     setEditingAttendance(null);
  //   } else {
  //     setAttendanceList([...attendanceList, attendance]);
  //   }
  // };
  const addOrUpdateAttendance = attendance => {
    if (editingAttendance) {
      // Update record
      fetch(`${API_URL}${editingAttendance.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendance),
      })
        .then(res => res.json())
        .then(updated => {
          setAttendanceList(attendanceList.map(a => a.id === updated.id ? updated : a));
          setEditingAttendance(null);
        });
    } else {
      // Add new record
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendance),
      })
        .then(res => res.json())
        .then(newRecord => setAttendanceList([...attendanceList, newRecord]));
    }
  };


  // const deleteAttendance = attendance => {
  //   setAttendanceList(attendanceList.filter(a => a !== attendance));
  // };

  const deleteAttendance = attendance => {
    fetch(`${API_URL}${attendance.id}/`, {
      method: 'DELETE',
    }).then(() =>
      setAttendanceList(attendanceList.filter(a => a.id !== attendance.id))
    );
  };
  return (
    <div>
      <h2>Attendance Management</h2>
      <AttendanceForm
        onSubmit={addOrUpdateAttendance}
        editingAttendance={editingAttendance}
        cancelEdit={() => setEditingAttendance(null)}
      />
      <AttendanceList
        attendanceList={attendanceList}
        onEdit={setEditingAttendance}
        onDelete={deleteAttendance}
      />
    </div>
  );
}

