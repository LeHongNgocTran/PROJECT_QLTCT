import clsx from 'clsx';
import styles from './index.module.scss';

import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import moment from 'moment';
import { Tau } from '~/service';
import Pagination from '~/Components/Components/Pagination';
import { ArrowBack, Close, FilterList, Info } from '@mui/icons-material';
import {
  Breadcrumbs,
  Button,
  Menu,
  Typography,
  MenuItem,
  Tooltip,
  IconButton,
  Backdrop,
  Fade,
  Modal,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableFooter,
  TablePagination,
} from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { result } from 'lodash';
import LoadingPage from '~/Components/Components/LoadingPage';

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

function ChiTietThoiGian() {
  const { matuyentau } = useParams(null);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState({});
  const matau = sessionStorage.getItem('matau');
  const [all, setAll] = useState([]);

  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    const fetchData = async () => {
      const time = await Tau.getAllTimeTauById(matau, { matuyentau });
      setData(time);
      setAll(time);
    };
    fetchData().catch(console.error);
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [loading, setLoading] = useState(false);

  const handleFilter = (trangthai) => {
    const document = all.filter((e) => e.trangthaitau === trangthai);
    setLoading(true);
    setData(document);
    // console.log(data);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    handleClose();
  };
  return (
    <div className={clsx(styles.wrapper)}>
      <div className="container-fluid ">
        <div className="row border-bottom bg-white mb-3">
          <div
            className="bg-white d-flex flex-row m-0 text-center "
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
              <Link className="text-muted py-3 mb-3 " to="#">
                Home
              </Link>
              <Link className="text-muted py-3" to="/quanlytau">
                Danh sách tàu
              </Link>
              <Link className="text-muted py-3" to="#">
                Chi tiết tàu
              </Link>
              <Link className="text-muted py-3" to="#">
                Lịch trình tàu
              </Link>
              <Link to="#" className="text-muted">
                {matau}
              </Link>
              <Typography> {matuyentau}</Typography>
            </Breadcrumbs>
          </div>
        </div>

        <div className="row p-3">
          <div className="col-12 bg-white shadow">
            <h4 className=" fw-bold mb-3 mt-2 pt-2 text-uppercase">
              Thời gian hoạt động của tàu
            </h4>
            <div className={clsx(styles.search)}>
              <div>
                <Button
                  variant="contained"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <FilterList /> &nbsp; Lọc danh sách
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => handleFilter(true)}>Đang hoạt động</MenuItem>
                  <MenuItem onClick={() => handleFilter(false)}>Dừng hoạt động</MenuItem>
                </Menu>
              </div>
              <div>
                <span>
                  Từ&nbsp;
                  <input
                    type="date"
                    id="start"
                    name="trip-start"
                    // value="2018-07-22"
                    min="2000-01-01"
                    max="2050-12-31"
                  />
                </span>
                <span>
                  Đến &nbsp;
                  <input
                    type="date"
                    id="end"
                    name="trip-end"
                    // value="2018-07-22"
                    min="2000-01-01"
                    max="2050-12-31"
                  />
                </span>
                <span>
                  <Button variant="contained">Tìm kiếm</Button>
                </span>
              </div>
            </div>
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
                      <TableCell align="center">Trạng thái tàu</TableCell>
                      <TableCell align="center">Thời gian bắt đầu</TableCell>
                      <TableCell align="center">Chi tiết</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.length !== 0 ? (
                      (rowsPerPage > 0
                        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : data
                      ).map((value, index) => (
                        <TableRow key={value.name}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{value?.matuyentau}</TableCell>
                          <TableCell align="center">
                            {value?.trangthaitau ? (
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
                          colSpan={5}
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
                        rowsPerPageOptions={[10, 25, 30, { label: 'All', value: -1 }]}
                        colSpan={5}
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

            {/* <div className="d-flex flex-row justify-content-end">
              <p className="py-2 me-4">
                Tổng số:{currentRecords.length + indexOfFirstRecord} / {time.length}
              </p>
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChiTietThoiGian;
