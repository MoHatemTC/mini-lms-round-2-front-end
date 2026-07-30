import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Redirect based on role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/learner");
      }

    } catch (error) {
      console.error(error);

      alert(
        "Unable to connect to the backend"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="container">

        <h1>Mini LMS</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={login}>
          Login
        </button>

        <p>
          Don't have an account?

          <Link to="/signup">
            {" "}Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;