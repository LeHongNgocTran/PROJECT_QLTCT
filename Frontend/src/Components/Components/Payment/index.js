import { useSelector } from 'react-redux';
import NotFound from '~/error';

function PaymentNotification() {
  const user = useSelector((state) => state.permission.users);
  return (
    <div>
      <div className="container">
        <h3 className="fw-bold text-center text-danger py-5 text-uppercase">
          Thanh toán thành công. Vui lòng đợi nhận mail của chúng tôi
        </h3>
      </div>
    </div>
  );
}

export default PaymentNotification;
