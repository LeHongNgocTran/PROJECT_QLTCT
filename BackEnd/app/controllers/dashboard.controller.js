const DashboardService = require("../services/dashboard.service");
const MongoDB = require("../utils/mongodb.util");

const ApiError = require("../api-error");

exports.getAllInfo = async (req, res, next) => {
    try{
        let documents = [];
        const getAll = new DashboardService(MongoDB.client);
        documents =await getAll.getAllInfo(req.body);
        return res.send(documents);
    }
    catch(err){
        return next(new Error(500,'An error occurred while retrieving data'))
    }
}