import clsx from 'clsx';
import styles from './inforUser.module.scss';
import { useState } from 'react';
import { Close, Person, Receipt } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { caution } from '../../../assets/images';
import { CHECK_VALUE_INFORUSER as checkUserInfor } from '~/Validation/validation';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function InforUser({ data, next, prev, setData }) {
  const [error, setError] = useState({});
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.confirm)}>
        <div className={clsx(styles.thongtin)}>
          <h5>
            <Person />
            &nbsp; Người đặt vé
          </h5>
          <div className={clsx(styles.listinfor, 'row')}>
            <div className={clsx(styles.infor, 'col-4')}>
              <TextField
                required
                label="Tên người đặt vé "
                error={error.tennguoidatve ? true : false}
                helperText={error?.tennguoidatve}
                name="tennguoidatve"
                type="text"
                variant="standard"
                value={data.tennguoidatve}
                className={clsx(styles.infor_input)}
                placeholder="Nhập tên người đặt vé"
                onChange={(e) => {
                  setData((prev) => ({ ...prev, tennguoidatve: e.target.value }));
                }}
              />
            </div>
            <div className={clsx(styles.infor, 'col-4')}>
              <TextField
                label="Số điện thoại"
                required
                variant="standard"
                error={error.sodienthoai ? true : false}
                helperText={error?.sodienthoai}
                name="sodienthoai"
                value={data.sodienthoai}
                className={clsx(styles.infor_input)}
                type="text"
                maxLength={10}
                placeholder="Nhập số điện thoại"
                onChange={(e) => {
                  setData((prev) => ({ ...prev, sodienthoai: e.target.value }));
                }}
              />
            </div>
            <div className={clsx(styles.infor, 'col-4')}>
              <TextField
                label="Email liên hệ"
                variant="standard"
                error={error.email ? true : false}
                helperText={error?.email}
                required
                name="email"
                value={data.email}
                className={clsx(styles.infor_input)}
                type="email"
                placeholder="abc@gmail.com"
                onChange={(e) => {
                  setData((prev) => ({ ...prev, email: e.target.value }));
                }}
              />
            </div>
          </div>
        </div>
        <div className={clsx(styles.thongtin)}>
          <h5>
            <Receipt className="me-3" />
            THÔNG TIN HÓA ĐƠN TÀI CHÍNH
          </h5>
          <div className={clsx(styles.listinfor, 'row')}>
            <div className={clsx(styles.infor, 'col-xs-12 col-md-12 col-lg-6')}>
              <TextField
                label="Tên người mua hàng"
                variant="standard"
                className={clsx(styles.infor_input)}
                type="text"
                value={data.tennguoimuahang}
                name="tennguoimuahang"
                placeholder="Nhập tên người mua hàng"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </div>
            <div className={clsx(styles.infor, 'col-xs-12 col-md-12 col-lg-6')}>
              <TextField
                variant="standard"
                className={clsx(styles.infor_input)}
                value={data.tencongty}
                type="text"
                label="Tên Công Ty"
                placeholder="Nhập tên công ty"
                name="tencongty"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className={clsx(styles.listinfor, 'row')}>
            <div className={clsx(styles.infor, 'col-xs-12 col-md-12 col-lg-6')}>
              <TextField
                variant="standard"
                className={clsx(styles.infor_input)}
                label="Mã số thuế"
                type="text"
                name="masothue"
                value={data.masothue}
                placeholder="Nhập mã số thuế"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </div>
            <div className={clsx(styles.infor, 'col-xs-12 col-md-12 col-lg-6')}>
              <TextField
                label="Địa chỉ"
                variant="standard"
                className={clsx(styles.infor_input)}
                type="text"
                value={data.diachi}
                name="diachi"
                placeholder="Nhập địa chỉ"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <Button variant="outlined" onClick={prev} sx={{ mr: 1 }}>
          Trở lại
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setError(checkUserInfor(data));
            // console.log(data.tennguoidatve);
            if (
              Object.keys(error).length === 0 &&
              data.tennguoidatve !== '' &&
              data.sodienthoai !== '' &&
              data.email !== ''
            ) {
              if (
                data?.tennguoimuahang === undefined ||
                data?.masothue === undefined ||
                data?.tencongty === undefined ||
                data?.diachi === undefined
              ) {
                handleShow();
              } else {
                next();
              }
            }
          }}
        >
          Tiếp theo
        </Button>
      </div>
      <Modal
        open={show}
        onClose={handleShow}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            className="d-flex justify-content-end"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            <Tooltip title="Đóng" onClick={handleShow}>
              <IconButton>
                <Close />
              </IconButton>
            </Tooltip>
          </Typography>
          <div id="modal-modal-description" style={{ fontSize: '0.9rem' }}>
            <div className="d-flex flex-column justify-content-center">
              <img src={caution} alt="Caution" width="80px" className="m-auto" />
              <p className="text-center mt-3 ">
                Nếu bạn không nhập thông tin hóa đơn vào thì sau này vé của bạn sẽ không
                thể cập nhật được nữa
              </p>
            </div>

            <div className="d-flex mt-2 justify-content-center">
              <Button
                variant="contained"
                onClick={() => {
                  handleShow();
                  next();
                }}
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default InforUser;
