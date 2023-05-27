const express = require("express");
const manager = require("../controllers/lichtrinh.controller");

const router = express.Router();

router.route("/").get(manager.getAllLichTrinh).post(manager.filterDay);
module.exports = router;