const { ObjectId } = require("mongodb");
const moment = require("moment");
class TuyenTauService {
  constructor(client) {
    this.TuyenTau = client.db().collection("tuyentau");
    this.Tau = client.db().collection("tau");
    this.chitietTuyenTau = client.db().collection("chitiettuyentau");
    this.thongtintuyentau = client.db().collection("thongtintuyentau");
  }

  extractTuyenTauFollowTau(payload) {
    const TuyenTauFollowTau = {
      diemdi: payload.diemdi.trim(),
      diemden: payload.diemden.trim(),
      loai: payload.loai1.trim(),
      taitrong: payload.taitrong.trim(),
      vantoc: payload.vantoc.trim(),
      create_at: new Date(),
      trangthai: true,
      update_at: "",
      giavehanhkhach: [
        {
          label: "Người lớn",
          gia: Number(payload.giavenguoilon),
        },
        {
          label: "Người cao tuổi (từ 60 tuổi trở lên, áp dụng cho công dân VN)",
          gia: Number(payload.giavenguoicaotuoi),
        },
        {
          label: "Người khuyết tật (áp dụng cho công dân VN)",
          gia: Number(payload.nguoikhuyettat),
        },
        {
          label: "Trẻ em (Từ 6-11 tuổi tính theo năm sinh)",
          gia: Number(payload.treem),
        },
      ],
    };
    Object.keys(TuyenTauFollowTau).forEach(
      (key) =>
        TuyenTauFollowTau[key] === undefined && delete TuyenTauFollowTau[key]
    );
    return TuyenTauFollowTau;
  }
  extractThongTinTuyenTauFollowTau(payload) {
    const ThongTinTuyenTauFollowTau = {
      diemdi: payload.diemdi.trim(),
      diemden: payload.diemden.trim(),
      loai1: payload.loai1,
      loaitau: payload.loaitau.trim().toUpperCase(),
      taitrong: payload.taitrong.trim(),
      vantoc: payload.vantoc.trim(),
      trangthai: true,
      create_at: new Date(),
      update_at: "",
      giokhoihanh1: payload.giokhoihanh1,
      giokhoihanh2: payload.giokhoihanh1,
      giocapben1: payload.giocapben1,
      giocapben2: payload.giocapben1,
    };
    Object.keys(ThongTinTuyenTauFollowTau).forEach(
      (key) =>
        ThongTinTuyenTauFollowTau[key] === undefined &&
        delete ThongTinTuyenTauFollowTau[key]
    );
    return ThongTinTuyenTauFollowTau;
  }
  extractTuyenTauFollowPha(payload) {
    const TuyenTauFollowPha = {
      loai: payload.loai2.trim(),
      diemdi: payload.diemdi.trim(),
      diemden: payload.diemden.trim(),
      trangthai: true,
      taitrong: payload.taitrong.trim(),
      vantoc: payload.vantoc.trim(),
      create_at: new Date(),
      update_at: "",
      giavehanhkhach: [
        {
          label: "Người lớn",
          gia: Number(payload.giavenguoilon),
        },
        {
          label: "Người cao tuổi (từ 60 tuổi trở lên, áp dụng cho công dân VN)",
          gia: Number(payload.giavenguoicaotuoi),
        },
        {
          label: "Người khuyết tật (áp dụng cho công dân VN)",
          gia: Number(payload.nguoikhuyettat),
        },
        {
          label: "Trẻ em (Từ 6-11 tuổi tính theo năm sinh)",
          gia: Number(payload.treem),
        },
      ],
      giavexe: [
        {
          label: "Xe máy",
          gia: Number(payload.xemay),
        },
        {
          label: "Xe ô tô từ 4-5 chỗ",
          gia: Number(payload.xe4cho),
        },
        {
          label: "Xe ô tô trên 9 đến 16 chỗ",
          gia: Number(payload.xe16cho),
        },
        {
          label: "Xe ô tô trên 16 đến 25 chỗ",
          gia: Number(payload.xe25cho),
        },
      ],
      giavexetai: [
        {
          label: "Xe ba gác (thô sơ)",
          gia: Number(payload.xebagac),
        },
        {
          label: "Xe tải 500kg - dưới 1.5 tấn",
          gia: Number(payload.xetai500),
        },
        {
          label: "Xe tải 1.5 tấn - dưới 2.5 tấn",
          gia: Number(payload.xetai15),
        },
        {
          label: "Xe tải 2.5 tấn - dưới 3.5 tấn",
          gia: Number(payload.xetai25),
        },
      ],
      giavecontainer: [
        {
          label: "Container 20 feet",
          gia: Number(payload.container20),
        },
        {
          label: "Container 40 feet",
          gia: Number(payload.container40),
        },
        {
          label: "Container 45 feet",
          gia: Number(payload.container45),
        },
      ],
    };
    Object.keys(TuyenTauFollowPha).forEach(
      (key) =>
        TuyenTauFollowPha[key] === undefined && delete TuyenTauFollowPha[key]
    );
    return TuyenTauFollowPha;
  }
  extractThongTinTuyenTauFollowPha(payload) {
    const ThongTinTuyenTauFollowPha = {
      diemdi: payload.diemdi.trim(),
      diemden: payload.diemden.trim(),
      loai2: payload.loai2,
      loaipha: payload.loaipha.trim().toUpperCase(),
      taitrong: payload.taitrong.trim(),
      vantoc: payload.vantoc.trim(),
      trangthai: true,
      create_at: new Date(),
      update_at: "",
      giokhoihanh1: payload.giokhoihanh1,
      giokhoihanh2: payload.giokhoihanh1,
      giocapben1: payload.giocapben1,
      giocapben2: payload.giocapben1,
    };
    Object.keys(ThongTinTuyenTauFollowPha).forEach(
      (key) =>
        ThongTinTuyenTauFollowPha[key] === undefined &&
        delete ThongTinTuyenTauFollowPha[key]
    );
    return ThongTinTuyenTauFollowPha;
  }
  async getAllTuyenTau() {
    const documents = await this.TuyenTau.find();
    return await documents.toArray();
  }
  async getAll() {
    const documents = await this.TuyenTau.aggregate([
      {
        $lookup: {
          from: "thongtintuyentau",
          localField: "matuyentau",
          foreignField: "matuyentau",
          as: "info",
        },
      },
      { $unwind: "$info" },
    ]);
    return await documents.toArray();
  }
  async createTuyenTau(data) {
    // console.log(1,data);
    if (data.loaipha === "") {
      // console.log(2);
      const diemdi = (
        data.diemdi.trim().substr(0, 1) +
        data.diemdi
          .trim()
          .substr(data.diemdi.search(" "), data.diemdi.search("") + 2)
          .trim()
      ).trim();
      const diemden = (
        data.diemden.trim().substr(0, 1) +
        data.diemden
          .trim()
          .substr(data.diemden.search(" "), data.diemden.search("") + 2)
          .trim()
      ).trim();
      const countDocument = (await this.TuyenTau.countDocuments()) + 1;
      const matuyentau = "MTT" + diemdi + diemden + countDocument;
      const payload = this.extractTuyenTauFollowTau(data);
      const result = {
        ...payload,
        matuyentau: matuyentau,
      };
      const thongtintuyentau = this.extractThongTinTuyenTauFollowTau(data);
      const resultThongtin = {
        ...thongtintuyentau,
        matuyentau: matuyentau,
        hinhanhmota: data.image,
      };
      const insertTuyenTauCollection = await this.TuyenTau.insertOne(result);
      const insertThongTinTuyenTau = await this.thongtintuyentau.insertOne(
        resultThongtin
      );
    } else {
      const diemdi = (
        data.diemdi.trim().substr(0, 1) +
        data.diemdi
          .trim()
          .substr(data.diemdi.search(" "), data.diemdi.search("") + 2)
          .trim()
      ).trim();
      const diemden = (
        data.diemden.trim().substr(0, 1) +
        data.diemden
          .trim()
          .substr(data.diemden.search(" "), data.diemden.search("") + 2)
          .trim()
      ).trim();
      const countDocument = (await this.TuyenTau.countDocuments()) + 1;
      const matuyenpha = "MTP" + diemdi + diemden + countDocument;
      const payload = this.extractTuyenTauFollowPha(data);
      const result = {
        ...payload,
        matuyentau: matuyenpha,
      };
      const thongtintuyentau = this.extractThongTinTuyenTauFollowPha(data);
      const resultThongtin = {
        ...thongtintuyentau,
        matuyenpha: matuyenpha,
        hinhanhmota: data.image,
      };
      // console.log("TuyenPha", result, "ThongTinTuyenPha", thongtintuyentau);
      const insertTuyenTauCollection = await this.TuyenTau.insertOne(result);
      const insertThongTinTuyenTau = await this.thongtintuyentau.insertOne(
        resultThongtin
      );
    }
  }

