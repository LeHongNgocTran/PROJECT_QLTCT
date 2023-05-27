const express = require("express");
const manager = require("../controllers/manager.controller");
const uploadCloud = require("../config/cloudinary.config");
const router = express.Router();

router.route("/").post(manager.findAccountByPhone);

router
  .route("/:data")
  .get(manager.getAllByPermission)
  .delete(manager.deleteAccount);

router.route("/detailsUser/").post(manager.getDetailsUser);

router.route("/register").post(manager.register);

router.route("/Search/Info").post(manager.Search);

router.route("/upload/info").post(manager.updateInfoUser);

module.exports = router;
