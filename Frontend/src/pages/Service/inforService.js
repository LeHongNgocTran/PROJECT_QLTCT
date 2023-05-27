import styles from './index.module.scss';
import clsx from 'clsx';
import { Col, Container, Row, Table } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
function InforService({ content }) {
  const [active, setActive] = useState(true);
  const handleActive = () => {
    if (content.loai2 !== undefined) setActive(!active);
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={12} lg={6}>
          <div className={clsx(styles.infor_logo)}>
            <img className="w-100 d-block" src={content.hinhanhmota} alt="Logo " />
          </div>
        </Col>
        <Col xs={12} md={12} lg={6}>
          <div className={clsx(styles.infor)}>
            <Table className={clsx(styles.table)}>
              <tbody>
                <tr>
                  <td colSpan={3} className="text-center">
                    <span className={clsx(styles.tuyenduong)}>
                      <span className={clsx(styles.station, 'fs-5 text-uppercase')}>
                        TUYẾN {content.diemdi}
                      </span>
                      <span className={clsx(styles.icon)}>
                        <FontAwesomeIcon icon={faArrowRightArrowLeft}></FontAwesomeIcon>
                      </span>
                      <span className={clsx(styles.station, 'fs-5 text-uppercase')}>
                        TUYẾN {content.diemden}
                      </span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <span className="d-flex justify-content-center ">
                      {content.loai1 !== undefined && (
                        <p
                          className={
                            active ? clsx(styles.phuongtien) : clsx(styles.phuongtien1)
                          }
                          onClick={handleActive}
                        >
                          {content.loai1}
                        </p>
                      )}

                      {content.loai2 !== undefined && (
                        <p
                          className={
                            active ? clsx(styles.phuongtien1) : clsx(styles.phuongtien)
                          }
                          onClick={handleActive}
                        >
                          {content.loai2}
                        </p>
                      )}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Tuyến</td>
                  <td className="text-uppercase">
                    <span>
                      <span className="fw-bold me-4 ">{content.diemdi}</span>
                      <span>
                        <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                      </span>
                      <span className="ms-4 fw-bold">{content.diemden}</span>
                    </span>
                  </td>
                  <td>
                    {' '}
                    <span className="text-uppercase">
                      <span className="fw-bold me-4">{content.diemden}</span>
                      <span>
                        <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                      </span>
                      <span className="ms-4 fw-bold">{content.diemdi}</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Giờ khởi hành</td>
                  <td>
                    {content.giokhoihanh1.map((e, index) => {
                      return <span key={index}>{e}&nbsp;</span>;
                    })}
                  </td>
                  <td>
                    {' '}
                    {content.giokhoihanh2.map((e, index) => {
                      return <span key={index}>{e}&nbsp;</span>;
                    })}
                  </td>
                </tr>
                <tr>
                  <td>Giờ cập bến</td>
                  <td>
                    {' '}
                    {content.giocapben1.map((e, index) => {
                      return <span key={index}>{e}&nbsp;</span>;
                    })}
                  </td>
                  <td>
                    {' '}
                    {content.giocapben2.map((e, index) => {
                      return <span key={index}>{e}&nbsp;</span>;
                    })}
                  </td>
                </tr>
                <tr>
                  <td>Tàu</td>
                  <td>{active ? content.loaitau : content.loaipha}</td>
                  <td>{active ? content.loaitau : content.loaipha}</td>
                </tr>
                <tr>
                  <td>Tải trọng</td>
                  <td>{content.taitrong + ' Hành khách'} </td>
                  <td>{content.taitrong + ' Hành khách'} </td>
                </tr>
                <tr>
                  <td>Vận tốc</td>
                  <td>{content.vantoc} hải lý / giờ</td>
                  <td>{content.vantoc} hải lý / giờ</td>
                </tr>
                {content.trungchuyen !== undefined ? (
                  <tr>
                    <td>Trung chuyển</td>
                    <td className="fw-bold">
                      <div>
                        <span>Giá : </span>
                        <span style={{ color: '#f3b41e' }}>
                          {content.trungchuyen.toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </span>
                      </div>
                      <div>
                        <span>SĐT : </span>
                        <span style={{ color: '#f3b41e' }}>{content.lienhe1 || ''}</span>
                      </div>
                    </td>
                    <td className="fw-bold">
                      <div>
                        <span>Giá : </span>
                        <span style={{ color: '#f3b41e' }}>
                          {content.trungchuyen.toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </span>
                      </div>
                      <div>
                        <span>SĐT : </span>
                        <span style={{ color: '#f3b41e' }}>{content.lienhe2 || ''}</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  ''
                )}
                {content.note1 !== undefined && (
                  <tr>
                    <td>Ghi chú (*) </td>
                    <td>{active ? content.note1 : content.note3}</td>
                    <td>{active ? content.note2 : content.note3}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default InforService;
