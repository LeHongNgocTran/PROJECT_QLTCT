import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

import {
  Button,
  TextField,
  Breadcrumbs,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { ArrowBack, StayPrimaryLandscapeSharp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { TuyenTau } from '~/service';
import { NoImage } from '~/assets/images';
import { toast } from 'react-toastify';

function AddAndUpdate() {
  const navigate = useNavigate();

  const [giokhoihanh, setGiokhoihanh] = useState('');

  const [giocapben, setGiocapben] = useState('');

  const [tuyentau, setTuyenTau] = useState({
    matuyentau: '',
    diemdi: '',
    diemden: '',
    trangthai: true,
    create_at: new Date(),
    update_at: '',
  });

  const [details, setDetails] = useState({
    loaitau: '',
    loaipha: '',
    taitrong: '',
    vantoc: '',
  });
  const [giavenguoi, setGiaVeNguoi] = useState({
    giavenguoilon: 0,
    giavenguoicaotuoi: 0,
    treem: 0,
    nguoikhuyettat: 0,
  });
  // //của tàu
  const [giokhoihanh1, setGiokhoihanh1] = useState([]);
  const [giocapben1, setGiocapben1] = useState([]);
  // //của phà
  const [giokhoihanh2, setGiokhoihanh2] = useState([]);
  const [giocapben2, setGiocapben2] = useState([]);

  const [image, setImage] = useState('');
  const [imageDisplay, setImageDisplay] = useState();

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const [phuongtien, setPhuongTien] = useState({
    xemay: 0,
    xe4cho: 0,
    xe16cho: 0,
    xe25cho: 0,
    xebagac: 0,
    xetai500: 0,
    xetai15: 0,
    xetai25: 0,
    container20: 0,
    container40: 0,
    container45: 0,
  });

  const handleChangeGiaPhuongTien = (e) => {
    setPhuongTien((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setFileToBase(file);
    setImageDisplay(file);
  };

  const handleChange = (e) => {
    setTuyenTau((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeGiaVe = (e) => {
    setGiaVeNguoi((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeDetails = (e) => {
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    let document = {
      ...details,
      ...tuyentau,
      ...giavenguoi,
      giokhoihanh1: giokhoihanh1,
      giocapben1: giocapben1,
      image: image,
    };
    if (details.loaipha !== '') {
      document = {
        ...details,
        ...tuyentau,
        ...giavenguoi,
        giokhoihanh1: giokhoihanh1,
        giocapben1: giocapben1,
        image: image,
        ...phuongtien,
      };
    }
    await TuyenTau.createTuyenTau(document);
    toast.success('Tạo tuyến tàu thành công!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    navigate('/quanlytuyentau');
  };
  // console.log(phuongtien);
  return (
    <div className={clsx(styles.wrapper)}>
      <>
        <div
          className="bg-white d-flex flex-row m-0 text-center border-bottom"
          style={{ height: '50px' }}
        >
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
          <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: '13px' }}>
            <Link className="text-muted py-3 mb-3 " to="/">
              Home
            </Link>
            <Link className="text-muted py-3" to="/quanlytuyentau">
              Danh sách tuyến tàu
            </Link>
            <Link className="text-muted py-3" to="#">
              Thêm tuyến tàu
            </Link>
          </Breadcrumbs>
        </div>
      </>
      <div className={clsx(styles.container, 'shadow ')}>
        <h4 className="fw-bold text-uppercase mt-2">Thêm tuyến tàu</h4>
        <div>
          <div className={clsx(styles.form)}>
            <div className={clsx(styles.input, 'w-50')}>
              <label>Nơi xuất phát</label>
              <input
                type="text"
                placeholder="Hậu Giang"
                name="diemdi"
                value={tuyentau?.diemdi}
                onChange={handleChange}
              ></input>
              <small></small>
            </div>
            <div className={clsx(styles.input, 'w-50')}>
              <label>Nơi cập bến</label>
              <input
                type="text"
                placeholder="Cần Thơ"
                name="diemden"
                value={tuyentau?.diemden}
                onChange={handleChange}
              ></input>
              <small></small>
            </div>
          </div>
        </div>
        <hr></hr>
        <div>
          <h5 className="mb-3 mt-2 fw-bold text-uppercase">MÔ TẢ sơ lược VỀ TUYẾN</h5>
          <div className={clsx(styles.form, 'justify-content-between')}>
            <div className={clsx(styles.input)}>
              <label>Phương tiện</label>
              <div>
                <FormGroup className="d-flex flex-row">
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="tàu"
                        name="loaitau"
                        onChange={(e) => {
                          // setTuyenTau((prev) => ({ ...prev, loai: e.target.value }));
                          setDetails((prev) => ({ ...prev, loai1: e.target.value }));
                        }}
                      />
                    }
                    label="Tàu"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="phà"
                        name="loaipha"
                        onChange={(e) => {
                          setDetails((prev) => ({ ...prev, loai2: e.target.value }));
                        }}
                      />
                    }
                    label="Phà"
                  />
                </FormGroup>
              </div>
            </div>
            {details.loai1 === 'tàu' && (
              <div className={clsx(styles.input)} style={{ width: '40%' }}>
                <label>Tên tàu hoạt động</label>
                <input
                  type="text"
                  placeholder="SUPERDONG I, IV"
                  value={details.loaitau}
                  name="loaitau"
                  onChange={handleChangeDetails}
                ></input>
              </div>
            )}
            {details.loai2 === 'phà' && (
              <div className={clsx(styles.input)} style={{ width: '40%' }}>
                <label>Tên phà hoạt động</label>
                <input
                  type="text"
                  placeholder="SUPERDONG I, IV"
                  value={details.loaipha}
                  name="loaipha"
                  onChange={handleChangeDetails}
                ></input>
              </div>
            )}
          </div>
          <div className={clsx(styles.form)}>
            <div className={clsx(styles.input, 'w-50')}>
              <label>Tải trọng</label>
              <input
                type="text"
                placeholder="25"
                name="taitrong"
                value={details.taitrong}
                onChange={handleChangeDetails}
              ></input>
              <small></small>
            </div>
            <div className={clsx(styles.input, 'w-50')}>
              <label>Vận tốc</label>
              <input
                type="text"
                placeholder="30-40 hải lý"
                value={details.vantoc}
                name="vantoc"
                onChange={handleChangeDetails}
              ></input>
              <small></small>
            </div>
          </div>
          <div className={clsx(styles.form)}>
            <div className={clsx(styles.input, 'w-50')}>
              <label>Thời gian dự kiến khởi hành</label>
              <div className="d-flex flex-row">
                <input
                  type="time"
                  placeholder="06:30"
                  style={{
                    width: '83%',
                    borderRight: 'none',
                    borderTopRightRadius: '0px',
                    borderBottomRightRadius: '0px',
                  }}
                  value={giokhoihanh}
                  onChange={(e) => setGiokhoihanh(e.target.value)}
                ></input>
                <Button
                  style={{ height: '40px' }}
                  variant="outlined"
                  onClick={() => {
                    setGiokhoihanh1((prev) => [...prev, giokhoihanh]);
                    setGiokhoihanh('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setGiokhoihanh1((prev) => [...prev, giokhoihanh]);
                      setGiokhoihanh('');
                    }
                  }}
                >
                  Thêm
                </Button>
              </div>
              <small className="mt-2">
                {giokhoihanh1?.map((element, index) => (
                  <span className="border p-1 me-1">
                    {element}&nbsp;{' '}
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        const a = giokhoihanh1.splice(index, 1);
                        setGiokhoihanh1((prev) => [...prev]);
                      }}
                    >
                      x
                    </span>
                  </span>
                ))}
              </small>
            </div>
            <div className={clsx(styles.input, 'w-50')}>
              <label>Thời gian dự kiến cập bến</label>
              <div className="d-flex flex-row">
                <input
                  type="time"
                  placeholder="06:30"
                  style={{
                    width: '83%',
                    borderRight: 'none',
                    borderTopRightRadius: '0px',
                    borderBottomRightRadius: '0px',
                  }}
                  value={giocapben}
                  onChange={(e) => setGiocapben(e.target.value)}
                ></input>
                <Button
                  style={{ height: '40px' }}
                  variant="outlined"
                  onClick={() => {
                    setGiocapben1((prev) => [...prev, giocapben]);
                    setGiocapben('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setGiocapben1((prev) => [...prev, giocapben]);
                      setGiocapben('');
                    }
                  }}
                >
                  Thêm
                </Button>
              </div>
              <small className="mt-2">
                {giocapben1?.map((element, index) => (
                  <span className="border p-1 me-1">
                    {element}&nbsp;
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        const a = giocapben1.splice(index, 1);
                        setGiocapben1((prev) => [...prev]);
                      }}
                    >
                      x
                    </span>
                  </span>
                ))}
              </small>
            </div>
          </div>
          <div className={clsx(styles.form)}>
            <div className={clsx(styles.input, 'w-100')}>
              <label>Hình ảnh mô tả</label>
              <input
                type="file"
                id="file"
                onChange={(e) => handlePreviewImage(e)}
                multiple
              />

              <div className={clsx(styles.image)}>
                {imageDisplay ? (
                  <img src={imageDisplay.preview} alt="alt" width="100%" />
                ) : (
                  <div className={clsx(styles.blankImage)}>
                    <img src={NoImage} alt="NoImage" className={clsx(styles.noImage)} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div>
          <h5 className="mb-3 mt-2 fw-bold text-uppercase">Giá vé theo tuyến</h5>
          <div className={clsx(styles.form)}>
            <div className={clsx(styles.input, 'w-50')}>
              <TextField
                id="standard-number"
                style={{ width: '95%' }}
                label="Giá vé người lớn"
                type="number"
                name="giavenguoilon"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={giavenguoi.giavenguoilon}
                onChange={handleChangeGiaVe}
              />
            </div>
            <div className={clsx(styles.input, 'w-50')}>
              <TextField
                style={{ width: '95%' }}
                id="standard-number"
                label="Giá vé trẻ em"
                variant="outlined"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={giavenguoi.treem}
                name="treem"
                onChange={handleChangeGiaVe}
              />
            </div>
          </div>
          <div className={clsx(styles.form)}>
            <div className={clsx(styles.input, 'w-50')}>
              <TextField
                style={{ width: '95%' }}
                id="standard-number"
                label="Giá vé người cao tuổi"
                variant="outlined"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                name="giavenguoicaotuoi"
                value={giavenguoi.giavenguoicaotuoi}
                onChange={handleChangeGiaVe}
              />
            </div>
            <div className={clsx(styles.input, 'w-50')}>
              <TextField
                style={{ width: '95%' }}
                id="standard-number"
                label="Giá vé người khuyết tật"
                variant="outlined"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                name="nguoikhuyettat"
                value={giavenguoi.nguoikhuyettat}
                onChange={handleChangeGiaVe}
              />
            </div>
          </div>
        </div>
        {details?.loai2 === 'phà' && (
          <div>
            <div>
              <h5 className="mb-3 mt-2 fw-bold text-uppercase">Giá vé xe theo tuyến</h5>
              <div className={clsx(styles.form)}>
                <div className={clsx(styles.input, 'w-50')}>
                  <TextField
                    id="standard-number"
                    style={{ width: '95%' }}
                    label="Xe máy"
                    type="number"
                    name="xemay"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={phuongtien.xemay}
                    onChange={handleChangeGiaPhuongTien}
                  />
                </div>
                <div className={clsx(styles.input, 'w-50')}>
                  <TextField
                    style={{ width: '95%' }}
                    id="standard-number"
                    label="Xe ô tô 4 - 5 chỗ"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={phuongtien.xe4cho}
                    name="xe4cho"
                    onChange={handleChangeGiaPhuongTien}
                  />
                </div>
              </div>
              <div className={clsx(styles.form)}>
                <div className={clsx(styles.input, 'w-50')}>
                  <TextField
                    style={{ width: '95%' }}
                    id="standard-number"
                    label="Xe ô tô trên 9 đến 16 chỗ"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={phuongtien.xe16cho}
                    name="xe16cho"
                    onChange={handleChangeGiaPhuongTien}
                  />
                </div>
                <div className={clsx(styles.input, 'w-50')}>
                  <TextField
                    style={{ width: '95%' }}
                    id="standard-number"
                    label="Xe ô tô trên 16 đến 25 chỗ"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="xe25cho"
                    value={phuongtien.xe25cho}
                    onChange={handleChangeGiaPhuongTien}
                  />
                </div>
              </div>
            </div>
            <div>
              <h5 className="mb-3 mt-2 fw-bold text-uppercase">
                Giá vé xe tải theo tuyến
              </h5>
              <div className={clsx(styles.form)}>
                <div className={clsx(styles.input, 'w-50')}>
                  <TextField
                    id="standard-number"
                    style={{ width: '95%' }}
                    label="Xe ba gác (thô sơ)"
                    type="number"
                    name="xebagac"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={phuongtien.xebagac}
                    onChange={handleChangeGiaPhuongTien}
                  />
                </div>
                <div className={clsx(styles.input, 'w-50')}>
                  <TextField
                    style={{ width: '95%' }}
                    id="standard-number"
                    label="Xe tải 500kg - dưới 1.5 tấn"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="xetai500"
                    value={phuongtien.xetai500}
                    onChange={handleChangeGiaPhuongTien}
                  />
                </div>
              </div>
              <div className={clsx(styles.form)}>
                <div className={clsx(styles.input, 'w-50')}>
                  <TextField
                    style={{ width: '95%' }}
                    id="standard-number"
                    label="Xe tải 1.5 tấn - dưới 2.5 tấn"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="xetai15"
                    value={phuongtien.xetai15}
                    onChange={handleChangeGiaPhuongTien}
                  />
                </div>
                <div className={clsx(styles.input, 'w-50')}>
                  <TextField
                    style={{ width: '95%' }}
                    id="standard-number"
                    label="Xe tải 2.5 tấn - dưới 3.5 tấn"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="xetai25"
                    value={phuongtien.xetai25}
                    onChange={handleChangeGiaPhuongTien}
                  />
                </div>
              </div>
            </div>
            <div>
              <h5 className="mb-3 mt-2 fw-bold text-uppercase">
                Giá vé conntainer theo tuyến
              </h5>
              <div className={clsx(styles.form)}>
                <div className={clsx(styles.input, 'w-50')}>
                  <TextField
                    id="standard-number"
                    style={{ width: '95%' }}
                    label="Container 20 feet"
                    type="number"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="container20"
                    value={phuongtien.container20}
                    onChange={handleChangeGiaPhuongTien}
                  />
                </div>
                <div className={clsx(styles.input, 'w-50')}>
                  <TextField
                    style={{ width: '95%' }}
                    id="standard-number"
                    label="Container 40 feet"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="container40"
                    value={phuongtien.container40}
                    onChange={handleChangeGiaPhuongTien}
                  />
                </div>
              </div>
              <div className={clsx(styles.form)}>
                <div className={clsx(styles.input, 'w-100')}>
                  <TextField
                    style={{ width: '95%' }}
                    id="standard-number"
                    label="Container 45 feet"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="container45"
                    value={phuongtien.container45}
                    onChange={handleChangeGiaPhuongTien}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <Button variant="contained" onClick={handleSubmit} className="ms-auto">
          Hoàn thành
        </Button>
      </div>
    </div>
  );
}

export default AddAndUpdate;
