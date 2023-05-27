const MongoDB = require("../utils/mongodb.util");

const ApiError = require("../api-error");
const LichTrinhService = require("../services/lichtrinh.service");

exports.getAllLichTrinh = async (req, res, next) => {
  try {
    let documents = [];
    const lichtrinh = new LichTrinhService(MongoDB.client);
    documents = await lichtrinh.getAllLichTrinh();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Khong thể getAllLichTrinh ", error));
  }
};

exports.filterDay = async (req, res, next) => {
  try {
    let documents = [];
    const lichtrinh = new LichTrinhService(MongoDB.client);
    documents = await lichtrinh.filterDay(req.body);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Khong thể filterDay", error));
  }
};
