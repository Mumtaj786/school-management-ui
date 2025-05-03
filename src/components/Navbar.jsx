import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">SchoolManager</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/teachers">Teachers</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/students">Students</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/attendance">Attendance</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/exams">Exams</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/marks">Marks</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/reports">Reports</Link></li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
