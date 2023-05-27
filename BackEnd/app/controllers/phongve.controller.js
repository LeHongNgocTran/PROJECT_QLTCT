const PhongVeService = require("../services/phongve.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.getAllPhongVe = async (req, res, next) => {
  try {
    let documents = [];
    const phongVe = new PhongVeService(MongoDB.client);
    documents = await phongVe.getAllPhongVe();
    return res.send(documents);
  } catch (err) {
    return next(new ApiError(500, "An error occurred while getting"));
  }
};

exports.getPhongVeById = async (req, res, next) => {
  try {
    // console.log(req.params.id);
    const phongVe = new PhongVeService(MongoDB.client);
    const documents = await phongVe.getPhongVeById(req.params.id);
    return res.send(documents);
  } catch (err) {
    return next(new ApiError(500, "An error occurred while getting"));
  }
};

exports.DoanhThuById = async (req, res, next) => {
  try {
    const PhongVe = new PhongVeService(MongoDB.client);
    const documents = await PhongVe.DoanhThuById(req.params.id);
    return res.send({ idPhongVe: req.params.id, tongtien: documents });
  } catch (err) {
    return next(new ApiError(500, "Khong the tinh tong doanh thu", err));
  }
};

exports.getAllDoanhThu = async (req,res,next) => {
  try {
    const PhongVe = new PhongVeService(MongoDB.client);
    const documents = await PhongVe.getAllDoanhThu();
    return res.send(documents);
  } catch (err) {
    return next(new ApiError(500, "Khong the tinh tong doanh thu", err));
  }
}
