import styles from './Search.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';

import ResultSearch from './resultSearch';
import { TuyenTau } from '~/service';
import moment from 'moment';
import PopUp from '~/Components/Components/PopUp';
import {
  DirectionsBoatOutlined,
  PersonOutlineOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import LoadingPage from '~/Components/Components/LoadingPage';
import { useDispatch, useSelector } from 'react-redux';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Search() {
  const [active, setActive] = useState(false);

  let [loading, setLoading] = useState(false);

  const handleActive = () => {
    setActive((e) => !e);
  };
  const [TuyenTauStart, setTuyenTauStart] = useState({
    tuyentau: [],
    type: '',
  });
  const [TuyenTauBack, setTuyenTauBack] = useState({ tuyentau: [], type: '' });

  const [search, setSearch] = useState({
    loaive: active,
    tuyentau: '',
    soluong: 1,
    ngaykhoihanh: moment().format('YYYY-MM-DD'),
    ngayve: '',
  });

  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const disableDates = () => {
    let dd,
      mm,
      yyyy,
      m = '',
      d = '';
    let today = new Date();
    dd = today.getDate();
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    if (dd < 10) {
      d = '0';
    } else if (mm < 10) {
      m = '0';
    }
    return yyyy + '-' + m + mm + '-' + d + dd;
  };

  const handleSubmit = async () => {
    if (search.tuyentau === '') {
      setMessage('YÊU CẦU CHỌN TUYẾN TÀU');
      setShow(true);
    } else if (active === true && search.ngayve === '') {
      setMessage('YÊU CẦU CHỌN NGÀY VỀ');
      setShow(true);
    } else if (search.soluong > 10) {
      setMessage('Số lượng hành khách không thể vượt quá 10 ');
      setShow(true);
    } else if (search.soluong < 1) {
      setMessage('Số lượng hành khách không thể nhỏ hơn 1');
      setShow(true);
    } else {
      const tau = await TuyenTau.searchTuyenTauHoatDong(search.tuyentau, {
        loaive: active ? 'Hai chiều' : 'Một chiều',
        dayStart: moment(search.ngaykhoihanh).format('L'),
        dayEnd: moment(search.ngayve).format('L'),
        soluong: search.soluong,
      });
      setLoading(true);
      setData(tau);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  const handleChange = (e) => {
    setSearch((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await TuyenTau.getAllTuyenTau();
      setTuyenTauStart({
        tuyentau: result,
        type: 'Xuất phát',
      });
      setTuyenTauBack({
        tuyentau: result,
        type: 'Trở về',
      });
    };
    fetchData().catch(console.error);
  }, [data]);
  const user = useSelector((state) => state.permission);
  return (
    <div
      className={
        user.users.permission > 0 ? clsx(styles.wrapperAdmin) : clsx(styles.wrapper)
      }
    >
      <div
        className={
          user.users.permission > 0
            ? clsx(styles.searchAdmin, 'container shadow')
            : clsx(styles.search, 'container')
        }
      >
        <div>
          <div className="d-flex flex-row mb-3">
            <p
              className={active ? clsx(styles.loaiveActive) : clsx(styles.loaive)}
              onClick={handleActive}
              name="Một chiều"
            >
              Một chiều
            </p>
            <p
              onClick={handleActive}
              className={active ? clsx(styles.loaive) : clsx(styles.loaiveActive)}
            >
              Khứ hồi
            </p>
          </div>
          <div className={clsx(styles.searchbar)}>
            <div className="d-flex flex-row w-25">
              <DirectionsBoatOutlined className="mt-4 me-3 " />
              <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-label">Chọn tuyến</InputLabel>
                <Select
                  MenuProps={MenuProps}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={search.tuyentau}
                  onChange={handleChange}
                  label="Chọn tuyến"
                  name="tuyentau"
                >
                  {' '}
                  {TuyenTauStart.tuyentau.map((e, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={e.matuyentau}
                        className="text-uppercase"
                      >
                        {e.diemdi + ' - ' + e.diemden}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="ms-2 d-flex flex-row">
              <PersonOutlineOutlined className="mt-3 me-3" />
              <TextField
                id="standard-number"
                label="Số lượng"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={search.soluong}
                name="soluong"
                onChange={handleChange}
                variant="standard"
              />
            </div>
            <div className={clsx(styles.dateTime)}>
              <input
                type="date"
                name="ngaykhoihanh"
                id="date"
                min={disableDates()}
                max="2050-12-31"
                value={search.ngaykhoihanh}
                onChange={handleChange}
                required
              />
            </div>
            {active ? (
              <div className={clsx(styles.dateTime)}>
                <input
                  type="date"
                  name="ngayve"
                  id="date"
                  min={disableDates()}
                  max="2050-12-31"
                  value={search.ngayve}
                  onChange={handleChange}
                  required
                ></input>
              </div>
            ) : (
              <div className={clsx(styles.date)}></div>
            )}
            <button
              onClick={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            >
              <SearchOutlined className="me-2" />
              Tìm
            </button>
          </div>
        </div>
      </div>
      <PopUp
        error={true}
        content={message}
        show={show}
        messageSuccess="Vui lòng nhập lại thông tin"
        onHide={() => {
          setShow(false);
        }}
      />
      {loading ? (
        <LoadingPage loading={loading}></LoadingPage>
      ) : (
        <>
          {Object.keys(data).length !== 0 ? (
            <Container
              className={
                user.users.permission > 0
                  ? clsx(styles.resultSearchAdmin, 'shadow')
                  : clsx(styles.resultSearch)
              }
            >
              <ResultSearch result={{ ...data, active }} quantity={search.soluong} />
            </Container>
          ) : null}
        </>
      )}
    </div>
  );
}

export default Search;
