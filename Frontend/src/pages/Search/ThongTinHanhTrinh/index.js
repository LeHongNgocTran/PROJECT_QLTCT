import clsx from 'clsx';
import moment from 'moment';
import styles from './index.module.scss';
import { Assignment, CreditCard, LocationOn, Person } from '@mui/icons-material';
import { Button, Select, MenuItem, TextField, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Hoadon } from '~/service';

function Payment({ prev, next, data, result, thongtinhanhkhach, setData }) {
  var tongtien = 0;
  const user = useSelector((state) => state.permission);
  const navigate = useNavigate();
  const [taiquay, setTaiQuay] = useState({
    payment: '',
  });
  const loaive = data.loaive === 'Khứ hồi' ? 2 : 1;
  const handleChange = (e) => {
    setTaiQuay((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitAdmin = async () => {
    const infor = {
      thongtinhanhkhach: thongtinhanhkhach,
      ...data,
      ...taiquay,
      tongtien: tongtien,
      mataikhoan: user.users.taikhoan.mataikhoan,
      idPhongVe: user.users.idPhongVe || '',
    };
    let id = '';
    if (taiquay?.payment !== '') {
      if (taiquay?.tienkhachdua >= infor?.tongtien) {
        id = await Hoadon.addHoaDonTaiQuay(infor);
        navigate(`/invoice/${id}`);
      } else if (taiquay?.bank !== '' && taiquay?.magiaodich) {
        id = await Hoadon.addHoaDonTaiQuay(infor);
        navigate(`/invoice/${id}`);
      } else {
        toast.error('Tiền khách đưa không thể nhỏ hơn số tiền cần thanh toán !!!!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } else {
      toast.error('Tiền khách đưa không thể nhỏ hơn số tiền cần thanh toán !!!!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  return (
    <div className={clsx(styles.wrapper)}>
      <div className="row">
        <h5 className="text-uppercase fw-bold" style={{ color: '#0f0f8d' }}>
          <Person />
          Người đặt vé
        </h5>
        <table className="table">
          <tbody>
            <tr>
              <td>
                Họ tên:
                <span className="fw-bold">{data?.tennguoidatve}</span>
              </td>
              <td>
                Điện thoại: <span className="fw-bold">{data?.sodienthoai}</span>
              </td>
            </tr>
            <tr>
              <td>
                Email: <span className="fw-bold">{data?.email}</span>
              </td>
              <td>
                Thời gian giữ chỗ: <span className="fw-bold">15 phút</span>
              </td>
            </tr>
            <tr>
              <td>
                Người mua hàng:
                <span className="fw-bold">{data?.tennguoimuahang || 'Trống'}</span>
              </td>
              <td>
                Đơn vị xuất hóa đơn :
                <span className="fw-bold">{data?.tencongty || 'Trống'}</span>
              </td>
            </tr>
            <tr>
              <td>
                Mã số thuế: <span className="fw-bold">{data?.masothue || 'Trống'}</span>
              </td>
              <td>
                Địa chỉ: <span className="fw-bold">{data?.diachi || 'Trống'} </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className=" row my-3">
        <h5 className="text-uppercase fw-bold" style={{ color: '#0F0F8D' }}>
          <LocationOn />
          HÀNH TRÌNH {result?.giavetuyentau.diemdi} - {result?.giavetuyentau.diemden}
        </h5>
        <div className={clsx(styles.hanhtrinh)}>
          <table className="table w-100">
            <thead>
              <tr>
                <th>STT</th>
                <th>Hành khách</th>
                <th>CMND/Hộ chiếu</th>
                <th>Tàu</th>
                <th>Ghế ngồi</th>
                <th>Ngày</th>
                <th>Giờ khởi hành</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {thongtinhanhkhach.map((value, index) => {
                tongtien += value?.gia * loaive;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.hoten}</td>
                    <th>{value.cccd}</th>
                    <th>{data?.matau}</th>
                    <th>{value.vitringoi}</th>
                    <th>{moment(data?.thoigiandi).format('DD/MM/YYYY')}</th>
                    <th>{moment(data?.thoigiandi).format('LT')}</th>
                    <th>
                      {Number(value?.gia).toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {data?.loaive === 'Khứ hồi' && (
        <div className="row my-3">
          <h5 className="text-uppercase fw-bold" style={{ color: '#0F0F8D' }}>
            <LocationOn className="me-3" />
            HÀNH TRÌNH {result?.giavetuyentau.diemden} - {result?.giavetuyentau.diemdi}
          </h5>
          <div className={clsx(styles.hanhtrinh)}>
            <table className="table w-100">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hành khách</th>
                  <th>CMND/Hộ chiếu</th>
                  <th>Tàu</th>
                  <th>Ghế ngồi</th>
                  <th>Ngày</th>
                  <th>Giờ khởi hành</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {thongtinhanhkhach.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.hoten}</td>
                      <th>{value.cccd}</th>
                      <th>{data?.mataukhuhoi}</th>
                      <th>{value.vitringoikhuhoi}</th>
                      <th>{moment(data?.thoigiankhuhoi).format('DD/MM/YYYY')}</th>
                      <th>{moment(data?.thoigiankhuhoi).format('LT')}</th>
                      <th>
                        {Number(value?.gia).toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <p className="fw-bold text-end">
        Tổng cộng:
        <span>
          {tongtien.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      </p>
      <div className="row">
        {(user.users.permission === 0 || Object.keys(user.users).length === 0) && (
          <>
            <h5 className="text-uppercase fw-bold mb-2" style={{ color: '#0F0F8D' }}>
              <CreditCard /> &nbsp; PHƯƠNG THỨC THANH TOÁN
            </h5>
            <div className="d-flex flex-row ">
              <div className="col-5">
                <div className="d-flex flex-row ">
                  <input
                    className="me-2"
                    type="radio"
                    id="noidia"
                    name="payment"
                    value="noidia"
                    onChange={(e) => {
                      // setShow(true);
                      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
                    }}
                  />
                  <label className="fw-bold">Thẻ nội địa</label>
                </div>
                <div className="d-flex flex-row">
                  <div style={{ height: '50px', width: '50px' }}>
                    <img
                      alt="payment"
                      className="d-block w-100"
                      src=" https://onepay-bucket.s3-sa-east-1.amazonaws.com/files/system_config/logos/OnePay%2BNovo.png"
                    />
                  </div>
                  <Link
                    className="ms-2 mt-3 text-decoration-underline"
                    to="http://202.9.84.88/documents/payment/guideVN.jsp?logos=v,m,a,j,u,at"
                    target="_blank"
                  >
                    Xem hướng dẫn thanh toán tại đây
                  </Link>
                </div>
              </div>
              <div className="col-5">
                <div className="d-flex flex-row ">
                  <input
                    className="me-2"
                    type="radio"
                    id="paypal"
                    name="payment"
                    value="paypal"
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
                    }}
                  />
                  <label className="fw-bold">Quốc tế</label>
                </div>
                <div className="d-flex flex-row">
                  <div style={{ height: '50px', width: '50px' }}>
                    <img
                      className="d-block w-100"
                      src=" https://onepay-bucket.s3-sa-east-1.amazonaws.com/files/system_config/logos/OnePay%2BNovo.png"
                      alt="Quốc tế"
                    />
                  </div>
                  <div className="d-flex flex-row">
                    <div style={{ height: '50px', width: '50px' }}>
                      <img
                        className="d-block w-100 mt-3"
                        src=" https://banner2.cleanpng.com/20180717/aer/kisspng-mastercard-money-foothills-florist-business-visa-visa-mastercard-5b4d917e30ab59.1484698215318101741994.jpg"
                        alt="Quốc tế"
                      />
                    </div>
                    <Link
                      className="ms-2 mt-3 text-decoration-underline"
                      to="http://202.9.84.88/documents/payment/guideVN.jsp?logos=v,m,a,j,u,at"
                      target="_blank"
                    >
                      Xem hướng dẫn thanh toán tại đây
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <h5 className="text-uppercase fw-bold" style={{ color: '#0F0F8D' }}>
                <Assignment />
                ĐIỀU KHOẢN ĐẶT VÉ
              </h5>
              <div className={clsx(styles.dieukhoan, 'border py-2 px-2')}>
                <h6 className="fw-bold">1. Cơ sở thỏa thuận</h6>
                <p>
                  1.1 Hệ thống đặt vé trực tuyến superdong.com.vn (dưới đây gọi là "hệ
                  thống đặt vé") thuộc Công ty cổ phần tàu cao tốc Superdong Kiên Giang.
                  Khi thực hiện đặt vé tại hệ thống của chúng tôi có nghĩa bạn đã đồng ý
                  với các điều kiện và điều khoản áp dụng, và các thông báo, bao gồm nhưng
                  không giới hạn bởi những điều kiện sử dụng của Website. Nếu bạn không có
                  ý định mua và bạn không đồng ý với bất kỳ phần nào của các điều kiện sử
                  dụng hoặc các điều khoản và điều kiện áp dụng khác, vui lòng KHÔNG SỬ
                  DỤNG hệ thống đặt vé của chúng tôi.<br></br>
                  1.2 Các thông tin trong hệ thống đặt vé có thể thay đổi bất cứ lúc nào
                  mà không cần thông báo trước. Bạn vui lòng truy cập vào các trang web
                  của chúng tôi để xem lại Điều khoản này. Superdong không khẳng định tính
                  chính xác đầy đủ và hoàn thiện của hệ thống hay bất kỳ dữ liệu hay thông
                  tin trong hệ thống đặt vé.
                </p>
                <h6 className="fw-bold">2. Sử dụng mục đích cá nhân và phi thương mại</h6>
                <p>
                  Hệ thống đặt vé chỉ dành cho sử dụng cá nhân và phi thương mại. Bạn
                  không được chỉnh sửa, sao chép, phân phối, truyền tải, chuyển nhượng,
                  hoặc bán bất kỳ thông tin, phần mềm, sản phẩm hoặc dịch vụ thu được từ
                  hệ thống đặt vé này.
                </p>
                <h6 className="fw-bold">3. Sử dụng hệ thống đặt vé</h6>
                <p>
                  3.1 Hệ thống đặt vé chỉ đơn thuần là cung cấp các chuyến đi sẵn có của
                  tàu Superdong và thực hiện đặt chỗ hợp pháp cho bạn và những người cùng
                  đi với bạn. Chúng tôi có quyền từ chối truy cập của bạn vào hệ thống khi
                  nghi ngờ bạn lạm dụng hệ thống.<br></br>
                  3.2 Việc đặt vé của bạn chịu ảnh hưởng bởi các điều khoản và điều kiện
                  khác. Sử dụng hệ thống của chúng tôi, bạn sẽ phải tuân thủ các điều
                  khoản và điều kiện mua, bao gồm cả thanh toán toàn bộ số tiền khi đến
                  hạn và tuân thủ tất cả các quy tắc và hạn chế về sự sẵn có của giá vé,
                  sản phẩm hay dịch vụ. Bạn chỉ chịu trách nhiệm cho các khoản phí, phụ
                  phí, thuế và phát sinh từ việc sử dụng hệ thống đặt vé. 3.3 Bạn có quyền
                  sử dụng hệ thống đặt vé để mua vé hợp pháp.
                </p>
                <h6 className="fw-bold">4. Quy tắc đặt vé</h6>
                <p>
                  4.1 Tổng số hành khách tối đa trong một lần đặt vé là 9 hành khách, áp
                  dụng cho cả hạng phổ thông và thương gia.
                  <br />
                  4.2 Phải có một người lớn đi cùng trẻ sơ sinh (dưới 2 tuổi tại thời điểm
                  đi) và trẻ em (từ 2 đến dưới 12 tuổi tại thời điểm đi). Vé cho trẻ sơ
                  sinh hoặc trẻ em đi kèm với người lớn đặt trên hệ thống phải được thực
                  hiện trọng cùng một lần đặt vé.
                  <br />
                  4.3 Việc đặt vé có liên quan đến các điều kiện giá vé áp dụng và số
                  lượng chỗ còn trống thuộc giá vé đó.
                  <br />
                  4.4 Sau khi bạn đặt vé trên hệ thống superdong.com.vn, bạn sẽ được cấp
                  vé điện tử.
                  <br />
                  4.5 Bạn phải thanh toán ngay khi đặt vé. Giá vé và các loại thuế sẽ được
                  ghi trên hệ thống và tính bằng VND. Hệ thống chấp nhận thanh toán bằng
                  tài khoản cổng thanh toán, thẻ ATM, tài khoản ngân hàng, thẻ tín dụng và
                  ghi nợ quốc tế hoặc nộp tiền mặt tại văn phòng của hai cổng thanh toán
                  trên.
                  <br />
                  4.6 Quy định hoàn đổi vé online: Thời gian hoàn vé trước 48 giờ trước
                  giờ khởi hành, phí 30%. Chi tiết vui lòng tham khảo tại link:
                  https://superdong.com.vn/gioi-thieu/quy-dinh-hoan-doi-ve-online/
                  <br />
                </p>
                <h6 className="fw-bold">5. Không sử dụng cho mục đích phạm pháp</h6>
                <p>
                  5.1 Hệ thống không chấp nhận việc sử dụng cho mục đích phạm pháp. Bạn
                  không được sử dụng hệ thống đặt vé Superdong để thực hiện bất kỳ việc
                  đặt vé trái phép, đầu cơ, hoặc lừa đảo.
                  <br />
                  5.2 Bạn không được: (a) bán lại các dịch vụ của hệ thống đặt vé cho bên
                  thứ ba; hoặc (b) sử dụng hệ thống đặt vé cho bất kỳ hoạt động liên quan
                  đến hành vi vi phạm pháp luật; hoặc (c) sử dụng hệ thống đặt vé để can
                  thiệp vào việc đặt vé của người dùng khác; hoặc (d) sử dụng các phương
                  pháp khác để giao dịch hoặc thu thập thông tin khi bạn không thể sử dụng
                  hệ thống của chúng tôi. Nếu Superdong (đơn phương) nghi ngờ bạn vi phạm,
                  hoặc sẽ vi phạm một trong các điều kiện sử dụng, Superdong có quyền hủy
                  bỏ việc đặt của bạn mà không cần đưa ra lý do hoặc thông báo tới bạn.
                </p>
              </div>
            </div>
            <div className="d-flex flex-row mt-3 ">
              <input
                className="me-2"
                style={{ width: '20px' }}
                type="checkbox"
                id="check"
                name="check"
                value={true}
                checked={data.check === 'true'}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    tongtien: tongtien,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <label style={{ fontSize: '16px' }}>
                Tôi đã đọc kỹ và đồng ý tuân thủ tất cả các quy định mua vé trực tuyến của
                công ty và chịu trách nhiệm về tính xác thực của các thông tin.
              </label>
            </div>
            <p className="mt-2" style={{ color: 'red', fontSize: '16px' }}>
              Quý khách vui lòng kiểm tra kỹ và xác nhận các thông tin đã cung cấp trước
              khi thực hiện giao dịch mua vé. Sau khi thực hiện thanh toán ở trang tiếp
              theo quý khách sẽ không thể thay đổi được thông tin đã cung cấp.
            </p>
            <div className="d-flex justify-content-between mt-3">
              <Button variant="outlined" onClick={prev} sx={{ mr: 1 }}>
                Trở lại
              </Button>
              <Button
                className=""
                variant="contained"
                onClick={() => {
                  if (data.check === 'false' || data.check === false) {
                    toast.error('Vui lòng đồng ý điều khoản', {
                      position: 'top-right',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'light',
                    });
                  } else if (data.check === 'true') {
                    next();
                  }
                }}
              >
                Thanh toán
              </Button>
            </div>
          </>
        )}
        {user.users.permission > 0 && (
          <>
            <div className="d-flex flex-row justify-content-between mt-3">
              <h5 className="text-uppercase fw-bold mb-2" style={{ color: '#0F0F8D' }}>
                <CreditCard /> &nbsp; CHỌN PHƯƠNG THỨC THANH TOÁN
              </h5>
              <Select
                name="payment"
                value={taiquay.payment}
                onChange={handleChange}
                style={{ width: '40%' }}
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="creditTaiquay">Chuyển khoản</MenuItem>
              </Select>
            </div>
            <div className="w-100">
              {taiquay.payment === 'cash' && (
                <>
                  <div className="d-flex flex-row w-100 justify-content-end mt-3">
                    <InputLabel className="mt-3 me-2" htmlFor="input-with-icon-adornment">
                      Tiền khách đưa
                    </InputLabel>
                    <TextField
                      style={{ width: '40%' }}
                      id="outlined-basic"
                      name="tienkhachdua"
                      label="Tiền khách đưa"
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </div>
                </>
              )}

              {taiquay.payment === 'creditTaiquay' && (
                <>
                  <div className="d-flex flex-row w-100 justify-content-end mt-3">
                    <InputLabel className="mt-3 me-2" htmlFor="input-with-icon-adornment">
                      Ngân hàng thụ hưởng
                    </InputLabel>
                    <Select
                      name="bank"
                      value={taiquay?.bank}
                      onChange={handleChange}
                      style={{ width: '40%' }}
                    >
                      <MenuItem value="VCB">Vietcombank</MenuItem>
                      <MenuItem value="AGB">Agribank</MenuItem>
                      <MenuItem value="SCB">Sacombank</MenuItem>
                    </Select>
                  </div>
                  <div className="d-flex flex-row w-100 justify-content-end mt-3">
                    <InputLabel className="mt-3 me-2" htmlFor="input-with-icon-adornment">
                      Mã giao dịch
                    </InputLabel>
                    <TextField
                      style={{ width: '40%' }}
                      id="outlined-basic"
                      name="magiaodich"
                      label="Mã giao dịch"
                      variant="outlined"
                      value={taiquay?.magiaodich}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </div>
            <Button
              style={{ width: '10%' }}
              className="ms-auto my-5 me-2"
              variant="contained"
              onClick={handleSubmitAdmin}
            >
              Hòan tất
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Payment;
