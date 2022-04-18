"use strict";
const md5 = require("md5")
let validation = require("../res/validation");
let conn = require("../config/connection");
let dotenv = require("dotenv");
let env = dotenv.config();
const jwt = require('jsonwebtoken');

let user = {
  getAllData: async (req, res) => {
    try {
      let qry = "SELECT * FROM user";
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
  register: async (req, res) => {
    let { username, password, fullName } = req.body;

    if (!username || !password || !fullName ) {
      validation.empytvalue(res)
      return
    }


    try {
      let qry = `INSERT INTO user (username, password, fullname, status) VALUES ("${username}","${md5(password)}","${fullName}","0")`
      let result = await conn.query(qry);
      let respons = {
        code: 200,
        status: "success",
        data: `${username} Register Success`,
      };
      res.status(200).send(respons);
    } catch (e) {
      let error = {
        code: 400,
        status: "error",
        error: e,
      };
      console.log(e);
      res.status(400).send(error);
    }

  },
  login: async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password ) {
      validation.empytvalue(res)
      return
    }

    try {
      let qry = `SELECT * FROM user WHERE username = '${username}' AND password = '${md5(password)}' `;
      let result = await conn.query(qry);
if (result.length == 0) {
  let error = {
    code: 401,
    status: "error",
    error: "gagal login, periksa kembali username password anda!",
  };
  res.status(401).send(error);
} else {
      let token = jwt.sign({ result }, process.env.SECRET_KEY, {
                    expiresIn: Math.floor(new Date() / 1000)
                });

                let data = {
                  code: 200,
                  status:"verified",
                  data : { 
                  "username": username,
                  "fullName": result.fullName,
                  "status": result.status,
                  accessToken: token
                  }
                }
res.status(200).send(data);
return
}
      
    } catch (e) {
      let error = {
        code: 400,
        status: "error",
        error: e,
      };
      console.log(e);
      res.status(400).send(error);
    }
    


  },
};

module.exports = user;
