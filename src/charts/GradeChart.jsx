import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function GradeChart() {
  const data = {
    labels: ["A", "B", "C", "D", "F"],
    datasets: [
      {
        label: 'Number of Students',
        data: [40, 50, 30, 20, 10],
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

