import { useState } from 'react';
import AttendanceForm from '../components/AttendanceForm';
import AttendanceList from '../components/AttendanceList';

export default function Attendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [editingAttendance, setEditingAttendance] = useState(null);

  const addOrUpdateAttendance = attendance => {
    if (editingAttendance) {
      setAttendanceList(attendanceList.map(a => a === editingAttendance ? attendance : a));
      setEditingAttendance(null);
    } else {
      setAttendanceList([...attendanceList, attendance]);
    }
  };

  const deleteAttendance = attendance => {
    setAttendanceList(attendanceList.filter(a => a !== attendance));
  };

  return (
    <div>
      <h2>Attendance Management</h2>
      <AttendanceForm onSubmit={addOrUpdateAttendance} editingAttendance={editingAttendance} cancelEdit={() => setEditingAttendance(null)} />
      <AttendanceList attendanceList={attendanceList} onEdit={setEditingAttendance} onDelete={deleteAttendance} />
    </div>
  );
}

