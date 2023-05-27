import styles from './index.module.scss';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumbs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Hoadon } from '~/service';
import { useSelector } from 'react-redux';
import moment from 'moment';
import NotFound from '~/error';
function LichSuDatVe() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.permission.users);

  useEffect(() => {
    const fetchData = async () => {
      const document = await Hoadon.getBillByUser(user.taikhoan?.mataikhoan);
      setData(document);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      {user.taikhoan?.mataikhoan ? (
        <div className={clsx(styles.wrapper)}>
          <div className={clsx(styles.container, 'mx-auto')}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" className="text-dark fw-bold" to="/">
                Trang chủ
              </Link>
              <Typography color="text.primary">Lịch sử đặt vé</Typography>
            </Breadcrumbs>
            <hr style={{ width: '100px', borderBottom: '1px solid black' }}></hr>
            <h4 className="text-uppercase bg-dark text-white fw-bold w-25 mx-auto rounded-1 text-center p-2 mb-5">
              Lịch sử đặt vé
            </h4>
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Thời gian đặt vé</th>
                  <th>Mã vé</th>
                  <th>Họ tên người đặt</th>
                  <th>Số điện thoại liên hệ</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {data.map((value, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{moment(value.create_at).format('DD/MM/YYYY LT')}</td>
                      <td>{value.orderId}</td>
                      <td>{value.tennguoidatve}</td>
                      <td>{value.sodienthoai}</td>
                      <td>
                        <button
                          style={{ backgroundColor: 'transparent', border: 'none' }}
                          onClick={() => {
                            navigate(`/lichsudatve/chitiet/${value._id}`);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            style={{ fontSize: '20px' }}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default LichSuDatVe;
