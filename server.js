require("dotenv").config();

const express = require("express");

const cors = require("cors");

const session = require("express-session");

const bcrypt = require("bcryptjs");

const passport = require("passport");

const GoogleStrategy =
    require("passport-google-oauth20").Strategy;

const GitHubStrategy =
    require("passport-github2").Strategy;

const pool =
    require("./database");


// ==========================================
// CREATE EXPRESS APPLICATION
// ==========================================

const app = express();


// ==========================================
// SERVER PORT
// ==========================================

const PORT =
    process.env.PORT || 5000;


// ==========================================
// EXPRESS MIDDLEWARE
// ==========================================

app.use(
    cors({

        origin:
            "http://localhost:5173",

        credentials:
            true

    })
);


app.use(
    express.json()
);


// ==========================================
// EXPRESS SESSION
// ==========================================

app.use(

    session({

        secret:
            process.env.SESSION_SECRET ||
            "my_secret_key",

        resave:
            false,

        saveUninitialized:
            false,

        cookie: {

            maxAge:
                24 *
                60 *
                60 *
                1000

        }

    })

);


// ==========================================
// PASSPORT
// ==========================================

app.use(
    passport.initialize()
);


app.use(
    passport.session()
);


// ==========================================
// TEST ROUTE
// ==========================================

app.get(
    "/",

    (req, res) => {

        res.json({

            message:
                "Mini LMS Express + PostgreSQL Backend is Running"

        });

    }

);


// ==========================================
// PASSPORT SERIALIZE USER
// ==========================================

passport.serializeUser(

    (user, done) => {

        done(
            null,
            user.id
        );

    }

);


// ==========================================
// PASSPORT DESERIALIZE USER
// ==========================================

passport.deserializeUser(

    async (
        id,
        done
    ) => {

        try {

            const result =
                await pool.query(

                    "SELECT * FROM users WHERE id = $1",

                    [id]

                );


            if (
                result.rows.length === 0
            ) {

                return done(
                    null,
                    false
                );

            }


            done(
                null,
                result.rows[0]
            );


        } catch (error) {

            done(
                error,
                null
            );

        }

    }

);


// ==========================================
// AUTHORIZATION MIDDLEWARE
// ==========================================

// This checks if the user is logged in.

function requireLogin(
    req,
    res,
    next
) {

    if (
        !req.isAuthenticated()
    ) {

        return res
            .status(401)
            .json({

                message:
                    "You must be logged in."

            });

    }


    next();

}


// ==========================================
// ADMIN AUTHORIZATION MIDDLEWARE
// ==========================================

// This is important for your task.
// It prevents learners from accessing
// admin backend routes directly.

function requireAdmin(
    req,
    res,
    next
) {

    if (
        !req.isAuthenticated()
    ) {

        return res
            .status(401)
            .json({

                message:
                    "You must be logged in."

            });

    }


    if (
        req.user.role !== "admin"
    ) {

        return res
            .status(403)
            .json({

                message:
                    "Access denied."

            });

    }


    next();

}


// ==========================================
// SIGNUP
// ==========================================

app.post(

    "/api/signup",

    async (
        req,
        res
    ) => {

        try {

            const {

                name,

                email,

                password

            } = req.body;


            // Validate input

            if (

                !name ||

                !email ||

                !password

            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "All fields are required."

                    });

            }


            // Check if email exists

            const existingUser =
                await pool.query(

                    "SELECT id FROM users WHERE email = $1",

                    [email]

                );


            if (
                existingUser.rows.length > 0
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Email already exists."

                    });

            }


            // Hash password

            const hashedPassword =
                await bcrypt.hash(

                    password,

                    10

                );


            // IMPORTANT:
            // Every signup creates a learner.
            // Users cannot create themselves
            // as admins.

            const result =
                await pool.query(

                    `INSERT INTO users
                    (name, email, password, role)
                    VALUES ($1, $2, $3, $4)
                    RETURNING id, name, email, role`,

                    [

                        name,

                        email,

                        hashedPassword,

                        "learner"

                    ]

                );


            res.status(201)
                .json({

                    message:
                        "Account created successfully.",

                    user:
                        result.rows[0]

                });


        } catch (error) {

            console.error(
                "Signup error:",
                error
            );


            res
                .status(500)
                .json({

                    message:
                        "Signup failed."

                });

        }

    }

);


