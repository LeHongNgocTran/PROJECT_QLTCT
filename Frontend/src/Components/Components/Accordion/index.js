import styles from './Accordion.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

function Accordion({ key, name, address, phone, hotline, email }) {
  const [show, setShow] = useState(false);

  const handleAccordion = () => {
    setShow(!show);
  };
  return (
    <div key={key} className={clsx(styles.accordion)} onClick={handleAccordion}>
      <div className={clsx('d-flex flex-column', styles.accordion_item)}>
        <div className={clsx(styles.accordion_title, 'd-flex')}>
          <div className={clsx(styles.accordion_title, 'flex-grow-1')}>
            {name}
            {/* Trụ sợ chính ở phú quốc */}
          </div>
          <div>{show ? '-' : '+'}</div>
        </div>
        {show === true && (
          <div className={clsx(styles.accordion_content)}>
            <p>Địa chỉ :{address}</p>
            <p>SĐT: {phone}</p>
            {hotline != null && <p>Hotline: {hotline}</p>}
            {email != null && <p>Email: {email}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Accordion;
