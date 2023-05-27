const moment = require("moment");

function bodyMailCancel(data) {
  // console.log(data.thongtinhanhkhach);
  let message = "";
  data.thongtinhanhkhach.forEach((value, index) => {
    message += `<tr key=${index}  style="background-color:#F3F9FD">
      <td>${index + 1}
      </td>
      <td style="width:50%"><p style="color:rgb(241,88,35)">${value.hoten}</p>
      <p>ID :<span style="font-weight:bold;"> ${value.cccd}</span></p>
      <p>Loại vé:<span style="font-weight: bold">${value.loaive}</span></p></td>
      <td>${value.vitringoi}</td>
    </tr>`;
  });
  return message;
}

function templateCancelBill(data, diadiem, children) {
  return ` <div style="margin:0px auto;padding:20px;border: 1px solid gray;">
  <div style="font-size:20px">
    <h2 style="color:blue;font-weight: bold;text-transform: uppercase">
      Công ty CP TÀU CAO TỐC ABC SUPER FERRY
    </h2>

    <p>
      Kính chào quý khách hàng,
      <br />
      Cảm ơn quý khách đã mua vé tàu online của Công Ty CP Tàu Cao Tốc ABC SUPER FERRY
    </p>
    <div>
      <p style="font-weight:bold">Công ty chúng tôi xin thông báo : </p>
      <p>
        Vì tình hình thời tiết, nên hành trình đi
        <strong>
          ${diadiem.diemdi} - ${diadiem.diemden}
        </strong>
        đã bị hủy, chúng tôi sẽ hoàn tiền lại <strong style="color:red">100%</strong> cho quý khách theo tài khoản ngân hàng mà quý khách đã thanh toán cho chúng tôi 
      </p>
    </div>
    <h3 style="color: blue;text-transform: uppercase; font-weight: bold">
      Thông tin hành trình
    </h3>
    <p>
      Tuyến :
      <span style="color:rgb(241,88,35)">
        <strong>
          ${diadiem.diemdi} - ${diadiem.diemden}
        </strong>
      </span>
    </p>
    <p>
      Trạng thái đặt chỗ:
      <span>
        <strong>Đã thanh toán</strong>
      </span>
    </p>
    <p>
      Số lượng hành khách:
      <strong>${data.thongtinhanhkhach.length} vé</strong>
    </p>
    <p>
      Tổng giá:
      <strong style="font-size: 26px; color:rgb(241,88,35)">
        ${data.tongtien.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
      </strong>
    </p>
    <table style="width:100%;border:1px solid gray">
      <thead style="background-color:#18365F;color:white;height:50px;font-weight:bold">
        <tr style="text-transform: uppercase">
          <th>Tàu</th>
          <th>Khởi hành</th>
          <th>Đến</th>
        </tr>
      </thead>
      <tbody style="background-color:#F3F9FD">
        <tr>
          <td>
            <p>
              <strong style="text-transform : uppercase">
                ${data.matau}
              </strong>
            </p>
            <p style="font-weight:bold">
              Mã đặt chỗ:
              <span style="text-transform:uppercase;color:rgb(241,88,35)">
                ${data.orderId}
              </span>
            </p>
          </td>
          <td style="font-size:17px">
            <p style="text-transform:uppercase;color:rgb(241,88,35) ">
              ${diadiem.diemdi}
            </p>
            <p>${moment(data.thoigiandi).format("L")}</p>
            <p>${moment(data.thoigiandi).format("LT")}</p>
          </td>
          <td style="font-size:17px">
            <p style="text-transform:uppercase;color:rgb(241,88,35) ">
              ${diadiem.diemden}
            </p>
            <p>${moment(data.thoigiandi).format("L")}</p>
            <p></p>
          </td>
        </tr>
      </tbody>
    </table>

    <h3 style="color: blue;text-transform: uppercase; font-weight: bold">
      THÔNG TIN HÀNH KHÁCH
    </h3>

    <table style="border: 1px solid gray;margin-bottom: 40px;width: 100%">
      <thead style="background-color:#18365F;color:white;height:50px;font-weight:bold">
        <tr style="text-transform: uppercase">
          <th>STT</th>
          <th>Hành khách</th>
          <th>Ghế đi</th>
        </tr>
      </thead>
      <tbody id="thongtinhanhkhach">${children}</tbody>
    </table>
    <div style="background-color: rgb(199,242,255); padding: 20px">
      <ul>
        <li>
          Thẻ lên tàu có giá trị khi hành khách có giấy tờ tùy thân trùng khớp
          thông tin in trên thẻ
        </li>
        <li>
          Quý khách vui lòng có mặt tại cảng 30 phút trước giờ khởi hành.
        </li>
      </ul>
    </div>
  </div>
  <p style="color:rgb(241,88,35);font-size: 20px">LƯU Ý</p>
  <div style="color:black;">
    <p>
      Thư được tạo tự động từ hệ thống máy tính. Vui lòng không trả lời thư
      này. Quý khách cần hỗ trợ xin vui lòng liên hệ SĐT:
      <span style="color:blue"> 0941 130 033</span>
    </p>
    <p>Chúc quý khách có những chuyến đi vui vẻ !</p>
    <p>Chân thành cảm ơn !</p>
  </div>
</div>`;
}
module.exports = { bodyMailCancel, templateCancelBill };
