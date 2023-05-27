const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();
class ManagerService {
  constructor(client) {
    this.Manager = client.db().collection("taikhoan");
  }
  extractTaiKhoanData(payload) {
    const taikhoan = {
      mataikhoan: payload.mataikhoan,
      password: payload.matkhau,
      name: payload.name,
      email: payload.email,
      address: payload.address,
      date: payload.date,
      sex: payload.sex,
    };
    Object.keys(taikhoan).forEach(
      (key) => taikhoan[key] === undefined && delete taikhoan[key]
    );
    return taikhoan;
  }

  async getAllByPermission(data) {
    let getAll = [];
    if (data === "customer") {
      getAll = await this.Manager.find({ permission: 0 });
    } else if (data === "staff") {
      getAll = await this.Manager.find({ permission: { $ne: 0 } });
    }

    return await getAll.toArray();
  }

  async getDetailsUser(id) {
    let getAll = [];
    const newId = new ObjectId(id);
    getAll = await this.Manager.findOne({ _id: newId });
    return getAll;
  }

  async findAccountByPhone(account) {
    const findAccount = await this.Manager.findOne({
      "taikhoan.mataikhoan": account.mataikhoan,
      trangthai: true,
    });
    if (findAccount !== null) {
      const comparePassword = await bcrypt.compare(
        account.matkhau,
        findAccount.taikhoan.password
      );
      if (comparePassword === true) {
        return findAccount;
      } else return null;
    }

    return findAccount;
  }
  async registerForUser(data) {
    const error = false;
    //  console.log(3)
    if (data.position === "user") {
      // console.log(data.account.mataikhoan);
      const find = await this.Manager.findOne({
        "taikhoan.mataikhoan": data.account.mataikhoan,
      });
      if (find) {
        this.error = true;
      } else {
        const test = this.extractTaiKhoanData(data.account);
        const saltRounds = 10;
        const myPlaintextPassword = test.password;
        const passwordHash = await bcrypt.hash(myPlaintextPassword, saltRounds);
        const result = {
          taikhoan: {
            mataikhoan: test.mataikhoan,
            password: passwordHash,
          },
          name: test.name,
          email: test.email,
          address: test.address,
          date: test.date,
          sex: test.sex,
          permission: 0,
          image: "",
          create_at: new Date(),
          update_at: "",
          trangthai: true,
        };
        const register = await this.Manager.insertOne(result);
        this.error = false;
      }
    } else if (data.position === "staff") {
     
      const find = await this.Manager.findOne({
        "taikhoan.mataikhoan": data.info.mataikhoan,
      });
      if (find) {
        this.error = true;
      } else {
        let result;
        const saltRounds = 10;
        const myPlaintextPassword = data.info.password;
        const passwordHash = await bcrypt.hash(myPlaintextPassword, saltRounds);
        if (data.info.permission === 2) {
          result = {
            taikhoan: {
              mataikhoan: data.info.mataikhoan,
              password: passwordHash,
            },
            name: data.info.name,
            email: data.info.email,
            address: data.info.address,
            date: data.info.date,
            sex: data.info.sex,
            permission: data.info.permission,
            create_at: new Date(),
            update_at: "",
            trangthai: true,
            idPhongVe: data.info.IdPhongVe,
            image: data.image,
          };
        } else {
          result = {
            taikhoan: {
              mataikhoan: data.info.mataikhoan,
              password: passwordHash,
            },
            name: data.info.name,
            email: data.info.email,
            address: data.info.address,
            date: data.info.date,
            sex: data.info.sex,
            permission: data.info.permission,
            create_at: new Date(),
            update_at: "",
            trangthai: true,
            image: data.image,
          };
        }
        const register = await this.Manager.insertOne(result);
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          service: "Gmail",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });
        const info = {
          from: process.env.EMAIL,
          to: data.info.email,
          subject: "THÔNG TIN TÀI KHOẢN NHÂN VIÊN CÔNG TY ABC EXPRESS",
          html: `<div style="font-size: 20px;width:50%">
          <h5>Thông tin đăng nhập vào hệ thống của bạn: </h5>
          <table>
            <tr style="margin-bottom:20px">
              <td style='padding: 10px'>Mã tài khoản:</td>
              <td>
                <strong>${data.info.mataikhoan}</strong>
              </td>
            </tr>
            <tr>
              <td style='padding: 10px'>Mật khẩu:</td>
              <td>
                <strong>${data.info.password}</strong>
              </td>
            </tr>
          </table>
          <h5>
            <strong style="color:red">Lưu ý:  </strong>
            Vui lòng giữ thông tin tài khoản tuyệt đối, không chia sẻ với bất kỳ ai. Nếu như bị
            phát hiện, tài khoản của bạn sẽ bị khóa và sẽ bị kỷ luật theo
            quy định của công ty
          </h5>
        </div>`,
        };
        transporter.sendMail(info, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("Message sent: " + info.response);
          }
        });
        this.error = false;
      }
    }
    return this.error;
  }
  async Search(data) {
    let result = [];
    if (data.user === "customer") {
      result = await this.Manager.find({
        "taikhoan.mataikhoan": data.infor,
        permission: 0,
      });
    }
    if (data.user === "staff") {
      result = await this.Manager.find({
        "taikhoan.mataikhoan": data.infor,
      });
    }
    if (data.infor === "") {
      if (data.user === "customer") {
        result = await this.Manager.find({
          permission: 0,
        });
      }
      if (data.user === "staff") {
        result = await this.Manager.find({
          permission: { $ne: 0 },
        });
      }
    }
    // console.log(data);
    // console.log(await result.toArray())
    return await result.toArray();
  }

  async updateInfoUser(data) {
    let document;
    // console.log(data.image!=='');
    if (data.image !== '' && data.image !== undefined) {
      const id = new ObjectId(data.data._id);
      document = await this.Manager.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            image: data?.image ? data.image : data.data.image,
            email: data.data.email,
            name: data.data.name,
            address: data.data.address,
            permission: data.data.permission,
            update_at: new Date(),
          },
        }
      );
    }
    // Khóa tài khoản 
    else if (data.trangthai === true || data.trangthai === false) {
      const id = new ObjectId(data.id);
      document = await this.Manager.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            trangthai: data.trangthai,
            update_at: new Date(),
          },
        }
      );
    } else {
      // console.log('zxcvbn',data.data._id);
      const id = new ObjectId(data.data._id);
      document = await this.Manager.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            email: data.data.email,
            name: data.data.name,
            address: data.data.address,
            permission: data.data.permission !== 0 ? data.data.permission : 0,
            update_at: new Date(),
          },
        }
      );
    }

    return document.acknowledged;
  }

  // Xóa người dùng
  async deleteAccount(data) {
    const newId = new ObjectId(data);
    const document = await this.Manager.deleteOne({ _id: newId });
    return document.acknowledged;
  }
}

module.exports = ManagerService;
