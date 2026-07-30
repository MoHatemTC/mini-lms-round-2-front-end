const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const pool = require("./database");

const {
  sendEmail,
  getEmailLogs
} = require("./emailService");


const app = express();

const PORT = 5000;


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      "mini-lms-development-secret",

    resave: false,

    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60
    }
  })
);


// ==========================================
// AUTHENTICATION MIDDLEWARE
// ==========================================

function requireLogin(req, res, next) {

  if (!req.session.userId) {

    return res.status(401).json({

      success: false,

      message:
        "Authentication required"

    });
  }

  next();
}


// ==========================================
// ADMIN AUTHORIZATION
// ==========================================

function requireAdmin(req, res, next) {

  if (!req.session.userId) {

    return res.status(401).json({

      success: false,

      message:
        "Authentication required"

    });
  }


  if (req.session.role !== "admin") {

    return res.status(403).json({

      success: false,

      message:
        "Access denied"

    });
  }


  next();
}


// ==========================================
// SIGNUP
// ==========================================

app.post(
  "/api/signup",
  async (req, res) => {

    try {

      const {
        name,
        email,
        password
      } = req.body;


      // Validate fields

      if (
        !name ||
        !email ||
        !password
      ) {

        return res.status(400).json({

          success: false,

          message:
            "All fields are required"

        });
      }


      // Validate email

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (
        !emailRegex.test(email)
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid email address"

        });
      }


      // Check existing email

      const [existingUsers] =
        await pool.execute(

          "SELECT id FROM users WHERE email = ?",

          [email]

        );


      if (
        existingUsers.length > 0
      ) {

        /*
         * Generic response:
         *
         * We don't reveal whether
         * an email is already registered.
         */

        return res.status(409).json({

          success: false,

          message:
            "Unable to create account"

        });
      }


      // Hash password

      const hashedPassword =
        await bcrypt.hash(
          password,
          12
        );


      /*
       * IMPORTANT:
       *
       * Role is NOT accepted
       * from the frontend.
       *
       * Every new account is
       * automatically a learner.
       */

      await pool.execute(

        `INSERT INTO users
        (name, email, password, role)
        VALUES (?, ?, ?, 'learner')`,

        [
          name,
          email,
          hashedPassword
        ]

      );


      res.status(201).json({

        success: true,

        message:
          "Account created successfully"

      });


    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to create account"

      });
    }
  }
);


// ==========================================
// LOGIN
// ==========================================

app.post(
  "/api/login",
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;


      const [
        users
      ] = await pool.execute(

        `SELECT
          id,
          name,
          email,
          password,
          role
        FROM users
        WHERE email = ?`,

        [email]

      );


      const user = users[0];


      /*
       * IMPORTANT SECURITY REQUIREMENT
       *
       * We use the SAME message
       * for:
       *
       * - Unknown email
       * - Wrong password
       */

      if (
        !user ||
        !(await bcrypt.compare(
          password,
          user.password
        ))
      ) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid email or password"

        });
      }


      // Create session

      req.session.userId =
        user.id;

      req.session.role =
        user.role;


      res.json({

        success: true,

        message:
          "Login successful",

        user: {

          id: user.id,

          name: user.name,

          email: user.email,

          role: user.role

        }

      });


    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Login failed"

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

    req.session.destroy(
      (error) => {

        if (error) {

          return res.status(500)
            .json({

              success: false,

              message:
                "Logout failed"

            });
        }


        res.json({

          success: true,

          message:
            "Logged out successfully"

        });

      }
    );
  }
);


// ==========================================
// CURRENT USER
// ==========================================

app.get(
  "/api/me",
  requireLogin,

  async (req, res) => {

    try {

      const [
        users
      ] = await pool.execute(

        `SELECT
          id,
          name,
          email,
          role
        FROM users
        WHERE id = ?`,

        [req.session.userId]

      );


      if (
        users.length === 0
      ) {

        return res.status(401)
          .json({

            success: false,

            message:
              "User not found"

          });
      }


      res.json({

        success: true,

        user: users[0]

      });


    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          "Unable to get user"

      });
    }
  }
);


// ==========================================
// ADMIN PROTECTED ROUTE
// ==========================================

app.get(
  "/api/admin",
  requireAdmin,

  (req, res) => {

    res.json({

      success: true,

      message:
        "Welcome to the admin area"

    });
  }
);


// ==========================================
// SEND EMAIL
// ==========================================

app.post(
  "/api/emails/send",
  requireLogin,

  async (req, res) => {

    try {

      const {
        recipient,
        subject,
        body
      } = req.body;


      if (
        !recipient ||
        !subject
      ) {

        return res.status(400)
          .json({

            success: false,

            message:
              "Email information is incomplete"

          });
      }


      const result =
        await sendEmail(

          recipient,

          subject,

          body || ""

        );


      res.json(result);


    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          "Unable to send email"

      });
    }
  }
);


// ==========================================
// EMAIL LOGS
// ADMIN ONLY
// ==========================================

app.get(
  "/api/emails/logs",
  requireAdmin,

  async (req, res) => {

    try {

      const emails =
        await getEmailLogs();


      res.json({

        success: true,

        emails

      });


    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          "Unable to get email logs"

      });
    }
  }
);


// ==========================================
// START SERVER
// ==========================================

app.listen(
  PORT,

  () => {

    console.log(
      `Backend running on http://localhost:${PORT}`
    );

  }
);