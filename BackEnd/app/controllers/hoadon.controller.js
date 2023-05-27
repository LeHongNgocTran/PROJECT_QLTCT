const HoaDonService = require("../services/hoadon.service");
const MongoDB = require("../utils/mongodb.util");

const ApiError = require("../api-error");

exports.getAllBill = async (req, res, next) => {
  try {
    let documents = [];
    const hoadon = new HoaDonService(MongoDB.client);
    documents = await hoadon.getAllBill();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Khong thể lấy bil", error));
  }
};

exports.getBillById = async (req, res, next) => {
  try {
    let documents = {};
    const hoadon = new HoaDonService(MongoDB.client);
    documents = await hoadon.getBillById(req.params.id);
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, `Không thể lấy bill ${req.params.id}`, error)
    );
  }
};

exports.getBillByUser = async (req, res, next) => {
  try {
    let documents = {};
    const hoadon = new HoaDonService(MongoDB.client);
    documents = await hoadon.getBillByUser(req.params.id);
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Không thể lấy bill theo mã tài khoản người dùng  ${req.params.id}`,
        error
      )
    );
  }
};

exports.addHoadon = async (req, res, next) => {
  try {
    let documents = [];
    const hoadon = new HoaDonService(MongoDB.client);
    documents = await hoadon.addHoadon(req.body);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Khong the them hoa don", error));
  }
};

exports.addHoadonTaiQuay = async (req, res, next) => {
  try {
    let documents = [];
    const hoadon = new HoaDonService(MongoDB.client);
    documents = await hoadon.addHoadonTaiQuay(req.body);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Khong the them hoa don tai quay", error));
  }
};

exports.updateBillByUser = async (req, res, next) => {
  try {
    let documents;
    const hoadon = new HoaDonService(MongoDB.client);
    documents = await hoadon.updateBillByUser(req.params.id, req.body);
    // console.log('result', documents);
    return res.send(documents);
  } catch (error) {
    {
      return next(new ApiError(500, `Khong the chinh sua ${req.params.id}`, error));
    }
  }
};

exports.getSeatBySeat = async (req, res, next) => {
  try {
    let documents = [];
    // console.log("getSeatBySeat",req.body)
    const soghe = new HoaDonService(MongoDB.client);
    documents = await soghe.getSeatBySeat(req.body);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Khong the lay so luong ghe da ban", error));
  }
};

exports.Search = async (req, res, next) => {
  try {
    let documents = [];
    const search = new HoaDonService(MongoDB.client);
    documents = await search.Search(req.body);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, `Khong the tim ${req.body}`, error));
  }
};

exports.cancelBillById = async (req, res, next) => {
  try {
    let documents;
    const bill = new HoaDonService(MongoDB.client);
    documents = await bill.cancelBillById(req.body.id);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, `Khong the huy bill ${req.body.id}`, error));
  }
};
