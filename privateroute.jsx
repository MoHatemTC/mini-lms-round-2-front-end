import { Navigate } from "react-router-dom";

function PrivateRoute({ children, role }) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // User is not logged in
  if (!user) {
    return <Navigate to="/" />;
  }

  // User has wrong role
  if (user.role !== role) {
    return <Navigate to="/denied" />;
  }

  return children;
}

export default PrivateRoute;