  async getAllThongTinTuyenTau() {
    const documents = await this.thongtintuyentau.find({ trangthai: true });
    return await documents.toArray();
  }

  async getTuyenTauById(id) {
    const documents = await this.TuyenTau.findOne({ matuyentau: id });
    return await documents;
  }
  async deleteTauByIdTheoTuyen(id, data) {
    // console.log('deleteTauByIdTheoTuyen');
    const now = moment().format("YYYY-MM-DD");
    console.log(id, data, now);

    const deleteThoiGianTau = await this.chitietTuyenTau.deleteMany({
      $expr: { $lt: [now, "$title"] },
      matuyentau: id,
      matau: data.matau,
    });

    const updateTuyenTaucuaTau = await this.Tau.updateOne(
      {
        matau: data.matau,
      },
      {
        $pull: {
          matuyentau: { matuyentau: id },
        },
      }
    );
    // console.log(updateTuyenTaucuaTau)
    return updateTuyenTaucuaTau.acknowledged;
  }

  async searchTuyenTauHoatDong(matuyentau, time) {
    // console.log(matuyentau, time);
    const cost = await this.TuyenTau.findOne({
      matuyentau: matuyentau,
    });
    const search1 = await this.chitietTuyenTau.find({
      matuyentau: matuyentau,
      day: time.dayStart,
      loaichuyen: "Xuất phát",
    });
    var result = {
      giavetuyentau: cost,
      motchieu: await search1.toArray(),
    };
    // console.log(1, result);
    // console.log(time.loaive);
    if (time.loaive === "Hai chiều" || time.loaive === "Khứ hồi") {
      const search2 = await this.chitietTuyenTau.find({
        matuyentau: matuyentau,
        day: time.dayEnd,
        loaichuyen: "Trở về",
      });
      var newResult = {
        ...result,
        haichieu: await search2.toArray(),
      };
      return newResult;
    }
    // console.log(result);
    return result;
  }

  async Search(data) {
    const document = this.TuyenTau.find({ matuyentau: data });
    return document.toArray();
  }

  async updateTuyenTau(matuyentau, data) {
    if (data?.trangthai !== null) {
      // console.log("updateTuyenTau", data.trangthai);
      const document = await this.TuyenTau.findOneAndUpdate(
        {
          matuyentau: matuyentau,
        },
        {
          $set: {
            trangthai: data.trangthai,
          },
        }
      );

      const tau = await this.Tau.updateMany(
        {
          matuyentau: {
            $elemMatch: {
              matuyentau: matuyentau,
            },
          },
        },
        {
          $set: {
            "matuyentau.$.trangthaitau": data.trangthai,
          },
        }
      );
    }
  }
  async updateDisplayTuyenTau(id, data) {
    const tau = await this.thongtintuyentau.findOneAndUpdate(
      {
        matuyentau: id,
      },
      {
        $set: {
          trangthai: data.trangthai,
        },
      }
    );
    // console.log(tau);
  }
}

module.exports = TuyenTauService;
