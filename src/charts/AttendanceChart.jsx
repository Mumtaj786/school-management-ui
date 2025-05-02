import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function AttendanceChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Attendance %",
        data: [92, 89, 95, 90, 94],
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

