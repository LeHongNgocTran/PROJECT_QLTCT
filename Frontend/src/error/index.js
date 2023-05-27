import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center d-flex flex-column justify-content-center my-5">
      <h1 className="text-danger fw-bold">KHÔNG CÓ NỘI DUNG ĐỂ HIỂN THỊ</h1>
      <h4 className="ms-1 mt-3 text-decoration-underline">
        <Link to="/" className="text-underline fw-bold">
          {' '}
          QUAY LẠI TRANG CHỦ
        </Link>
      </h4>
    </div>
  );
}

export default NotFound;
