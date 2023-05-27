import {
  faMessage,
  faPhone,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

import clsx from 'clsx';
import styles from './loginHeader.module.scss';
import { Col, Container, Nav, Row } from 'react-bootstrap';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '~/reducer/Permission';
import { Person } from '@mui/icons-material';

function LoginHeader() {
  const login = useSelector((state) => state.permission);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOut = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <Container className={clsx(styles.top_header)}>
        <div className={clsx(styles.phone)}>
          <Tippy content="Điện thoại liên hệ">
            <p className="text-white p-0 my-0 me-4 ">
              <FontAwesomeIcon icon={faPhone} />
              &nbsp; 19001515{' '}
            </p>
          </Tippy>
          <Tippy content="Gmail">
            <p className="text-white p-0 my-0">
              <FontAwesomeIcon icon={faMessage} />
              &nbsp; superdong@gmail.com
            </p>
          </Tippy>
        </div>
        <div className={clsx(styles.language)}>
          <Tippy content="Việt Nam">
            <img
              alt="VN"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
            ></img>
          </Tippy>
          <Tippy content="English">
            <img
              alt="English"
              src="https://cdn.britannica.com/25/4825-050-977D8C5E/Flag-United-Kingdom.jpg?w=400&h=235&c=crop"
            ></img>
          </Tippy>
        </div>
        <div>
          {login.loggedInUser === false ? (
            <div>
              <Link to="/register" className="border-end border-3">
                <FontAwesomeIcon icon={faRightFromBracket} />
                &nbsp; Đăng Ký
              </Link>
              <Link to="/login">
                <FontAwesomeIcon icon={faRightFromBracket} />
                &nbsp; Đăng Nhập
              </Link>
            </div>
          ) : (
            <div className={clsx(styles.infor)}>
              <>
                <Tippy content="Xem thông tin" placement="bottom">
                  <p
                    className="fw-bold"
                    onClick={() => {
                      navigate(`/infoUser/${login.users._id}`);
                    }}
                  >
                    {' '}
                    <Person /> &nbsp; {login.users.taikhoan.mataikhoan}
                  </p>
                </Tippy>
              </>
              <button
                onClick={handleOut}
                style={{
                  color: 'white',
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontWeight: 'bold',
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                &nbsp; Đăng xuất
              </button>
            </div>
          )}
        </div>
      </Container>
      <div className={clsx(styles.wrapper1)}>
        <Container className={clsx(styles.header)}>
          <Row>
            <Col xs={12} md={6}>
              <Link to="/">
                <img
                  alt="Tàu cao tốc"
                  src="https://superdong.com.vn/wp-content/themes/supperdong/img/logo.svg"
                />
                <h4 className="ms-3 text-center">
                  CÔNG TY CỔ PHẦN TÀU CAO TỐC SUPERDONG EXPRESS
                </h4>
              </Link>
            </Col>
            <Col xs={12} md={6} className="d-flex align-items-end justify-content-end">
              <Nav className={clsx(styles.nav)}>
                <Nav.Item>
                  <Tippy content="Trang chủ" placement="bottom">
                    <Link to="/">Trang chủ</Link>
                  </Tippy>
                </Nav.Item>
                <Nav.Item>
                  <Tippy content="Đặt vé" placement="bottom">
                    <Link to="/search">Đặt vé</Link>
                  </Tippy>
                </Nav.Item>
                <Nav.Item>
                  <Tippy content="Liên hệ" placement="bottom">
                    <Link to="/">Liên Hệ</Link>
                  </Tippy>
                </Nav.Item>
                {login.loggedInUser === true && (
                  <Nav.Item>
                    <Tippy content="Lịch sử đặt vé" placement="bottom">
                      <Link to="/lichsudatve">Lịch sử đặt vé</Link>
                    </Tippy>
                  </Nav.Item>
                )}
              </Nav>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default LoginHeader;
