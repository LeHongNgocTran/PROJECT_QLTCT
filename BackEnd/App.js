const express = require("express");
const cors = require("cors");

const ApiError = require("./app/api-error");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const managerRouter = require("./app/routes/manager.route");
const phongveRouter = require("./app/routes/phongve.route");
const giavetuyentauRouter = require("./app/routes/giavetuyentau.route");
const tuyentauRouter = require("./app/routes/tuyentau.route");
const tauRouter = require("./app/routes/tau.route");
const hoadonRouter = require("./app/routes/hoadon.route");
const dashboardRouter = require("./app/routes/dashboard.route");
const lichtrinhRouter = require("./app/routes/lichtrinh.route");

app.use(cors());
app.use(express.json());

app.use("/api/manager", managerRouter);
app.use("/api/phongve", phongveRouter);
app.use("/api/giavetuyentau", giavetuyentauRouter);
app.use("/api/tuyentau", tuyentauRouter);
app.use("/api/tau", tauRouter);
app.use("/api/hoadon", hoadonRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/lichtrinh", lichtrinhRouter);

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
