'use strict';
let response = require('../res/validation');
let conn = require('../config/connection');


let lapangan = {

getAllData: async (req, res) => {
    try {
      let qry = "SELECT * FROM lapangan";
      let result = await conn.query(qry);
      let respons = {
        code: 200,
        status: "success",
        data: result,
      };
      res.status(200).send(respons);
    } catch (e) {
      let error = {
        code: 404,
        status: "error",
        error: e,
      };
      console.log(e);
      res.status(404).send(error);
    }
  },
  editData: async(req, res) => {
    let {
      codeLapangan,
      typeLapangan,
      level,
      status,
      description,
    } = req.body
    try {
      let qry = `UPDATE lapangan
      SET codeLapangan = '${codeLapangan}', typeLapangan= '${typeLapangan}',
      level = '${level}', status= '${status}', description = '${description}'
      WHERE CustomerID = `;
      let result = await conn.query(qry);
      let respons = {
        code: 200,
        status: "success",
        data: result,
      };
      res.status(200).send(respons);
    } catch (e) {
      let error = {
        code: 404,
        status: "error",
        error: e,
      };
      console.log(e);
      res.status(404).send(error);
    }
  }
 
}
 module.exports = lapangan;