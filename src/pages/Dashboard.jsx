// Dashboard.jsx
export default function Dashboard() {
    return (
      <div>
        <h2>Dashboard</h2>
        <div className="row">
          <div className="col-md-3">
            <div className="card text-bg-success">
              <div className="card-body">Students: 150</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-bg-info">
              <div className="card-body">Teachers: 20</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  