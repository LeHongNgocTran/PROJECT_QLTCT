import styles from './Search.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';

import ResultSearch from './resultSearch';
import { Hoadon, TuyenTau } from '~/service';
import moment from 'moment';
import PopUp from '~/Components/Components/PopUp';
import {
  ArrowBack,
  DirectionsBoatOutlined,
  PersonOutlineOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import { Breadcrumbs, Button, TextField, Typography } from '@mui/material';
import LoadingPage from '~/Components/Components/LoadingPage';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

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

function ChangeTicketAdmin() {
  const { id } = useParams(null);
  const [infoBill, setInfoBill] = useState({});
  const [nameTuyen, setNameTuyen] = useState('');
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [TuyenTauStart, setTuyenTauStart] = useState({
    tuyentau: [],
    type: '',
  });

  const [TuyenTauBack, setTuyenTauBack] = useState({ tuyentau: [], type: '' });

  const [search, setSearch] = useState({
    ngaykhoihanh: moment().format('YYYY-MM-DD'),
    ngayve: '',
  });

  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setSearch((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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
    if (search.ngaykhoihanh === '' && infoBill.data.loaive === 'Một chiều') {
      setMessage('YÊU CẦU CHỌN NGÀY KHỞI HÀNH');
      setShow(true);
    } else if (search.ngayve === '' && infoBill.data.loaive === 'Khứ hồi') {
      setMessage('YÊU CẦU CHỌN NGÀY VỀ');
      setShow(true);
    } else {
      const tau = await TuyenTau.searchTuyenTauHoatDong(infoBill.data.matuyentaudi, {
        loaive: infoBill.data?.loaive,
        dayStart: moment(search.ngaykhoihanh).format('L'),
        dayEnd: moment(search.ngayve).format('L'),
        soluong: infoBill.data.thongtinhanhkhach.length,
      });
      setLoading(true);
      setData(tau);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await TuyenTau.getAllTuyenTau();
      const document = await Hoadon.getBillById(id);
      setInfoBill(document);

      setTuyenTauStart({
        tuyentau: result,
        type: 'Xuất phát',
      });
      setTuyenTauBack({
        tuyentau: result,
        type: 'Trở về',
      });
      setNameTuyen(() => {
        const name = document.diadiem.diemdi + ' - ' + document.diadiem.diemden;
        return name;
      });
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className={clsx(styles.wrapper)}>
      <div
        className=" bg-white d-flex flex-row m-0 text-center justify-content-between border-bottom "
        style={{ height: '50px' }}
      >
        <div className=" d-flex flex-row">
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'gray',
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBack />
          </Button>
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{ marginTop: '13px', fontSize: '0.8rem' }}
          >
            <Link className="text-muted py-3" to="/">
              Vé
            </Link>
            <Link className="text-muted py-3" to="#">
              Đổi vé
            </Link>
            <Typography color="text.primary"> {id}</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className={clsx(styles.search, 'container shadow')}>
        <div>
          <div className="d-flex flex-row mb-3">
            {infoBill.data?.loaive === 'Một chiều' ? (
              <p className={clsx(styles.loaive)}>Một chiều</p>
            ) : (
              <p className={clsx(styles.loaiveActive)}>Khứ hồi</p>
            )}
          </div>
          <div className={clsx(styles.searchbar)}>
            <div className="d-flex flex-row w-25">
              <DirectionsBoatOutlined className="mt-4 me-3 " />
              <TextField
                className="w-100"
                label="Chọn tuyến"
                value={nameTuyen}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </div>
            <div className="ms-2 d-flex flex-row">
              <PersonOutlineOutlined className="mt-3 me-3" />
              <TextField
                label="Số lượng"
                type="number"
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
                value={infoBill.data?.thongtinhanhkhach.length}
                name="soluong"
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
            {infoBill.data?.loaive === 'Khứ hồi' ? (
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
        messageSuccess="Vui lòng điền đầy đủ thông tin"
        onHide={() => {
          setShow(false);
        }}
      />
      {loading ? (
        <LoadingPage loading={loading}></LoadingPage>
      ) : (
        <>
          {Object.keys(data).length !== 0 ? (
            <Container className={clsx(styles.resultSearch, 'shadow')}>
              <ResultSearch
                result={{ ...data, ...infoBill, active: infoBill.data?.loaive }}
                quantity={infoBill.data?.thongtinhanhkhach.length}
              />
            </Container>
          ) : null}
        </>
      )}
    </div>
  );
}

export default ChangeTicketAdmin;
