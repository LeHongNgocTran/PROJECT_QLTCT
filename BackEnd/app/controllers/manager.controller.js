const ManagerService = require("../services/app.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const uploadCloud = require("../config/cloudinary.config");
const cloudinary = require("../../app/config/cloudinary.config");
exports.getAllByPermission = async (req, res, next) => {
  try {
    let documents = [];
    const managerService = new ManagerService(MongoDB.client);
    documents = await managerService.getAllByPermission(req.params.data);
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving documents managers")
    );
  }
};

exports.getDetailsUser = async (req, res, next) => {
  try {
    let documents = [];
    const managerService = new ManagerService(MongoDB.client);
    documents = await managerService.getDetailsUser(req.body);
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retriing this user", error)
    );
  }
};

exports.findAccountByPhone = async (req, res, next) => {
  let documents = [];
  try {
    const managerService = new ManagerService(MongoDB.client);
    documents = await managerService.findAccountByPhone(req.body);
    if (documents !== null) {
      return res.send({ documents });
    } else {
      return res.send({ error: "Sai số điện thoại hoặc mật khẩu" });
    }
  } catch (err) {
    return next(
      new ApiError(500, "An error occurred while searching for a name", err)
    );
  }
};

exports.register = async (req, res, next) => {
  try {
    let document;
    const taikhoanService = new ManagerService(MongoDB.client);
    if (req.body?.image === undefined) {
      document = await taikhoanService.registerForUser(req.body);
    } else {
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder: "User",
      });
      document = await taikhoanService.registerForUser({
        ...req.body,
        image: result.secure_url,
      });
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An operation error occurred while registering", error)
    );
  }
};
exports.Search = async (req, res, next) => {
  try {
    let document = [];
    const taikhoanService = new ManagerService(MongoDB.client);
    document = await taikhoanService.Search(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An operation error occurred while registering", error)
    );
  }
};

exports.updateInfoUser = async (req, res, next) => {
  try {
    const taikhoanService = new ManagerService(MongoDB.client);
    let document;
    if (req.body.image !== '' && req.body.image !== undefined) {
      // console.log(1);
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder: "User",
      });
      document = await taikhoanService.updateInfoUser({
        data: req.body,
        image: result.secure_url,
      });
    } 
    // Cập nhật hình ảnh
    else if (req.body.image === '' ) {
      // console.log(2);
      document = await taikhoanService.updateInfoUser({
        data: req.body,
      });
    }
     else if (req.body.trangthai === false || req.body.trangthai === true) {
      // console.log(3);
      document = await taikhoanService.updateInfoUser(req.body);
    } else {
      // console.log(4);
      document = await taikhoanService.updateInfoUser(req.body);
    }
    return res.send(document);
  } catch (error) {
    console.log('error',error);
    return next(
      new ApiError(
        500,
        "An operation error occurred while update info user",
        error
      )
    );
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    const taikhoanService = new ManagerService(MongoDB.client);
    const document = await taikhoanService.deleteAccount(req.params.data);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        500,
        ` An operation error occurred while delete this user ${req.params.data}`,
        error
      )
    );
  }
};
