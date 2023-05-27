import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Container, Breadcrumb, Row, Table, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Tau, TuyenTau } from '~/service';
import { ArrowBack, Info } from '@mui/icons-material';
import { Breadcrumbs, Button, IconButton, Tooltip, Typography } from '@mui/material';
import moment from 'moment';

function ThongTinTau() {
  const { id } = useParams(null);
  const navigate = useNavigate();
  const [tau, setTau] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const document = await Tau.getInforTauById(id);
      setTau(document);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className={clsx(styles.wrapper)}>
      <div className="container">
        <div
          className="bg-white d-flex flex-row m-0 text-center border-bottom"
          style={{ height: '50px' }}
        >
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'gray',
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBack />
          </Button>
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{ marginTop: '13px', fonSize: '0.8rem' }}
          >
            <Link className="text-muted py-3 mb-3 " to="/">
              Home
            </Link>
            <Link className="text-muted py-3" to="/quanlytuyentau">
              Danh sách tàu
            </Link>
            <Link className="text-muted py-3" to="#">
              Chi tiết tàu
            </Link>
            <Typography color="text.primary"> {id}</Typography>
          </Breadcrumbs>
        </div>

        <div className="row bg-white mt-2 mx-1 py-3 px-1">
          <div className="col-5">
            <div className={clsx(styles.thongtintau)}>
              <h4 className="fw-bold text-uppercase mb-4">Thông tin tàu</h4>
              <div className={clsx(styles.thongtin)}>
                <Table className={clsx(styles.thongtin)}>
                  <tbody>
                    <tr>
                      <td>Mã tàu</td>
                      <td>{id}</td>
                    </tr>
                    <tr>
                      <td>Nơi sản xuất</td>
                      <td>{tau?.nhanhieu}</td>
                    </tr>
                    <tr>
                      <td>Số lượng ghế</td>
                      <td>{tau?.soluongghe} / ghế</td>
                    </tr>
                    <tr>
                      <td>Mã lục / Vận tốc</td>
                      <td>{tau?.vantoc} / mã lực</td>
                    </tr>
                    <tr>
                      <td>Tải trọng</td>
                      <td>{tau?.taitrong} / tấn</td>
                    </tr>
                    <tr>
                      <td>Thời gian khởi tạo: </td>
                      <td>{moment(tau?.create_at).format('LT DD/MM/YYYY')}</td>
                    </tr>
                    <tr>
                      <td>Lần chỉnh sửa thông tin gần nhất: </td>
                      <td>{moment(tau?.update_at).format('LT DD/MM/YYYY')}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className="col-7 d-flex justify-content-center">
            <img
              style={{ width: '65%' }}
              src="https://superdong.com.vn/wp-content/uploads/2019/02/Rach-Gia-Hon-Son-1.jpeg"
              alt={id}
            />
          </div>
        </div>

        <div className="row bg-white mt-3 mx-1 py-3 px-1">
          <div className={clsx(styles.thongtintau)}>
            <h4 className=" fw-bold mb-3 mt-2 text-uppercase">Tuyến tàu tàu hoạt động</h4>

            <table className="table hover mt-3 border">
              <thead>
                <tr className="text-center fw-bold">
                  <th>STT</th>
                  <th>Mã tuyến tàu</th>
                  <th>Trạng thái tuyến </th>

                  <th />
                </tr>
              </thead>
              <tbody>
                {tau?.matuyentau.length !== 0 ? (
                  tau?.matuyentau.map((value, index) => {
                    return (
                      <tr key={index} className="text-center">
                        <td className="py-3">{index + 1}</td>
                        <td className="py-3">{value?.matuyentau}</td>
                        <td>
                          {value?.trangthaitau ? (
                            <p
                              className={clsx(
                                styles.trangthaitrue,
                                ' rounded-pill m-auto w-50 text-center fw-bold py-2 ',
                              )}
                            >
                              Đang hoạt động
                            </p>
                          ) : (
                            <p
                              className={clsx(
                                styles.trangthaifalse,
                                ' rounded-pill text-center fw-bold w-50 py-2 m-auto',
                              )}
                            >
                              Dừng hoạt động
                            </p>
                          )}
                        </td>
                        <td>
                          <Tooltip
                            title="Xem chi tiết hoạt động của tau"
                            onClick={() => {
                              sessionStorage.clear();
                              sessionStorage.setItem('matau', id);
                              navigate(
                                `/quanlytau/chitiettau/chitietthoigian/${value.matuyentau}`,
                              );
                            }}
                          >
                            <IconButton>
                              <Info variant="primary" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="fw-bold text-danger text-center " colSpan={5}>
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThongTinTau;
