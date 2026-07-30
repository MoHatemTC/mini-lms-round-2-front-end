require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const passport = require("passport");

const GoogleStrategy =
    require("passport-google-oauth20").Strategy;

const GitHubStrategy =
    require("passport-github2").Strategy;

const pool = require("./database");


// ==========================================
// EXPRESS APP
// ==========================================

const app = express();

const PORT =
    process.env.PORT || 5000;


// ==========================================
// MIDDLEWARE
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
// SESSION
// ==========================================

app.use(

    session({

        secret:
            process.env.SESSION_SECRET ||
            "mini-lms-secret",

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
// EMAIL TRANSPORTER
// ==========================================

const transporter =
    nodemailer.createTransport({

        service: "gmail",

        auth: {

            user:
                process.env.EMAIL_USER,

            pass:
                process.env.EMAIL_PASSWORD

        }

    });


// ==========================================
// CENTRAL EMAIL FUNCTION
// ==========================================

async function sendEmail(
    to,
    subject,
    text
) {

    try {

        await transporter.sendMail({

            from:
                process.env.EMAIL_USER,

            to:
                to,

            subject:
                subject,

            text:
                text

        });


        // Save successful email

        await pool.query(

            `INSERT INTO email_logs
            (
                recipient,
                subject,
                status,
                error_message
            )

            VALUES
            ($1, $2, $3, $4)`,

            [

                to,

                subject,

                "Sent",

                null

            ]

        );


        return {

            success:
                true

        };


    } catch (error) {

        console.error(
            "Email error:",
            error.message
        );


        // Save failed email

        await pool.query(

            `INSERT INTO email_logs
            (
                recipient,
                subject,
                status,
                error_message
            )

            VALUES
            ($1, $2, $3, $4)`,

            [

                to,

                subject,

                "Failed",

                error.message

            ]

        );


        return {

            success:
                false,

            error:
                error.message

        };

    }

}


// ==========================================
// PASSPORT SERIALIZE
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
// PASSPORT DESERIALIZE
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
// TEST ROUTE
// ==========================================

app.get(

    "/",

    (req, res) => {

        res.json({

            message:
                "Task 2 Express Backend is Running"

        });

    }

);


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


            // Check existing email

            const existingUser =
                await pool.query(

                    "SELECT * FROM users WHERE email = $1",

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


            // Generate token

            const token =
                crypto
                    .randomBytes(32)
                    .toString("hex");


            // Token expires after 24 hours

            const expires =
                new Date(

                    Date.now() +

                    24 *
                    60 *
                    60 *
                    1000

                );


            // Create learner account

            const result =
                await pool.query(

                    `INSERT INTO users

                    (
                        name,
                        email,
                        password,
                        role,
                        email_confirmed,
                        confirmation_token,
                        confirmation_expires,
                        last_confirmation_sent
                    )

                    VALUES

                    (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7,
                        NOW()
                    )

                    RETURNING
                    id,
                    name,
                    email,
                    role`,

                    [

                        name,

                        email,

                        hashedPassword,

                        "learner",

                        false,

                        token,

                        expires

                    ]

                );


            // Confirmation link

            const confirmationLink =

                `http://localhost:5173/confirm-email?token=${token}`;


            // Send confirmation email

            const emailResult =
                await sendEmail(

                    email,

                    "Confirm your Mini LMS email",

                    `Hello ${name},

Welcome to Mini LMS.

Please confirm your email by opening this link:

${confirmationLink}

This link will expire after 24 hours.`

                );


            res.status(201)
                .json({

                    message:
                        emailResult.success

                            ? "Account created. Please confirm your email."

                            : "Account created, but confirmation email could not be sent.",

                    emailSent:
                        emailResult.success,

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
// EMAIL LOGIN
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


            const result =
                await pool.query(

                    "SELECT * FROM users WHERE email = $1",

                    [email]

                );


            // Same message for unknown email
            // and wrong password

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


            const validPassword =
                await bcrypt.compare(

                    password,

                    user.password

                );


            if (
                !validPassword
            ) {

                return res
                    .status(401)
                    .json({

                        message:
                            "Invalid email or password."

                    });

            }


            req.login(

                user,

                (error) => {

                    if (error) {

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
                                user.role,

                            emailConfirmed:
                                user.email_confirmed

                        }

                    });

                }

            );


        } catch (error) {

            console.error(
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
// CONFIRM EMAIL
// ==========================================

app.get(

    "/api/confirm-email",

    async (
        req,
        res
    ) => {

        try {

            const {
                token
            } = req.query;


            if (!token) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Confirmation token is missing."

                    });

            }


            const result =
                await pool.query(

                    `SELECT *
                    FROM users
                    WHERE confirmation_token = $1`,

                    [token]

                );


            if (
                result.rows.length === 0
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Invalid confirmation link."

                    });

            }


            const user =
                result.rows[0];


            // Used link

            if (
                user.email_confirmed
            ) {

                return res.json({

                    message:
                        "Already confirmed."

                });

            }


            // Expired link

            if (

                new Date() >

                new Date(
                    user.confirmation_expires
                )

            ) {

                return res
                    .status(410)
                    .json({

                        message:
                            "Confirmation link expired. Please request a new one."

                    });

            }


            // Confirm account

            await pool.query(

                `UPDATE users

                SET
                    email_confirmed = TRUE,
                    confirmation_token = NULL,
                    confirmation_expires = NULL

                WHERE id = $1`,

                [user.id]

            );


            res.json({

                message:
                    "Email confirmed successfully."

            });


        } catch (error) {

            console.error(
                error
            );


            res
                .status(500)
                .json({

                    message:
                        "Confirmation failed."

                });

        }

    }

);


// ==========================================
// RESEND CONFIRMATION
// ==========================================

