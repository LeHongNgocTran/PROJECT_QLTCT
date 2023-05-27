import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './index.module.scss';

import clsx from 'clsx';
function PopUp({
  content,
  error,
  searchTuyenTau = false,
  register = false,
  show = false,
  onHide = () => {},
  messageSuccess,
  messageError,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={clsx(styles.wrapper)}
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Thông báo</Modal.Title>
      </Modal.Header> */}
      <Modal.Body className={clsx(styles.container)}>
        {error === true ? (
          <div className={clsx(styles.icon)}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
              alt="Fail"
            />
          </div>
        ) : (
          <div className={clsx(styles.icon)}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4436/4436481.png"
              alt="check"
            ></img>
          </div>
        )}
        <div className="text-center">
          <p className="fw-bold fs-5 p-0">{content}</p>
          {register === true && error === true ? (
            <p className="text-danger">{messageError}</p>
          ) : (
            <p className="fw-bold">{messageSuccess}</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="m-auto"
          style={{ backgroundColor: '#3085D6' }}
          onClick={onHide}
        >
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PopUp;
