const express = require("express");
const manager = require("../controllers/tau.controller");

const router = express.Router();

// Quản lý tàu

router
  .route("/")
  .get(manager.getAll)
  .post(manager.updateTrangThai)
  .patch(manager.updateTauthuocTuyenTau);

// Lấy tất cả tàu theo tuyến đó
router.route("/:id").get(manager.getAllTauTheoTuyen);

// QUẢN LÝ THỜI GIAN LỊCH BIỂU HOẠT ĐỘNG CỦA TÀU ĐÓ
router
  .route("/QLTG")
  .post(manager.createTimeTau)
  .patch(manager.updateTimeTauById);

// Lấy tất cả thời gian của tàu đó
router
  .route("/QLTG/:id")
  .get(manager.getInforTauById)
  .post(manager.getAllTimeTauById)
  .delete(manager.deleteTimeTau);

router.route('/Tau').post(manager.ThemTau).patch(manager.EditInfoAboutTau);

router.route('/Search/Info/:id').get(manager.Search);
module.exports = router;
