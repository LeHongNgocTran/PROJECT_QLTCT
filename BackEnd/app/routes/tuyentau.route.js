const express = require("express");
const manager = require("../controllers/tuyentau.controller");
const router = express.Router();

router.route("/").get(manager.getAllTuyenTau).post(manager.createTuyenTau);

router.route("/ThongTinTuyenTau").get(manager.getAllThongTinTuyenTau);

router.route("/getAllTuyenTau").get(manager.getAll);

router
  .route("/:id")
  .post(manager.deleteTauByIdTheoTuyen)
  .get(manager.getTuyenTauById)
  .patch(manager.updateDisplayTuyenTau);

router
  .route("/searchTuyenTauHoatDong/:id")
  .get(manager.Search)
  .post(manager.searchTuyenTauHoatDong)
  .patch(manager.updateTuyenTau);

module.exports = router;