app.post(

    "/api/resend-confirmation",

    async (
        req,
        res
    ) => {

        try {

            const {
                email
            } = req.body;


            const result =
                await pool.query(

                    "SELECT * FROM users WHERE email = $1",

                    [email]

                );


            if (
                result.rows.length === 0
            ) {

                return res.json({

                    message:
                        "If the account exists, a confirmation email will be sent."

                });

            }


            const user =
                result.rows[0];


            if (
                user.email_confirmed
            ) {

                return res.json({

                    message:
                        "Already confirmed."

                });

            }


            // Check 1-minute limit

            if (
                user.last_confirmation_sent
            ) {

                const secondsPassed =

                    (

                        Date.now() -

                        new Date(
                            user.last_confirmation_sent
                        ).getTime()

                    ) / 1000;


                if (
                    secondsPassed < 60
                ) {

                    const remaining =

                        Math.ceil(

                            60 -
                            secondsPassed

                        );


                    return res
                        .status(429)
                        .json({

                            message:
                                `Please wait ${remaining} seconds before sending again.`

                        });

                }

            }


            // Generate new token

            const token =
                crypto
                    .randomBytes(32)
                    .toString("hex");


            const expires =
                new Date(

                    Date.now() +

                    24 *
                    60 *
                    60 *
                    1000

                );


            await pool.query(

                `UPDATE users

                SET
                    confirmation_token = $1,
                    confirmation_expires = $2,
                    last_confirmation_sent = NOW()

                WHERE id = $3`,

                [

                    token,

                    expires,

                    user.id

                ]

            );


            const confirmationLink =

                `http://localhost:5173/confirm-email?token=${token}`;


            const emailResult =
                await sendEmail(

                    email,

                    "New Mini LMS confirmation link",

                    `Hello ${user.name},

Here is your new confirmation link:

${confirmationLink}

This link expires after 24 hours.`

                );


            if (
                !emailResult.success
            ) {

                return res
                    .status(500)
                    .json({

                        message:
                            "Could not send confirmation email."

                    });

            }


            res.json({

                message:
                    "A new confirmation email has been sent."

            });


        } catch (error) {

            console.error(
                error
            );


            res
                .status(500)
                .json({

                    message:
                        "Could not resend confirmation email."

                });

        }

    }

);


// ==========================================
// AUTHENTICATION MIDDLEWARE
// ==========================================

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
// CONFIRMED EMAIL MIDDLEWARE
// ==========================================

function requireConfirmedEmail(
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
        !req.user.email_confirmed
    ) {

        return res
            .status(403)
            .json({

                message:
                    "Please confirm your email before starting a course."

            });

    }


    next();

}


// ==========================================
// START COURSE
// ==========================================

app.post(

    "/api/courses/:courseId/start",

    requireConfirmedEmail,

    (req, res) => {

        res.json({

            message:
                "Course started successfully.",

            courseId:
                req.params.courseId

        });

    }

);


// ==========================================
// GOOGLE LOGIN
// ==========================================

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
                            "Google account email not available."
                        )
                    );

                }


                // D-01:
                // Find existing account by email

                const existingUser =
                    await pool.query(

                        "SELECT * FROM users WHERE email = $1",

                        [email]

                    );


                if (
                    existingUser.rows.length > 0
                ) {

                    return done(

                        null,

                        existingUser.rows[0]

                    );

                }


                // Create new account

                const newUser =
                    await pool.query(

                        `INSERT INTO users

                        (
                            name,
                            email,
                            role,
                            email_confirmed,
                            google_id
                        )

                        VALUES
                        ($1, $2, $3, $4, $5)

                        RETURNING *`,

                        [

                            profile.displayName,

                            email,

                            "learner",

                            true,

                            profile.id

                        ]

                    );


                done(

                    null,

                    newUser.rows[0]

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


// Google login route

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


// Google callback

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


// ==========================================
// GITHUB LOGIN
// ==========================================

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
                            "GitHub email not available."
                        )

                    );

                }


                // D-01:
                // Same email = same account

                const existingUser =
                    await pool.query(

                        "SELECT * FROM users WHERE email = $1",

                        [email]

                    );


                if (
                    existingUser.rows.length > 0
                ) {

                    return done(

                        null,

                        existingUser.rows[0]

                    );

                }


                // Create new account

                const newUser =
                    await pool.query(

                        `INSERT INTO users

                        (
                            name,
                            email,
                            role,
                            email_confirmed,
                            github_id
                        )

                        VALUES
                        ($1, $2, $3, $4, $5)

                        RETURNING *`,

                        [

                            profile.displayName ||
                            profile.username,

                            email,

                            "learner",

                            true,

                            profile.id

                        ]

                    );


                done(

                    null,

                    newUser.rows[0]

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


// GitHub login

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


// GitHub callback

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


// ==========================================
// CURRENT USER
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
                    req.user.role,

                emailConfirmed:
                    req.user.email_confirmed

            }

        });

    }

);


// ==========================================
// EMAIL LOGS
// ==========================================

app.get(

    "/api/emails",

    requireLogin,

    async (
        req,
        res
    ) => {

        try {

            const result =
                await pool.query(

                    `SELECT *

                    FROM email_logs

                    ORDER BY created_at DESC`

                );


            res.json({

                emails:
                    result.rows

            });


        } catch (error) {

            console.error(
                error
            );


            res
                .status(500)
                .json({

                    message:
                        "Could not load email logs."

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

                    return res
                        .status(500)
                        .json({

                            message:
                                "Logout failed."

                        });

                }


                req.session.destroy(

                    () => {

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
// START SERVER
// ==========================================

app.listen(

    PORT,

    () => {

        console.log(

            `Express server running at http://localhost:${PORT}`

        );

    }

);