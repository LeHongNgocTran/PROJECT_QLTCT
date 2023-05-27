const { ObjectId } = require("mongodb");

class PhongVeService {
  constructor(client) {
    this.PhongVe = client.db().collection("phongve");
    this.HoaDon = client.db().collection("hoadon");
  }

  async getAllPhongVe() {
    const documents = await this.PhongVe.find();
    return await documents.toArray();
  }
  async getPhongVeById(id) {
    // const newId = new ObjectId(id);
    const documents = await this.PhongVe.findOne({ idPhongVe: id });
    return documents;
  }
  async DoanhThuById(id) {
    let sum = 0;
    const documents = await (
      await this.HoaDon.find({ idPhongVe: id })
    ).toArray();
    if (documents.length === 0) {
      sum = 0;
    } else {
      documents.forEach((element) => {
        sum = sum + element.tongtien;
        return sum;
      });
    }
    return sum;
  }
  async getAllDoanhThu() {
    let doanhthu = 0;
    let doanhthutrongngay = 0;
    const allDoanhThu = await (await this.HoaDon.find({})).toArray();
    allDoanhThu.forEach((element) => {
      doanhthu += element.tongtien;
      const today = new Date().getDay() + 1;
      const date = new Date(element.create_at).getDay() + 1;
      if (date === today) {
        doanhthutrongngay += element.tongtien;
      }
      return doanhthu, doanhthutrongngay;
    });

    return { doanhthu: doanhthu, doanhthutrongngay: doanhthutrongngay };
  }
}

module.exports = PhongVeService;
