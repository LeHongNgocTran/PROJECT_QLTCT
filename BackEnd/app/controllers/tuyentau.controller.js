const TuyenTauService = require("../services/tuyentau.service");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const cloudinary = require("../../app/config/cloudinary.config");

exports.getAllTuyenTau = async (req, res, next) => {
  try {
    let documents = [];
    const tuyentau = new TuyenTauService(MongoDB.client);
    documents = await tuyentau.getAllTuyenTau();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "An error occurred while retrieving data"));
  }
};

exports.getAll = async (req,res,next) => {
  try{
    let documents = [];
    const TuyenTau = new TuyenTauService(MongoDB.client);
    documents = await TuyenTau.getAll();
    return res.send(documents);
  }
  catch(error){
    return (next(new ApiError(500,"An error occurred while retrieving ádasd")))
  }
}

exports.createTuyenTau = async (req, res, next) => {
  try {
    let document;
    // console.log(req.body);
    const TuyenTau = new TuyenTauService(MongoDB.client);
    const image = await cloudinary.uploader.upload(req.body.image,{
      folder: 'Tuyến tàu'
    });
    document = await TuyenTau.createTuyenTau({
      ...req.body,
      image: image.secure_url,
    });
    // document = await TuyenTau.createTuyenTau(req.body);
    return res.send(document);
  } catch (err) {
    return next(new ApiError(500, "An error occurred while creating"));
  }
};

exports.getTuyenTauById = async (req, res, next) => {
  try {
    let documents = [];
    const tuyentau = new TuyenTauService(MongoDB.client);
    documents = await tuyentau.getTuyenTauById(req.params.id);
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `An error occurred whil get tuyentau ${req.params.id}`,
        error
      )
    );
  }
};

exports.getAllThongTinTuyenTau = async (req, res, next) => {
  try {
    let documents = [];
    const tuyentau = new TuyenTauService(MongoDB.client);
    documents = await tuyentau.getAllThongTinTuyenTau();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "An error occurred while retrieving data"));
  }
};

exports.deleteTauByIdTheoTuyen = async (req, res, next) => {
  try {
    const tau = new TuyenTauService(MongoDB.client);
    const documents = await tau.deleteTauByIdTheoTuyen(req.params.id, req.body);
    return res.send(documents);
  } catch (err) {
    return next(new ApiError(500, "An occured an error while deleting"));
  }
};

exports.searchTuyenTauHoatDong = async (req, res, next) => {
  try {
    const tau = new TuyenTauService(MongoDB.client);
    const documents = await tau.searchTuyenTauHoatDong(req.params.id, req.body);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "ERROR SEARCH", error));
  }
};

exports.Search = async (req, res, next) => {
  try {
    const tau = new TuyenTauService(MongoDB.client);
    const documents = await tau.Search(req.params.id);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "ERROR SEARCH", error));
  }
};

exports.updateTuyenTau = async (req, res, next) => {
  try {
    const tau = new TuyenTauService(MongoDB.client);
    const documents = await tau.updateTuyenTau(req.params.id, req.body);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "ERROR SEARCH", error));
  }
};

exports.updateDisplayTuyenTau = async (req,res,next) => {
  try {
    const tau = new TuyenTauService(MongoDB.client);
    const document = await tau.updateDisplayTuyenTau(req.params.id,req.body);
    return res.send(document)
  }
  catch(err){
    return next(new ApiError(500,'ERROR updating',err));
  }
}