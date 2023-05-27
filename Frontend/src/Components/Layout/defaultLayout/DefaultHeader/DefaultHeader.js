import clsx from 'clsx';
import styles from './DefaultHeader.module.scss';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';

function DefaultHeader({ footerRef }) {
  // Hàm Scroll to Footer
  const handleScrollFooter = (e) => {
    e.preventDefault();
    footerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={clsx(styles.wrapper, 'd-flex')}>
      <div className={clsx(styles.logo_header)}>
        <Link to="/">
          <img
            alt="Tàu cao tốc"
            src="https://superdong.com.vn/wp-content/themes/supperdong/img/logo.svg"
          />
        </Link>
        <div className={clsx(styles.logo_holder)}></div>
      </div>
      <div className={clsx(styles.container, 'd-flex flex-row')}>
        <div className={clsx(styles.nav)}>
          <div className={clsx(styles.top_nav)}>
            <Nav>
              <Nav.Item>
                <Link to="/">Giới thiệu</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/">Tin tức</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/">Cẩm nang du lịch</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/">Thư viện hình ảnh</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/">Thời tiết</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/">Liên hệ</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/">Tuyển dụng</Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className={clsx(styles.bottom_nav)}>
            <Nav>
              <Nav.Item>
                <Link to="/">
                  <FontAwesomeIcon icon={faHouse} />
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/service">dịch vụ</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/priceticket">giá vé</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/search">mua vé trực tuyến</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/">quan hệ cổ đông</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/">Liên hệ</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/">khuyến mãi</Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
        <div className={clsx(styles.hotlink)}>
          <div>
            <p
              className={clsx(styles.hethongbanve, 'fw-bold text-uppercase')}
              onClick={handleScrollFooter}
            >
              Hệ thống phòng vé
            </p>
          </div>
          <div className={clsx(styles.language)}>
            <Tippy content="Việt Nam" placement="bottom">
              <img
                alt="VN"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
              ></img>
            </Tippy>
            <Tippy content="English" placement="bottom">
              <img
                alt="English"
                src="https://cdn.britannica.com/25/4825-050-977D8C5E/Flag-United-Kingdom.jpg?w=400&h=235&c=crop"
              ></img>
            </Tippy>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DefaultHeader;
