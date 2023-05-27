import clsx from 'clsx';
import styles from './index.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { Tau, TuyenTau } from '~/service';
import { useSelector } from 'react-redux';
import TablePaginationActions from '~/Components/Components/PaginationOfTable';
import { Add, ArrowBack, Close, Delete, EventNote } from '@mui/icons-material';
import {
  Breadcrumbs,
  Modal,
  Table,
  Typography,
  Button,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Switch,
  Tooltip,
  IconButton,
  Box,
  TableFooter,
  TablePagination,
} from '@mui/material';
import { toast } from 'react-toastify';

const style = {
  backgroundColor: 'white',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  outline: 0,
};

function TauTheoTuyen() {
  const user = useSelector((state) => state.permission.users);
  const { id } = useParams(null);
  const stamentOfTuyenTau = useSelector((state) => state.stateTuyenTau.state);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [ships, setShips] = useState({ tauthuoctuyen: [], taukhongthuoctuyen: [] });

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ships.tauthuoctuyen.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Lưu trừ tàu theo tuyến
  const [tau, setTau] = useState();
  const [refresh, setRefresh] = useState(0);

  const handleSubmit = async () => {
    // console.log(tau);
    if (tau === undefined) {
      toast.error('Vui lòng chọn tàu', {
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
      await Tau.updateTauthuocTuyenTau({
        trangthai: true,
        tau,
        id,
        type: 'add',
      });
      toast.success('Thêm tàu vào tuyến thành công', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setRefresh((prev) => prev + 1);
      handleShow();
    }
  };

  const check = (chuyen) => {
    const result = chuyen.find((item) => item.matuyentau === id);
    return result?.trangthaitau;
  };

  useEffect(() => {
    const fetchData = async () => {
      const documents = await Tau.getAllTauTheoTuyen(id);
      setShips(documents);
    };
    fetchData().catch(console.error);
  }, [refresh]);

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
              Chi tiết tuyến tàu
            </Link>
            <Typography color="text.primary"> {id}</Typography>
          </Breadcrumbs>
        </div>
      </>
      <h4
        style={{ backgroundColor: '#1c6dd0', width: '40%' }}
        className="py-2 my-3 rounded-1 text-uppercase fw-bold text-white shadow mx-auto text-center"
      >
        Danh sách tàu thuộc tuyến
      </h4>

      <div style={{ padding: '0px 12px' }}>
        <div className="d-flex flex-row w-100 mb-3">
          <div>
            {user.permission === 1 && (
              <Button variant="contained" onClick={handleShow}>
                <Add></Add>
                &nbsp; Thêm tàu vào tuyến
              </Button>
            )}
          </div>
          <div className="ms-auto  d-flex flex-row">
            <p className="fw-bold mt-1"> Trạng thái tuyến :</p>
            {stamentOfTuyenTau ? (
              <p className=" mt-1 ms-1 fw-bold  text-success">Đang hoạt động</p>
            ) : (
              <p className="mt-1 ms-1 fw-bold text-danger">Dừng hoạt động</p>
            )}
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table hover sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="text-uppercase">
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Mã tàu</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
                {user.permission === 1 && <TableCell />}
              </TableRow>
            </TableHead>
            <TableBody>
              {ships.tauthuoctuyen.length !== 0 ? (
                ships.tauthuoctuyen.map((value, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{value.matau}</TableCell>
                    <TableCell align="center">
                      {check(value.matuyentau) === true ? (
                        <p key={index} className="fw-bold  text-success">
                          Đang hoạt động
                        </p>
                      ) : (
                        <p key={index} className="fw-bold text-danger">
                          Dừng hoạt động
                        </p>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip
                        onClick={() => {
                          sessionStorage.clear();
                          sessionStorage.setItem('matuyentau', id);
                          navigate(`/danhsachtauthuoctuyen/${value.matau}`);
                        }}
                        title={
                          user.permission === 1
                            ? 'Chỉnh sửa lịch trình'
                            : 'Xem lịch trình '
                        }
                      >
                        <IconButton>
                          <EventNote />
                        </IconButton>
                      </Tooltip>

                      <Tooltip
                        onClick={async () => {
                          if (user.permission === 1) {
                            if (
                              window.confirm(`Bạn muốn xóa tàu này thuộc tuyến ${id} `)
                            ) {
                              await TuyenTau.deleteTauByIdTheoTuyen(id, {
                                matau: value.matau,
                              });
                              toast.error('Xóa thành công!', {
                                position: 'top-right',
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: 'light',
                              });
                              setRefresh((prev) => prev + 1);
                            }
                          } else {
                            alert('Bạn không có quyền thực hiện chức năng này !');
                          }
                        }}
                        title="Xóa tàu khỏi tuyến"
                      >
                        <IconButton>
                          <Delete sx={{ color: '#850000' }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    {user.permission === 1 && (
                      <TableCell align="center">
                        {stamentOfTuyenTau === false && <Switch disabled />}
                        {stamentOfTuyenTau === true && (
                          <Switch
                            value={check(value.matuyentau)}
                            checked={check(value.matuyentau)}
                            onChange={async () => {
                              if (check(value.matuyentau) === true) {
                                if (
                                  window.confirm(
                                    ` Dừng hoạt động của tuyến tàu ${value.matau}`,
                                  )
                                ) {
                                  await Tau.updateTauthuocTuyenTau({
                                    type: 'update',
                                    tau: value.matau,
                                    id: id,
                                    trangthai: !check(value.matuyentau),
                                  });
                                  setRefresh((prev) => prev + 1);
                                }
                              } else {
                                if (
                                  window.confirm(
                                    ` Mở hoạt động của tuyến tàu ${value.matau}`,
                                  )
                                ) {
                                  await Tau.updateTauthuocTuyenTau({
                                    type: 'update',
                                    tau: value.matau,
                                    id: id,
                                    trangthai: !check(value.matuyentau),
                                  });
                                  setRefresh((prev) => prev + 1);
                                }
                              }
                            }}
                          />
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-danger fw-bold">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
                  colSpan={7}
                  count={ships.tauthuoctuyen.length}
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
              <h4 className="flex-fill fw-bold text-uppercase mt-2">Thêm tuyến tàu</h4>
              <Tooltip title="Đóng" onClick={handleShow}>
                <IconButton>
                  <Close />
                </IconButton>
              </Tooltip>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className={clsx(styles.form)}>
                <p className="fw-bold">Mã tàu</p>
                <select name="matau" onChange={(e) => setTau(e.target.value)} value={tau}>
                  <option value="">Chọn tàu</option>
                  {ships.taukhongthuoctuyen.map((value, key) => {
                    return (
                      <option key={key} value={value.matau}>
                        {value.matau}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={clsx(styles.form, 'my-3')}>
                <p className="fw-bold">Thuộc tuyến</p>
                <input type="text" value={id} name="tuyen" readOnly></input>
              </div>
            </Typography>
            <Typography
              className="d-flex  flex-row justify-content-end pt-2"
              id="modal-modal-footer"
              variant="h6"
              component="h2"
            >
              <Button variant="outlined" className="me-3" onClick={handleShow}>
                Đóng
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Lưu
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default TauTheoTuyen;
