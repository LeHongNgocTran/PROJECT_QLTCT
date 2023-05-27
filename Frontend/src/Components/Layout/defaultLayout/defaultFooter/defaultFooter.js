import styles from './defaultFooter.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

import { PhongVe } from '~/service/index';

import Accordion from '~/Components/Components/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { forwardRef, useEffect, useState } from 'react';

function DefaultFooter({ props }, ref) {
  const [phongve, setPhongVe] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await PhongVe.getPhongVe();
      setPhongVe(data);
    };
    fetchData().catch(console.error);
  }, []);
  return (
    <Container fluid ref={ref} className={clsx(styles.wrapper)}>
      <Row className={clsx(styles.container)}>
        <Col xs={12} md={3} className={clsx(styles.first_column)}>
          <ul className={clsx(styles.condition)}>
            <li>
              <h4 className="text-white fw-bold">CHÍNH SÁCH</h4>
            </li>
            <li>
              <Link to="/">Điều lệ vận chuyển</Link>
            </li>
            <li>
              <Link to="/">Điều khoản và điều kiện sử dụng</Link>
            </li>
            <li>
              <Link to="/">Chính sách bảo mật thông tin</Link>
            </li>
            <li>
              <Link to="/">Điều kiện đặt vé trực tuyến</Link>
            </li>
            <li>
              <Link to="/">Quy định hoàn đổi vé online</Link>
            </li>
          </ul>

          <ul className={clsx(styles.connect)}>
            <li>
              <h4 className={clsx('fw-bold text-white')}>Kết nối</h4>
            </li>
            <li>
              <FontAwesomeIcon
                icon={faFacebook}
                size="2x"
                color="white"
                className="me-2"
              />
              <a href="https://www.facebook.com">Facebook</a>
            </li>
            <li>
              <FontAwesomeIcon
                icon={faTwitter}
                size="2x"
                color="white"
                className="me-2"
              />
              <a href="https://www.twitter.com">Twitter</a>
            </li>
            <li>
              <FontAwesomeIcon
                icon={faYoutube}
                size="2x"
                color="white"
                className="me-2"
              />
              <a href="https://www.youtube.com">Youtube</a>
            </li>
          </ul>
        </Col>
        <Col xs={12} md={9} id={clsx(styles.footer_second_column)}>
          <h4 className={clsx('text-white fw-bold mb-4 ')}>HỆ THỐNG PHÒNG VÉ</h4>
          <Row className={clsx(styles.row_second)}>
            {phongve.map((e, index) => {
              return (
                <Col xs={12} md={4} key={index} className={clsx(styles.list)}>
                  <Accordion
                    name={e.name}
                    address={e.address}
                    phone={e.phone}
                    email={e.email}
                    hotline={e.hotline}
                  ></Accordion>
                </Col>
              );
            })}
            <Row className={clsx(styles.sellter)}>
              <h4 className={clsx('text-white fw-bold')}>NHẬN THÔNG TIN TỪ CHÚNG TÔI</h4>
              <div className={clsx(styles.form)}>
                <input type="email" placeholder="Nhập email của bạn"></input>
                <button>Đăng ký</button>
              </div>
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default forwardRef(DefaultFooter);
