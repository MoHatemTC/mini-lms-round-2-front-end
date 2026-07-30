import Navbar from "../components/Navbar";
import "./styles/style.css";

function AdminDashboard() {
  return (
    <div className="dashboard-page">

      <Navbar />

      <main className="dashboard-content">

        <h1>Welcome Admin</h1>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h3>Manage Users</h3>
            <p>View and manage all users in the system.</p>
          </div>

          <div className="dashboard-card">
            <h3>Manage Courses</h3>
            <p>Create and manage courses available on the platform.</p>
          </div>

          <div className="dashboard-card">
            <h3>Reports</h3>
            <p>View platform statistics and reports.</p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;