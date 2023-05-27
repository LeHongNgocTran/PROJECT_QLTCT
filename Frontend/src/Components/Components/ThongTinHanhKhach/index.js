import clsx from 'clsx';
import styles from '../../../pages/Search/DetailsInforUser/DetailsInforUser.module.scss';
import { Person } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TuyenTau } from '~/service';

function ThongTinHanhKhach({ index, parentCallBack, data }) {
  const [value, setValue] = useState({
    cccd: '',
    hoten: '',
    noisinh: '',
    date: '',
    loaive: '',
    dienthoai: '',
    quoctich: '',
    email: '',
    vitringoi: '',
    vitringoikhuhoi: '',
    gia: 0,
  });
  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [nationally, setNationally] = useState([]);
  const [tuyentau, setTuyenTau] = useState([]);
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => setNationally(res.data));
    const fetchData = async () => {
      const documents = await TuyenTau.getTuyenTauById(data);
      setTuyenTau(documents.giavehanhkhach);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className={clsx(styles.wrapper, 'container mb-4')}>
      <h5>
        <Person className="mb-2 me-2" />
        Hành khách {index}
      </h5>
      <div className="row">
        <div className={clsx(styles.infor, 'col-6 col-lg-3 ')}>
          <label className={clsx(styles.infor_label)}>CCCD/Hộ chiếu</label>
          <input
            name="cccd"
            className={clsx(styles.infor_input)}
            type="text"
            maxLength={13}
            placeholder="Nhập CCCD / Hộ chiếu"
            value={value.cccd}
            onChange={handleChange}
          />
        </div>
        <div className={clsx(styles.infor, 'col-6 col-lg-3 ')}>
          <label className={clsx(styles.infor_label)}>Họ tên</label>
          <input
            className={clsx(styles.infor_input)}
            type="text"
            name="hoten"
            placeholder="Họ tên"
            value={value.hoten}
            onChange={handleChange}
            required
          />
        </div>
        <div className={clsx(styles.infor, 'col-6 col-lg-3 ')}>
          <label className={clsx(styles.infor_label)}>Nơi sinh</label>
          <input
            required
            name="noisinh"
            className={clsx(styles.infor_input)}
            type="text"
            placeholder="Nhập nơi sinh"
            value={value.noisinh}
            onChange={handleChange}
          />
        </div>
        <div className={clsx(styles.infor, 'col-6 col-lg-3 ')}>
          <label className={clsx(styles.infor_label)}>Ngày sinh</label>
          <input
            className={clsx(styles.infor_input)}
            type="date"
            name="date"
            id="date"
            min="1920-01-01"
            max="2023-12-31"
            required
            value={value.date}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className={clsx(styles.infor, 'col-6 col-lg-3 ')}>
          <label className={clsx(styles.infor_label)}>Loại vé</label>
          <select
            name="gia"
            className={clsx(styles.infor_input)}
            style={{ height: '34px', backgroundColor: '#eeeee4' }}
            value={value.gia}
            onChange={(e) => {
              setValue((prev) => ({
                ...prev,
                gia: e.target.value,
                loaive: e.target[e.target.selectedIndex].text,
              }));
            }}
          >
            <option>Chọn loại vé</option>
            {tuyentau.map((value, index) => (
              <option key={index} value={value.gia}>
                {value.label}
              </option>
            ))}
          </select>
        </div>
        <div className={clsx(styles.infor, 'col-6 col-lg-3 ')}>
          <label className={clsx(styles.infor_label)}>Số điện thoại</label>
          <input
            value={value.dienthoai}
            onChange={handleChange}
            className={clsx(styles.infor_input)}
            type="text"
            maxLength={10}
            name="dienthoai"
            placeholder="Điện thoại"
            required
          />
        </div>
        <div className={clsx(styles.infor, 'col-6 col-lg-3 ')}>
          <label className={clsx(styles.infor_label)}>Quốc tịch</label>
          <select
            className={clsx(styles.infor_input)}
            value={value.quoctich}
            onChange={handleChange}
            name="quoctich"
            style={{ height: '34px' }}
          >
            <option value="">Chọn quốc tịch</option>

            {nationally.map((value, index) => {
              return (
                <option key={index} value={value.name.common}>
                  {value.name.common}
                </option>
              );
            })}
          </select>
        </div>
        <div className={clsx(styles.infor, 'col-6 col-lg-3 ')}>
          <label className={clsx(styles.infor_label)}>Email</label>
          <input
            required
            className={clsx(styles.infor_input)}
            value={value.email}
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            onBlur={() => parentCallBack(value)}
          />
        </div>
      </div>
    </div>
  );
}

export default ThongTinHanhKhach;
