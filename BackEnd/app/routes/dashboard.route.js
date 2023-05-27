const express = require('express');
const manager = require('../controllers/dashboard.controller');

const router = express.Router();

router.route("/").post(manager.getAllInfo);

module.exports = router;