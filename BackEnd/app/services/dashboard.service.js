const { ObjectId } = require("mongodb");
const moment = require("moment");
class DashboardService {
  constructor(client) {
    this.tuyentau = client.db().collection("tuyentau");
    this.tau = client.db().collection("tau");
    this.hoadon = client.db().collection("hoadon");
  }

  async getAllInfo(user) {
    // console.log(user);
    let sumCustomer = 0;
    let sumMoney = 0;
    let sumMoneyToDay = 0;
    let sumMoneyUser = 0;
    const tuyentau = await this.tuyentau.countDocuments({});
    const tau = await this.tau.countDocuments({});

    const soluonghanhkhach = await (await this.hoadon.find({})).toArray();
    soluonghanhkhach.forEach((element) => {
      sumCustomer += element.thongtinhanhkhach.length;
      sumMoney += element.tongtien;
      const today = new Date().getDay() + 1;
      const date = new Date(element.create_at).getDay() + 1;
      if (date === today) {
        sumMoneyToDay += element.tongtien;
      }
      return sumCustomer, sumMoney, sumMoneyToDay;
    });
    
    if (user.permission === 2) {
      const soluonghanhkhach = await (
        await this.hoadon.find({ mataikhoan: user.mataikhoan })
      ).toArray();
      soluonghanhkhach.forEach((element) => {
        const today = new Date().getDay();
        const date = new Date(element.create_at).getDay();
        if (date === today && element.mataikhoan === user.mataikhoan) {
          sumMoneyUser += element.tongtien;
        }
        return sumMoneyUser;
      });
    }

    const data = {
      tuyentau: tuyentau,
      tau: tau,
      hanhkhach: sumCustomer,
      doanhthu: sumMoney,
      doanhthutrongngay: sumMoneyToDay || 0,
      doanhthuUser : sumMoneyUser || 0
    };

    return data;
  }
}

module.exports = DashboardService;
