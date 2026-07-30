import Navbar from "../components/Navbar";
import "./styles/style.css";

function LearnerDashboard() {
  return (
    <div className="dashboard-page">

      <Navbar />

      <main className="dashboard-content">

        <h1>Welcome Learner</h1>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h3>My Courses</h3>
            <p>View the courses you are currently enrolled in.</p>
          </div>

          <div className="dashboard-card">
            <h3>My Progress</h3>
            <p>Track your learning progress and achievements.</p>
          </div>

          <div className="dashboard-card">
            <h3>Profile</h3>
            <p>View and manage your personal profile information.</p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default LearnerDashboard;