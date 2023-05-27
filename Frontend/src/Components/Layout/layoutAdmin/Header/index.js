import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

import { useDispatch, useSelector } from 'react-redux';

import { logout } from '~/reducer/Permission';
import { useNavigate } from 'react-router-dom';

import { Button, MenuItem, Menu, Avatar, Tooltip, IconButton } from '@mui/material';
import {
  AccountCircleOutlined,
  ChatBubble,
  ExitToApp,
  Notifications,
  Settings,
} from '@mui/icons-material';
import { TaiKhoan } from '~/service';

function HeaderAdmin() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    navigate('/');
  };
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const user = useSelector((state) => state.permission.users);
  useEffect(() => {
    const fetchData = async () => {
      const documents = await TaiKhoan.getDetailsUser({ id: user._id });
      setData(documents);
    };
    fetchData().catch(console.error);
  }, []);
  // console.log(data);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <div className="d-flex flex-row w-100 justify-content-end">
        <Tooltip title="Thông báo">
          <IconButton>
            <Notifications color="primary" style={{ cursor: 'pointer' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Tin nhắn">
          <IconButton>
            <ChatBubble color="primary" style={{ cursor: 'pointer' }} />
          </IconButton>
        </Tooltip>
        <div className={clsx(styles.avatar)}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Avatar
              alt="Remy Sharp"
              src={
                data?.image === ''
                  ? 'https://superdong.com.vn/wp-content/themes/supperdong/img/logo.svg'
                  : data?.image
              }
            />
          </Button>
          <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem className="py-2 mb-2 border-bottom" onClick={handleClose}>
              <Avatar
                alt="avatar12"
                src={
                  data?.image === ''
                    ? 'https://superdong.com.vn/wp-content/themes/supperdong/img/logo.svg'
                    : data?.image
                }
              />
              <p className="fw-bold ms-2 p-1 mt-2 text-success ">{data?.name}</p>
            </MenuItem>
            <MenuItem
              className="py-2"
              onClick={() => {
                navigate('/thongtinnhanvien');
                handleClose();
              }}
            >
              <AccountCircleOutlined /> &nbsp;Thông tin nhân viên
            </MenuItem>
            <MenuItem className="py-2" onClick={handleClose}>
              <Settings></Settings> &nbsp; Đổi mật khẩu
            </MenuItem>
            <MenuItem className="py-3 border-top text-danger" onClick={handleLogOut}>
              <ExitToApp /> &nbsp; Đăng xuất
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default HeaderAdmin;

// export default App;