// ==========================================
// EMAIL + PASSWORD LOGIN
// ==========================================

app.post(

    "/api/login",

    async (
        req,
        res
    ) => {

        try {

            const {

                email,

                password

            } = req.body;


            // Find user

            const result =
                await pool.query(

                    "SELECT * FROM users WHERE email = $1",

                    [email]

                );


            // IMPORTANT:
            // Same message for unknown email
            // and wrong password.

            if (
                result.rows.length === 0
            ) {

                return res
                    .status(401)
                    .json({

                        message:
                            "Invalid email or password."

                    });

            }


            const user =
                result.rows[0];


            // Google/GitHub users may not
            // have a password.

            if (
                !user.password
            ) {

                return res
                    .status(401)
                    .json({

                        message:
                            "Invalid email or password."

                    });

            }


            // Compare password

            const passwordCorrect =
                await bcrypt.compare(

                    password,

                    user.password

                );


            if (
                !passwordCorrect
            ) {

                return res
                    .status(401)
                    .json({

                        message:
                            "Invalid email or password."

                    });

            }


            // Login user

            req.login(

                user,

                (error) => {

                    if (error) {

                        console.error(
                            error
                        );

                        return res
                            .status(500)
                            .json({

                                message:
                                    "Login failed."

                            });

                    }


                    res.json({

                        message:
                            "Login successful.",

                        user: {

                            id:
                                user.id,

                            name:
                                user.name,

                            email:
                                user.email,

                            role:
                                user.role

                        }

                    });

                }

            );


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            res
                .status(500)
                .json({

                    message:
                        "Server error."

                });

        }

    }

);


// ==========================================
// GET CURRENT USER
// ==========================================

app.get(

    "/api/me",

    requireLogin,

    (req, res) => {

        res.json({

            user: {

                id:
                    req.user.id,

                name:
                    req.user.name,

                email:
                    req.user.email,

                role:
                    req.user.role

            }

        });

    }

);


// ==========================================
// ADMIN TEST ROUTE
// ==========================================

// Only an admin can access this route.

app.get(

    "/api/admin/test",

    requireAdmin,

    (req, res) => {

        res.json({

            message:
                "You are authorized as an admin.",

            user:
                req.user

        });

    }

);


// ==========================================
// LEARNER TEST ROUTE
// ==========================================

app.get(

    "/api/learner/test",

    requireLogin,

    (req, res) => {

        if (
            req.user.role !== "learner"
        ) {

            return res
                .status(403)
                .json({

                    message:
                        "This page is for learners only."

                });

        }


        res.json({

            message:
                "You are authorized as a learner.",

            user:
                req.user

        });

    }

);


// ==========================================
// GET EMAIL LOGS
// ==========================================

// Only admins can see email logs.

app.get(

    "/api/emails",

    requireAdmin,

    async (
        req,
        res
    ) => {

        try {

            const result =
                await pool.query(

                    `SELECT
                    id,
                    recipient,
                    subject,
                    status,
                    error_message,
                    created_at

                    FROM email_logs

                    ORDER BY created_at DESC`

                );


            res.json({

                emails:
                    result.rows

            });


        } catch (error) {

            console.error(
                "Email logs error:",
                error
            );


            res
                .status(500)
                .json({

                    message:
                        "Could not get email logs."

                });

        }

    }

);


// ==========================================
// LOGOUT
// ==========================================

app.post(

    "/api/logout",

    (req, res) => {

        req.logout(

            (error) => {

                if (error) {

                    console.error(
                        error
                    );

                    return res
                        .status(500)
                        .json({

                            message:
                                "Logout failed."

                        });

                }


                req.session.destroy(

                    (sessionError) => {

                        if (
                            sessionError
                        ) {

                            console.error(
                                sessionError
                            );

                        }


                        res.json({

                            message:
                                "Logged out successfully."

                        });

                    }

                );

            }

        );

    }

);


// ==========================================
// GOOGLE LOGIN
// ==========================================

