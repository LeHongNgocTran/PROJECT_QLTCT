import clsx from 'clsx';
import styles from './index.module.scss';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaiKhoan } from '~/service';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Add, Close, Delete, Edit, Lock, LockOpen, Search } from '@mui/icons-material';
import TablePaginationActions from '~/Components/Components/PaginationOfTable';
import LoadingPage from '~/Components/Components/LoadingPage';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ListStaff() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setReFresh] = useState(0);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.permission.users);
  useEffect(() => {
    const fetchDatabase = async () => {
      const documents = await TaiKhoan.getAllByPermission('staff');
      setResult(documents);
    };
    fetchDatabase().catch(console.error);
  }, [refresh]);

  const handleSearch = async () => {
    const document = await TaiKhoan.Search({ user: 'staff', infor: search });
    setLoading(true);
    setResult(document);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - result?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className={clsx(styles.wrapper)}>
      <div className="container-fluid">
        <div className="mt-4 d-flex flex-row ">
          <div>
            <h4
              style={{ backgroundColor: '#1c6dd0', width: '350px' }}
              className=" py-2  my-2 rounded-1 text-uppercase fw-bold text-white shadow ps-3 "
            >
              Danh sách nhân viên
            </h4>
          </div>
        </div>
        <div
          className={clsx(
            styles.container,
            'bg-white rounded-1 borer border-muted shadow w-100',
          )}
        >
          <div className="py-3 px-3 d-flex flex-row justify-content-between">
            <div style={{ width: '90%' }}>
              <TextField
                className="w-75"
                id="outlined-controlled"
                label="Tìm kiếm"
                placeholder="Tìm kiếm theo số điện thoại"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              ></TextField>
              <Button className="py-3 ms-3" variant="contained" onClick={handleSearch}>
                Tìm kiếm
              </Button>
            </div>
            <div style={{ width: '30%' }} className="d-flex justify-content-end ">
              <Button
                className="py-2"
                variant="outlined"
                onClick={() => {
                  navigate('/staff/addStaff');
                }}
              >
                <Add />
                Thêm Nhân viên
              </Button>
            </div>
          </div>
          {loading ? (
            <div className={clsx(styles.loading)}>
              <LoadingPage loading={loading}></LoadingPage>
            </div>
          ) : (
            <TableContainer className="p-3 my-3 w-100 border">
              <Table
                stickyHeader
                aria-label="sticky table"
                className={clsx(styles.table)}
              >
                <TableHead>
                  <TableRow className="w-100">
                    <TableCell align="center">STT</TableCell>
                    <TableCell align="center">Họ tên</TableCell>
                    <TableCell align="center">Chức vụ</TableCell>
                    <TableCell align="center">Số điện thoại</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Thời gian khởi tạo</TableCell>
                    <TableCell align="center">Trạng thái</TableCell>
                    <TableCell align="center">Tác vụ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="w-100" style={{ overflowX: 'scroll' }}>
                  {result.length !== 0 ? (
                    (rowsPerPage > 0
                      ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : result
                    ).map((value, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{value.name}</TableCell>
                          <TableCell align="center">
                            {value.permission === 1 && <p>Nhân viên quản trị</p>}
                            {value.permission === 2 && <p>Nhân viên bán vé</p>}
                            {value.permission === 3 && <p>Thuyền Trưởng</p>}
                            {value.permission === 4 && <p>Thuyền Viên</p>}
                          </TableCell>
                          <TableCell align="center">
                            {' '}
                            {value.taikhoan?.mataikhoan}
                          </TableCell>
                          <TableCell align="center">{value.email}</TableCell>
                          <TableCell align="center">
                            {moment(value.create_at).format('LT DD/MM/YYYY ')}
                          </TableCell>

                          <TableCell align="center">
                            {value.trangthai ? (
                              <p
                                className="text-success fw-bold"
                                style={{ textShadow: '-2px -1px 25px #205d18' }}
                              >
                                Hoạt động
                              </p>
                            ) : (
                              <p
                                className="text-danger fw-bold"
                                style={{ textShadow: '-2px -1px 25px #b30000' }}
                              >
                                Đã khóa
                              </p>
                            )}
                          </TableCell>

                          <TableCell align="center">
                            <Tooltip title="Chỉnh sửa thông tin">
                              <IconButton
                                onClick={() => {
                                  navigate(`/staff/updateStaff/${value._id}`);
                                }}
                              >
                                <Edit color="success" />
                              </IconButton>
                            </Tooltip>
                            {value.trangthai === true && (
                              <Tooltip title="Khóa tài khoản">
                                <IconButton
                                  onClick={async () => {
                                    if (value.trangthai === true) {
                                      await TaiKhoan.updateAccount({
                                        id: value._id,
                                        trangthai: false,
                                      });
                                      setReFresh((prev) => prev + 1);
                                    }
                                  }}
                                >
                                  <LockOpen color="success" />
                                </IconButton>
                              </Tooltip>
                            )}
                            {value.trangthai === false && (
                              <Tooltip title="Mở khóa tài khoản">
                                <IconButton
                                  onClick={async () => {
                                    await TaiKhoan.updateAccount({
                                      id: value._id,
                                      trangthai: true,
                                    });
                                    setReFresh((prev) => prev + 1);
                                  }}
                                >
                                  <Lock sx={{ color: '#F9D949' }} />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Xóa tài khoản">
                              <IconButton
                                onClick={async () => {
                                  const document = await TaiKhoan.deleteAccount(
                                    value._id,
                                  );
                                  if (document === true) {
                                    toast.success('Xóa tài khoản thành công', {
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
                                    toast.error('Lỗi khi xóa', {
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
                                  setReFresh((prev) => prev + 1);
                                }}
                              >
                                <Delete sx={{ color: '#D21312' }} />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={10}
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
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={10}
                      count={result.length}
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
        </div>
      </div>
    </div>
  );
}

export default ListStaff;
