import clsx from 'clsx';
import styles from './index.module.scss';
import LineChart from './Chart';
import PieChart from './Chart/PieChar';

import { useEffect, useState } from 'react';
import { Dashboard, Tau } from '~/service';
import { useSelector } from 'react-redux';
function HomeAdmin() {
  const [data, setData] = useState({
    sotau: 0,
    sotuyen: 0,
    soluonghanhkhach: 0,
    doanhthu: 0,
    doanhthuUser: 0,
  });
  const user = useSelector((state) => state.permission.users);
  useEffect(() => {
    const fetchData = async () => {
      const getAll = await Dashboard.getAllInfor({
        permission: user.permission,
        mataikhoan: user.taikhoan.mataikhoan,
      });
      setData({
        sotau: getAll.tau,
        sotuyen: getAll.tuyentau,
        soluonghanhkhach: getAll.hanhkhach,
        doanhthu: getAll.doanhthu,
        doanhthutheongay: getAll.doanhthutrongngay,
        doanhthuUser: getAll.doanhthuUser,
      });
    };
    fetchData().catch(console.error);
  }, []);
  // console.log(data);
  return (
    <div className={clsx(styles.wrapper)}>
      <div className="container-fluid">
        <h4
          style={{ backgroundColor: '#1c6dd0', width: '250px' }}
          className=" py-2  my-2 rounded-1 text-uppercase fw-bold text-white shadow  mx-auto text-center "
        >
          Tổng quan
        </h4>
        <div className={clsx(styles.firstRow, 'mt-3 row ')}>
          <div className="mb-3 col-xs-6 col-6">
            <div className={clsx(styles.colContent, 'shadow')}>
              <div className="w-50">
                <img
                  className="d-block mb-2"
                  src="https://cdn-icons-png.flaticon.com/512/3089/3089967.png"
                  alt="Boat"
                />
                <p className=" text-center fs-6 text-muted fw-bold ">Tổng số tàu</p>
              </div>
              <p className="w-50 m-auto fs-1 fw-bold text-center ">{data?.sotau}</p>
            </div>
          </div>
          <div className="mb-3 col-xs-6 col-6">
            <div className={clsx(styles.colContent, 'shadow')}>
              <div className="w-50">
                <img
                  className="d-block mb-2"
                  src="https://cdn-icons-png.flaticon.com/512/9790/9790772.png"
                  alt="Boat"
                />
                <p className=" text-center fs-6 text-muted fw-bold ">Tổng tuyến tàu </p>
              </div>
              <p className="w-50 m-auto fs-1 fw-bold text-center ">{data?.sotuyen}</p>
            </div>
          </div>
          <div className="mb-3 col-xs-6 col-6">
            <div className={clsx(styles.colContent, 'shadow')}>
              <div className="w-50">
                <img
                  className="d-block mb-2"
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Boat"
                />
                <p className=" text-center fs-6 text-muted fw-bold ">
                  Số lượng hành khách
                </p>
              </div>
              <p className="w-50 m-auto fs-1 fw-bold text-center ">
                {data?.soluonghanhkhach}
              </p>
            </div>
          </div>
          <div className="mb-3 col-xs-6 col-6">
            {user.permission === 1 ? (
              <div className={clsx(styles.colContent, 'shadow')}>
                <div className="w-50">
                  <img
                    className="d-block mb-2"
                    src="https://cdn-icons-png.flaticon.com/512/432/432312.png"
                    alt="Boat"
                  />
                  <p className=" text-center fs-6 text-muted fw-bold ">Tổng doanh thu</p>
                </div>
                <p className="w-50 m-auto fs-1 fw-bold text-center ">
                  {data?.doanhthu.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
              </div>
            ) : (
              <div className={clsx(styles.colContent, 'shadow')}>
                <div className="w-50">
                  <img
                    className="d-block mb-2"
                    src="https://cdn-icons-png.flaticon.com/512/432/432312.png"
                    alt="Boat"
                  />
                  <p className=" text-center fs-6 text-muted fw-bold ">
                    Doanh thu trong ngày
                  </p>
                </div>
                <p className="w-50 m-auto fs-1 fw-bold text-center ">
                  {data?.doanhthuUser.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className={clsx(styles.rowSecond, ' mt-3 row ')}>
            <div className="mb-3 col-xs-12 col-md-8 col-lg-7">
              <div className="border bg-white rounded-1 shadow border-muted p-2">
                <p className="fw-bold py-2 ps-3 text-uppercase mb-5  ">
                  Báo cáo số lượng vé tàu theo tuyến Phú Quốc - Hà Tiên
                </p>
                <div className="w-100 mb-2">
                  <LineChart />
                </div>
              </div>
            </div>
            <div className="mb-3 col-xs-12 col-md-4 col-lg-5">
              <div className=" border bg-white rounded-1 shadow border-muted p-2">
                <p className="fw-bold py-2 ps-3 text-uppercase">
                  Tỷ lệ trả hoàn vé theo ngày trong tuần
                </p>
                <div className="w-100">
                  <PieChart />
                </div>
              </div>
              <div className=" border bg-white rounded-1 shadow border-muted p-2 mt-3">
                <p className="fw-bold py-2 ps-3 text-uppercase">
                  Tỷ lệ trả hoàn vé theo tháng
                </p>
                <div className="w-100">
                  <PieChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
