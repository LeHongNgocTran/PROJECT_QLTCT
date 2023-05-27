import { useParams, Link, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import styles from './index.module.scss';
import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Hoadon } from '~/service';
import moment from 'moment';
import { ArrowBack, Clear, Close } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function DetailsInforCustomer() {
  const { id } = useParams(null);
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({});
  const [open, setOpen] = useState(false);
  const [diff, setDiff] = useState(new Date());
  useEffect(() => {
    const fetchData = async () => {
      const documents = await Hoadon.getBillById(id);
      // console.log(documents);
      const timeStart = moment(documents.data.thoigiandi);
      const now = moment();
      const diff = timeStart.diff(now, 'days');
      setDiff(diff);
      setInvoice(documents);
    };
    fetchData().catch(console.error);
  }, []);

  const handleOpen = () => {
    setOpen((e) => !e);
  };
  const handleChangeTicket = () => {
    navigate(`/changeTicket/${id}`);
  };
  // console.log(invoice.data);
  // console.log(diff);
  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.container)}>
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
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

            <div>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" className="text-dark fw-bold" to="/lichsudatve">
                  Lịch sử đặt vé
                </Link>

                <Typography color="text.primary">Chi tiết vé</Typography>
              </Breadcrumbs>
            </div>
          </div>
          <div>
            <Button
              variant="contained"
              color="error"
              onClick={handleOpen}
              disabled={diff < 0 || invoice?.data?.update_at ? true : false}
            >
              <Clear /> Yêu cầu đổi vé
            </Button>
          </div>
        </div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-6 bg-white border">
              <div className="p-3">
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
                      <td>{invoice.data?.masothue ? invoice.data?.masothue : 'Trống'}</td>
                    </tr>
                    <tr>
                      <td>Địa chỉ:</td>
                      <td>{invoice.data?.diachi ? invoice.data?.diachi : 'Trống'}</td>
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
            <div className="col-6 bg-white border border-start-0">
              <div className=" p-3">
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
                      <td>Mã tàu: </td>
                      <td>{invoice.data?.matau}</td>
                    </tr>
                    <tr>
                      <td>Thời gian xuất phát: </td>
                      <td>{moment(invoice.data?.thoigiandi).format('LT DD/MM/YYYY')}</td>
                    </tr>
                    {invoice.data?.loaive === 'Khứ hồi' && (
                      <tr>
                        <td>Thời gian khởi hành về: </td>
                        <td>
                          {moment(invoice.data?.thoigiankhuhoi).format('LT DD/MM/YYYY')}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td>Xuất phát từ:</td>
                      <td className="text-uppercase">{invoice.diadiem?.diemdi}</td>
                    </tr>
                    <tr>
                      <td>Nơi đến :</td>
                      <td className="text-uppercase">{invoice.diadiem?.diemden}</td>
                    </tr>
                  </tbody>
                </table>
                <h5 className="my-3 fw-bold text-uppercase">
                  Thời gian và phương thức đặt vé
                </h5>
                <table className={clsx(styles.thongtindatve)}>
                  <tbody>
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
                      <td>Tổng tiền</td>
                      <td>
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
                      <td>Thơi gian thanh toán: </td>
                      <td>{moment(invoice.data?.create_at).format('L LT')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Modal
            open={open}
            onClose={handleOpen}
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
                <p className="flex-fill fw-bold text-uppercase mt-2">Yêu cầu đổi vé</p>
                <Tooltip title="Đóng" onClick={handleOpen}>
                  <IconButton>
                    <Close />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }} className="mb-4">
                <p>
                  Bạn có chắc chắn về quyết định{' '}
                  <strong className="text-danger">đổi/hoàn vé</strong> này ? Vui lòng đọc
                  kỹ quy định hoàn đổi vé ở địa chỉ này
                </p>
                <p>
                  <strong>Lưu ý: </strong> Chỉ được phép thực hiện{' '}
                  <strong className="text-danger">một lần duy nhất</strong>
                </p>
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
                    handleChangeTicket();
                    handleOpen();
                  }}
                >
                  Thực hiện
                </Button>
              </Typography>
            </Box>
          </Modal>
          <div className="row bg-white fw-bold mt-4 border">
            <div className="col-12 p-3">
              <h5 className="text-uppercase fw-bold ">Thông tin hành khách</h5>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 950 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">STT</TableCell>
                      <TableCell align="center">Họ Tên</TableCell>
                      <TableCell align="center">CCCD/CMND</TableCell>
                      <TableCell align="center">Tàu</TableCell>
                      <TableCell align="center">Địa chỉ</TableCell>
                      <TableCell align="center">Số điện thoại</TableCell>
                      <TableCell align="center">Quốc tịch</TableCell>
                      <TableCell align="center">Vị trí ngồi</TableCell>
                      <TableCell align="center">Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoice.data?.thongtinhanhkhach.map((value, index) => {
                      return (
                        <TableRow>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{value?.hoten}</TableCell>
                          <TableCell align="center">{value?.cccd}</TableCell>
                          <TableCell align="center">{invoice.data?.matau}</TableCell>
                          <TableCell align="center">{value?.noisinh}</TableCell>
                          <TableCell align="center">{value?.dienthoai}</TableCell>
                          <TableCell align="center">{value?.quoctich}</TableCell>
                          <TableCell align="center">{value?.vitringoi}</TableCell>
                          <TableCell align="center">{value?.email}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          {invoice.data?.loaive === 'Khứ hồi' && (
            <div className="row bg-white fw-bold mt-4 border">
              <div className="col-12 p-3">
                <h5 className="text-uppercase fw-bold ">Thông tin hành khách khứ hồi</h5>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 950 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">Họ Tên</TableCell>
                        <TableCell align="center">CCCD/CMND</TableCell>
                        <TableCell align="center">Tàu</TableCell>

                        <TableCell align="center">Địa chỉ</TableCell>
                        <TableCell align="center">Số điện thoại</TableCell>
                        <TableCell align="center">Quốc tịch</TableCell>
                        <TableCell align="center">Vị trí ngồi</TableCell>
                        <TableCell align="center">Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {invoice.data?.thongtinhanhkhach.map((value, index) => {
                        return (
                          <TableRow>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{value?.hoten}</TableCell>
                            <TableCell align="center">{value?.cccd}</TableCell>
                            <TableCell align="center">
                              {invoice.data?.mataukhuhoi}
                            </TableCell>

                            <TableCell align="center">{value?.noisinh}</TableCell>
                            <TableCell align="center">{value?.dienthoai}</TableCell>
                            <TableCell align="center">{value?.quoctich}</TableCell>

                            <TableCell align="center">{value?.vitringoikhuhoi}</TableCell>
                            <TableCell align="center">{value?.email}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsInforCustomer;
