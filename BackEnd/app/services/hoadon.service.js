const { ObjectId } = require("mongodb");

const fs = require("fs");
const pdf = require("html-pdf");
const path = require("path");
const nodemailer = require("nodemailer");
const pdfTemplateForOneWay = require("../template/boadingPass");
const pdfTemplateTwoWay = require("../template/TicketTwoWay");
require("dotenv").config();
// const { EMAIL, PASSWORD } = require("../../env");

const {
  templateMailSendOneWay,
  bodyMail,
} = require("../template/templateMailSendOneWay");

const {
  bodyMailCancel,
  templateCancelBill,
} = require("../template/templateMailCancelBill");
const {
  templateMailUpdateBill,
  bodyMailUpdate,
} = require("../template/templateMailUpdate");

const {
  templateMailUpdateBillBack,
  bodyMailUpdateBack,
} = require("../template/templateMailUpdateTwoWay");

const {
  bodyMailTwoWay,
  templateMailSendTwoWay,
} = require("../template/templateMailSendTwoWay");

class HoaDonService {
  constructor(client) {
    this.HoaDon = client.db().collection("hoadon");
    this.ChiTietTuyenTau = client.db().collection("chitiettuyentau");
    this.TuyenTau = client.db().collection("tuyentau");
  }

  async getAllBill() {
    return (await this.HoaDon.find()).toArray();
  }

  async getBillById(id) {
    const newId = new ObjectId(id);
    const document = await this.HoaDon.findOne({ _id: newId });
    const diadiem = await this.TuyenTau.findOne({
      matuyentau: document.matuyentaudi,
    });
    const data = {
      data: document,
      diadiem: diadiem,
    };
    return data;
  }

  async getBillByUser(id) {
    const document = await this.HoaDon.find({ mataikhoan: id });
    return await document.toArray();
  }

