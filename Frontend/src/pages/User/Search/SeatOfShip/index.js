import clsx from 'clsx';
import styles from './index.module.scss';
import { useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import BookSeat from './CreateShip';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';

function SeatOfShip({ thongtinhanhkhach, data, prev, next }) {
  const [luotdi, setLuotDi] = useState(true);
  const [luotve, setLuotVe] = useState(false);
  const [active, setActive] = useState(false);
  const [select, setSelect] = useState();
  const [refresh, setFresh] = useState(0);

  const handleActive = () => {
    setActive(!active);
  };
  const handleluotdi = () => {
    setLuotVe(false);
    document.getElementById('luotdi').disabled = true;
    setLuotDi(true);
  };
  const handleluotve = () => {
    setLuotDi(false);
    document.getElementById('luotve').disabled = true;
    setLuotVe(true);
  };
  // console.log(thongtinhanhkhach);
  const changeSeat = (e) => {
    if (thongtinhanhkhach[select] === undefined) {
      toast.warn('Vui lòng chọn hành khách', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      // console.log(thongtinhanhkhach);
      thongtinhanhkhach[select].vitringoi = e;
      if (luotve === true) {
        thongtinhanhkhach[select].vitringoikhuhoi = e;
      }
      toast.success('Chọn ghế ngồi thành công!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setFresh((prev) => prev + 1);
    }
  };
  const changeSeatKhuHoi = (e) => {
    if (thongtinhanhkhach[select] === undefined) {
      toast.warn('Vui lòng chọn hành khách', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      // console.log(thongtinhanhkhach);
      thongtinhanhkhach[select].vitringoikhuhoi = e;

      toast.success('Chọn ghế ngồi thành công!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setFresh((prev) => prev + 1);
    }
  };
  console.log('seat', data);
  return (
    <div className={clsx(styles.wrapper)}>
      <div className="row">
        <div className="col-6 col-sm-12 col-md-12 col-lg-6 ">
          <div className="d-flex flex-row mb-3">
            <p
              onClick={handleluotdi}
              id="luotdi"
              className={
                luotdi === false
                  ? 'bg-white me-2 text-uppercase border border-2 border-warning w-25 text-center py-1 shadow-sm fw-bold'
                  : 'bg-warning me-2 text-uppercase border border-2 border-warning w-25 text-center py-1 shadow-sm fw-bold'
              }
              style={{ cursor: 'pointer' }}
            >
              Lượt đi
            </p>
            {data.loaive === 'Khứ hồi' && (
              <p
                id="luotve"
                onClick={handleluotve}
                className={
                  luotve === false
                    ? 'bg-white me-2 text-uppercase border border-2 border-warning w-25 text-center py-1 shadow-sm fw-bold'
                    : 'bg-warning me-2 text-uppercase border border-2 border-warning w-25 text-center py-1 shadow-sm fw-bold'
                }
                style={{ cursor: 'pointer' }}
              >
                Lượt về
              </p>
            )}
          </div>
          <div className={clsx(styles.thongtinhanhkhach)}>
            {luotdi === true && (
              <div className={clsx(styles.luotdi)}>
                <Table className="border border-dark" bordered>
                  <thead className="text-center text-uppercase bg-warning">
                    <tr>
                      <th></th>
                      <th>STT</th>
                      <th width="50%">Họ tên</th>
                      <th>Ghế đi</th>
                      <th>Loại vé</th>
                    </tr>
                  </thead>
                  <tbody>
                    {thongtinhanhkhach.map((value, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              id="1"
                              name="select_seat"
                              value={index}
                              onChange={() => {
                                setSelect(index);
                              }}
                            ></input>
                          </td>
                          <td>{index + 1}</td>
                          <td>{value.hoten}</td>
                          <td className="text-uppercase">{value.vitringoi}</td>
                          <td>{value.loaive}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )}

            {luotve === true && (
              <div className={clsx(styles.luotve)}>
                <Table className="border border-dark mb-4" bordered>
                  <thead className="text-center text-uppercase bg-warning">
                    <tr>
                      <th></th>
                      <th>STT</th>
                      <th width="50%">Họ tên</th>
                      <th>Ghế đi</th>
                      <th>Loại vé</th>
                    </tr>
                  </thead>
                  <tbody>
                    {thongtinhanhkhach.map((value, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              id="1"
                              name="select_seat"
                              value={index}
                              onChange={() => {
                                setSelect(index);
                              }}
                            ></input>
                          </td>
                          <td>{index + 1}</td>
                          <td>{value.hoten}</td>
                          <td className="text-uppercase">{value.vitringoikhuhoi}</td>
                          <td>{value.loaive}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
          <div className={clsx(styles.note)}>
            <p className="text-muted fw-bold">GHI CHÚ </p>
            <ul>
              <li>
                <span className={clsx(styles.border, 'bg-secondary')} c></span>
                <span> Ghế trống</span>
              </li>
              <li>
                <span className={clsx(styles.border, 'bg-primary')} c></span>
                <span> Ghế đang chọn</span>
              </li>
              <li>
                <span className={clsx(styles.border, 'bg-danger')} c></span>
                <span> Ghế đã được chọn, đã bán</span>
              </li>
              <li>
                <span className={clsx(styles.border, 'bg-warning')} c></span>
                <span> Ghế VIP </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-6 col-sm-12 col-md-12 col-lg-6 ">
          <div className="d-flex flex-row mb-3">
            <p
              className={
                active
                  ? 'w-50 bg-primary text-white text-uppercase border border-end-0 border-2 border-primary rounded-start w-25 text-center p-1 shadow-sm fw-bold'
                  : 'w-50 bg-white text-dark text-uppercase border border-end-0 border-2 border-primary rounded-start w-25 text-center p-1 shadow-sm fw-bold'
              }
              style={{ cursor: 'pointer' }}
              onClick={handleActive}
            >
              khoang dưới
            </p>
            <p
              className={
                active
                  ? 'w-50 bg-white text-uppercase border border-start-0 border-2 rounded-end border-primary w-25 text-center p-1 shadow-sm fw-bold'
                  : 'w-50 bg-primary text-white text-uppercase border border-start-0 border-2 rounded-end border-primary w-25 text-center p-1 shadow-sm fw-bold'
              }
              style={{ cursor: 'pointer' }}
              onClick={handleActive}
            >
              khoang trên
            </p>
          </div>
          <div className={clsx(styles.khoangtau, 'border border-primary')}>
            {active === true && (
              <div className={clsx(styles.khoangduoi)}>
                <BookSeat
                  className={clsx(styles.book)}
                  row={8}
                  startAt="1"
                  data={data}
                  typenormal={true}
                  choseSeat={luotve ? changeSeatKhuHoi : changeSeat}
                  luotdi={luotdi}
                  luotve={luotve}
                />
                <div className="d-flex flex-row ">
                  <div className="w-25 border border-primary border-start-0 text-center ">
                    {' '}
                    WC
                  </div>
                  <div className="w-50"></div>
                  <div className="w-25 a border border-primary border-end-0 text-center ">
                    {' '}
                    WC
                  </div>
                </div>
                <div className="d-flex flex-row py-3">
                  <p className={clsx(styles.loivao, ' border border-primary p-1')}>
                    Lối vào
                  </p>
                  <p className="flex-fill text-center mt-1">Hành Lang</p>
                </div>
                <div className="d-flex flex-row">
                  <div className=" w-25 border border-primary border-start-0 text-center ">
                    {' '}
                    Để Hành Lý
                  </div>
                  <div className="w-50"></div>
                  <div className=" w-25 border border-primary border-end-0 text-center ">
                    Thuyền Viên
                  </div>
                </div>
                <BookSeat
                  startAt="9"
                  row={16}
                  typenormal={true}
                  data={data}
                  choseSeat={luotve ? changeSeatKhuHoi : changeSeat}
                  luotdi={luotdi}
                  luotve={luotve}
                />
                {/* <p className={clsx(styles.balcony)}>Hành Lang</p> */}
              </div>
            )}
            {active === false && (
              <div className={clsx(styles.khoangtren)}>
                <div className="mt-3">
                  <BookSeat
                    data={data}
                    startAt="1"
                    row={1}
                    typeprenium={true}
                    choseSeat={luotve ? changeSeatKhuHoi : changeSeat}
                    luotdi={luotdi}
                    luotve={luotve}
                  />
                </div>
                <div className="d-flex flex-row mt-3 ">
                  <div
                    className="border border-primary border-start-0 text-center "
                    style={{ width: '40%' }}
                  >
                    {' '}
                    Thuyền viên
                  </div>
                  <div style={{ width: '20%' }}></div>

                  <div
                    className=" border border-primary border-end-0 text-center "
                    style={{ width: '40%' }}
                  >
                    {' '}
                    Thuyền Viên
                  </div>
                </div>
                <div className="d-flex flex-row py-3">
                  <p className={clsx(styles.loivao, ' border border-primary p-1')}>
                    Lối vào
                  </p>
                  <p className="flex-fill text-center mt-3">Hành Lang</p>
                </div>
                <div className="d-flex flex-row mb-5">
                  <div className=" w-25 border border-primary border-start-0 text-center ">
                    {' '}
                    Để Hành Lý
                  </div>
                  <div className="w-50"></div>
                  <div className="  w-25 border border-primary border-end-0 text-center ">
                    Để Hành Lý
                  </div>
                </div>
                <BookSeat
                  startAt="2"
                  row={9}
                  typeprenium={true}
                  choseSeat={luotve ? changeSeatKhuHoi : changeSeat}
                  data={data}
                  luotdi={luotdi}
                  luotve={luotve}
                />
                <p className={clsx(styles.balcony)}>Hành Lang</p>
                <div className=" w-50 border border-primary border-start-0 text-center mb-5 ">
                  {' '}
                  WC
                </div>
                <p className={clsx(styles.balcony, 'border-top border-primary')}>
                  Khu ngắm biển
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <Button variant="outlined" onClick={prev} sx={{ mr: 1 }}>
          Trở lại
        </Button>
        <Button
          className=""
          variant="contained"
          onClick={() => {
            next();
          }}
        >
          Tiếp theo
        </Button>
      </div>
    </div>
  );
}

export default SeatOfShip;
