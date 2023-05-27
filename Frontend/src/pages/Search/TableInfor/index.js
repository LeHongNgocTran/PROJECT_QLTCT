import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Place } from '@mui/icons-material';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import moment from 'moment';

function TableInfor({ result, data, setData, next }) {
  return (
    <div>
      {result.motchieu.length !== 0 ? (
        <table id="infor_way" className="table">
          <tbody>
            <tr style={{ borderBottom: '2px solid ' }}>
              <th colSpan={5} className="text-uppercase">
                <Place sx={{ color: '#245eab' }} />
                Tuyến {result?.giavetuyentau.diemdi} - {result?.giavetuyentau.diemden}
              </th>
            </tr>
            <tr className="text-uppercase ">
              <th width="10%"></th>
              <th width="30%">Tàu</th>
              <th width="20%">Ngày</th>
              <th width="20%">Giờ khởi hành</th>
              <th width="20%">Tình trạng</th>
            </tr>
            {result?.motchieu.length !== 0 &&
              result?.motchieu?.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="radio"
                        name="matuyentau"
                        value={value.title}
                        checked={value.title === data.thoigiandi}
                        onChange={() => {
                          setData((prev) => ({
                            ...prev,
                            matuyentaudi: value.matuyentau,
                            matau: value.matau,
                            thoigiandi: value.title,
                          }));
                        }}
                        className="m-auto"
                      />
                    </td>
                    <td className="text-uppercase">Tàu {value.matau}</td>
                    <td>{moment(value.day).format('DD/MM/YYYY')}</td>
                    <td>{value.timeStart}</td>
                    <td>
                      {value.chitietghengoi.tinhtrangghe === 0 ? (
                        <p>Còn vé</p>
                      ) : (
                        <p>Hết vé</p>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <table id="infor_way" className="table">
          <tbody>
            <tr style={{ borderBottom: '2px solid ' }}>
              <th colSpan={5} className="text-uppercase">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  color="#245eab"
                  fontSize={'0.9rem'}
                  style={{ marginRight: '10px' }}
                />
                Tuyến
              </th>
            </tr>
            <tr className="text-uppercase ">
              <th width="10%"></th>
              <th width="30%">Tàu</th>
              <th width="20%">Ngày</th>
              <th width="20%">Giờ khởi hành</th>
              <th width="20%">tình trạng</th>
            </tr>
            <tr>
              <td colSpan={5} className="text-center fw-bold">
                Không có dữ liệu
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {result?.haichieu && (
        <table id="infor_way" className="table mt-3">
          <tbody>
            <tr style={{ borderBottom: '2px solid ' }}>
              <th colSpan={5} className="text-uppercase">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  color="#245eab"
                  fontSize={'0.9rem'}
                  style={{ marginRight: '10px' }}
                />
                Tuyến {result?.giavetuyentau.diemden} - {result?.giavetuyentau.diemdi}
              </th>
            </tr>
            <tr className="text-uppercase ">
              <th width="10%"></th>
              <th width="30%">Tàu</th>
              <th width="20%">Ngày</th>
              <th width="20%">Giờ khởi hành</th>
              <th width="20%">tình trạng</th>
            </tr>
            {result?.haichieu.length !== 0 ? (
              result?.haichieu?.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="radio"
                        className="m-auto"
                        id="hatien-phuquoc"
                        name="tuyenkhuhoi"
                        value={value.title}
                        checked={value.title === data.thoigiankhuhoi}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            matuyentaukhuhoi: value.matuyentau,
                            mataukhuhoi: value.matau,
                            thoigiankhuhoi: value.title,
                          }))
                        }
                      ></input>
                    </td>
                    <td className="text-uppercase">Tàu {value.matau}</td>
                    <td>{moment(value.day).format('DD/MM/YYYY')}</td>
                    <td>{value.timeStart}</td>
                    <td>
                      {value.chitietghengoi.tinhtrangghe === 0 ? (
                        <p>Còn vé</p>
                      ) : (
                        <p>Hết vé</p>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <div className="d-flex justify-content-end">
        <Button
          variant="contained"
          onClick={() => {
            if (data.matau === undefined) {
              toast.error('Vui lòng chọn tuyến tàu', {
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
              next();
            }
          }}
        >
          Tiếp theo
        </Button>
      </div>
    </div>
  );
}

export default TableInfor;
