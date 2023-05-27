const moment = require("moment");

module.exports = (data, diadiem) => {
  let htmlTemplatePDF = "";
  data.thongtinhanhkhach.map((value, index) => {
    htmlTemplatePDF += ` 
    <style>
    body{
      font-size: 35px
    }
    h3,h4{
      margin: 6px 0px}
    p{
      margin:0px;
    }
    .head{
      display: flex; flex-direction: row;justify-content: between;
    }
  </style>
    <body>
     <div>
            <div class="container">
              <div class="head" style="display:flex; flex-direction: row;">
                <h3 style="text-align: center">TRỰC TUYẾN ONLINE</h3>
                <div style="text-align: center">
                  <h3 style="text-transform: uppercase; text-align: center">Thẻ lên tàu</h3>
                  <h3 style="text-transform: uppercase; text-align: center">boading pass</h3>
                  <p style="text-align: center">Liên hệ 1: Giao khách hàng</p>
                  <p style="text-align: center">Copy 1st: Customer</p>
                  <p>Loại vé: ${data.loaive}</p>
                </div>
              </div>
              <div>
                <p>
                  Tên đơn vị / Company:
                  <span>${data.tencongty ? data.tencongty : ""}</span>
                </p>
                <p>
                  Địa chỉ / Address:
                  <span>${data.diachi ? data.diachi : ""}</span>
                </p>
                <p>
                  Mã số thuế / Taxcode :
                  <span>${data.masothue ? data.masothue : ""}</span>
                </p>
                <p>
                  Mã KH / Code :
                  <span>
                    ${data.tennguoidathang ? data.tennguoidathang : ""}
                  </span>
                </p>
                <p>
                  Từ / From :
                  <span style="text-transform: uppercase;font-weight:bold;font-size: 40px">
                    ${diadiem.diemden}
                  </span>
                </p>
                <p>
                  Đến / To :
                  <span style="text-transform: uppercase;font-weight:bold;font-size: 40px">
                    ${diadiem.diemdi}
                  </span>
                </p>
              </div>
              <div>
              <table style="font-size: 35px; width: 100%">
                <tr>
                  <td> Tàu / Ferry :</td>
                  <td  style="text-transform: uppercase;font-weight: bold">
                     ${data.mataukhuhoi}
                  </td>
                </tr>
                <tr>
                  <td> Ngày giờ/ Date time:</td>
                  <td  style="text-transform: uppercase;font-weight: bold">
                    ${moment(data.thoigiankhuhoi).format("LT DD/MM/YYYY")}
                  </td>
                </tr>
                <tr>
                <td>Ghế / Seat :</td>
                <td  style="text-transform: uppercase;font-weight: bold">
                ${value.vitringoikhuhoi}
                </td>
              </tr>
              <tr>
                <td> Họ tên / Name:</td>
                <td  style="text-transform: uppercase;font-weight: bold">
                ${value.hoten}
                </td>
              </tr>
              <tr>
                <td>  Hộ chiếu / Passport:</td>
                <td  style="text-transform: uppercase;font-weight: bold">
                ${value.cccd}
                </td>
              </tr>
              <tr>
              <td>    Loại vé / Ticket:</td>
              <td  style="text-transform: uppercase;font-weight: bold">
              ${value.loaive}
              </td>
            </tr>
            <tr>
            <td>   Giá vé / Price:</td>
            <td  style="text-transform: uppercase;font-weight: bold">
            ${value.gia.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
            </td>
          </tr>
          <tr>
          <td>Thành tiền/ Amount:</td>
          <td style="text-transform: uppercase;font-weight: bold">
          ${value.gia.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
          </td>
        </tr>
              </table>
              </div>
            </div>
            <div>
              <p style="font-weight: bold; color:red">Lưu ý:
              <span>
                <p>
                  - Thẻ lên tàu có giá trị khi hành khách có giấy tờ tùy thân trùng
                  khớp thông tin in trên thẻ / Your boarding pass's information must
                  match your identification papers.
                </p>
                <p>
                  -Quý khách vui lòng có mặt tại cảng 30 phút trước giờ khởi hành. /
                  Please be presented 30 minutes prior to the depart time.
                </p>
              </span> 
               </p>
            </div>
            <div style=" font-style: italic;">
              <p>
               <strong> Ghi chú:</strong> Để tra cứu và nhận hóa đơn điện tử xin vui lòng truy cập
                địa chỉ web
              </p>
              <p>
                To receive electronic invoice please visit website address at:
                https://invoice.superdong.com.vn
              </p>
              <p>
                Mã tra cứu hóa đơn:
                <span style="font-weight:bold">
                  ${data.orderId}
                </span>
              </p>
              <p>Thẻ này không có giá trị thanh toán.</p>
              <p>This boarding pass is not an official invoice</p>
              <p>Ngày in/Printed date: ${moment(data.create_at).format(
                "LT DD/MM/YYYY"
              )}      
              </p>
            </div>
          </div>
    

    
     `;
  });
  return htmlTemplatePDF;
};
