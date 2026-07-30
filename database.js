const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "YOUR_POSTGRES_PASSWORD",
    database: "mini_lms"
});

pool.connect()
    .then((client) => {
        console.log("Connected to PostgreSQL successfully.");
        client.release();
    })
    .catch((error) => {
        console.error(
            "PostgreSQL connection error:",
            error.message
        );
    });

module.exports = pool;