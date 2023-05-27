import { Link, useParams } from 'react-router-dom';
import NotFound from '~/error';
import styles from './index.module.scss';
import clsx from 'clsx';
import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Close } from '@mui/icons-material';
import { TaiKhoan } from '~/service';
import { toast } from 'react-toastify';

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

function DetailsInfoUser() {
  const users = useSelector((state) => state.permission.users);
  const { id } = useParams();
  const [show, setShow] = useState('');
  const [data, setData] = useState({});
  const [image, setImage] = useState('');
  const [avatar, setAvatar] = useState();
  const [refresh, setRefresh] = useState(false);
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleShow = () => {
    setShow((e) => !e);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setFileToBase(file);
    setAvatar(file);
  };

  const handleSubmit = async () => {
    const document = await TaiKhoan.updateAccount({ data, image: image });
    if (document === true) {
      toast.success('Update thành công', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const document = await TaiKhoan.getDetailsUser({ id: users._id });
      setData(document);
    };
    fetchData().catch(console.error);
  }, [refresh]);
  // console.log(data);
  return (
    <>
      {users.taikhoan?.mataikhoan ? (
        <div className={clsx(styles.wrapper)}>
          <div className={clsx(styles.container, 'mx-auto')}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" className="text-dark fw-bold" to="/">
                Trang chủ
              </Link>
              <Typography color="text.primary">Thông tin người dùng</Typography>
            </Breadcrumbs>
            <hr style={{ width: '100px', borderBottom: '1px solid black' }}></hr>
            <h4 className="text-uppercase bg-dark text-white fw-bold w-50 mx-auto rounded-1 text-center p-2 mb-5">
              Thông tin người dùng
            </h4>
            <div className="d-flex flex-row justify-content-between">
              <div className={clsx(styles.file_upload)}>
                <img
                  className="mx-auto"
                  src={
                    data?.image === ''
                      ? 'https://i.stack.imgur.com/dy62M.png'
                      : data.image
                  }
                  alt="first"
                />
              </div>
              <table className="table border w-75 m-auto">
                <tbody className="w-100">
                  <tr>
                    <td>Họ tên: </td>
                    <td>{data?.name}</td>
                  </tr>
                  <tr>
                    <td>Giới tính: </td>
                    <td>{data?.sex}</td>
                  </tr>
                  <tr>
                    <td>Email liên hệ: </td>
                    <td>{data?.email}</td>
                  </tr>
                  <tr>
                    <td>Số điện thoại : </td>
                    <td>{data?.taikhoan?.mataikhoan}</td>
                  </tr>
                  <tr>
                    <td>Địa chỉ: </td>
                    <td>{data?.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-flex flex-row justify-content-end mt-5">
              <Button variant="contained" onClick={handleShow}>
                Chỉnh sửa
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
                  className="d-flex flex-row"
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  <p className="flex-fill fw-bold text-uppercase mt-2">
                    Chỉnh sửa thông tin
                  </p>
                  <Tooltip title="Đóng" onClick={handleShow}>
                    <IconButton>
                      <Close />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <div className={clsx(styles.container_modal)}>
                  <div
                    className={clsx(styles.input, 'd-flex flex-row ')}
                    style={{ fontSize: '0.9rem' }}
                  >
                    <p>Họ tên: </p>
                    <TextField
                      id="outlined-basic"
                      label="Họ tên"
                      name="name"
                      variant="standard"
                      onChange={handleChange}
                      value={data?.name}
                    />
                  </div>
                  <div
                    className={clsx(styles.input, 'd-flex flex-row ')}
                    style={{ fontSize: '0.9rem' }}
                  >
                    <p>Địa chỉ liên lạc: </p>
                    <TextField
                      id="outlined-basic"
                      label="Địa chỉ liên lạc"
                      name="address"
                      variant="standard"
                      onChange={handleChange}
                      value={data?.address}
                    />
                  </div>
                  <div
                    className={clsx(styles.input, 'd-flex flex-row ')}
                    style={{ fontSize: '0.9rem' }}
                  >
                    <p>Email liên hệ: </p>
                    <TextField
                      id="outlined-basic"
                      label="Email liên hệ"
                      name="email"
                      variant="standard"
                      onChange={handleChange}
                      value={data?.email}
                    />
                  </div>
                  <div
                    className={clsx(styles.input, 'd-flex flex-row ')}
                    style={{ fontSize: '0.9rem' }}
                  >
                    <p>Ảnh đại diện: </p>
                    <input
                      style={{ marginLeft: '60px', marginTop: '10px' }}
                      type="file"
                      onChange={(e) => {
                        handlePreviewAvatar(e);
                      }}
                      multiple
                    />
                  </div>
                  <div className={clsx(styles.file_upload)}>
                    {avatar ? (
                      <img src={avatar.preview} alt="alt" width="100%" />
                    ) : (
                      <img src="https://i.stack.imgur.com/dy62M.png" alt="first" />
                    )}
                  </div>
                </div>
                <Typography
                  className="d-flex  flex-row justify-content-end pt-2"
                  id="modal-modal-footer"
                  variant="h6"
                  component="h2"
                >
                  <Button
                    variant="outlined"
                    className="me-3"
                    onClick={() => {
                      handleShow();
                    }}
                  >
                    Đóng
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleSubmit();
                      handleShow();
                    }}
                  >
                    Lưu
                  </Button>
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default DetailsInfoUser;
