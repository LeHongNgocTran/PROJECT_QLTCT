import clsx from 'clsx';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { PhongVe } from '~/service';
import { Calendar, Money } from '~/assets/images';
import { useSelector } from 'react-redux';
import { BarChart } from './BarChart';

function ThongKe() {
  const user = useSelector((state) => state.permission.users);
  const [data, setData] = useState([]);
  const [doanhthu, setDoanhThu] = useState([]);
  const [all, setAll] = useState({
    doanhthu: 0,
    doanhthutrongngay: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await PhongVe.getPhongVe();
      const doanhthu = data.forEach(async (element) => {
        const data = await PhongVe.DoanhThuById(element.idPhongVe);
        setDoanhThu((prev) => [...prev, data]);
      });
      setData(data);
      const all = await PhongVe.DoanhthuAll();
      setAll(all);
    };
    fetchData().catch(console.error);
  }, []);
  // console.log(all);
  return (
    <div className={clsx(styles.wrapper)}>
      <div className="container-fluid">
        <h4
          style={{ backgroundColor: '#1c6dd0' }}
          className=" py-2 w-50 my-2 rounded-1 text-uppercase fw-bold text-white shadow text-center "
        >
          Thông kê doanh thu phòng vé
        </h4>
        {user.permission === 1 ? (
          <>
            <div className="row my-3">
              {data.map((value, index) => {
                const check = doanhthu.find(
                  (element) => element.idPhongVe === value.idPhongVe,
                );
                return (
                  <div key={index} className="p-2 col-lg-4 col-xs-12">
                    <div className="bg-white p-3">
                      <p className="fw-bold fs-6">{value?.name}</p>
                      <div className="d-flex flex-row my-3">
                        <img alt="Money" src={Money} width={50} />
                        <p className="text-center flex-fill fs-5 text-success fw-bold">
                          {check?.tongtien.toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="row my-3">
              <div className="col-12 bg-white ">
                <div className={clsx(styles.colContent)}>
                  <div className="w-25">
                    <img
                      className="d-block mb-2"
                      src="https://cdn-icons-png.flaticon.com/512/432/432312.png"
                      alt="Boat"
                    />
                    <p className=" text-center fs-6 text-muted fw-bold ">
                      Tổng doanh thu
                    </p>
                  </div>
                  <p className="w-50 m-auto fs-1 fw-bold text-center ">
                    {Number(all?.doanhthu).toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-12 bg-white">
                <div className={clsx(styles.colContent)}>
                  <div className="w-25">
                    <img className="d-block mb-2" src={Calendar} alt="Boat" />
                    <p className=" text-center fs-6 text-muted fw-bold ">
                      Doanh thu trong ngày
                    </p>
                  </div>
                  <p className="w-50 m-auto fs-1 fw-bold text-center ">
                    {Number(all?.doanhthutrongngay).toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-12 bg-white shadow">
                <BarChart results={doanhthu} />
              </div>
            </div>
          </>
        ) : (
          <h4 className="text-danger fw-bold text-center mt-5 bg-white p-5">
            Bạn không có quyền truy cập vào chức năng này
          </h4>
        )}
      </div>
    </div>
  );
}

export default ThongKe;
