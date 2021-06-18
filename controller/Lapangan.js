'use strict';
let response = require('../res/res');
let connection = require('../config/connection');



let getAllData = (req, res) => {

    let qry = 'SELECT * FROM Lapangan';
    connection.query(qry, (error, result, rows) => {
     if (error) {
         console.log(error);
     } else {
         response.ok(result, res)
       console.log(result);
     }
 })
 
 }
 

 module.exports = {
    getAllData,

}