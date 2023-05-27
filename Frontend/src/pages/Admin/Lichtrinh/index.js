import clsx from 'clsx';
import styles from './index.module.scss';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { LichTrinh } from '~/service';
import moment from 'moment';
import { Close, Info } from '@mui/icons-material';
import TablePaginationActions from '~/Components/Components/PaginationOfTable';
import { Link } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import LoadingPage from '~/Components/Components/LoadingPage';
import { toast } from 'react-toastify';
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
  outline: 'none',
  overflowY: 'scroll',
};

function Quanlylichtrinh() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState({});
  const [refresh, setRefresh] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 6));
    setPage(0);
  };

  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    const fetchData = async () => {
      const document = await LichTrinh.getAllInfor();
      setData(document);
    };
    fetchData().catch(console.error);
  }, [refresh]);

  const [date, setDate] = useState({
    to: '',
    from: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (date.to === '' || date.from === '') {
      toast.error('Vui lòng chọn thời gian', {
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
      const document = await LichTrinh.filterDay({
        to: moment(date.to),
        from: moment(date.from),
      });
      setLoading(true);
      setData(document);
      setDate({ to: '', from: '' });
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h4
              style={{ backgroundColor: '#1c6dd0', width: '350px' }}
              className=" py-2  my-2 rounded-1 text-uppercase fw-bold text-white shadow ps-3 "
            >
              Danh sách lịch trình
            </h4>
          </div>
        </div>
        <div className="container py-3 bg-white shadow ">
          <div className="row">
            <div className="col-12 d-flex justify-content-end">
              <span>
                <DatePicker
                  label="Từ"
                  className="w-75"
                  min="2000-01-01"
                  max="2050-12-31"
                  value={date.from}
                  onChange={(e) => {
                    console.log(moment(e._d).isBefore(moment(e._d), 'day'));
                    if (moment(e._d).isBefore(moment(e._d), 'day') === false) {
                      setDate((prev) => ({
                        ...prev,
                        from: e._d,
                      }));
                    }
                  }}
                />
                {/* <input type="date" id="from" onClick={handleChange} /> */}
              </span>
              <span>
                <DatePicker
                  label="Đến"
                  className="w-75"
                  min="2000-01-01"
                  max="2050-12-31"
                  value={date.Tooltip}
                  onChange={(e) => {
                    if (moment(e._d).isBefore(moment(e._d), 'day') === false) {
                      setDate((prev) => ({
                        ...prev,
                        to: e._d,
                      }));
                    }
                  }}
                />
              </span>
              <span>
                <Button variant="contained" onClick={handleSubmit}>
                  Tìm kiếm
                </Button>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {loading ? (
                <div className={clsx(styles.loading)}>
                  <LoadingPage loading={loading}></LoadingPage>
                </div>
              ) : (
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">Mã tuyến tàu</TableCell>
                        <TableCell align="center">Mã tàu</TableCell>
                        <TableCell align="center">Trạng thái lịch trình</TableCell>
                        <TableCell align="center">Thời gian khởi hành</TableCell>
                        <TableCell align="center">Chi tiết</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.length !== 0 ? (
                        (rowsPerPage > 0
                          ? data.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage,
                            )
                          : data
                        ).map((value, index) => (
                          <TableRow key={value.name}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{value?.matuyentau}</TableCell>
                            <TableCell align="center">{value?.matau}</TableCell>

                            <TableCell align="center">
                              {moment(value.title) > moment() ? (
                                <p
                                  className={clsx(
                                    styles.trangthaitrue,
                                    ' rounded-pill m-auto w-50 text-center fw-bold py-1 ',
                                  )}
                                >
                                  Đang hoạt động
                                </p>
                              ) : (
                                <p
                                  className={clsx(
                                    styles.trangthaifalse,
                                    ' rounded-pill text-center fw-bold w-50 py-1 m-auto',
                                  )}
                                >
                                  Dừng hoạt động
                                </p>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {moment(value.title).format('LT DD/MM/YYYY')}
                            </TableCell>
                            <TableCell align="center">
                              <Tooltip
                                title="Xem chi tiết"
                                onClick={() => {
                                  setDetails(value);
                                  handleShow();
                                }}
                              >
                                <IconButton>
                                  <Info />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            align="center"
                            colSpan={7}
                            className="text-center text-danger fw-bold"
                          >
                            Không có dữ liệu
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[6, 12, 24, { label: 'All', value: -1 }]}
                          colSpan={7}
                          count={data.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: {
                              'aria-label': 'rows per page',
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              )}

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={show}
                onClose={handleShow}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={show}>
                  <Box sx={style}>
                    <div className="d-flex justify-content-between">
                      <Typography id="transition-modal-title" variant="h6" component="h2">
                        Chi tiết
                      </Typography>{' '}
                      <Tooltip title="Đóng" onClick={handleShow}>
                        <IconButton>
                          {' '}
                          <Close />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                      <div className="d-flex flex-row mb-3">
                        <h6 className="fw-bold text-uppercase flex-fill mt-1 ">
                          Thông tin tuyến
                        </h6>
                        <span className="d-flex flex-row  ">
                          <span className="mt-1 fw-bold">Trạng thái: &nbsp;</span>
                          <span className="mt-1 text-center fw-bold text-success ">
                            Đang hoạt động
                          </span>
                        </span>
                      </div>

                      <table className="table">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Thông tin</th>
                            <th>Chi tiết</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Mã tuyến tàu </td>
                            <td>{details?.matuyentau}</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Thời gian xuất phát </td>
                            <td>{moment(details?.title).format('LT DD/MM/YYYY ')}</td>
                          </tr>

                          <tr>
                            <td>3</td>
                            <td className="fw-bold">Tổng số ghế: </td>
                            <td>{details?.chitietghengoi?.soluongghe}</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td className="text-success fw-bold">Số ghế bán được:</td>
                            <td>{details?.chitietghengoi?.soghebanduoc?.length}</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td className="text-danger fw-bold">Số ghế trống</td>
                            <td>
                              {details?.chitietghengoi?.soluongghe -
                                details?.chitietghengoi?.soghebanduoc?.length}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <h6 className="fw-bold text-uppercase flex-fill mt-1 ">
                        Nhân viên trên tàu
                      </h6>

                      <table className="table border text-center">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Chức vụ</th>
                            <th>Họ tên</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>STT</td>
                            <td>Tàu trưởng </td>
                            <td>
                              <Link to="#">Nguyễn Văn A</Link>
                            </td>
                          </tr>
                          <tr>
                            <td>STT</td>
                            <td> Nhân viên 1</td>
                            <td>
                              <Link to="#">Nguyễn Văn A</Link>
                            </td>
                          </tr>
                          <tr>
                            <td>STT</td>
                            <td> Nhân vên 1</td>
                            <td>
                              <Link to="#">Nguyễn Văn A</Link>
                            </td>
                          </tr>
                          <tr>
                            <td>STT</td>

                            <td> Nhân viên 1</td>
                            <td>
                              <Link to="#">Nguyễn Văn A</Link>
                            </td>
                          </tr>

                          <tr>
                            <td>STT</td>

                            <td> Nhân viên 1</td>
                            <td>
                              <Link to="#">Nguyễn Văn A</Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Typography>
                    <Typography className="mt-3 justify-content-end d-flex">
                      <Button variant="contained" onClick={handleShow}>
                        Đóng
                      </Button>
                    </Typography>
                  </Box>
                </Fade>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quanlylichtrinh;
