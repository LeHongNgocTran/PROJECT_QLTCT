const GiaVeTuyenTauService = require("../services/giavetuyentau.service");
const MongoDB = require("../utils/mongodb.util");

const ApiError = require("../api-error");

exports.getAllTuyenTau = async (req, res, next) => {
    try{
        let documents = [];
        const tuyentau = new GiaVeTuyenTauService(MongoDB.client);
        documents =await tuyentau.getAllTuyenTau();
        return res.send(documents);
    }
    catch(err){
        return next(new Error(500,'An error occurred while retrieving data'))
    }
}