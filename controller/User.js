"use strict";
const md5 = require("md5");
let validation = require("../res/validation");
let conn = require("../config/connection");
let dotenv = require("dotenv");
let env = dotenv.config();
const jwt = require("jsonwebtoken");

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
    let { namaLengkap, password, email, noHP } = req.body;

    if (!namaLengkap || !password || !email || !noHP ) {
      validation.empytvalue(res);
      return;
    }

    try {
      let qry = `INSERT INTO User (namaLengkap, password, email, noHP, role, status) 
      VALUES ("${namaLengkap}","${md5(
        password
      )}","${email}","${noHP}","user",1)`;
      let result = await conn.query(qry);
      let respons = {
        code: 200,
        status: "success",
        data: `${namaLengkap} Register Success`,
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
    let { email, password } = req.body;

    if (!email || !password) {
      validation.empytvalue(res);
      return;
    }

    try {
      let qry = `SELECT * FROM user WHERE email = '${email}' AND password = '${md5(
        password
      )}' `;
      let result = await conn.query(qry);
      if (result.length == 0) {
        let error = {
          code: 401,
          status: "error",
          error: "gagal login, periksa kembali email password anda!",
        };
        res.status(401).send(error);
      } else {
        let token = jwt.sign({ result }, process.env.SECRET_KEY, {
          expiresIn: Math.floor(new Date() / 1000),
        });

        let data = {
          code: 200,
          status: "verified",
          data: {
            email: email,
            namaLengkap: result[0].namaLengkap,
            status: result[0].status,
            accessToken: token,
          },
        };
        // console.log(result);
        res.status(200).send(data);
        return;
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
