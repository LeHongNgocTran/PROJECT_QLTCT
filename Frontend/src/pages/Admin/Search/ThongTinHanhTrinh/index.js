import clsx from 'clsx';
import moment from 'moment';
import styles from './index.module.scss';
import { LocationOn, Person } from '@mui/icons-material';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Hoadon } from '~/service';

function Payment({ prev, data, thongtinhanhkhach, inforTau }) {
  const user = useSelector((state) => state.permission);
  // console.log(data);
  // console.log(inforTau);
  const navigate = useNavigate();

  const handleSubmitChangeTicket = async () => {
    const result = {
      thongtinhanhkhach: data.data.thongtinhanhkhach,
      thongtintau: inforTau,
    };
    const update = await Hoadon.updateBilByUser(data.data._id, result);
    toast.success('Update thành công ', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setTimeout(() => {
      navigate(`/detailsInvoice/${data.data._id}`);
    }, 3000);
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <div className="row">
        <h5 className="text-uppercase fw-bold" style={{ color: '#0f0f8d' }}>
          <Person />
          Người đặt vé
        </h5>
        <table className="table">
          <tbody>
            <tr>
              <td>
                Họ tên:
                <span className="fw-bold">{data.data?.tennguoidatve}</span>
              </td>
              <td>
                Điện thoại: <span className="fw-bold">{data.data?.sodienthoai}</span>
              </td>
            </tr>
            <tr>
              <td>
                Email: <span className="fw-bold">{data.data?.email}</span>
              </td>
              <td>
                Thời gian giữ chỗ: <span className="fw-bold">15 phút</span>
              </td>
            </tr>
            <tr>
              <td>
                Người mua hàng:
                <span className="fw-bold">{data.data?.tennguoimuahang || 'Trống'}</span>
              </td>
              <td>
                Đơn vị xuất hóa đơn :
                <span className="fw-bold">{data.data?.tencongty || 'Trống'}</span>
              </td>
            </tr>
            <tr>
              <td>
                Mã số thuế:{' '}
                <span className="fw-bold">{data.data?.masothue || 'Trống'}</span>
              </td>
              <td>
                Địa chỉ: <span className="fw-bold">{data.data?.diachi || 'Trống'} </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className=" row my-3">
        <h5 className="text-uppercase fw-bold" style={{ color: '#0F0F8D' }}>
          <LocationOn />
          HÀNH TRÌNH {data?.giavetuyentau.diemdi} - {data?.giavetuyentau.diemden}
        </h5>
        <div className={clsx(styles.hanhtrinh)}>
          <table className="table w-100">
            <thead>
              <tr>
                <th>STT</th>
                <th>Hành khách</th>
                <th>CMND/Hộ chiếu</th>
                <th>Tàu</th>
                <th>Ghế ngồi</th>
                <th>Ngày</th>
                <th>Giờ khởi hành</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {thongtinhanhkhach.map((value, index) => {
                // t
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.hoten}</td>
                    <th>{value.cccd}</th>
                    <th>{inforTau?.matau}</th>
                    <th>{value.vitringoi}</th>
                    <th>{moment(inforTau?.thoigiandi).format('DD/MM/YYYY')}</th>
                    <th>{moment(inforTau?.thoigiandi).format('LT')}</th>
                    <th>
                      {Number(value?.gia).toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {data?.loaive === 'Khứ hồi' && (
        <div className="row my-3">
          <h5 className="text-uppercase fw-bold" style={{ color: '#0F0F8D' }}>
            <LocationOn className="me-3" />
            HÀNH TRÌNH {data?.giavetuyentau.diemden} - {data?.giavetuyentau.diemdi}
          </h5>
          <div className={clsx(styles.hanhtrinh)}>
            <table className="table w-100">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hành khách</th>
                  <th>CMND/Hộ chiếu</th>
                  <th>Tàu</th>
                  <th>Ghế ngồi</th>
                  <th>Ngày</th>
                  <th>Giờ khởi hành</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {thongtinhanhkhach.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.hoten}</td>
                      <th>{value.cccd}</th>
                      <th>{data.data?.mataukhuhoi}</th>
                      <th>{value.vitringoikhuhoi}</th>
                      <th>{moment(data.data?.thoigiankhuhoi).format('DD/MM/YYYY')}</th>
                      <th>{moment(data.data?.thoigiankhuhoi).format('LT')}</th>
                      <th>
                        {Number(value?.gia).toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <p className="fw-bold text-end">
        Tổng cộng: &nbsp;
        <span>
          {data.data.tongtien.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      </p>
      <div className="row">
        <Button
          style={{ width: '10%' }}
          className="my-5"
          variant="outlined"
          onClick={prev}
        >
          Trở lại
        </Button>
        <Button
          style={{ width: '10%' }}
          className="ms-auto my-5 me-2"
          variant="contained"
          onClick={handleSubmitChangeTicket}
        >
          Hòan tất
        </Button>
      </div>
    </div>
  );
}

export default Payment;
