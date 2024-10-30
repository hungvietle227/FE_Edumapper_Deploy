import * as React from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
// import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from "@mui/icons-material/Logout";
// import useAuth from '../../../../hooks/useAuth';
import { green } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";
// import { Logout } from '../../../../api/AuthenApi';
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { Logout } from "../../../../api/AuthenApi";
import SettingsIcon from "@mui/icons-material/Settings";
// const baseUrl = import.meta.env.VITE_API_HOST;
export default function ProfileMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user, logout } = useAuth();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = () => {
    if (user?.roleName == "Administrator") {
        setAnchorEl(null);
        navigate('/dashboard')
    } else if (user?.roleName == "Tutor") {
        setAnchorEl(null);
        navigate('/home-tutor')
    } else {
        setAnchorEl(null);
        navigate('/personal-profile')
    }
  };

  const handleClickLogout = async () => {
    if (user?.roleName == "Administrator") {
      await logout();
      navigate("/");
    }
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await Logout(refreshToken);
    if (response.ok) {
      await logout();
      navigate("/");
    }
  };
  const handleMove = () => {
    if (user?.roleName == "Customer") {
        navigate('/customer-transaction')
    } else {
        setAnchorEl(null);
    }
  };
  return (
    <div>
      <Tooltip style={{ marginLeft: "0" }} title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            alt={"Nothing"}
            src={`${user.avatar || "/img/logoEdu"}`}
            sx={{ width: 60, height: 60 }}
          ></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
          boxShadow: "0px 2px 8px rgba(0,0,0,0.32)",
          mt: 1.5,
          overflow: "visible",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <a style={{ display: "flex", borderBottom: ".5px solid #f0f0f0" }}>
            <img
              src={`${user.avatar || "/img/logoEdu"}`}
              style={{ width: "55px", height: "55px", marginRight: "10px" }}
              onError={(e) => {
                e.currentTarget.src = "/img/logoEdu.png";
              }}
            ></img>
            <div style={{ marginBottom: "5px" }}>
              <h4>{user.fullname}</h4>
              <p>
                <b>ID:</b> {user.email}
              </p>
              <p>
                <b>Vai trò:</b> {user.roleName}
              </p>
            </div>
          </a>
        </MenuItem>
        <MenuItem sx={{ gap: "13px" }} onClick={handleNavigate}>
          <Avatar sx={{ bgcolor: green[500] }} style={{ marginLeft: "12px" }}>
            <AssignmentIcon />
          </Avatar>{" "}
          Trang quản lý của tôi
        </MenuItem>
        <Divider />
        {user?.roleName == "Customer" && (
          <MenuItem onClick={handleMove}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Lịch sử giao dịch
          </MenuItem>
        )}
        <MenuItem onClick={handleClickLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </div>
  );
}
