import clsx from 'clsx';
import styles from './index.module.scss';
import { CreditCard } from '@mui/icons-material';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useState } from 'react';
import { Hoadon } from '~/service';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function PaymentProperty({ setData, infor, thongtinhanhkhach }) {
  const user = useSelector((state) => state.permission.users);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderId, setOrderId] = useState(false);
  const inforData = {
    ...infor,
    orderId: '',
    create_at: '',
  };

  const navigate = useNavigate();

  const handleApprove = () => {
    navigate('/payment');
  };
  const addBill = async (data) => {
    await Hoadon.addHoaDon(data);
  };

  const initialOptions = {
    'client-id':
      'AQZ89OPG9ATq5XBqRifSEUixfHLvNbwXJPyQ1IOJfghXU017_O5tNQo3kcfzuzD7I4wP8KUkXvvjqUAv',
    currency: 'USD',
    components: 'buttons',
  };

  const onError = (data, actions) => {
    setErrorMessage('An error occured with your payment');
  };
  const tongtien = Math.round(infor?.tongtien / 23000);
  // console.log(tongtien);
  const createOrder = (data, actions) => {
    // console.log(tongtien);
    return actions.order
      .create({
        purchase_units: [
          {
            description: 'thanh toán',
            amount: {
              currency_code: 'USD',
              value: tongtien,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderId(orderID);
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      // console.log(details);
      inforData.orderId = details.id;
      inforData.create_at = details.create_time;
      if (Object.keys(user).length === 0) {
        addBill({ ...inforData, thongtinhanhkhach: thongtinhanhkhach });
      } else {
        addBill({
          ...inforData,
          thongtinhanhkhach: thongtinhanhkhach,
          mataikhoan: user.taikhoan.mataikhoan,
        });
      }
      setSuccess(true);
      handleApprove();
    });
  };

  return (
    <div className={clsx(styles.wrapper, 'mx-auto w-50 mt-5')}>
      <div className="">
        <PayPalScriptProvider options={initialOptions}>
          <h4 className="text-center fw-bold text-uppercase mb-5  ">
            Thanh toán quốc tế
          </h4>
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}

export default PaymentProperty;
