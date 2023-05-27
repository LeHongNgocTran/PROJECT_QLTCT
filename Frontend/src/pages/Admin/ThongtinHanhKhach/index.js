import clsx from 'clsx';
import styles from './index.module.scss';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hoadon } from '~/service';
import moment from 'moment';
import { FilterList, Info, Search } from '@mui/icons-material';
import {
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material';
import TablePaginationActions from '~/Components/Components/PaginationOfTable';
import LoadingPage from '~/Components/Components/LoadingPage';

function InforCustomer() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [result, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [all, setAll] = useState([]);

  const handleSubmit = async (data) => {
    const document = await Hoadon.Search({ sodienthoai: data });
    setLoading(true);
    setResults(document);
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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilter = (trangthai) => {
    // console.log(all);
    const document = all.filter((e) => e?.trangthai === trangthai);
    setLoading(true);
    setResults(document);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    handleClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      const documents = await Hoadon.getAllBill();
      setResults(documents);
      setAll(documents);
    };
    fetchData().catch(console.error);
  }, []);
  return (
    <div className={clsx(styles.wrapper)}>
      <div className="container-fluid">
        <div className="mt-4 d-flex flex-row ">
          <div>
            <h4
              style={{ backgroundColor: '#1c6dd0', width: '300px' }}
              className=" py-2  my-2 rounded-1 text-uppercase fw-bold text-white shadow ps-3 mb-3 "
            >
              Danh sách hóa đơn
            </h4>
          </div>
        </div>
        <div className="p-3 bg-white rounded-1 borer border-muted shadow ">
          <div style={{ width: '90%' }}>
            <TextField
              label="Tìm kiếm"
              className="w-75"
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
                  handleSubmit(search);
                }
              }}
            ></TextField>
            <Button
              className="py-3 ms-3"
              variant="contained"
              onClick={() => handleSubmit(search)}
            >
              Tìm kiếm
            </Button>
          </div>

          {loading ? (
            <div className={clsx(styles.loading)}>
              <LoadingPage loading={loading}></LoadingPage>
            </div>
          ) : (
            <div className="">
              <Table className=" border mt-3 w-100">
                <TableHead className="text-uppercase py-2 text-center">
                  <TableRow>
                    <TableCell align="center">STT</TableCell>
                    <TableCell align="center">Mã vé</TableCell>
                    <TableCell align="center">Họ tên</TableCell>
                    <TableCell align="center">Số điện thoại</TableCell>
                    <TableCell align="center">Thời gian đặt vé</TableCell>
                    <TableCell align="center">
                      <div>
                        Trạng thái
                        <Button
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                        >
                          <FilterList color="action" />
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
                          <MenuItem
                            onClick={() => {
                              setLoading(true);
                              setResults(all);
                              setTimeout(() => {
                                setLoading(false);
                              }, 500);
                              handleClose();
                            }}
                          >
                            Tất cả
                          </MenuItem>
                          <MenuItem onClick={() => handleFilter()}>
                            Đã thanh toán
                          </MenuItem>
                          <MenuItem onClick={() => handleFilter(false)}>Đã hủy</MenuItem>
                        </Menu>
                      </div>
                    </TableCell>
                    <TableCell align="center">Phương thức thanh toán</TableCell>
                    <TableCell align="center">Chi tiết</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="text-center">
                  {result.length !== 0 ? (
                    (rowsPerPage > 0
                      ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : result
                    ).map((value, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{value.orderId}</TableCell>
                          <TableCell align="center">{value.tennguoidatve}</TableCell>
                          <TableCell align="center">{value.sodienthoai}</TableCell>
                          <TableCell align="center">
                            {moment(value.create_at).format('DD/MM/YYYY LT')}
                          </TableCell>
                          <TableCell align="center">
                            {value?.trangthai === false ? (
                              <p
                                className="text-danger fw-bold"
                                style={{ textShadow: '-2px -1px 25px #b30000' }}
                              >
                                Đã hủy
                              </p>
                            ) : (
                              <p
                                className="text-success fw-bold"
                                style={{ textShadow: '-2px -1px 25px #205d18' }}
                              >
                                Đã thanh toán
                              </p>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {value.payment === 'creditTaiquay' && (
                              <Chip label="Chuyển khoản tại quầy" color="success" />
                            )}
                            {value.payment === 'cash' && (
                              <Chip label="Thanh toán tiền mặt" color="secondary" />
                            )}

                            {value.payment === 'paypal' && (
                              <Chip label="Thanh toán online" color="primary" />
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip
                              onClick={() => navigate(`/detailsinvoice/${value._id}`)}
                              title="Xem chi tiết"
                            >
                              <IconButton>
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
                        colSpan={8}
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
                      colSpan={8}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InforCustomer;
