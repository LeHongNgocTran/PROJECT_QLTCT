const express = require('express');
const manager = require('../controllers/giavetuyentau.controller');

const router = express.Router();

router.route("/").get(manager.getAllTuyenTau);

module.exports = router;