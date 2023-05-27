import clsx from 'clsx';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Hoadon } from '~/service';
import moment from 'moment';
import { Button } from '@mui/material';
import ReactToPrint from 'react-to-print';
function Invoice() {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const document = await Hoadon.getBillById(id);
      setData(document);
    };
    fetchData().catch(console.error);
  }, []);
  const componentPDF = useRef();
  return (
    <>
      <div className={clsx(styles.button)}>
        <ReactToPrint
          trigger={() => {
            return <Button variant="contained">Xuất Hóa Đơn</Button>;
          }}
          content={() => componentPDF.current}
        />
      </div>
      <div ref={componentPDF}>
        {data?.data?.thongtinhanhkhach.map((value, index) => {
          return (
            <>
              <div
                key={index}
                className={clsx(styles.wrapper, 'm-auto border py-4 px-1')}
                style={{ width: '768px' }}
              >
                <h5 className="text-center fw-bold ">
                  CÔNG TY CỔ PHẦN TÀU CAO TỐC SUPERDONG - KIÊN GIANG
                </h5>
                <h6 className="text-center">SUPERDONG FAST FERRY KIEN GIANG JSC</h6>
                <h6 className="text-center">
                  10 30/4 street,Quarter 2, Duong Dong ward, Phu Quoc city, Kien Giang
                  province
                </h6>
                <div className="d-flex flex-row justify-content-between w-100 ">
                  <h2 className="fw-bold me-3 pt-3 ">MUA VÉ TẠI QUẦY</h2>
                  <div>
                    <h3 className="text-uppercase fw-bold">THẺ LÊN TÀU</h3>
                    <h3 className="text-uppercase fw-bold">BOARDING PASS</h3>
                    <p>Liên 1: Giao khách hàng</p>
                    <p>Copy 1st : Customer</p>
                    <p>Loại vé: {data.data?.loaive}</p>
                  </div>
                  <div>
                    <p>Mẫu / Template: 01/VE3/042</p>
                    <p>Ký hiệu / Series: 1HC22Tf</p>
                    <br></br>
                    {data.data?.mataikhoan && (
                      <p>Mã Nhân Viên: {data.data?.mataikhoan}</p>
                    )}
                  </div>
                </div>
                <div className="px-5 py-2 mx-auto mt-3" style={{ fontSize: '1.2rem' }}>
                  <table className="px-5 w-75">
                    <tbody>
                      <tr>
                        <td> Tên đơn vị / Company:</td>
                        <td>{data.data?.tencongty ? data.data?.tencongty : 'Trống'}</td>
                      </tr>
                      <tr>
                        <td> Địa chỉ / Address:</td>
                        <td>{data.data?.diachi ? data.data?.diachi : 'Trống'}</td>
                      </tr>
                      <tr>
                        <td> MST / Taxcode:</td>
                        <td>{data.data?.masothue ? data.data?.masothue : 'Trống'}</td>
                      </tr>
                      <tr>
                        <td> Mã KH / Code:</td>
                        <td>
                          {data.data?.tennguoidatve ? data.data?.tennguoidatve : 'Trống'}
                        </td>
                      </tr>
                      <tr>
                        <td> Từ / From:</td>
                        <td className="fw-bold fs-3">{data.diadiem.diemdi}</td>
                      </tr>
                      <tr>
                        <td> Đến / To: </td>
                        <td className="fw-bold fs-3">{data.diadiem.diemden}</td>
                      </tr>
                      <tr>
                        <td> Tên đơn vị / Company:</td>
                        <td>{data.data?.tencongty ? data.data?.tencongty : 'Trống'}</td>
                      </tr>
                      <tr>
                        <td> Tàu / Ferry:</td>
                        <td>{data.data.matau}</td>
                      </tr>
                      <tr>
                        <td> Ngày giờ/ Date time:</td>
                        <td>{moment(data.data.thoigiandi).format('L LT')}</td>
                      </tr>
                      <tr>
                        <td> Họ tên / Name: </td>
                        <td>{value.hoten}</td>
                      </tr>
                      <tr>
                        <td> Loai vé /Ticket : </td>
                        <td>{value.loaive}</td>
                      </tr>
                      <tr>
                        <td> Vị trí ngồi / Seat : </td>
                        <td>{value.vitringoi}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="d-flex flex-row">
                  <p className="fw-bold text-danger fs-6" style={{ width: '20%' }}>
                    - Lưu ý
                  </p>
                  <div>
                    <p>
                      - Thẻ lên tàu có giá trị khi hành khách có giấy tờ tùy thân trùng
                      khớp thông tin in trên thẻ / Your boarding pass's information must
                      match your identification papers.
                    </p>
                    <p>
                      - Quý khách vui lòng có mặt tại cảng 30 phút trước giờ khởi hành. /
                      Please be presented 30 minutes prior to the depart time.
                    </p>
                    <p className="fst-italic">
                      Ghi chú: Để tra cứu và nhận hóa đơn điện tử xin vui lòng truy cập
                      địa chỉ web
                      <br />
                      To receive electronic invoice please visit website address at:
                      https://invoice.superdong.com.vn
                    </p>
                    <p className="fst-italic">
                      Mã tra cứu hóa đơn:{' '}
                      <span className="fs-3 fw-bold ">&nbsp;{data.data.orderId}</span>
                    </p>
                    <p className="fst-italic">
                      Thẻ này không có giá trị thanh toán.<br></br>
                      This boarding pass is not an official invoice
                    </p>
                  </div>
                </div>
              </div>
              {data?.data?.loaive === 'Khứ hồi' && (
                <div
                  key={index}
                  className={clsx(styles.wrapper, 'm-auto border py-4 px-1')}
                  style={{ width: '768px' }}
                >
                  <h5 className="text-center fw-bold ">
                    CÔNG TY CỔ PHẦN TÀU CAO TỐC SUPERDONG - KIÊN GIANG
                  </h5>
                  <h6 className="text-center">SUPERDONG FAST FERRY KIEN GIANG JSC</h6>
                  <h6 className="text-center">
                    10 30/4 street,Quarter 2, Duong Dong ward, Phu Quoc city, Kien Giang
                    province
                  </h6>
                  <div className="d-flex flex-row justify-content-between w-100 ">
                    <h2 className="fw-bold me-3 pt-3 ">MUA VÉ TẠI QUẦY</h2>
                    <div>
                      <h3 className="text-uppercase fw-bold">THẺ LÊN TÀU</h3>
                      <h3 className="text-uppercase fw-bold">BOARDING PASS</h3>
                      <p>Liên 1: Giao khách hàng</p>
                      <p>Copy 1st : Customer</p>
                      <p>Loại vé: {data.data?.loaive}</p>
                    </div>
                    <div>
                      <p>Mẫu / Template: 01/VE3/042</p>
                      <p>Ký hiệu / Series: 1HC22Tf</p>
                      <br></br>
                      {data.data?.mataikhoan && (
                        <p>Mã Nhân Viên: {data.data?.mataikhoan}</p>
                      )}
                    </div>
                  </div>
                  <div className="px-5 py-2 mx-auto mt-3" style={{ fontSize: '1.2rem' }}>
                    <table className="px-5 w-75">
                      <tbody>
                        <tr>
                          <td> Tên đơn vị / Company:</td>
                          <td>{data.data?.tencongty ? data.data?.tencongty : 'Trống'}</td>
                        </tr>
                        <tr>
                          <td> Địa chỉ / Address:</td>
                          <td>{data.data?.diachi ? data.data?.diachi : 'Trống'}</td>
                        </tr>
                        <tr>
                          <td> MST / Taxcode:</td>
                          <td>{data.data?.masothue ? data.data?.masothue : 'Trống'}</td>
                        </tr>
                        <tr>
                          <td> Mã KH / Code:</td>
                          <td>
                            {data.data?.tennguoidatve
                              ? data.data?.tennguoidatve
                              : 'Trống'}
                          </td>
                        </tr>
                        <tr>
                          <td> Từ / From:</td>
                          <td className="fw-bold fs-3">{data.diadiem.diemden}</td>
                        </tr>
                        <tr>
                          <td> Đến / To: </td>
                          <td className="fw-bold fs-3">{data.diadiem.diemdi}</td>
                        </tr>

                        <tr>
                          <td> Tàu / Ferry:</td>
                          <td>{data.data.mataukhuhoi}</td>
                        </tr>
                        <tr>
                          <td> Ngày giờ/ Date time:</td>
                          <td>{moment(data.data.thoigiankhuhoi).format('L LT')}</td>
                        </tr>
                        <tr>
                          <td> Họ tên / Name: </td>
                          <td>{value.hoten}</td>
                        </tr>
                        <tr>
                          <td> Loai vé /Ticket : </td>
                          <td>{value.loaive}</td>
                        </tr>
                        <tr>
                          <td> Vị trí ngồi/Seat : </td>
                          <td>{value.vitringoikhuhoi}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex flex-row">
                    <p className="fw-bold text-danger fs-6" style={{ width: '20%' }}>
                      - Lưu ý
                    </p>
                    <div>
                      <p>
                        - Thẻ lên tàu có giá trị khi hành khách có giấy tờ tùy thân trùng
                        khớp thông tin in trên thẻ / Your boarding pass's information must
                        match your identification papers.
                      </p>
                      <p>
                        - Quý khách vui lòng có mặt tại cảng 30 phút trước giờ khởi hành.
                        / Please be presented 30 minutes prior to the depart time.
                      </p>
                      <p className="fst-italic">
                        Ghi chú: Để tra cứu và nhận hóa đơn điện tử xin vui lòng truy cập
                        địa chỉ web
                        <br />
                        To receive electronic invoice please visit website address at:
                        https://invoice.superdong.com.vn
                      </p>
                      <p className="fst-italic">
                        Mã tra cứu hóa đơn:{' '}
                        <span className="fs-3 fw-bold ">&nbsp;{data.data.orderId}</span>
                      </p>
                      <p className="fst-italic">
                        Thẻ này không có giá trị thanh toán.<br></br>
                        This boarding pass is not an official invoice
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
}

export default Invoice;
