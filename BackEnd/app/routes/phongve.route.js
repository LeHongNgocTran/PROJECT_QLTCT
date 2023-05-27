const express = require("express");
const manager = require("../controllers/phongve.controller");

const router = express.Router();

router.route("/").get(manager.getAllPhongVe);
router.route("/allDoanhThu").get(manager.getAllDoanhThu);
router.route("/:id").get(manager.getPhongVeById).post(manager.DoanhThuById);
module.exports = router;
