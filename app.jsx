import { useState, useEffect } from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate
} from "react-router-dom";


// ==========================================
// LOGIN PAGE
// ==========================================

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");


    const login = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                setMessage(
                    data.message
                );

                return;
            }


            // Save role locally
            localStorage.setItem(
                "role",
                data.user.role
            );


            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            if (
                data.user.role === "admin"
            ) {

                navigate("/admin");

            } else {

                navigate("/learner");

            }


        } catch (error) {

            console.error(error);

            setMessage(
                "Cannot connect to server."
            );

        }
    };


    return (

        <div className="page">

            <div className="card">

                <h1>
                    Mini LMS
                </h1>

                <h2>
                    Login
                </h2>


                {message && (

                    <div className="message">
                        {message}
                    </div>

                )}


                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={
                        (e) =>
                            setEmail(
                                e.target.value
                            )
                    }
                />


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={
                        (e) =>
                            setPassword(
                                e.target.value
                            )
                    }
                />


                <button
                    onClick={login}
                >
                    Login
                </button>


                <div className="divider">
                    OR
                </div>


                <button
                    className="google"
                    onClick={() => {

                        window.location.href =
                            "http://localhost:5000/auth/google";

                    }}
                >
                    Continue with Google
                </button>


                <button
                    className="github"
                    onClick={() => {

                        window.location.href =
                            "http://localhost:5000/auth/github";

                    }}
                >
                    Continue with GitHub
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


// ==========================================
// SIGNUP PAGE
// ==========================================

function Signup() {

    const navigate = useNavigate();


    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [message, setMessage] =
        useState("");


    const signup = async () => {

        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/signup",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            name,
                            email,
                            password
                        })
                    }
                );


            const data =
                await response.json();


            setMessage(
                data.message
            );


            if (response.ok) {

                setTimeout(
                    () => {

                        navigate("/");

                    },
                    2000
                );

            }


        } catch (error) {

            console.error(error);

            setMessage(
                "Signup failed."
            );

        }
    };


    return (

        <div className="page">

            <div className="card">

                <h1>
                    Create Account
                </h1>


                {message && (

                    <div className="message">
                        {message}
                    </div>

                )}


                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={
                        (e) =>
                            setName(
                                e.target.value
                            )
                    }
                />


                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={
                        (e) =>
                            setEmail(
                                e.target.value
                            )
                    }
                />


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={
                        (e) =>
                            setPassword(
                                e.target.value
                            )
                    }
                />


                <button
                    onClick={signup}
                >
                    Create Account
                </button>


                <p>

                    Already have an account?

                    <Link to="/">
                        {" "}Login
                    </Link>

                </p>

            </div>

        </div>

    );
}


// ==========================================
// NAVBAR
// ==========================================

function Navbar() {

    const navigate =
        useNavigate();


    const logout = async () => {

        try {

            await fetch(
                "http://localhost:5000/api/logout",
                {
                    method: "POST",
                    credentials: "include"
                }
            );

        } catch (error) {

            console.error(error);

        }


        localStorage.clear();

        navigate("/");

    };


    return (

        <nav className="navbar">

            <h2>
                Mini LMS
            </h2>


            <div>

                <Link to="/">
                    Home
                </Link>


                <button
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );
}


// ==========================================
// PRIVATE ROUTE
// ==========================================

function PrivateRoute({
    children,
    role
}) {

    const currentRole =
        localStorage.getItem(
            "role"
        );


    if (
        currentRole !== role
    ) {

        return (
            <Navigate
                to="/denied"
            />
        );

    }


    return children;
}


// ==========================================
// ADMIN DASHBOARD
// ==========================================

function AdminDashboard() {

    return (

        <>

            <Navbar />


            <div className="dashboard">

                <h1>
                    Welcome Admin
                </h1>


                <p>
                    You are logged in as an Admin.
                </p>


                <div className="dashboard-grid">

                    <div className="dashboard-item">
                        Manage Users
                    </div>

                    <div className="dashboard-item">
                        Manage Courses
                    </div>

                    <div className="dashboard-item">
                        Reports
                    </div>

                    <Link
                        className="dashboard-item"
                        to="/emails"
                    >
                        Email Logs
                    </Link>

                </div>

            </div>

        </>

    );
}


// ==========================================
// LEARNER DASHBOARD
// ==========================================

function LearnerDashboard() {

    return (

        <>

            <Navbar />


            <div className="dashboard">

                <h1>
                    Welcome Learner
                </h1>


                <p>
                    You are logged in as a Learner.
                </p>


                <div className="dashboard-grid">

                    <div className="dashboard-item">
                        My Courses
                    </div>

                    <div className="dashboard-item">
                        My Progress
                    </div>

                    <div className="dashboard-item">
                        My Profile
                    </div>

                </div>

            </div>

        </>

    );
}


// ==========================================
// EMAIL LOGS
// ==========================================

function EmailLogs() {

    const [emails, setEmails] =
        useState([]);


    useEffect(() => {

        fetch(
            "http://localhost:5000/api/emails",
            {
                credentials:
                    "include"
            }
        )
            .then(
                (response) =>
                    response.json()
            )
            .then(
                (data) =>
                    setEmails(
                        data.emails || []
                    )
            )
            .catch(
                (error) =>
                    console.error(error)
            );

    }, []);


    return (

        <>

            <Navbar />


            <div className="dashboard">

                <h1>
                    Email Logs
                </h1>


                <table>

                    <thead>

                        <tr>

                            <th>
                                To
                            </th>

                            <th>
                                Subject
                            </th>

                            <th>
                                Status
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {emails.map(
                            (
                                email,
                                index
                            ) => (

                                <tr
                                    key={index}
                                >

                                    <td>
                                        {email.recipient}
                                    </td>

                                    <td>
                                        {email.subject}
                                    </td>

                                    <td>
                                        {email.status}
                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>

        </>

    );
}


// ==========================================
// ACCESS DENIED
// ==========================================

function AccessDenied() {

    return (

        <div className="page">

            <div className="card denied">

                <h1>
                    403
                </h1>

                <h2>
                    Access Denied
                </h2>

                <p>
                    You don't have permission
                    to access this page.
                </p>


                <Link to="/">
                    Go to Login
                </Link>

            </div>

        </div>

    );
}


// ==========================================
// APP
// ==========================================

function App() {

    return (

        <BrowserRouter>

            <Routes>


                <Route
                    path="/"
                    element={
                        <Login />
                    }
                />


                <Route
                    path="/signup"
                    element={
                        <Signup />
                    }
                />


                <Route
                    path="/admin"
                    element={

                        <PrivateRoute
                            role="admin"
                        >

                            <AdminDashboard />

                        </PrivateRoute>

                    }
                />


                <Route
                    path="/learner"
                    element={

                        <PrivateRoute
                            role="learner"
                        >

                            <LearnerDashboard />

                        </PrivateRoute>

                    }
                />


                <Route
                    path="/emails"
                    element={

                        <PrivateRoute
                            role="admin"
                        >

                            <EmailLogs />

                        </PrivateRoute>

                    }
                />


                <Route
                    path="/denied"
                    element={
                        <AccessDenied />
                    }
                />


            </Routes>

        </BrowserRouter>

    );
}


export default App;