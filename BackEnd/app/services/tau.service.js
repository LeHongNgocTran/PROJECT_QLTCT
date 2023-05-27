const { ObjectId } = require("mongodb");
const moment = require("moment");
class TauService {
  constructor(client) {
    this.Tau = client.db().collection("tau");
    this.TuyenTau = client.db().collection("tuyentau");
    this.chitietTuyenTau = client.db().collection("chitiettuyentau");
  }
  extractTauData(payload) {
    const tau = {
      matau: payload.matau,
      nhanhieu: payload.nhanhieu,
      vantoc: payload.nhanhieu,
      taitrong: payload.taitrong,
      soluongghe: payload.soluongghe,
      matuyentau: [],
    };
    Object.keys(tau).forEach(
      (key) => tau[key] === undefined && delete tau[key]
    );
    return tau;
  }
  // Lấy tất cả các tàu theo tuyến
  async getAllTauTheoTuyen(data) {
    // console.log("getAllTauTheoTuyen");
    const document = await this.Tau.find({
      matuyentau: { $elemMatch: { matuyentau: data } },
    });
    const documents = await this.Tau.find({
      "matuyentau.matuyentau": { $ne: data },
    });
    const result = {
      tauthuoctuyen: await document.toArray(),
      taukhongthuoctuyen: await documents.toArray(),
    };
    return result;
  }

  // Thêm  tàu vào tuyến tàu
  async updateTauthuocTuyenTau(data) {
    // console.log(data);
    let document;
    // console.log("updateTauthuocTuyenTau", data.type);
    if (data.type === "add") {
      document = await this.Tau.updateOne(
        {
          matau: data.tau,
        },
        {
          $push: {
            matuyentau: {
              matuyentau: data.id,
              trangthaitau: data.trangthai,
            },
          },
        }
      );
    } else if (data.type === "update") {
      document = await this.Tau.updateOne(
        {
          matau: data.tau,
          "matuyentau.matuyentau": data.id,
        },
        {
          $set: {
            "matuyentau.$.trangthaitau": data.trangthai,
          },
        }
      );
    }
    return document;
  }

  async getAllTau() {
    // console.log("getAllTau");
    const document = await this.Tau.find({});
    return await document.toArray();
  }

  // Cập nhật trạng thái của tàu theo tuyến tàu
  // Nếu tuyến tàu chuyển sang trạng thái dừng thì tất cả các tàu thuộc tuyến đó phải chuyển sang trạng thái dừng
  // Thời gian hoạt động trong ngày của tuyến đó phải chuyển sang dừng (chưa set)

  async updateTrangThai(data) {
    // console.log("updateTrangThai");
    const documents = await this.TuyenTau.updateMany(
      { matuyentau: data.id },
      {
        $set: {
          trangthai: data.hoatdong,
        },
      }
    );
    const document = await this.Tau.updateMany(
      {
        matuyentau: {
          $elemMatch: {
            matuyentau: data.id,
          },
        },
      },
      {
        $set: {
          "matuyentau.$.trangthaitau": data.hoatdong,
        },
      }
    );
    return await document.acknowledged;
  }
  // Tạo thời gian hoạt động của tàu theo tuyến tàu
  async createTimeTau(data) {
    const findTau = await this.Tau.findOne({matau: data.matau});
    const document = await this.chitietTuyenTau.insertOne({
      loaichuyen: data.loaichuyen,
      matau: data.matau,
      matuyentau: data.matuyentau,
      day: data.day,
      timeStart: data.timeStart,
      timeEnd: data.timeEnd,
      title: data.title,
      dayEnd: data.dayEnd,
      trangthaitau: true,
      chitietghengoi: {
        soluongghe: findTau.soluongghe,
        soghebanduoc : [],
        tinhtrangghe : 0
      }
    });
    return await document.acknowledged;
  }
  // Xóa thời gian chạy của tàu theo tuyến
  async deleteTimeTau(data) {
    // console.log("deleteTimeTau");
    const document = await this.chitietTuyenTau.deleteOne({
      title: data,
    });
    return document.acknowledged;
  }

  // Cập nhật thời gian chạy của tàu theo tuyến
  async updateTimeTauById(data) {
    // console.log("updateTimeTauById");
    const document = await this.chitietTuyenTau.updateOne(
      {
        title: data.oldtitle,
      },
      {
        $set: {
          day: data.day,
          timeStart: data.timeStart,
          timeEnd: data.timeEnd,
          title: data.title,
          dayEnd: data.dayEnd,
        },
      }
    );
    return await document.acknowledged;
  }
  // Lấy thông tin tàu theo id
  async getInforTauById(id) {
    // console.log("getInforTauById");
    const document = await this.Tau.findOne({ matau: id });
    return document;
  }

  // Lấy tất cả thời gian của tàu theo mã tàu, và mã tuyến tàu
  async getAllTimeTauById(id, data) {
    let document;
    if (Object.keys(data).length === 0) {
      document = await this.chitietTuyenTau.find({ matau: id });
    } else {
      // Lấy theo mã tàu và mã tuyến tàu
      document = await this.chitietTuyenTau.find({
        matau: id,
        matuyentau: data.matuyentau,
      });
    }
    return await document.toArray();
  }

  async ThemTau(data) {
    // console.log("ThemTau");
    const check = this.extractTauData(data);
    const find = await this.Tau.findOne({ matau: check.matau });
    let error = true;
    if (find !== null) {
      error = true;
    } else {
      await this.Tau.insertOne({
        ...check,
        create_at: moment().format(),
        update_at: "",
      });
      error = false;
    }
    return error;
  }

  async EditInfoAboutTau(test) {

    const data = this.extractTauData(test);
    const document = await this.Tau.updateOne(
      {
        matau: data.matau,
      },
      {
        $set: {
          nhanhieu: data.nhanhieu,
          vantoc: data.vantoc,
          taitrong: data.taitrong,
          soluongghe: Number.parseInt(data.soluongghe, 10),
          update_at: moment().format()
        },
      }
    );
    // console.log(document);
    return document.acknowledged;
  }
  async Search(data){
    // console.log(data);
    const document = await this.Tau.find({matau: data});
    // console.log(await document.toArray());
    return await document.toArray()
  }
}

module.exports = TauService;
