const express = require('express');
const router = express.Router();
const verifikasi = require('../middleware/verifikasi')
const user = require('../controller/User')
const lapangan = require('../controller/Lapangan')
const { haltOnTimedout, errorFilter } = require('../helpers/connectTimeOut');

var timeout=require('connect-timeout');

// API USER
router.get('/esparing/user/getUser',verifikasi.verifikasi(), user.getAllData);
router.post('/esparing/user/register', user.register);
router.post('/esparing/user/login', user.login);

// API Lapangan
router.get('/esparing/user/getLapangan', lapangan.getAllData);
// API Booking


module.exports = router;