const { Pool } = require("pg");


// ==========================================
// POSTGRESQL DATABASE CONNECTION
// ==========================================

const pool = new Pool({
    host: "localhost",

    port: 5432,

    user: "postgres",

    password: "YOUR_POSTGRES_PASSWORD",

    database: "mini_lms"
});


// ==========================================
// DATABASE CONNECTION TEST
// ==========================================

pool.connect()
    .then((client) => {

        console.log(
            "Connected to PostgreSQL database successfully."
        );

        client.release();

    })
    .catch((error) => {

        console.error(
            "PostgreSQL connection failed:",
            error.message
        );

    });


// ==========================================
// DATABASE ERROR HANDLER
// ==========================================

pool.on(
    "error",
    (error) => {

        console.error(
            "Unexpected PostgreSQL error:",
            error
        );

    }
);


module.exports = pool;