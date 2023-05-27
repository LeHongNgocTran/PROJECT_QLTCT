import DefaultHeader from './DefaultHeader/DefaultHeader';
import clsx from 'clsx';
import styles from './defaultLayout.module.scss';
import DefaultFooter from './defaultFooter/defaultFooter';
import { useRef } from 'react';
function defaultLayout({ children }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const footerRef = useRef(null);
  return (
    <div className={clsx(styles.wrapper)}>
      {' '}
      <DefaultHeader footerRef={footerRef} />
      <div className={clsx(styles.container)}>{children}</div>
      <footer>
        {' '}
        <DefaultFooter ref={footerRef} />
      </footer>
    </div>
  );
}

export default defaultLayout;
