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
  Tooltip,
  Typography,
} from '@mui/material';
import { ArrowBack, Close, Info } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Hoadon, TaiKhoan } from '~/service';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  outline: 0,
};

function DetailsCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [bill, setBill] = useState([]);
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const document = await TaiKhoan.getDetailsUser({ id });
      const bill = await Hoadon.getBillByUser(document.taikhoan.mataikhoan);
      setData(document);
      setBill(bill);
    };
    fetchData().catch(console.error);
  }, []);

  const handleChange = () => setShow(!show);
  return (
    <div className={clsx(styles.wrapper)}>
      <div
        className="bg-white d-flex flex-row m-0 text-center border-bottom "
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
        <Breadcrumbs
          aria-label="breadcrumb"
          style={{ marginTop: '13px', fontSize: '0.8rem' }}
        >
          <Link className="text-muted py-3 mb-3 " to="/customer">
            Danh sách khách hàng
          </Link>
          <Link className="text-muted py-3" to="#">
            Chi tiết khách hàng
          </Link>
          <Typography color="text.primary"> {id}</Typography>
        </Breadcrumbs>
      </div>
      <div className={clsx(styles.container, 'container my-2')}>
        <div className="row">
          <div className="col-6 bg-white p-3 ">
            <h5 className="fw-bold text-uppercase">Thông tin liên hệ khách hàng</h5>
            <table className={clsx(styles.tableFirst)}>
              <tbody>
                <tr>
                  <td>Họ tên khách hàng: </td>
                  <td>{data?.name}</td>
                </tr>
                <tr>
                  <td>Địa chỉ liên lạc : </td>
                  <td>{data?.address}</td>
                </tr>
                <tr>
                  <td>Giới tính : </td>
                  <td>{data?.sex}</td>
                </tr>
                <tr>
                  <td>Ngày sinh : </td>
                  <td>{moment(data?.date).format('DD/MM/YYYY')}</td>
                </tr>
                <tr>
                  <td>Email liên hệ : </td>
                  <td>{data?.email}</td>
                </tr>
                <tr>
                  <td>Số điện thoại liên hệ : </td>
                  <td>{data?.taikhoan?.mataikhoan}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row my-5 ">
          <div className="col-12 bg-white shadow p-3">
            <h5 className="fw-bold text-uppercase">Hóa đơn của khách hàng</h5>
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Thời gian đặt vé</th>
                  <th>Mã vé</th>
                  <th>Họ tên người đặt</th>
                  <th>Số điện thoại liên hệ</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {bill.length > 0 ? (
                  bill.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{moment(value.create_at).format('DD/MM/YYYY LT')}</td>
                        <td>{value.orderId}</td>
                        <td>{value.tennguoidatve}</td>
                        <td>{value.sodienthoai}</td>
                        <td>
                          <Tooltip title="Xem chi tiết">
                            <IconButton
                              onClick={() => {
                                setDetails(value);
                                handleChange();
                              }}
                            >
                              <Info />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center fw-bold text-danger">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Modal
              style={{ fontSize: '0.9rem' }}
              open={show}
              onClose={handleChange}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="d-flex flex-row justify-content-between">
                  <h5 className="fw-bold text-uppercase mt-2">Chi tiết </h5>
                  <Tooltip onClick={handleChange} title="Đóng">
                    <IconButton>
                      <Close />
                    </IconButton>
                  </Tooltip>
                </div>
                <div
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  style={{ height: '550px', overflowY: 'scroll' }}
                >
                  <div className="container mt-3" style={{}}>
                    <div className="row">
                      <div className="col-6 bg-white border">
                        <div className="p-3">
                          <h5 className="text-uppercase fw-bold">
                            Thông tin người đặt vé
                          </h5>
                          <table className={clsx(styles.thongtindatve, 'w-100')}>
                            <tbody>
                              <tr>
                                <td>Mã vé : </td>
                                <td>{details.orderId}</td>
                              </tr>
                              <tr>
                                <td>Họ tên người mua vé chính</td>
                                <td>{details?.tennguoidatve}</td>
                              </tr>
                              <tr>
                                <td>Email liên hệ:</td>
                                <td>{details?.email}</td>
                              </tr>
                              <tr>
                                <td>Số điện thoại liên hệ: </td>
                                <td>{details?.sodienthoai}</td>
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
                                  {details?.tennguoimuahang
                                    ? details?.tennguoimuahang
                                    : 'Trống'}
                                </td>
                              </tr>
                              <tr>
                                <td>Mã số thuế:</td>
                                <td>{details?.masothue ? details?.masothue : 'Trống'}</td>
                              </tr>
                              <tr>
                                <td>Mã Code:</td>
                                <td>
                                  {details?.magiaodich ? details?.magiaodich : 'Trống'}
                                </td>
                              </tr>
                              <tr>
                                <td>Tên Công Ty:</td>
                                <td>
                                  {details?.tencongty ? details?.tencongty : 'Trống'}
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
                                <td>{details?.loaive}</td>
                              </tr>
                              <tr>
                                <td>Mã tuyến tàu đi:</td>
                                <td>{details?.matuyentaudi}</td>
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
                                  {details?.payment === 'creditTaiquay' &&
                                    'Chuyển khoản tại quầy'}
                                  {details?.payment === 'paypal' &&
                                    'Thanh toán online thông qua PayPal'}
                                  {details?.payment === 'cash' &&
                                    'Thanh toán bằng tiền mặt tại quầy'}
                                </td>
                              </tr>
                              <tr>
                                <td>Tổng tiền</td>
                                <td>
                                  {details?.tongtien?.toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: 'VND',
                                  })}
                                </td>
                              </tr>
                              {details?.payment === 'creditTaiquay' && (
                                <>
                                  <tr>
                                    <td>Ngân hàng thụ hưởng</td>
                                    <td>{details?.bank}</td>
                                  </tr>
                                  <tr>
                                    <td>Mã giao dịch đối chiếu</td>
                                    <td>{details?.magiaodich}</td>
                                  </tr>
                                </>
                              )}
                              <tr>
                                <td>Thời gian thanh toán: </td>
                                <td>
                                  {moment(details?.create_at).format('DD/MM/YYYY LT')}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="row bg-white fw-bold mt-4 border">
                      <div className="col-12 p-3">
                        <h5 className="text-uppercase fw-bold ">Thông tin hành khách</h5>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">STT</TableCell>
                              <TableCell align="center">Họ Tên</TableCell>
                              <TableCell align="center">CCCD/CMND</TableCell>
                              <TableCell align="center">Số điện thoại</TableCell>
                              <TableCell align="center">Vị trí ngồi</TableCell>
                              <TableCell align="center">Email</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {details?.thongtinhanhkhach?.map((value, index) => {
                              return (
                                <TableRow key={index}>
                                  <TableCell align="center">{index + 1}</TableCell>
                                  <TableCell align="center">{value?.hoten}</TableCell>
                                  <TableCell align="center">{value?.cccd}</TableCell>
                                  <TableCell align="center">{value?.dienthoai}</TableCell>
                                  <TableCell align="center">{value?.vitringoi}</TableCell>
                                  <TableCell align="center">{value?.email}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    {details?.loaive === 'Khứ hồi' && (
                      <div className="row bg-white fw-bold mt-4 border">
                        <div className="col-12 p-3">
                          <h5 className="text-uppercase fw-bold ">
                            Thông tin hành khách khứ hồi
                          </h5>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Họ Tên</TableCell>
                                <TableCell align="center">CCCD/CMND</TableCell>
                                <TableCell align="center">Số điện thoại</TableCell>
                                <TableCell align="center">Vị trí ngồi</TableCell>
                                <TableCell align="center">Email</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {details?.thongtinhanhkhach?.map((value, index) => {
                                return (
                                  <TableRow key={index}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{value?.hoten}</TableCell>
                                    <TableCell align="center">{value?.cccd}</TableCell>
                                    <TableCell align="center">
                                      {value?.dienthoai}
                                    </TableCell>
                                    <TableCell align="center">
                                      {value?.vitringoikhuhoi}
                                    </TableCell>
                                    <TableCell align="center">{value?.email}</TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 justify-content-end d-flex">
                  <Button variant="outlined" onClick={handleChange} className="me-2">
                    Đóng
                  </Button>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsCustomer;
