const mysql = require('mysql');

const connectToDatabase = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'jakin',
        database: 'crpms'
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database');
    });

    return connection;
};

module.exports = connectToDatabase;