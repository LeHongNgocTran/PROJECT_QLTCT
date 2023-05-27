import { useParams, Link, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import styles from './index.module.scss';
import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  ArrowBack,
  ChangeCircleOutlined,
  Clear,
  Close,
  PictureAsPdfRounded,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Hoadon, PhongVe } from '~/service';
import moment from 'moment';
import { toast } from 'react-toastify';
import LoadingPage from '~/Components/Components/LoadingPage';
import { useMonthCalendarDefaultizedProps } from '@mui/x-date-pickers/MonthCalendar/MonthCalendar';

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

function DetailsInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({});
  const [open, setOpen] = useState(false);
  const [lydo, setLydo] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(0);
  const [namePhongVe, setNamePhongVe] = useState({});

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = async () => {
    const data = await Hoadon.cancelBillById({
      id: id,
      lydohuy: lydo,
      trangthai: false,
    });
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (data.acknowledge === true) {
      toast.success('Hủy hóa đơn thành công', {
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
  };

  useEffect(() => {
    const fetchData = async () => {
      const documents = await Hoadon.getBillById(id);

      if (documents?.data.idPhongVe !== undefined) {
        // console.log(1);
        const name = await PhongVe.getPhongVeById(documents.data.idPhongVe);
        setNamePhongVe(name);
      }
      setInvoice(documents);
      const now = moment();
      const timeStart = moment(documents?.data.thoigiandi);
      setDate(timeStart.diff(now, 'days'));
    };
    fetchData().catch(console.error);
  }, [loading]);
  // console.log(namePhongVe);
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
              Danh sách hóa đơn
            </Link>
            <Link className="text-muted py-3" to="#">
              Chi tiết hóa đơn
            </Link>
            <Typography color="text.primary"> {id}</Typography>
          </Breadcrumbs>
        </div>
        <div className={clsx(styles.button, 'd-flex flex-row justify-content-end')}>
          <Button
            variant="contained"
            color="error"
            onClick={handleOpen}
            disabled={invoice.data?.trangthai === false || date <= 0 ? true : false}
          >
            <Clear />
            &nbsp; Hủy hóa đơn
          </Button>
          <Button
            className="ms-2"
            variant="contained"
            color="success"
            disabled={invoice.data?.trangthai === false || date <= 0 ? true : false}
            onClick={() => {
              navigate(`/changeTicketAdmin/${id}`);
            }}
          >
            <ChangeCircleOutlined />
            &nbsp; Đổi vé
          </Button>
          <Button
            className="ms-2"
            variant="contained"
            onClick={() => {
              navigate(`/invoice/${id}`);
            }}
          >
            <PictureAsPdfRounded />
            &nbsp; Xuất hóa đơn
          </Button>
        </div>
      </div>
      {loading ? (
        <div className={clsx(styles.loading)}>
          <LoadingPage loading={loading}></LoadingPage>
        </div>
      ) : (
        <div className="container mt-3">
          <div className="row">
            <div className="col-6">
              <div className="p-3 h-100 bg-white shadow">
                <div className="mb-3">
                  <div className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-row justify-content-between">
                      <p>
                        Trạng thái hóa đơn :{' '}
                        {invoice.data?.trangthai === false ? (
                          <span
                            className="fw-bold text-danger p-2"
                            style={{ textShadow: '-2px -1px 25px #b30000' }}
                          >
                            Đã hủy
                          </span>
                        ) : (
                          <span
                            className="fw-bold text-success p-2"
                            style={{ textShadow: '-2px -1px 25px #205d18' }}
                          >
                            Đã thanh toán
                          </span>
                        )}
                      </p>
                      {invoice.data?.update_at && (
                        <p>
                          Thời gian thực hiện đổi vé :{' '}
                          <span className="fw-bold">
                            {moment(invoice.data?.update_at).format('LT DD/MM/YYYY')}
                          </span>
                        </p>
                      )}
                      {invoice.data?.trangthai === false && (
                        <p>
                          Thời gian hủy :{' '}
                          <span className="fw-bold">
                            {moment(invoice.data?.timecancel).format('LT DD/MM/YYYY')}
                          </span>
                        </p>
                      )}
                    </div>

                    {invoice.data?.trangthai === false && (
                      <p className="mt-3">
                        Lý do hủy: <span>{invoice.data?.lydohuy}</span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="">
                  <h5 className="text-uppercase fw-bold">Thông tin người đặt vé</h5>
                  <table className={clsx(styles.thongtindatve)}>
                    <tbody>
                      <tr>
                        <td>Mã vé : </td>
                        <td>{invoice.data?.orderId}</td>
                      </tr>
                      <tr>
                        <td>Họ tên người mua vé chính</td>
                        <td>{invoice.data?.tennguoidatve}</td>
                      </tr>
                      <tr>
                        <td>Email liên hệ:</td>
                        <td>{invoice.data?.email}</td>
                      </tr>
                      <tr>
                        <td>Số điện thoại liên hệ: </td>
                        <td>{invoice.data?.sodienthoai}</td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <h5 className="text-uppercase fw-bold my-3 ">
                            Thông tin hóa đơn tài chính
                          </h5>
                        </td>
                      </tr>
                      <tr>
                        <td>Tên người chịu trách nhiệm mua hàng: </td>
                        <td>
                          {' '}
                          {invoice.data?.tennguoimuahang
                            ? invoice.data?.tennguoimuahang
                            : 'Trống'}
                        </td>
                      </tr>
                      <tr>
                        <td>Mã số thuế:</td>
                        <td>
                          {invoice.data?.masothue ? invoice.data?.masothue : 'Trống'}
                        </td>
                      </tr>
                      <tr>
                        <td>Mã Code:</td>
                        <td>
                          {invoice.data?.magiaodich ? invoice.data?.magiaodich : 'Trống'}
                        </td>
                      </tr>
                      <tr>
                        <td>Tên Công Ty:</td>
                        <td>
                          {invoice.data?.tencongty ? invoice.data?.tencongty : 'Trống'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className=" p-3 h-100 bg-white shadow">
                <h5 className="fw-bold text-uppercase">THÔNG TIN HÀNH TRÌNH</h5>
                <table className={clsx(styles.thongtindatve)}>
                  <tbody>
                    <tr>
                      <td>Lọai chuyến: </td>
                      <td>{invoice.data?.loaive}</td>
                    </tr>
                    <tr>
                      <td>Mã tuyến tàu đi:</td>
                      <td>{invoice.diadiem?.matuyentau}</td>
                    </tr>
                    <tr>
                      <td>Mã tàu :</td>
                      <td>{invoice.data?.matau}</td>
                    </tr>
                    <tr>
                      <td>Xuất phát từ:</td>
                      <td className="text-uppercase">{invoice.diadiem?.diemdi}</td>
                    </tr>
                    <tr>
                      <td>Nơi đến :</td>
                      <td className="text-uppercase">{invoice.diadiem?.diemden}</td>
                    </tr>
                    <tr>
                      <td>Thời gian khởi hành: </td>
                      <td>{moment(invoice.data?.thoigiandi).format('LT DD/MM/YYYY')}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <h5 className="my-3 fw-bold text-uppercase">
                  Thời gian và phương thức đặt vé
                </h5>
                <table className={clsx(styles.thongtindatve)}>
                  <tbody>
                    {invoice?.data?.idPhongVe && (
                      <tr>
                        <td>Phòng vé:</td>
                        <td>{namePhongVe?.name}</td>
                      </tr>
                    )}
                    <tr>
                      <td>Phương thức đặt vé:</td>
                      <td>
                        {invoice.data?.payment === 'creditTaiquay' &&
                          'Chuyển khoản tại quầy'}
                        {invoice.data?.payment === 'paypal' &&
                          'Thanh toán online thông qua PayPal'}
                        {invoice.data?.payment === 'cash' &&
                          'Thanh toán bằng tiền mặt tại quầy'}
                      </td>
                    </tr>

                    <tr>
                      <td>Mã nhân viên :</td>
                      <td>
                        {invoice.data?.mataikhoan ? invoice.data?.mataikhoan : 'Trống'}
                      </td>
                    </tr>
                    <tr>
                      <td>Tổng tiền: </td>
                      <td>
                        {' '}
                        {invoice.data?.tongtien.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </td>
                    </tr>
                    {invoice.data?.payment === 'creditTaiquay' && (
                      <>
                        <tr>
                          <td>Ngân hàng thụ hưởng</td>
                          <td>{invoice.data?.bank}</td>
                        </tr>
                        <tr>
                          <td>Mã giao dịch đối chiếu</td>
                          <td>{invoice.data?.magiaodich}</td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <td>Thời gian thanh toán: </td>
                      <td>{moment(invoice.data?.create_at).format('DD/MM/YYYY LT')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row bg-white fw-bold my-4 shadow">
            <div className="col-12 p-3">
              <h5 className="text-uppercase fw-bold ">Thông tin hành khách</h5>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">STT</TableCell>
                    <TableCell align="center">Họ Tên</TableCell>
                    <TableCell align="center">CCCD/CMND</TableCell>
                    <TableCell align="center">Số điện thoại</TableCell>
                    <TableCell align="center">Mã tàu</TableCell>
                    <TableCell align="center">Vị trí ngồi</TableCell>
                    <TableCell align="center">Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice.data?.thongtinhanhkhach.map((value, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{value?.hoten}</TableCell>
                        <TableCell align="center">{value?.cccd}</TableCell>
                        <TableCell align="center">{value?.dienthoai}</TableCell>
                        <TableCell align="center">{invoice.data?.matau}</TableCell>
                        <TableCell align="center">{value?.vitringoi}</TableCell>
                        <TableCell align="center">{value?.email}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
          {invoice.data?.loaive === 'Khứ hồi' && (
            <div className="row bg-white fw-bold mt-4 shadow">
              <div className="col-12 p-3">
                <h5 className="text-uppercase fw-bold ">Thông tin hành khách khứ hồi</h5>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">STT</TableCell>
                      <TableCell align="center">Họ Tên</TableCell>
                      <TableCell align="center">CCCD/CMND</TableCell>
                      <TableCell align="center">Số điện thoại</TableCell>
                      <TableCell align="center">Mã tàu</TableCell>

                      <TableCell align="center">Vị trí ngồi</TableCell>
                      <TableCell align="center">Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoice.data?.thongtinhanhkhach.map((value, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{value?.hoten}</TableCell>
                          <TableCell align="center">{value?.cccd}</TableCell>
                          <TableCell align="center">{value?.dienthoai}</TableCell>
                          <TableCell align="center">
                            {invoice.data?.mataukhuhoi}
                          </TableCell>
                          <TableCell align="center">{value?.vitringoikhuhoi}</TableCell>
                          <TableCell align="center">{value?.email}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          <Modal
            open={open}
            onClose={handleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography className="d-flex flex-row" id="modal-modal-title">
                <p className="flex-fill fw-bold text-uppercase mt-2 fs-3 ">HỦY HÓA ĐƠN</p>
                <Tooltip title="Đóng" onClick={handleOpen}>
                  <IconButton>
                    <Close />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  className="w-100 mb-4"
                  id="outlined-controlled"
                  label="Lý do hủy"
                  value={lydo}
                  onChange={(e) => {
                    setLydo(e.target.value);
                  }}
                />
              </Typography>
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
                    handleOpen();
                  }}
                >
                  Đóng
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleSubmit();
                    handleOpen();
                  }}
                >
                  Lưu
                </Button>
              </Typography>
            </Box>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default DetailsInvoice;
