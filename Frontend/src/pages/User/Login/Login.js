import clsx from 'clsx';
import styles from './Login.module.scss';
import Permission from '~/reducer/Permission';

import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { TaiKhoan } from '~/service';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '~/reducer/Permission';
import { toast } from 'react-toastify';

function LogIn() {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    mataikhoan: '',
    matkhau: '',
  });

  const handleChange = (e) => {
    setAccount((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const document = await TaiKhoan.findByName(account);
    if (document.error) {
      toast.error('Sai số điện thoại hoặc mật khẩu, vui lòng nhập lại', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } else {
      toast.success('Đăng nhập thành công !', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      dispatch(login(document.documents));

      if (document.documents.permission === 0) {
        // console.log(1);
        navigate('/search');
      } else if (document.documents.permission > 0) {
        navigate('/dashboard');
      }
      // Chờ 2.1s để chuyển sang trang khác
    }
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.container)}>
        <h4 className="text-center fw-bold">ĐĂNG NHẬP</h4>

        <div className={clsx(styles.form)}>
          <form
            className="d-flex flex-column justify-content-center"
            onSubmit={handleSubmit}
          >
            <div>
              <label>
                <FontAwesomeIcon icon={faPhone} size="2x" />
              </label>
              <input
                className={clsx(styles.form__row__input)}
                type="text"
                name="mataikhoan"
                id="mataikhoan"
                required
                placeholder="Số điện thoại"
                maxLength={10}
                value={account.mataikhoan}
                onChange={handleChange}
              ></input>
              <small className={clsx(styles.announce)}></small>
            </div>
            <div>
              <label>
                <FontAwesomeIcon icon={faLock} size="2x" />
              </label>
              <input
                className={clsx(styles.form__row__input)}
                type="password"
                name="matkhau"
                id="matkhau"
                placeholder="Mật khẩu"
                value={account.matkhau}
                onChange={handleChange}
                required
              />
              <small className={clsx(styles.announce)}>{}</small>
            </div>
            <button className="px-3">Đăng nhập</button>
          </form>

          <div className={clsx(styles.noaccount, 'd-flex flex-row mt-3')}>
            <p className="fw-bold ">Không có tài khoản?&nbsp;</p>
            <Link to="/register">Tạo tài khoản</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
