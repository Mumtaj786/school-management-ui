// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

// export default function AttendanceChart() {
//   const data = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May"],
//     datasets: [
//       {
//         label: "Attendance %",
//         data: [92, 89, 95, 90, 94],
//         fill: false,
//         borderColor: 'blue',
//         tension: 0.2
//       }
//     ]
//   };

//   return (
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">Monthly Attendance</h5>
//         <Line data={data} />
//       </div>
//     </div>
//   );
// }

// To make your AttendanceChart dynamic, you need to:

// Fetch attendance records from your backend.

// Group them by month.

// Calculate attendance percentage for each month.

// Display the data in the Line chart.

// import { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

// export default function AttendanceChart() {
//   const [monthlyData, setMonthlyData] = useState({});

//   useEffect(() => {
//     fetch("http://localhost:8000/api/attendance/")
//       .then(res => res.json())
//       .then(data => {
//         const grouped = {};

//         data.forEach(record => {
//           const month = new Date(record.date).toLocaleString('default', { month: 'short' });
//           if (!grouped[month]) grouped[month] = { present: 0, total: 0 };
//           grouped[month].total++;
//           if (record.status.toLowerCase() === "present") grouped[month].present++;
//         });

//         const months = Object.keys(grouped);
//         const percentages = months.map(month => 
//           ((grouped[month].present / grouped[month].total) * 100).toFixed(1)
//         );

//         setMonthlyData({ labels: months, percentages });
//       });
//   }, []);

//   const data = {
//     labels: monthlyData.labels || [],
//     datasets: [
//       {
//         label: "Attendance %",
//         data: monthlyData.percentages || [],
//         fill: false,
//         borderColor: 'blue',
//         tension: 0.2
//       }
//     ]
//   };

//   return (
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">Monthly Attendance</h5>
//         <Line data={data} />
//       </div>
//     </div>
//   );
// }



import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function AttendanceChart({ attendanceRecords }) {
  // Group attendance by month and calculate average percentage
  const monthData = {};

  attendanceRecords.forEach(record => {
    const date = new Date(record.date);
    const month = date.toLocaleString('default', { month: 'short' });

    if (!monthData[month]) {
      monthData[month] = { present: 0, total: 0 };
    }
    monthData[month].total += 1;
    if (record.status === 'Present') {
      monthData[month].present += 1;
    }
  });

  const labels = Object.keys(monthData);
  const dataPoints = labels.map(month => {
    const { present, total } = monthData[month];
    return ((present / total) * 100).toFixed(2);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Attendance %",
        data: dataPoints,
        fill: false,
        borderColor: 'blue',
        tension: 0.2
      }
    ]
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Monthly Attendance</h5>
        <Line data={data} />
      </div>
    </div>
  );
}
