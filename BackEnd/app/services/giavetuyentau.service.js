const {ObjectId} = require("mongodb");

class GiaVeTuyenTauService {

    constructor(client){
        this.TuyenTau = client.db().collection("thongtintuyentau")
    }

    async getAllTuyenTau(){
        const documents = await this.TuyenTau.find();
        return await documents.toArray();
    }
}
module.exports = GiaVeTuyenTauService;