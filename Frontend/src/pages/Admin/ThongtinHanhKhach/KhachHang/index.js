import clsx from 'clsx';
import styles from './index.module.scss';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaiKhoan } from '~/service';
import {
  Button,
  IconButton,
  InputAdornment,
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
} from '@mui/material';
import { Delete, Info, Lock, LockOpen, Search } from '@mui/icons-material';
import TablePaginationActions from '~/Components/Components/PaginationOfTable';
import LoadingPage from '~/Components/Components/LoadingPage';
import { toast } from 'react-toastify';

function Customer() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [refresh, setReFresh] = useState(0);

  useEffect(() => {
    const fetchDatabase = async () => {
      const documents = await TaiKhoan.getAllByPermission('customer');
      setResult(documents);
    };
    fetchDatabase().catch(console.error);
  }, [refresh]);

  const handleSubmit = async () => {
    const document = await TaiKhoan.Search({ user: 'customer', infor: search });
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
  return (
    <div className={clsx(styles.wrapper)}>
      <div className="container-fluid">
        <div className="mt-4 d-flex flex-row ">
          <div>
            <h4
              style={{ backgroundColor: '#1c6dd0', width: '350px' }}
              className=" py-2  my-2 rounded-1 text-uppercase fw-bold text-white shadow ps-3 "
            >
              Danh sách khách hàng
            </h4>
          </div>
        </div>

        <div className="bg-white rounded-1 borer border-muted shadow ">
          <div className="py-3 px-3">
            <TextField
              className="w-50"
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
                  handleSubmit();
                }
              }}
            ></TextField>
            <Button className="py-3 ms-3" variant="contained" onClick={handleSubmit}>
              Tìm kiếm
            </Button>
          </div>
          {loading ? (
            <div className={clsx(styles.loading)}>
              <LoadingPage loading={loading}></LoadingPage>
            </div>
          ) : (
            <TableContainer className="my-3 w-100 px-3 border">
              <Table className=" ">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">STT</TableCell>
                    <TableCell align="center">Họ tên</TableCell>
                    <TableCell align="center">Giới tính</TableCell>
                    <TableCell align="center">Email liên hệ</TableCell>

                    <TableCell align="center">Số điện thoại</TableCell>
                    <TableCell align="center">Trạng thái</TableCell>
                    <TableCell align="center">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.length !== 0 ? (
                    (rowsPerPage > 0
                      ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : result
                    ).map((value, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{value.name}</TableCell>

                          <TableCell align="center">{value.sex}</TableCell>
                          <TableCell align="center">{value.email}</TableCell>

                          <TableCell align="center">
                            {value.taikhoan?.mataikhoan}
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
                                  {' '}
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
                            <Tooltip title="Xem chi tiết">
                              <IconButton
                                onClick={() => {
                                  navigate(`/customer/${value._id}`);
                                }}
                              >
                                <Info />
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
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={7}
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

export default Customer;