if (

    process.env.GOOGLE_CLIENT_ID &&

    process.env.GOOGLE_CLIENT_SECRET

) {

    passport.use(

        new GoogleStrategy(

            {

                clientID:
                    process.env.GOOGLE_CLIENT_ID,

                clientSecret:
                    process.env.GOOGLE_CLIENT_SECRET,

                callbackURL:
                    "http://localhost:5000/auth/google/callback"

            },

            async (

                accessToken,

                refreshToken,

                profile,

                done

            ) => {

                try {

                    const email =
                        profile
                            .emails?.[0]
                            ?.value;


                    if (!email) {

                        return done(
                            new Error(
                                "Google account has no email."
                            )
                        );

                    }


                    // Check if email
                    // already exists

                    const existingUser =
                        await pool.query(

                            "SELECT * FROM users WHERE email = $1",

                            [email]

                        );


                    let user;


                    if (

                        existingUser
                            .rows
                            .length > 0

                    ) {

                        // D-01 rule:
                        // Same email = same account

                        user =
                            existingUser
                                .rows[0];

                    } else {

                        // Create learner

                        const newUser =
                            await pool.query(

                                `INSERT INTO users
                                (name, email, role)
                                VALUES ($1, $2, $3)
                                RETURNING *`,

                                [

                                    profile.displayName,

                                    email,

                                    "learner"

                                ]

                            );


                        user =
                            newUser.rows[0];

                    }


                    done(
                        null,
                        user
                    );


                } catch (error) {

                    done(
                        error,
                        null
                    );

                }

            }

        )

    );


    app.get(

        "/auth/google",

        passport.authenticate(

            "google",

            {

                scope: [

                    "profile",

                    "email"

                ]

            }

        )

    );


    app.get(

        "/auth/google/callback",

        passport.authenticate(

            "google",

            {

                failureRedirect:
                    "http://localhost:5173/"

            }

        ),

        (
            req,
            res
        ) => {

            res.redirect(

                "http://localhost:5173/"

            );

        }

    );

} else {

    console.log(

        "Google OAuth is not configured."

    );

}


// ==========================================
// GITHUB LOGIN
// ==========================================

if (

    process.env.GITHUB_CLIENT_ID &&

    process.env.GITHUB_CLIENT_SECRET

) {

    passport.use(

        new GitHubStrategy(

            {

                clientID:
                    process.env.GITHUB_CLIENT_ID,

                clientSecret:
                    process.env.GITHUB_CLIENT_SECRET,

                callbackURL:
                    "http://localhost:5000/auth/github/callback"

            },

            async (

                accessToken,

                refreshToken,

                profile,

                done

            ) => {

                try {

                    const email =
                        profile
                            .emails?.[0]
                            ?.value;


                    if (!email) {

                        return done(

                            new Error(

                                "GitHub account has no public email."

                            )

                        );

                    }


                    // D-01 rule:
                    // Same email = same account

                    const existingUser =
                        await pool.query(

                            "SELECT * FROM users WHERE email = $1",

                            [email]

                        );


                    let user;


                    if (

                        existingUser
                            .rows
                            .length > 0

                    ) {

                        user =
                            existingUser
                                .rows[0];

                    } else {

                        const newUser =
                            await pool.query(

                                `INSERT INTO users
                                (name, email, role)
                                VALUES ($1, $2, $3)
                                RETURNING *`,

                                [

                                    profile.displayName ||
                                    profile.username,

                                    email,

                                    "learner"

                                ]

                            );


                        user =
                            newUser.rows[0];

                    }


                    done(
                        null,
                        user
                    );


                } catch (error) {

                    done(
                        error,
                        null
                    );

                }

            }

        )

    );


    app.get(

        "/auth/github",

        passport.authenticate(

            "github",

            {

                scope: [

                    "user:email"

                ]

            }

        )

    );


    app.get(

        "/auth/github/callback",

        passport.authenticate(

            "github",

            {

                failureRedirect:
                    "http://localhost:5173/"

            }

        ),

        (
            req,
            res
        ) => {

            res.redirect(

                "http://localhost:5173/"

            );

        }

    );

} else {

    console.log(

        "GitHub OAuth is not configured."

    );

}


// ==========================================
// START EXPRESS SERVER
// ==========================================

app.listen(

    PORT,

    () => {

        console.log(
            `Express server running at http://localhost:${PORT}`
        );

    }

);