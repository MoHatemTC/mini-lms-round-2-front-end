import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await fetch(
        "http://localhost:5000/api/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

    } catch (error) {
      console.error(error);

    } finally {
      localStorage.clear();

      navigate("/");
    }
  };

  return (
    <nav>

      <h2>Mini LMS</h2>

      <button onClick={logout}>
        Logout
      </button>

    </nav>
  );
}

export default Navbar;