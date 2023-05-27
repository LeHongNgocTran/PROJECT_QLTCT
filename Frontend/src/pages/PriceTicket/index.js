import clsx from 'clsx';
import styles from './PriceTicket.module.scss';
import { Container, Breadcrumb, Row, Col, Nav } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import AccordionItem from '~/Components/Components/Accordion/AccordionStation';
import { useEffect, useRef, useState } from 'react';
import { GiaVeTuyenTau, TuyenTau } from '~/service';

function PriceTicket({ stationRef }) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const documents = await TuyenTau.getAllTuyenTau();
      setDocuments(documents);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.backdrop)}>
        <img
          className="d-block"
          src="https://superdong.com.vn/wp-content/uploads/2021/07/tau-cao-toc-superdong.jpeg"
          alt="Logo"
        ></img>
      </div>
      <Container className={styles.container}>
        <Breadcrumb className={styles.breadcrumb}>
          <Link to="/" className="text-muted">
            Home
          </Link>
          <Breadcrumb.Item></Breadcrumb.Item>
          <Breadcrumb.Item active className="fw-bold text-dark">
            Giá vé
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className={clsx(styles.nav)}>
          <Nav>
            <Nav.Item>
              <Link to="/login">Đặt vé trực tuyến</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/service">Lịch tàu chạy</Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/priceticket"
                className="border px-3 pt-2 pb-2 fw-bold text-white rounded-1"
                style={{ backgroundColor: 'gray' }}
              >
                Giá vé
              </Link>
            </Nav.Item>
          </Nav>
        </div>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} className="mb-4">
            <h4 className="text-uppercase fw-bold text-center mb-5 border w-50 p-2 m-auto text-white bg-dark">
              GIÁ VÉ TÀU CAO TỐC
            </h4>

            {documents.slice(0, 8).map((e, index) => {
              if (e.loai === 'tàu') {
                return (
                  <div key={index}>
                    <AccordionItem myKey={index} content={e} />
                  </div>
                );
              }
            })}
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <h4 className="text-uppercase fw-bold text-center mb-5 border w-50 p-2 m-auto text-white bg-dark">
              giá vé phà
            </h4>
            {documents.map((e, index) => {
              if (e.loai === 'phà')
                return (
                  <div key={index}>
                    <AccordionItem myKey={index} content={e} />
                  </div>
                );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PriceTicket;
