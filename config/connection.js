// const mysql2 = require('mysql2');
let dotenv = require("dotenv");
let env = dotenv.config();
const mysql = require("mysql2/promise");

let conn = {
  query: async (qry) => {
    let createConnect = await mysql.createConnection({
      host: process.env.vps_HOST,
      user: process.env.vps_USER,
      password: process.env.vps_PASSWORD,
      database: process.env.vps_DATABASE,
    });

   await createConnect.connect(function (err) {
      if (err) {
        throw err;
      } else {
        console.log("Connected!");
      }
    });

    const [rows, fields] = await createConnect.query(qry);
    return rows;
  },
};
module.exports = conn;
