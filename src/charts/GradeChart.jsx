// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

// ChartJS.register(BarElement, CategoryScale, LinearScale);

// export default function GradeChart() {
//   const data = {
//     labels: ["A", "B", "C", "D", "F"],
//     datasets: [
//       {
//         label: 'Number of Students',
//         data: [40, 50, 30, 20, 10],
//         backgroundColor: ['#198754', '#0dcaf0', '#ffc107', '#fd7e14', '#dc3545']
//       }
//     ]
//   };
//   return (
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">Grade Distribution</h5>
//         <Bar data={data} />
//       </div>
//     </div>
//   );
// }


// To make your GradeChart dynamic, you need to:

// Fetch grade data from the backend (e.g., marks for each student).

// Process those marks into letter grades (A, B, C, D, F).

// Count how many students fall into each grade category.

// Render the chart using that dynamic data.

// import { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

// ChartJS.register(BarElement, CategoryScale, LinearScale);

// export default function GradeChart() {
//   const [gradeCounts, setGradeCounts] = useState({ A: 0, B: 0, C: 0, D: 0, F: 0 });

//   useEffect(() => {
//     fetch("http://localhost:8000/api/grades/")
//       .then(res => res.json())
//       .then(data => {
//         const counts = { A: 0, B: 0, C: 0, D: 0, F: 0 };
//         data.forEach(g => {
//           const m = g.marks;
//           if (m >= 90) counts.A++;
//           else if (m >= 80) counts.B++;
//           else if (m >= 70) counts.C++;
//           else if (m >= 60) counts.D++;
//           else counts.F++;
//         });
//         setGradeCounts(counts);
//       });
//   }, []);

//   const data = {
//     labels: ["A", "B", "C", "D", "F"],
//     datasets: [
//       {
//         label: 'Number of Students',
//         data: [
//           gradeCounts.A,
//           gradeCounts.B,
//           gradeCounts.C,
//           gradeCounts.D,
//           gradeCounts.F
//         ],
//         backgroundColor: ['#198754', '#0dcaf0', '#ffc107', '#fd7e14', '#dc3545']
//       }
//     ]
//   };

//   return (
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">Grade Distribution</h5>
//         <Bar data={data} />
//       </div>
//     </div>
//   );
// }


import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function GradeChart({ grades }) {
  // Count grades into categories
  const gradeCounts = { A: 0, B: 0, C: 0, D: 0, F: 0 };

  grades.forEach(g => {
    let marks = g.marks;
    if (marks >= 90) gradeCounts.A++;
    else if (marks >= 80) gradeCounts.B++;
    else if (marks >= 70) gradeCounts.C++;
    else if (marks >= 60) gradeCounts.D++;
    else gradeCounts.F++;
  });

  const data = {
    labels: ["A", "B", "C", "D", "F"],
    datasets: [
      {
        label: 'Number of Students',
        data: Object.values(gradeCounts),
        backgroundColor: ['#198754', '#0dcaf0', '#ffc107', '#fd7e14', '#dc3545']
      }
    ]
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Grade Distribution</h5>
        <Bar data={data} />
      </div>
    </div>
  );
}
