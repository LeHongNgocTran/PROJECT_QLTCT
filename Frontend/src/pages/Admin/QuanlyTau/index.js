import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './index.module.scss';
import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
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

import {
  Add,
  BorderColorOutlined,
  CalendarMonth,
  Info,
  Search,
} from '@mui/icons-material';
import { Tau } from '~/service';
import TablePaginationActions from '~/Components/Components/PaginationOfTable';
import FormTau from './formTau';
import LoadingPage from '~/Components/Components/LoadingPage';
function QuanlyTau() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const [add, setAdd] = useState(false);

  const [ships, setShips] = useState([]);
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);

  const [data, setData] = useState({
    matau: '',
    nhanhieu: '',
    vantoc: '',
    taitrong: '',
    soluongghe: '',
  });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ships?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [loading, setLoading] = useState(false);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [search, setSearch] = useState('');

  const handleSearch = async () => {
    let document = [];
    if (search !== '') {
      document = await Tau.Search(search.toUpperCase());
      setShips(document);
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  useEffect(() => {
    const fetchData = async () => {
      const documents = await Tau.getAllTau();
      setShips(documents);
    };

    fetchData().catch(console.error);
  }, []);

  const check = (chuyen) => {
    const result = chuyen.find((item) => item.trangthaitau === true);
    return result;
  };
  const callbackFunction = (childData) => {
    setShips(childData);
  };

  return (
    <div className={clsx(styles.wrapper)} style={{ padding: '0px 12px' }}>
      <h4
        style={{ backgroundColor: '#1c6dd0', width: '40%' }}
        className="py-2 my-3 rounded-1 text-uppercase fw-bold text-white shadow mx-auto text-center"
      >
        Danh sách tàu
      </h4>

      <div className="px-3 bg-white shadow w-100">
        <div className="py-3 d-flex flex-row justify-content-between">
          <div style={{ width: '90%' }}>
            <TextField
              className="w-75"
              id="outlined-controlled"
              label="Tìm kiếm"
              placeholder="Tìm kiếm theo tên tàu"
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
              variant="outlined"
              onClick={() => {
                setData({
                  matau: '',
                  nhanhieu: '',
                  vantoc: '',
                  taitrong: '',
                  soluongghe: '',
                });
                setAdd(!add);
              }}
              className="fw-bold"
            >
              <Add />
              &nbsp;Thêm tàu
            </Button>
          </div>
        </div>
        {loading ? (
          <div className={clsx(styles.loading)}>
            <LoadingPage loading={loading}></LoadingPage>
          </div>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead className="text-center fw-bold text-uppercase">
                <TableRow>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="center">Mã tàu</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ships.length !== 0 ? (
                  (rowsPerPage > 0
                    ? ships.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : ships
                  ).map((value, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center" className="fw-bold">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">{value.matau}</TableCell>
                        <TableCell align="center">
                          {check(value.matuyentau) != null ? (
                            <p key={index} className="fw-bold text-success">
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
                            title="Xem thông tin tàu"
                            onClick={() => {
                              navigate(`/quanlytau/chitiettau/${value.matau}`);
                            }}
                          >
                            <IconButton>
                              <Info />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title="Xem lịch trình của tàu"
                            onClick={() => {
                              navigate(`/quanlytau/chitiettau/${value.matau}`);
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                navigate(`/quanlytau/${value.matau}`);
                              }}
                            >
                              <CalendarMonth />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title="Chỉnh sửa thông tin tàu"
                            onClick={() => {
                              setData({
                                matau: value.matau,
                                nhanhieu: value.nhanhieu,
                                vantoc: value.vantoc,
                                taitrong: value.taitrong,
                                soluongghe: value.soluongghe,
                              });
                              setModalShow(!modalShow);
                            }}
                          >
                            <IconButton>
                              <BorderColorOutlined />
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
                      colSpan={4}
                      className="text-center text-danger fw-bold"
                    >
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                )}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={4}
                    count={ships.length}
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

      {modalShow === true && (
        <FormTau
          show={modalShow}
          content={data}
          update={true}
          parentCallback={callbackFunction}
          onHide={() => {
            setModalShow(false);
          }}
        />
      )}

      {add === true && (
        <FormTau
          parentCallback={callbackFunction}
          show={add}
          add={true}
          onHide={() => setAdd(false)}
          content={data}
        />
      )}
    </div>
  );
}
export default QuanlyTau;
