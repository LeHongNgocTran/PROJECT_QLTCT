import clsx from 'clsx';
import styles from './sidebar.module.scss';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {
  Assessment,
  BookOnlineOutlined,
  CalendarMonth,
  ConfirmationNumberOutlined,
  DirectionsBoat,
  DirectionsBoatOutlined,
  House,
  Person,
  Receipt,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
function SideBar() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const user = useSelector((state) => state.permission.users);
  return (
    <div className={clsx(styles.wrapper)}>
      <Sidebar
        className="fw-bold"
        style={{ height: '100vh', color: 'gray', fontSize: '1rem' }}
      >
        <div className="d-flex flex-row justify-content-center ">
          <img
            className="d-block w-50 mt-4 mb-3"
            src="https://superdong.com.vn/wp-content/themes/supperdong/img/logo.svg"
            alt="Logo"
          />
        </div>
        <Menu>
          <MenuItem
            component={<Link to="/dashboard" />}
            icon={<House sx={{ color: '#1C6DD0' }} />}
          >
            Tổng quan
          </MenuItem>
          <SubMenu
            label="Quản lý hóa đơn"
            icon={<ConfirmationNumberOutlined sx={{ color: '#1C6DD0' }} />}
            className={clsx(styles.menu)}
            defaultOpen={true}
          >
            <MenuItem
              component={<Link to="/inforcustomer" />}
              icon={<Receipt sx={{ color: '#1C6DD0' }} />}
            >
              Quản lý hóa đơn
            </MenuItem>
            <MenuItem
              icon={<BookOnlineOutlined sx={{ color: '#1C6DD0' }} />}
              component={<Link to="/banve" />}
            >
              Bán vé tại quầy
            </MenuItem>
          </SubMenu>
          {user.permission === 1 && (
            <SubMenu
              label="Quản lý Tài Khoản"
              icon={<Person sx={{ color: '#1C6DD0' }} />}
              className={clsx(styles.menu)}
              defaultOpen={true}
              open={true}
            >
              <MenuItem
                component={<Link to="/customer" />}
                icon={<Person sx={{ color: '#1C6DD0' }} />}
              >
                Quản lý Người Dùng
              </MenuItem>
              <MenuItem
                component={<Link to="/staff" />}
                icon={<Person sx={{ color: '#1C6DD0' }} />}
              >
                Quản lý Nhân Viên
              </MenuItem>
            </SubMenu>
          )}

          <MenuItem
            icon={<DirectionsBoatOutlined sx={{ color: '#1C6DD0' }} />}
            component={<Link to="/quanlytuyentau" />}
          >
            Quản lý Tuyến Tàu
          </MenuItem>
          {user.permission === 1 && (
            <MenuItem
              icon={<DirectionsBoat sx={{ color: '#1C6DD0' }} />}
              component={<Link to="/quanlytau" />}
            >
              Quản lý Tàu
            </MenuItem>
          )}
          <MenuItem
            icon={<Assessment sx={{ color: '#1C6DD0' }} />}
            component={<Link to="/thongke" />}
          >
            Thống kê
          </MenuItem>
          {user.permission === 1 && (
            <MenuItem
              component={<Link to="/quanlylichtrinh" />}
              icon={<CalendarMonth sx={{ color: '#1C6DD0' }} />}
            >
              {' '}
              Quản lý lịch trình
            </MenuItem>
          )}
          <MenuItem
            onClick={() => collapseSidebar()}
            className={clsx(styles.bottom)}
            icon={
              collapsed ? (
                <FontAwesomeIcon icon={faAngleLeft} color="#1C6DD0" />
              ) : (
                <FontAwesomeIcon icon={faAngleRight} color="#1C6DD0" />
              )
            }
          >
            Thu gọn
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default SideBar;
