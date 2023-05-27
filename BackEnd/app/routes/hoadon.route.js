const express = require("express");
const manager = require("../controllers/hoadon.controller");

const router = express.Router();

router
  .route("/")
  .get(manager.getAllBill)
  .post(manager.addHoadon)
  .patch(manager.cancelBillById);

router
  .route("/:id")
  .get(manager.getBillById)
  .post(manager.getBillByUser)
  .patch(manager.updateBillByUser);

router.route("/ThanhToan/TaiQuay").post(manager.addHoadonTaiQuay);

router.route("/Invoice/SeatAvailable").post(manager.getSeatBySeat);

router.route("/Search/Info").post(manager.Search);

// Lấy những ghế đã mua

module.exports = router;
