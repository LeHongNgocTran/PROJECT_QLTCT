import styles from './home.module.scss';
import clsx from 'clsx';
import SliderImage from './SliderImage';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AccordionItem from '~/Components/Components/Accordion/AccordionStation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { useEffect, useState } from 'react';
import { GiaVeTuyenTau, TuyenTau } from '~/service';
function HomePage() {
  const [tuyentau, setTuyenTau] = useState([]);
  const [giave, setGiaVe] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetChData = async () => {
      const tuyentau = await TuyenTau.getAllTuyenTau();
      const giave = await GiaVeTuyenTau.getAllTuyenTau();

      setTuyenTau(tuyentau.slice(0, 6));
      setGiaVe(giave);
    };
    fetChData().catch(console.error);
  }, []);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  // console.log(giave);
  // console.log(tuyentau);
  return (
    <div className={clsx(styles.wrapper)}>
      <div
        className={clsx(styles.carousel)}
        onClick={() => {
          navigate('/login');
        }}
      >
        <SliderImage />
      </div>
      <div className={clsx(styles.giave)}>
        <h4 className="text-uppercase fw-bold text-center mb-5 border w-50 p-2 m-auto text-white bg-dark">
          Lịch khởi hành
        </h4>
        <Carousel responsive={responsive}>
          {giave.map((value, index) => {
            return (
              <div key={index} className={clsx(styles.sliderimage)}>
                <div className={clsx(styles.image)}>
                  <img
                    className="d-block w-100"
                    src={value.hinhanhmota}
                    alt="Ship SuperDong"
                    loading="lazy"
                  ></img>
                </div>

                <span className={clsx(styles.tuyenduong)}>
                  <span className={clsx(styles.station)}>{value.diemdi}</span>
                  <span className={clsx(styles.icon)}>
                    <FontAwesomeIcon icon={faArrowRightArrowLeft}></FontAwesomeIcon>{' '}
                  </span>
                  <span className={clsx(styles.station)}>{value.diemden}</span>
                </span>
              </div>
            );
          })}
        </Carousel>
        ;
      </div>
      <div className={clsx(styles.giave)} style={{ backgroundColor: '#F2F2F2 ' }}>
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <h4 className="text-uppercase fw-bold text-center mb-5 border w-50 p-2 m-auto text-white bg-dark">
                GIÁ VÉ TÀU - PHÀ
              </h4>

              {tuyentau.map((e, index) => {
                return (
                  <AccordionItem
                    key={index}
                    myKey={index}
                    content={e}
                    onClick={() => {
                      return navigate(`/priceticket/${index}`);
                    }}
                  />
                );
              })}
            </Col>
            <Col xs={12} md={6}>
              <img
                className="d-block w-100"
                alt="Hòn Sơn"
                src="https://thamhiemmekong.com/wp-content/uploads/2020/04/du-lich-honson.jpg"
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div className={clsx(styles.banner)}>
        <img
          className="d-block w-100"
          src="https://superdong.com.vn/wp-content/uploads/2021/11/tau-cao-toc-superdong.jpg"
          alt="Banner"
        ></img>
      </div>
    </div>
  );
}

const SliderShip = () => {
  return (
    <div className={clsx(styles.sliderimage)}>
      <div className={clsx(styles.image)}>
        <img
          className="d-block w-100"
          src="https://superdong.com.vn/wp-content/uploads/2019/02/RG-ND-1.png"
          alt="Ship SuperDong"
        ></img>
      </div>

      <span className={clsx(styles.tuyenduong)}>
        <span className={clsx(styles.station)}>Hà Tiên</span>
        <span className={clsx(styles.icon)}>
          <FontAwesomeIcon icon={faArrowRightArrowLeft}></FontAwesomeIcon>{' '}
        </span>
        <span className={clsx(styles.station)}>Phú Quốc</span>
      </span>
    </div>
  );
};
export default HomePage;
