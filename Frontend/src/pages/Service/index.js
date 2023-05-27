import styles from './index.module.scss';
import clsx from 'clsx';
import { Breadcrumb, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TuyenTau } from '~/service';
import InforService from './inforService';
function Service() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await TuyenTau.getAllThongTinTuyenTau();
      setData(result);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.backdrop)}>
        <img
          className="d-block "
          src="https://superdong.com.vn/wp-content/uploads/2021/07/tau-cao-toc-superdong.jpeg"
          alt="Logo"
        ></img>
      </div>
      <Container className={styles.container}>
        <>
          <Breadcrumb className={styles.breadcrumb}>
            <Link to="/" className="text-muted">
              Home
            </Link>
            <Breadcrumb.Item></Breadcrumb.Item>
            <Breadcrumb.Item active className="text-dark fw-bold">
              Lịch tàu chạy
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className={clsx(styles.nav)}>
            <Nav>
              <Nav.Item>
                <Link to="/login">Đặt vé trực tuyến</Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/service"
                  className="border px-3 pt-2 pb-2 fw-bold text-white rounded-1"
                  style={{ backgroundColor: 'gray' }}
                >
                  Lịch tàu chạy
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/priceticket">Giá vé</Link>
              </Nav.Item>
            </Nav>
          </div>
        </>
        <h4 className="text-uppercase fw-bold text-center mb-5 border w-50 p-2 m-auto text-white bg-dark">
          LỊCH TÀU CHẠY
        </h4>
        {data.map((e, index) => {
          return (
            <div key={index}>
              <InforService content={e}></InforService>
            </div>
          );
        })}
      </Container>
    </div>
  );
}

export default Service;
