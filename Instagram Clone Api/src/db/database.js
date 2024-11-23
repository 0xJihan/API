const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
    host: 'localhost', user: 'root', password: '', database: 'JetpackInstagramClone'
};

// Create a connection pool and export it
let connection;

const connectDB = async () => {
    if (!connection) {
        try {
            connection = await mysql.createPool(dbConfig);
            console.log("Connected to the database");
        } catch (error) {
            console.error("Database connection failed:", error);
            process.exit(1);
        }
        return connection
    }
    else {
    return connection;
    }
};

// Export the connection function
module.exports = {connectDB, getConnection: () => connection};
