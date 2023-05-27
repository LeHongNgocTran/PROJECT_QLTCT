import { useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Tau } from '~/service';
import { toast } from 'react-toastify';
import { Modal, Button, Box, Tooltip, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function FormTau({
  content = {},
  show,
  update = false,
  add = false,
  onHide = () => {},
  parentCallback = () => {},
}) {
  const [tau, setTau] = useState({
    matau: content.matau,
    nhanhieu: content.nhanhieu,
    vantoc: content.vantoc,
    taitrong: content.taitrong,
    soluongghe: content.soluongghe,
  });

  const [refresh, setreFresh] = useState(0);

  const handleChange = (e) => {
    setTau((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (add === true) {
      const document = await Tau.ThemTau(tau);
      if (document === false) {
        toast.success('Thêm tàu thành công', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        const data = await Tau.getAllTau();
        parentCallback(data);
        onHide();
      } else {
        toast.error('Mã tuyến tàu đã bị trùng, vui lòng nhập lại', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } else if (update === true) {
      const document = await Tau.EditInforAboutTau(tau);
      if (document === false) {
        toast.error('Thông tin sai,vui lòng nhập lại', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        toast.success('Chỉnh sửa thành công', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        const data = await Tau.getAllTau();
        parentCallback(data);
        onHide();
      }
    }
  };

  return (
    <Modal
      open={show}
      onClose={onHide}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="d-flex justify-content-between">
          <div id="modal-modal-title" style={{ fontSize: '1.4rem' }}>
            {update && (
              <p className="text-uppercase p-0 m-0 fw-bold">chính sửa thông tin tàu</p>
            )}
            {add && <p className="text-uppercase p-0 m-0 fw-bold">thêm thông tin tàu</p>}
          </div>
          <Tooltip onClick={onHide} title="Đóng">
            <IconButton>
              <Close />
            </IconButton>
          </Tooltip>
        </div>
        <div id="modal-modal-description" sx={{ mt: 2 }}>
          <div className={clsx(styles.form)}>
            <div className={clsx(styles.input)}>
              <label>Mã tàu</label>
              <div className="d-flex flex-row">
                {update === true ? (
                  <input
                    type="text"
                    placeholder="SUPERDONG I"
                    value={tau.matau}
                    name="matau"
                    onChange={handleChange}
                    readOnly
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="SUPERDONG I"
                    value={tau.matau}
                    name="matau"
                    onChange={handleChange}
                  />
                )}
                <FontAwesomeIcon
                  color="gray"
                  icon={faPenToSquare}
                  style={{ fontSize: '20px', padding: '5px 0px', marginLeft: '8px' }}
                />
              </div>
              <small></small>
            </div>
            <div className={clsx(styles.input)}>
              <label>Nơi sản xuất</label>
              <div className="d-flex flex-row">
                <input
                  type="text"
                  placeholder="Malaysia"
                  value={tau.nhanhieu}
                  name="nhanhieu"
                  onChange={handleChange}
                ></input>{' '}
                <FontAwesomeIcon
                  color="gray"
                  icon={faPenToSquare}
                  style={{ fontSize: '20px', padding: '5px 0px', marginLeft: '8px' }}
                />
              </div>
              <small></small>
            </div>
            <div className={clsx(styles.input)}>
              <label>Mã lực/ Vận tốc</label>
              <div className="d-flex flex-row">
                <input
                  type="text"
                  placeholder="500"
                  value={tau.vantoc}
                  name="vantoc"
                  onChange={handleChange}
                ></input>
                <FontAwesomeIcon
                  color="gray"
                  icon={faPenToSquare}
                  style={{ fontSize: '20px', padding: '5px 0px', marginLeft: '8px' }}
                />
              </div>
              <small></small>
            </div>
            <div className={clsx(styles.input)}>
              <label>Tải trọng</label>
              <div className="d-flex flex-row">
                <input
                  type="text"
                  placeholder="20000 tấn"
                  value={tau.taitrong}
                  name="taitrong"
                  onChange={handleChange}
                ></input>
                <FontAwesomeIcon
                  color="gray"
                  icon={faPenToSquare}
                  style={{ fontSize: '20px', padding: '5px 0px', marginLeft: '8px' }}
                />
              </div>
              <small></small>
            </div>
            <div className={clsx(styles.input)}>
              <label>Số lượng ghế</label>
              <div className="d-flex flex-row">
                <input
                  type="text"
                  placeholder="150"
                  name="soluongghe"
                  value={tau.soluongghe}
                  onChange={handleChange}
                ></input>
                <FontAwesomeIcon
                  color="gray"
                  icon={faPenToSquare}
                  style={{ fontSize: '20px', padding: '5px 0px', marginLeft: '8px' }}
                  onChange={handleChange}
                />
              </div>
              <small></small>
            </div>
          </div>
        </div>
        <div className="mt-3 justify-content-end d-flex">
          <Button variant="outlined" onClick={onHide} className="me-2">
            Đóng
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Lưu thay đổi
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default FormTau;
