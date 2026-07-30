const {
    sendEmail
} = require("./emailService");

const nodemailer = require("nodemailer");

const pool = require("./database");


// ==========================================
// CREATE EMAIL TRANSPORTER
// ==========================================

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user:
            process.env.EMAIL_USER,

        pass:
            process.env.EMAIL_PASSWORD

    }

});


// ==========================================
// SEND EMAIL
// ==========================================

async function sendEmail(
    to,
    subject,
    text
) {

    try {

        // Send email

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


        // Log successful email

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


        console.log(
            "Email sent successfully to:",
            to
        );


        return {

            success:
                true

        };


    } catch (error) {


        console.error(
            "Email sending failed:",
            error.message
        );


        // Log failed email

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


module.exports = {
    sendEmail
};