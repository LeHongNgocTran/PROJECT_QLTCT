const { ObjectId } = require("mongodb");
const moment = require("moment");

class LichTrinhService {
  constructor(client) {
    this.lichtrinh = client.db().collection("chitiettuyentau");
  }

  async getAllLichTrinh() {
    const lichtrinh = await this.lichtrinh.find({});
    return await lichtrinh.toArray();
  }
  async filterDay(data) {
    let document;
    // console.log(moment(data.from).format("MM/DD/YYYY"));
    if (data.to === null && data.from !== null) {
      document = await this.lichtrinh.find({
        $expr: { $lte: [moment(data.from).format("YYYY-MM-DD"), "$title"] },
      });
      // console.log(document);
    } else if (data.from === null && data.to !== null) {
      // console.log(3);
      document = await this.lichtrinh.find({
        $expr: { $gte: [moment(data.to).format("YYYY-MM-DD"), "$title"] },
      });
    } else {
      document = await this.lichtrinh.find({
        $and: [
          { title: { $gte: moment(data.to).format("YYYY-MM-DD") } },
          { title: { $lte: moment(data.from).format("YYYY-MM-DD") } },
        ],
      });
    }
    return await document.toArray();
  }
}

module.exports = LichTrinhService;
