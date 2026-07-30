import React, {
    useEffect,
    useState
} from "react";


// ==========================================
// BACKEND URL
// ==========================================

const API =
    "http://localhost:5000";


// ==========================================
// MAIN APP
// ==========================================

function App() {

    const [page, setPage] =
        useState("login");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [name, setName] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [user, setUser] =
        useState(null);

    const [logs, setLogs] =
        useState([]);


    // ==========================================
    // CHECK EMAIL CONFIRMATION LINK
    // ==========================================

    useEffect(

        () => {

            const params =
                new URLSearchParams(
                    window.location.search
                );


            const token =
                params.get("token");


            if (token) {

                confirmEmail(
                    token
                );

            }

        },

        []

    );


    // ==========================================
    // SIGNUP
    // ==========================================

    async function signup() {

        setMessage(
            "Creating account..."
        );


        try {

            const response =
                await fetch(

                    `${API}/api/signup`,

                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        credentials:
                            "include",

                        body:
                            JSON.stringify({

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


            if (
                response.ok
            ) {

                setPage(
                    "login"
                );

            }


        } catch (error) {

            setMessage(
                "Could not connect to server."
            );

        }

    }


    // ==========================================
    // LOGIN
    // ==========================================

    async function login() {

        setMessage(
            "Logging in..."
        );


        try {

            const response =
                await fetch(

                    `${API}/api/login`,

                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        credentials:
                            "include",

                        body:
                            JSON.stringify({

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


            if (
                response.ok
            ) {

                setUser(
                    data.user
                );

                setPage(
                    "course"
                );

            }


        } catch (error) {

            setMessage(
                "Could not connect to server."
            );

        }

    }


    // ==========================================
    // CONFIRM EMAIL
    // ==========================================

    async function confirmEmail(
        token
    ) {

        try {

            const response =
                await fetch(

                    `${API}/api/confirm-email?token=${token}`,

                    {

                        credentials:
                            "include"

                    }

                );


            const data =
                await response.json();


            setMessage(
                data.message
            );


            setPage(
                "login"
            );


        } catch (error) {

            setMessage(
                "Confirmation failed."
            );

        }

    }


    // ==========================================
    // RESEND CONFIRMATION
    // ==========================================

    async function resendConfirmation() {

        try {

            const response =
                await fetch(

                    `${API}/api/resend-confirmation`,

                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                email

                            })

                    }

                );


            const data =
                await response.json();


            setMessage(
                data.message
            );


        } catch (error) {

            setMessage(
                "Could not resend confirmation."
            );

        }

    }


    // ==========================================
    // START COURSE
    // ==========================================

    async function startCourse() {

        try {

            const response =
                await fetch(

                    `${API}/api/courses/1/start`,

                    {

                        method:
                            "POST",

                        credentials:
                            "include"

                    }

                );


            const data =
                await response.json();


            setMessage(
                data.message
            );


        } catch (error) {

            setMessage(
                "Could not start course."
            );

        }

    }


    // ==========================================
    // LOAD EMAIL LOGS
    // ==========================================

    async function loadEmailLogs() {

        try {

            const response =
                await fetch(

                    `${API}/api/emails`,

                    {

                        credentials:
                            "include"

                    }

                );


            const data =
                await response.json();


            setLogs(
                data.emails || []
            );


            setPage(
                "logs"
            );


        } catch (error) {

            setMessage(
                "Could not load email logs."
            );

        }

    }


    // ==========================================
    // LOGOUT
    // ==========================================

    async function logout() {

        await fetch(

            `${API}/api/logout`,

            {

                method:
                    "POST",

                credentials:
                    "include"

            }

        );


        setUser(
            null
        );


        setPage(
            "login"
        );


        setMessage(
            "Logged out."
        );

    }


    // ==========================================
    // GOOGLE LOGIN
    // ==========================================

    function googleLogin() {

        window.location.href =
            `${API}/auth/google`;

    }


    // ==========================================
    // GITHUB LOGIN
    // ==========================================

    function githubLogin() {

        window.location.href =
            `${API}/auth/github`;

    }


    // ==========================================
    // LOGIN PAGE
    // ==========================================

    if (
        page === "login"
    ) {

        return (

            <>

                <style>
                    {styles}
                </style>


                <div className="page">

                    <div className="card">

                        <h1>
                            Mini LMS
                        </h1>

                        <h2>
                            Login
                        </h2>


                        <input

                            placeholder="Email"

                            value={
                                email
                            }

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

                            value={
                                password
                            }

                            onChange={
                                (e) =>
                                    setPassword(
                                        e.target.value
                                    )
                            }

                        />


                        <button
                            onClick={
                                login
                            }
                        >
                            Login
                        </button>


                        <button
                            className="google"
                            onClick={
                                googleLogin
                            }
                        >
                            Continue with Google
                        </button>


                        <button
                            className="github"
                            onClick={
                                githubLogin
                            }
                        >
                            Continue with GitHub
                        </button>


                        <button
                            className="linkButton"
                            onClick={
                                () =>
                                    setPage(
                                        "signup"
                                    )
                            }
                        >
                            Create an account
                        </button>


                        <button
                            className="linkButton"
                            onClick={
                                () =>
                                    setPage(
                                        "resend"
                                    )
                            }
                        >
                            Resend confirmation email
                        </button>


                        <p className="message">
                            {message}
                        </p>

                    </div>

                </div>

            </>

        );

    }


    // ==========================================
    // SIGNUP PAGE
    // ==========================================

    if (
        page === "signup"
    ) {

        return (

            <>

                <style>
                    {styles}
                </style>


                <div className="page">

                    <div className="card">

                        <h1>
                            Create Account
                        </h1>


                        <input

                            placeholder="Name"

                            value={
                                name
                            }

                            onChange={
                                (e) =>
                                    setName(
                                        e.target.value
                                    )
                            }

                        />


                        <input

                            placeholder="Email"

                            value={
                                email
                            }

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

                            value={
                                password
                            }

                            onChange={
                                (e) =>
                                    setPassword(
                                        e.target.value
                                    )
                            }

                        />


                        <button
                            onClick={
                                signup
                            }
                        >
                            Sign Up
                        </button>


                        <button
                            className="linkButton"
                            onClick={
                                () =>
                                    setPage(
                                        "login"
                                    )
                            }
                        >
                            Back to Login
                        </button>


                        <p className="message">
                            {message}
                        </p>

                    </div>

                </div>

            </>

        );

    }


    // ==========================================
    // RESEND PAGE
    // ==========================================

    if (
        page === "resend"
    ) {

        return (

            <>

                <style>
                    {styles}
                </style>


                <div className="page">

                    <div className="card">

                        <h1>
                            Confirm Your Email
                        </h1>


                        <p>
                            Enter your email to receive a new confirmation link.
                        </p>


                        <input

                            placeholder="Email"

                            value={
                                email
                            }

                            onChange={
                                (e) =>
                                    setEmail(
                                        e.target.value
                                    )
                            }

                        />


                        <button
                            onClick={
                                resendConfirmation
                            }
                        >
                            Send Again
                        </button>


                        <button
                            className="linkButton"
                            onClick={
                                () =>
                                    setPage(
                                        "login"
                                    )
                            }
                        >
                            Back to Login
                        </button>


                        <p className="message">
                            {message}
                        </p>

                    </div>

                </div>

            </>

        );

    }


    // ==========================================
    // EMAIL LOGS
    // ==========================================

    if (
        page === "logs"
    ) {

        return (

            <>

                <style>
                    {styles}
                </style>


                <div className="page">

                    <div className="logsCard">

                        <h1>
                            Email Logs
                        </h1>


                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Recipient
                                    </th>

                                    <th>
                                        Subject
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Error
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {
                                    logs.map(

                                        (
                                            log,
                                            index
                                        ) => (

                                            <tr
                                                key={
                                                    index
                                                }
                                            >

                                                <td>
                                                    {
                                                        log.recipient
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        log.subject
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        log.status
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        log.error_message ||
                                                        "-"
                                                    }
                                                </td>

                                            </tr>

                                        )

                                    )
                                }

                            </tbody>

                        </table>


                        <button
                            onClick={
                                () =>
                                    setPage(
                                        "course"
                                    )
                            }
                        >
                            Back
                        </button>

                    </div>

                </div>

            </>

        );

    }


    // ==========================================
    // COURSE PAGE
    // ==========================================

    return (

        <>

            <style>
                {styles}
            </style>


            <div className="page">

                <div className="card">

                    <h1>
                        Mini LMS
                    </h1>


                    {
                        user && (

                            <p>
                                Welcome, {
                                    user.name
                                }
                            </p>

                        )
                    }


                    <p>
                        You can browse courses here.
                    </p>


                    {
                        user &&
                        !user.emailConfirmed && (

                            <div className="warning">

                                <p>
                                    Your email is not confirmed.
                                </p>

                                <p>
                                    You cannot start a course until you confirm your email.
                                </p>


                                <button
                                    onClick={
                                        () =>
                                            setPage(
                                                "resend"
                                            )
                                    }
                                >
                                    Confirm Email
                                </button>

                            </div>

                        )
                    }


                    <button
                        onClick={
                            startCourse
                        }
                    >
                        Start Course
                    </button>


                    <button
                        onClick={
                            loadEmailLogs
                        }
                    >
                        Email Logs
                    </button>


                    <button
                        onClick={
                            logout
                        }
                    >
                        Logout
                    </button>


                    <p className="message">
                        {message}
                    </p>

                </div>

            </div>

        </>

    );

}


// ==========================================
// ALL CSS IN ONE PLACE
// ==========================================

const styles = `

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f4f6f8;
}

.page {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
}

.card {
    width: 100%;
    max-width: 450px;
    background: white;
    padding: 35px;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    text-align: center;
}

.logsCard {
    width: 100%;
    max-width: 900px;
    background: white;
    padding: 35px;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    text-align: center;
}

h1 {
    margin-bottom: 10px;
}

h2 {
    margin-bottom: 25px;
}

input {
    display: block;
    width: 100%;
    padding: 13px;
    margin: 12px 0;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
}

button {
    width: 100%;
    padding: 13px;
    margin: 8px 0;
    border: none;
    border-radius: 6px;
    background: #2563eb;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    opacity: 0.9;
}

.google {
    background: #4285f4;
}

.github {
    background: #24292f;
}

.linkButton {
    background: transparent;
    color: #2563eb;
}

.message {
    margin-top: 20px;
    font-weight: bold;
}

.warning {
    padding: 15px;
    margin: 20px 0;
    background: #fff3cd;
    border-radius: 8px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

th,
td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}

th {
    background: #f1f1f1;
}

@media (max-width: 600px) {

    .page {
        padding: 15px;
    }

    .card,
    .logsCard {
        padding: 20px;
    }

    table {
        font-size: 12px;
    }

}

`;

export default App;