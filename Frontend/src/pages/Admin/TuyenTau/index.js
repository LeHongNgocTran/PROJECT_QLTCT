import clsx from 'clsx';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Tooltip,
  IconButton,
  Button,
  Switch,
  TableFooter,
  TablePagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TuyenTau } from '~/service';
import { useDispatch, useSelector } from 'react-redux';
import { setStateTuyenTau } from '~/reducer/State';
import { Add, Edit, ViewList } from '@mui/icons-material';
import TablePaginationActions from '~/Components/Components/PaginationOfTable';
import LoadingPage from '~/Components/Components/LoadingPage';

function QuanLyTuyenTau() {
  const user = useSelector((state) => state.permission.users);
  const [documents, setDocuments] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  //   // Lưu dữ liệu của tuyến

  const [refresh, setRefresh] = useState(0);
  const [search, setSearch] = useState();
  const [state, setState] = useState(false);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - documents.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = async () => {
    const document = await TuyenTau.Search(search);
    setLoading(true);
    setDocuments(document);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  useEffect(() => {
    const fetchDatabase = async () => {
      const result = await TuyenTau.getAll();
      setDocuments(result);
    };
    fetchDatabase().catch(console.error);
  }, [refresh]);
  // console.log(documents);
  return (
    <div className={clsx(styles.wrapper)}>
      <h4
        style={{ backgroundColor: '#1c6dd0', width: '350px' }}
        className="py-2 my-3 rounded-1 text-uppercase fw-bold text-white shadow mx-auto text-center"
      >
        Danh sách tuyến tàu
      </h4>

      <div className={clsx(styles.button, 'mb-2')}>
        <div className="d-flex flex-row">
          <div className="py-3">
            {user.permission === 1 && (
              <Button
                onClick={() => {
                  navigate('/addandupdatetuyentau');
                }}
                variant="contained"
              >
                <Add />
                Thêm tuyến
              </Button>
            )}
          </div>
          <div className={clsx(styles.search, 'ms-auto my-2')}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nhập tên tuyến cần tìm ... "
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
              className={clsx(styles.search__input)}
            />
            <button
              type="submit"
              className={clsx(styles.search__button)}
              onClick={() => handleSubmit()}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className={clsx(styles.loading)}>
          <LoadingPage loading={loading}></LoadingPage>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow className="text-uppercase ">
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Mã tuyến</TableCell>
                <TableCell align="center">Điểm tàu xuất phát</TableCell>
                <TableCell align="center">Điểm tàu cập bến</TableCell>
                <TableCell align="center">Trạng thái hoạt động</TableCell>
                <TableCell align="center">Trạng thái hiển thị</TableCell>

                {user.permission === 1 && (
                  <>
                    <TableCell align="center">Thao tác</TableCell>
                    <TableCell />
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.length !== 0 ? (
                (rowsPerPage > 0
                  ? documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : documents
                ).map((value, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{value.matuyentau}</TableCell>
                    <TableCell align="center" className="text-uppercase">
                      {value.diemdi}
                    </TableCell>
                    <TableCell align="center" className="text-uppercase">
                      {value.diemden}
                    </TableCell>
                    <TableCell align="center">
                      {value.trangthai ? (
                        <p className="text-success fw-bold p-0 m-0">Đang hoạt động</p>
                      ) : (
                        <p className="text-danger fw-bold p-0 m-0">Dừng hoạt động</p>
                      )}
                    </TableCell>
                    {user.permission === 1 && (
                      <TableCell align="center">
                        <Switch
                          value={value.info.trangthai}
                          checked={value.info.trangthai === true}
                          onChange={async () => {
                            if (value.info.trangthai === true) {
                              if (
                                window.confirm(
                                  ` Ẩn hiển thị của tuyến tàu ${value.matuyentau}`,
                                )
                              ) {
                                await TuyenTau.updateDisplayTuyenTau(value.matuyentau, {
                                  trangthai: false,
                                });
                                setRefresh((prev) => prev + 1);
                              }
                            } else {
                              if (
                                window.confirm(`Hiển thị tuyến tàu ${value.matuyentau}`)
                              ) {
                                await TuyenTau.updateDisplayTuyenTau(value.matuyentau, {
                                  trangthai: true,
                                });
                                setRefresh((prev) => prev + 1);
                              }
                            }
                          }}
                        />
                      </TableCell>
                    )}
                    <TableCell align="center">
                      {user.permission === 1 && (
                        <Tooltip title="Chỉnh sửa thông tin tuyến" onClick={() => {}}>
                          <IconButton>
                            <Edit sx={{ color: '#E7B10A' }} />
                          </IconButton>
                        </Tooltip>
                      )}

                      <Tooltip
                        sx={{ color: 'black' }}
                        title="Xem danh sách tàu thuộc tuyến"
                        onClick={() => {
                          dispatch(setStateTuyenTau(value.trangthai));
                          navigate(
                            `/quanlytuyentau/danhsachtauthuoctuyen/${value.matuyentau}`,
                          );
                        }}
                      >
                        <IconButton>
                          <ViewList />
                        </IconButton>
                      </Tooltip>
                    </TableCell>

                    {user.permission === 1 && (
                      <TableCell>
                        <Switch
                          value={value.trangthai}
                          checked={value.trangthai}
                          onChange={async () => {
                            if (value.trangthai === true) {
                              if (
                                window.confirm(
                                  ` Dừng hoạt động của tuyến tàu ${value.matuyentau}`,
                                )
                              ) {
                                setState(!value.trangthai);
                                await TuyenTau.updateTuyenTau(value.matuyentau, {
                                  trangthai: false,
                                });
                                setRefresh((prev) => prev + 1);
                              }
                            } else {
                              if (
                                window.confirm(
                                  ` Mở hoạt động của tuyến tàu ${value.matuyentau}`,
                                )
                              ) {
                                await TuyenTau.updateTuyenTau(value.matuyentau, {
                                  trangthai: true,
                                });
                                setRefresh((prev) => prev + 1);
                              }
                            }
                          }}
                        />
                      </TableCell>
                    )}
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

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={8}
                  count={documents.length}
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
  );
}

export default QuanLyTuyenTau;