  async addHoadon(data) {
    // console.log(process.env.EMAIL,process.env.PASSWORD)
    let soghedaban = [];

    let soghe = data.thongtinhanhkhach.forEach((value) => {
      return soghedaban.push(value.vitringoi);
    });

    await this.ChiTietTuyenTau.updateOne(
      {
        matau: data.matau,
        matuyentau: data.matuyentaudi,
        title: data.thoigiandi,
      },
      {
        $push: {
          "chitietghengoi.soghebanduoc": { $each: soghedaban },
        },
      }
    );

    const diadiem = await this.TuyenTau.findOne({
      matuyentau: data.matuyentaudi,
    });
    // // Thêm hóa đơn

    const addBill = await this.HoaDon.insertOne(data);

    if (data.loaive === "Một chiều") {
      const body = bodyMail(data);
      const message = templateMailSendOneWay(data, diadiem, body);
      pdf
        .create(pdfTemplateForOneWay(data, diadiem), {})
        .toFile("invoice.pdf", (err) => {
          if (err) {
            console.log(err);
          } else {
            const pathToAttachment = path.join(
              "E:/LVTN/Project/BackEnd/",
              "invoice.pdf"
            );
            let attachment = fs
              .readFileSync(pathToAttachment)
              .toString("base64");

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
              from: process.env.EMAIL, //sender,
              to: data.email, //to
              subject: "THÔNG BÁO CHUYẾN TÀU CAO TỐC SUPERDONG",
              html: message,
              attachments: [
                {
                  content: attachment,
                  filename: "invoice.pdf",
                  contentType: "application/pdf",
                  path: pathToAttachment,
                  disposition: "attachment",
                },
              ],
            };
            transporter.sendMail(info, function (err, info) {
              if (err) {
                console.log(err);
              } else {
                console.log("Message sent:" + info.response);
              }
            });
          }
        });
    } else {
      const body = bodyMailTwoWay(data);
      const message = templateMailSendTwoWay(data, diadiem, body);
      pdf
        .create(pdfTemplateForOneWay(data, diadiem), {})
        .toFile("invoice.pdf", (err) => {
          if (err) {
            console.log(err);
          } else {
            pdf
              .create(pdfTemplateTwoWay(data, diadiem, {}))
              .toFile("invoiceBack.pdf", (err) => {
                if (err) {
                  console.log(err);
                } else {
                  const pathToAttachment = path.join(
                    "E:/LVTN/Project/BackEnd/",
                    "invoice.pdf"
                  );
                  let attachment = fs
                    .readFileSync(pathToAttachment)
                    .toString("base64");
                  const pathToAttachmentBack = path.join(
                    "E:/LVTN/Project/BackEnd/",
                    "invoiceBack.pdf"
                  );
                  let attachmentBack = fs
                    .readFileSync(pathToAttachmentBack)
                    .toString("base64");
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
                    from: process.env.EMAIL, //sender,
                    to: data.email, //to
                    subject: "THÔNG BÁO CHUYẾN TÀU CAO TỐC SUPERDONG",
                    html: message,
                    attachments: [
                      {
                        content: attachment,
                        filename: "invoice.pdf",
                        contentType: "application/pdf",
                        path: pathToAttachment,
                        disposition: "attachment",
                      },
                      {
                        content: attachmentBack,
                        filename: "invoiceBack.pdf",
                        contentType: "application/pdf",
                        path: pathToAttachmentBack,
                        disposition: "attachment",
                      },
                    ],
                  };
                  transporter.sendMail(info, function (err, info) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("Message sent:" + info.response);
                    }
                  });
                }
              });

            // console.log(2);
          }
        });
    }
  }

  async addHoadonTaiQuay(data) {
    const tienthua = data.tienkhachdua - data.tongtien;
    // console.log(data);
    let soghedaban = [];

    let soghe = data.thongtinhanhkhach.forEach((value) => {
      return soghedaban.push(value.vitringoi);
    });

    await this.ChiTietTuyenTau.updateOne(
      {
        matau: data.matau,
        matuyentau: data.matuyentaudi,
        title: data.thoigiandi,
      },
      {
        $push: {
          "chitietghengoi.soghebanduoc": { $each: soghedaban },
        },
      }
    );
    const documents = await this.HoaDon.countDocuments({});
    const thongtin = {
      ...data,
      tienthua,
      orderId: "FERRYORD" + documents,
      check: true,
      create_at: new Date(),
    };
    const add = await this.HoaDon.insertOne(thongtin);
    return add.insertedId;
  }

  async getSeatBySeat(data) {
    // console.log("seat", data);
    const result = await this.ChiTietTuyenTau.findOne({
      matuyentau: data.matuyentau,
      title: data.thoigian,
      matau: data.matau,
    });

    // console.log(result.chitietghengoi.soghebanduoc);
    return result.chitietghengoi.soghebanduoc;
  }

  async Search(data) {
    let result = [];
    if (data.sodienthoai === "") {
      result = await this.HoaDon.find({});
    } else result = await this.HoaDon.find({ sodienthoai: data.sodienthoai });
    return result.toArray();
  }

  async cancelBillById(data) {
    // console.log(data);
    let ghedi = [];
    let ghekhuhoi = [];
    const newId = new ObjectId(data.id);
    const document = await this.HoaDon.findOne({ _id: newId });
    // lấy ra những ghế mà khách đã ngồi
    document.thongtinhanhkhach.forEach((e) => {
      ghedi.push(e.vitringoi);
      ghekhuhoi.push(e.vitringoikhuhoi);
    });
    // cập nhật trạng thái hóa đơn
    await this.HoaDon.updateOne(
      { _id: newId },
      {
        $set: {
          trangthai: data.trangthai,
          lydohuy: data.lydohuy,
          timecancel: new Date(),
        },
      }
    );
    // Xóa lại ví trí ghê ngồi
    const vitrighedi = await this.ChiTietTuyenTau.updateOne(
      {
        matuyentau: document.matuyentaudi,
        matau: document.matau,
        title: document.thoigiandi,
      },
      {
        $pull: {
          "chitietghengoi.soghebanduoc": { $in: ghedi },
        },
      }
    );

    const result = await this.HoaDon.findOne({ _id: newId });
    console.log(2);
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
    // console.log('result',result)
    // console.log(3);
    const diadiem = await this.TuyenTau.findOne({
      matuyentau: result.matuyentaudi,
    });
    // console.log('diadiem',diadiem)
    const body = bodyMailCancel(result);
    const message = templateCancelBill(result, diadiem, body);
    const info = {
      from: process.env.EMAIL, //sender,
      to: result.email, //to
      subject: "THÔNG BÁO HỦY CHUYẾN TÀU CAO TỐC SUPERDONG",
      html: message,
    };
    transporter.sendMail(info, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent:" + info.response);
      }
    });
  }

  async updateBillByUser(id, data) {
    const newId = new ObjectId(id);
    var message = false;
    let ghetaudamua = [];
    let ghetaukhuhoi = [];
    const findBillById = await this.HoaDon.findOne({ _id: newId });
    if (findBillById !== null) {
      findBillById.thongtinhanhkhach.forEach((e) => {
        ghetaudamua.push(e.vitringoi);
        if (findBillById.loaive === "Khứ hồi") {
          ghetaukhuhoi.push(e.vitringoikhuhoi);
        }
      });
      // Update vị trí chỗ ngồi
      const findTauByTime = await this.ChiTietTuyenTau.updateOne(
        {
          matau: findBillById.matau,
          matuyentau: findBillById.matuyentaudi,
          title: findBillById.thoigiandi,
        },
        {
          $pull: {
            "chitietghengoi.soghebanduoc": { $in: ghetaudamua },
          },
        }
      );
      let updateGheNgoi;
      if (data.loaive === "Khứ hồi") {
        // console.log(data.loaive)
        updateGheNgoi = await this.ChiTietTuyenTau.updateOne(
          {
            matau: findBillById.mataukhuhoi,
            matuyentau: findBillById.matuyentaudi,
            title: findBillById.thoigiankhuhoi,
          },
          {
            $pull: {
              "chitietghengoi.soghebanduoc": { $in: ghetaukhuhoi },
            },
          }
        );
      }
      if (findTauByTime.acknowledged === true) {
        const updateBill = await this.HoaDon.findOneAndUpdate(
          {
            _id: newId,
          },
          {
            $set: {
              matau: data.thongtintau.matau,
              thoigiandi: data.thongtintau.thoigiandi,
              thongtinhanhkhach: data.thongtinhanhkhach,
              update_at: new Date(),
            },
          }
        );
        if (updateGheNgoi?.acknowledged === true) {
          const updateBill = await this.HoaDon.findOneAndUpdate(
            {
              _id: newId,
            },
            {
              $set: {
                mataukhuhoi: data.thongtintau.mataukhuhoi,
                thoigiankhuhoi: data.thongtintau.thoigiankhuhoi,
                update_at: new Date(),
              },
            }
          );
        }
        // console.log(updateBill.ok);
        if (updateBill.ok === 1) {
          const diadiem = await this.TuyenTau.findOne({
            matuyentau: data.thongtintau.matuyentaudi,
          });
          if (data.loaive === "Một chiều") {
            const body = bodyMailUpdate(data.thongtinhanhkhach);
            const message = templateMailUpdateBill(
              updateBill.value,
              diadiem,
              body
            );
            pdf
              .create(pdfTemplateForOneWay(updateBill.value, diadiem), {})
              .toFile("invoice.pdf", (err) => {
                if (err) {
                  console.log(err);
                } else {
                  const pathToAttachment = path.join(
                    "E:/LVTN/Project/BackEnd/",
                    "invoice.pdf"
                  );
                  let attachment = fs
                    .readFileSync(pathToAttachment)
                    .toString("base64");

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
                    from: process.env.EMAIL, //sender,
                    to: updateBill.value.email, //to
                    subject: "THÔNG BÁO ĐỔI CHUYẾN TÀU CAO TỐC SUPERDONG",
                    html: message,
                    attachments: [
                      {
                        content: attachment,
                        filename: "invoice.pdf",
                        contentType: "application/pdf",
                        path: pathToAttachment,
                        disposition: "attachment",
                      },
                    ],
                  };
                  transporter.sendMail(info, function (err, info) {
                    if (err) {
                      message = false;
                      return err;
                    } else {
                      console.log("Message sent:" + info.response);
                      message = true;
                      return info;
                    }
                  });
                }
              });
          } else {
            const body = bodyMailUpdateBack(data.thongtinhanhkhach);
            const message = templateMailUpdateBillBack(
              updateBill.value,
              diadiem,
              body
            );
            pdf
              .create(pdfTemplateForOneWay(updateBill.value, diadiem), {})
              .toFile("invoice.pdf", (err) => {
                if (err) {
                  console.log(err);
                } else {
                  pdf
                    .create(pdfTemplateTwoWay(updateBill.value, diadiem), {})
                    .toFile("invoiceBack.pdf", (err) => {
                      const pathToAttachment = path.join(
                        "E:/LVTN/Project/BackEnd/",
                        "invoice.pdf"
                      );
                      let attachment = fs
                        .readFileSync(pathToAttachment)
                        .toString("base64");

                      const pathToAttachmentBack = path.join(
                        "E:/LVTN/Project/BackEnd/",
                        "invoiceBack.pdf"
                      );
                      let attachmentBack = fs
                        .readFileSync(pathToAttachmentBack)
                        .toString("base64");
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
                        from: process.env.EMAIL, //sender,
                        to: updateBill.value.email, //to
                        subject: "THÔNG BÁO ĐỔI CHUYẾN TÀU CAO TỐC SUPERDONG",
                        html: message,
                        attachments: [
                          {
                            content: attachment,
                            filename: "invoice.pdf",
                            contentType: "application/pdf",
                            path: pathToAttachment,
                            disposition: "attachment",
                          },
                          {
                            content: attachmentBack,
                            filename: "invoiceBack.pdf",
                            contentType: "application/pdf",
                            path: pathToAttachmentBack,
                            disposition: "attachment",
                          },
                        ],
                      };
                      transporter.sendMail(info, function (err, info) {
                        if (err) {
                          message = false;
                          return err;
                        } else {
                          console.log("Message sent:" + info.response);
                          message = true;
                          return info;
                        }
                      });
                    });
                }
              });
          }
        }
      }
    }
  }
}

module.exports = HoaDonService;
