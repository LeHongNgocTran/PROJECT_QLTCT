import {
  faCalendar,
  faCheck,
  faEnvelope,
  faHome,
  faLock,
  faPhone,
  faUser,
  faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaiKhoan } from '~/service';
import styles from '../Login/Login.module.scss';

import PopUp from '~/Components/Components/PopUp';
import { validation } from '~/Validation/validation';
function Register() {
  const [account, setAccount] = useState({
    mataikhoan: '',
    matkhau: '',
    name: '',
    email: '',
    address: '',
    date: '',
    sex: '',
  });
  // Lắng nghe sự thay đổi của dòng dữ liệu input
  const handleChange = (e) => {
    setAccount((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // chuyển tràn
  const navigate = useNavigate();
  //Nội dung của popup
  const [content, setContent] = useState('');
  // trạng thái lỗi
  const [error, setError] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  // Hiển thị popup
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(validation(account));

    if (Object.keys(validation(account)).length === 0) {
      const error = await TaiKhoan.register({ account, position: 'user' });
      console.log(error);
      if (error === true) {
        setContent('Số điện thoại đã được sử dụng');
        setErrorMessage(true);
        setModalShow(true);
      } else if (error === false) {
        setErrorMessage(false);
        setContent('Đăng ký thành công');
        setModalShow(true);
      }
    }
  };
  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.container)}>
        <h4 className="text-center fw-bold">ĐĂNG KÝ TÀI KHOẢN</h4>
        <form className={clsx(styles.form)} onSubmit={handleSubmit}>
          <div className="d-flex flex-row">
            <label className="pt-3">
              <FontAwesomeIcon icon={faPhone} size="2x" />
            </label>
            <div className="d-flex flex-column">
              <input
                className={clsx(styles.form__row__input)}
                type="text"
                name="mataikhoan"
                id="mataikhoan"
                required
                placeholder="Nhập số điện thoại (*)"
                maxLength={10}
                value={account.mataikhoan}
                onChange={handleChange}
              ></input>
              {error.mataikhoan && (
                <small className={clsx(styles.announce)}>{error.mataikhoan}</small>
              )}
            </div>
          </div>
          <div className="d-flex flex-row">
            <label className="pt-3">
              <FontAwesomeIcon icon={faLock} size="2x" />
            </label>
            <div className="d-flex flex-column">
              <input
                className={clsx(styles.form__row__input)}
                type="password"
                name="matkhau"
                id="matkhau"
                placeholder="Nhập mật khẩu (*)"
                required
                value={account.matkhau}
                onChange={handleChange}
              />
              {error.matkhau && (
                <small className={clsx(styles.announce)}>{error.matkhau}</small>
              )}
            </div>
          </div>

          <div className="d-flex flex-row">
            <label className="pt-3">
              <FontAwesomeIcon icon={faUser} size="2x" />
            </label>
            <div className="d-flex flex-column">
              <input
                className={clsx(styles.form__row__input)}
                type="text"
                name="name"
                id="name"
                placeholder="Nhập họ tên của bạn (*)"
                required
                value={account.name}
                onChange={handleChange}
              />
              {error.name && (
                <small className={clsx(styles.announce)}>{error.name}</small>
              )}
            </div>
          </div>
          <div className="d-flex flex-row">
            <label className="pt-3">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </label>
            <div className="d-flex flex-column">
              <input
                className={clsx(styles.form__row__input)}
                type="email"
                name="email"
                id="email"
                placeholder="Nhập email của bạn (*)"
                value={account.email}
                onChange={handleChange}
              />
              {error.email && (
                <small className={clsx(styles.announce)}>{error.email}</small>
              )}
            </div>
          </div>
          <div className="d-flex flex-row">
            <label className="pt-3">
              <FontAwesomeIcon icon={faHome} size="2x" />
            </label>
            <div className="d-flex flex-column">
              <input
                className={clsx(styles.form__row__input)}
                type="text"
                name="address"
                id="address"
                placeholder="Nhập địa chỉ của bạn (*)"
                required
                value={account.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="pt-3">
              <FontAwesomeIcon icon={faCalendar} size="2x" />
            </label>
            <input
              className={clsx(styles.form__row__input)}
              type="date"
              name="date"
              id="date"
              min="1950-01-01"
              max="2050-12-31"
              required
              value={account.date}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex flex-row ">
            <label>
              <FontAwesomeIcon icon={faVenusMars} size="2x" />
            </label>
            <div className={clsx(styles.radiooption)}>
              <input
                type="radio"
                onChange={handleChange}
                value="Nam"
                id="Male"
                name="sex"
              />
              <label>Nam</label>
              <input
                type="radio"
                onChange={handleChange}
                value="Nữ"
                id="Female"
                name="sex"
              />
              <label>Nữ</label>
            </div>
          </div>
          <button>tạo tài khoản</button>
        </form>
        <PopUp
          error={errorMessage}
          content={content}
          show={modalShow}
          messageSuccess="Bạn đã đăng ký thành công"
          messageError="Vui lòng nhập lại"
          onHide={() => {
            if (errorMessage === true) setModalShow(false);
            else {
              setModalShow(false);
              setTimeout(() => navigate('/login'), 1100);
            }
          }}
        />
      </div>
    </div>
  );
}

export default Register;
