import clsx from 'clsx';
import styles from './index.module.scss';
import SideBar from './Sidebar/sidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import HeaderAdmin from './Header';
function layoutAdmin({ children }) {
  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.sidebar)}>
        <ProSidebarProvider>
          <SideBar />
        </ProSidebarProvider>
      </div>
      <div className={clsx(styles.children)}>
        <div className={clsx(styles.header)}>
          <HeaderAdmin />
        </div>
        <div className={clsx(styles.container)}>{children}</div>
      </div>
    </div>
  );
}

export default layoutAdmin;
