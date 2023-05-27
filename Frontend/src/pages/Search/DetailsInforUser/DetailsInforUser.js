import styles from './DetailsInforUser.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { TuyenTau } from '~/service';
import moment from 'moment';
import ThongTinHanhKhach from '~/Components/Components/ThongTinHanhKhach';
import { Button } from '@mui/material';

function DetailsInfor({
  parentCallback,
  data,
  quantity,
  next = () => {},
  prev = () => {},
  thongtin,
}) {
  const [tuyentau, setTuyenTau] = useState({});
  const [giave, setGiave] = useState(0);
  const [hanhkhach, setHanhKhach] = useState([]);
  let i = 0;
  let sum = 0;
  const [thongtinhanhkhach, setThongTinHanhKhach] = useState([]);

  const callBackData = (childData) => {
    // console.log(childData);
    setThongTinHanhKhach((prev) => [...prev, childData]);
  };
  const callBackData2 = (childData) => {
    // console.log(childData);
    parentCallback(thongtinhanhkhach);
  };

  useEffect(() => {
    const fetchData = async () => {
      const documents = await TuyenTau.getTuyenTauById(data.matuyentaudi);
      setTuyenTau(documents);
      setGiave(documents.giavehanhkhach[0].gia);
    };
    fetchData().catch(console.error);

    while (++i <= quantity) {
      hanhkhach.push(i);
    }
  }, []);
  return (
    <div className={clsx(styles.wrapper)}>
      <div className="row mb-5">
        <div className={clsx(styles.infor_col1, 'col-xs-12 col-md-12 col-lg-8')}>
          {hanhkhach.map((value, index) => {
            return (
              <div key={index}>
                <ThongTinHanhKhach
                  data={data.matuyentaudi}
                  parentCallBack={callBackData}
                  index={value}
                  thongtinhanhkhach={thongtin}
                />
              </div>
            );
          })}
          <div style={{ color: 'red', fontSize: '0.8rem', padding: '0px 24px ' }}>
            <p className="fw-bold ">
              Lưu ý: Quý khách có nhu cầu mang theo xe xin vui lòng liên hệ trực tiếp các
              phòng vé để được hỗ trợ trước khi tiến hành mua vé.
            </p>
            <p>
              Vé online hệ thống tự động chọn số ghế ngẫu nhiên theo các số ghế trống trên
              sơ đồ ghế.
            </p>
            <p>
              Nếu quốc tịch không phải là người <strong>Việt Nam</strong> vui lòng{' '}
              <strong>không cần điền</strong>
            </p>
            <p>
              Trẻ em (từ 6-11 tuổi) khi điền thông tin ở mục CMND/Hộ chiếu{' '}
              <strong>không cần điền</strong>
            </p>
            <p>
              Người cao tuổi (trên 60 tuổi) khi điền thông tin ở mục Ngày sinh sẽ mặc định
              là "01/01/ Năm sinh
            </p>
          </div>
        </div>
        <div className={clsx(styles.infor_col2, 'col-xs-12 col-md-12 col-lg-4')}>
          <div>
            <h5 className="fw-bold">
              <FontAwesomeIcon icon={faReceipt} className="me-2" />
              THÔNG TIN
            </h5>
            <p>
              <span>Tổng cộng: </span>
              <span className="text-danger fw-bold fs-5">
                {data.loaive === 'Một chiều' &&
                  (giave * quantity).toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                {data.loaive === 'Khứ hồi' &&
                  (2 * giave * quantity).toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
              </span>
            </p>
            <p>
              <span>Chuyến: </span>
              <span className="text-primary fw-bold fs-5">
                {tuyentau.diemdi} - {tuyentau.diemden}
              </span>
            </p>
            <div className={clsx(styles.inforship)}>
              <p>
                <span>Tàu :</span>
                <span className="text-uppercase fw-bold">&nbsp;{data.matau}</span>
              </p>
              <p>
                <span>Giờ khỏi hành: </span>
                <span className="text-dark fw-bold">
                  &nbsp;
                  {moment(data.thoigiandi).format('LT')}
                </span>
              </p>
              <p>(Gồm {quantity} người lớn)</p>
              <p>
                <span>Ngày khởi hành:</span>
                <span className="fw-bold">
                  &nbsp;{moment(data.thoigiandi).format('DD/MM/YYYY')}
                </span>
              </p>
              {data.loaive === 'Khứ hồi' && (
                <div className="my-3">
                  <h5 className="fw-bold">
                    <FontAwesomeIcon icon={faReceipt} className="me-2" />
                    THÔNG TIN TÀU VỀ
                  </h5>
                  <p>
                    <span>Chuyến: </span>
                    <span className="text-primary fw-bold fs-5">
                      {tuyentau?.diemden} - {tuyentau?.diemdi}
                    </span>
                  </p>
                  <div className={clsx(styles.inforship)}>
                    <p>
                      <span>Tàu : </span>
                      <span className="text-uppercase fw-bold">{data?.mataukhuhoi}</span>
                    </p>
                    <p>
                      <span>Giờ khỏi hành: </span>
                      <span className="text-dark fw-bold">
                        &nbsp;
                        {moment(data?.thoigiankhuhoi).format('LT')}
                      </span>
                    </p>
                    <p>(Gồm {quantity} người lớn)</p>
                    <p>
                      <span>Ngày khởi hành:</span>
                      <span className="fw-bold">
                        &nbsp;{moment(data?.thoigiankhuhoi).format('DD/MM/YYYY')}
                      </span>
                    </p>
                  </div>
                </div>
              )}
              <div className={clsx(styles.thongtingiave)}>
                <p className="text-uppercase text-primary text-center fw-bold">
                  thông tin giá vé
                </p>
                {tuyentau?.giavehanhkhach?.map((value, index) => {
                  return (
                    <div key={index}>
                      <small className="text-warning">
                        {value.label}:
                        {value.gia.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </small>
                      <br />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <Button variant="outlined" onClick={prev} sx={{ mr: 1 }}>
          Trở lại
        </Button>
        <Button
          className=""
          variant="contained"
          onClick={() => {
            callBackData2();
            next();
          }}
        >
          Tiếp theo
        </Button>
      </div>
    </div>
  );
}

export default DetailsInfor;
