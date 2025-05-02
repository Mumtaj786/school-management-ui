import AttendanceChart from "../charts/AttendanceChart";
import GradeChart from "../charts/GradeChart";

export default function Dashboard() {
  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <div className="row mb-4">
        {["Students", "Teachers", "Classes", "Fees Collected"].map((title, i) => (
          <div className="col-md-3" key={i}>
            <div className={`card text-bg-${['primary', 'success', 'warning', 'info'][i]} mb-3`}>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{[150, 25, 10, "₹1.5L"][i]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      

      <div className="row">
        <div className="col-md-6 mb-4">
          <AttendanceChart />
        </div>
        <div className="col-md-6 mb-4">
          <GradeChart />
        </div>
      </div>
    </div>
  );

}

