const TauService = require("../services/tau.service");
const MongoDB = require("../utils/mongodb.util");

const ApiError = require("../api-error");

exports.getAll = async (req, res, next) => {
  try {
    let documents = [];
    const tau = new TauService(MongoDB.client);
    documents = await tau.getAllTau();
    if (documents != null) {
      return res.send(documents);
    } else return res.send({ error: true });
  } catch (error) {
    return next(new ApiError(500, "An occured an error while retrieving"));
  }
};

exports.getAllTauTheoTuyen = async (req, res, next) => {
  try {
    let documents = [];
    const tau = new TauService(MongoDB.client);
    documents = await tau.getAllTauTheoTuyen(req.params.id);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "An occured an error while retrieving"));
  }
};

exports.updateTrangThai = async (req, res, next) => {
  try {
    let documents = [];
    // console.log('updateTrangThai',req.body);
    const tau = new TauService(MongoDB.client);
    documents = await tau.updateTrangThai(req.body);
    if (documents === true) {
      return res.send("success");
    } else return res.send("error");
  } catch (error) {
    return next(
      new ApiError(500, "An occured error occurred while updating ship")
    );
  }
};

exports.updateTauthuocTuyenTau = async (req, res, next) => {
  try {
    const tau = new TauService(MongoDB.client);
    const document = await tau.updateTauthuocTuyenTau(req.body);
    return res.send(document);
  } catch (err) {
    return next(
      new ApiError(500, "An occured error while updating Tau follow Tuyen", err)
    );
  }
};

exports.createTimeTau = async (req, res, next) => {
  let documents = [];
  try {
    const tau = new TauService(MongoDB.client);
    documents = await tau.createTimeTau(req.body);
    if (documents === true) {
      return res.send("success");
    } else return res.send("error");
  } catch (error) {
    return next(new ApiError(500, "An occurred error while createtimetau "));
  }
};

exports.deleteTimeTau = async (req, res, next) => {
  try {
    const document = new TauService(MongoDB.client);
    const message = await document.deleteTimeTau(req.params.id);
    return res.send(message);
  } catch (err) {
    return next(
      new ApiError(500, "An occurred error while deleteTimeTau", err)
    );
  }
};

exports.updateTimeTauById = async (req, res, next) => {
  try {
    // console.log(req.body);
    const document = new TauService(MongoDB.client);
    const message = await document.updateTimeTauById(req.body);
    return res.send(message);
  } catch (error) {
    return next(new ApiError(500, "An occured error while updating", error));
  }
};

exports.getAllTimeTauById = async (req, res, next) => {
  try {
    // console.log("start");
    // console.log(req.params.id, req.body);
    const documents = new TauService(MongoDB.client);
    const time = await documents.getAllTimeTauById(req.params.id, req.body);
    return res.send(time);
  } catch (error) {
    return next(new ApiError(500, "An occurred error while gettime"));
  }
};

exports.getInforTauById = async (req, res, next) => {
  try {
    const documents = new TauService(MongoDB.client);
    const time = await documents.getInforTauById(req.params.id);
    return res.send(time);
  } catch (error) {
    return next(new ApiError(500, "An occurred error while gettime"));
  }
};

exports.ThemTau = async (req, res, next) => {
  try {
    const document = new TauService(MongoDB.client);
    const add = await document.ThemTau(req.body);
    return res.send(add);
  } catch (err) {
    return next(new ApiError(500, "An error occurred add", err));
  }
};

exports.EditInfoAboutTau = async (req,res,next) => {
  try {
    // console.log('edit');
    const document = new TauService(MongoDB.client);
    const edit = await document.EditInfoAboutTau(req.body) ;
    return res.send(edit);
  }
  catch(err) {
    return next(new ApiError(500, "An error occurred edit", err));
  }
}

exports.Search  = async (req,res,next) => {
  try{
    const document = new TauService(MongoDB.client);
    // console.log(req.params.id)
    const search = await document.Search(req.params.id);
    // console.log(search)
    return res.send(search);
  }
  catch(error){
    return next(new ApiError(500, "An error occurred search",error));
  }
}