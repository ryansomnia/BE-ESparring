// const mysql2 = require('mysql2');
let dotenv = require('dotenv');
let env = dotenv.config();
const mysql2 = require('mysql2');
const conn = mysql2.createConnection({
    host: process.env.DBLOCAL_HOST,
    user: process.env.DBLOCAL_USER,
    password: process.env.DBLOCAL_PASSWORD,
    database: process.env.DBLOCAL_DATABASE,
})


conn.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Mysql terkoneksi');
    }
})


module.exports = conn;