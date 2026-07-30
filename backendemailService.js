const nodemailer = require("nodemailer");
const pool = require("./database");

// Email transporter
//
// For development, you can use Mailtrap,
// Mailpit, or another SMTP testing service.

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: Number(process.env.SMTP_PORT) || 2525,

  auth: {
    user: process.env.SMTP_USER || "YOUR_SMTP_USERNAME",
    pass: process.env.SMTP_PASS || "YOUR_SMTP_PASSWORD"
  }
});


// ==========================================
// SEND EMAIL
// ==========================================

async function sendEmail(
  recipient,
  subject,
  body
) {

  try {

    await transporter.sendMail({

      from:
        process.env.EMAIL_FROM ||
        "Mini LMS <no-reply@minilms.com>",

      to: recipient,

      subject: subject,

      text: body

    });


    // Email successfully sent
    await pool.execute(
      `INSERT INTO email_logs
      (recipient, subject, status, error_message)
      VALUES (?, ?, ?, ?)`,
      [
        recipient,
        subject,
        "Sent",
        null
      ]
    );


    return {
      success: true,
      status: "Sent"
    };


  } catch (error) {

    // Email failed
    await pool.execute(
      `INSERT INTO email_logs
      (recipient, subject, status, error_message)
      VALUES (?, ?, ?, ?)`,
      [
        recipient,
        subject,
        "Failed",
        error.message
      ]
    );


    return {
      success: false,
      status: "Failed"
    };
  }
}


// ==========================================
// GET EMAIL LOGS
// ==========================================

async function getEmailLogs() {

  const [rows] = await pool.execute(
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

  return rows;
}


module.exports = {
  sendEmail,
  getEmailLogs
};