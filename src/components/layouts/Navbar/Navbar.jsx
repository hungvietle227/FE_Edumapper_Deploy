import style from "./style.module.css";
import { Stack } from "@mui/material";
import { useState } from "react";
import BasicMenu from "./DropdownAva";
import useAuth from "../../../hooks/useAuth";
import NotifyBell from "../../partial/HomePage/Notification/Notification";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user } = useAuth();
  return (
    <div className={style.main}>
      <div>
        <Stack spacing={2} direction="row">
          <NotifyBell />
        </Stack>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {user?.roleName != "Administrator" && (
            <BasicMenu
              anchorEl={anchorEl}
              handleClick={handleClick}
              handleClose={handleClose}
            >
              <img
                src="/img/avatar.png"
                alt="avatar"
                style={{
                  borderRadius: "50%",
                  border: "1px solid white",
                  cursor: "pointer",
                  width: "44px",
                  height: "44px",
                }}
              />
            </BasicMenu>
          )}
          {user?.roleName == "Administrator" && (
            <BasicMenu
              anchorEl={anchorEl}
              handleClick={handleClick}
              handleClose={handleClose}
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                style={{
                  borderRadius: "50%",
                  border: "1px solid white",
                  cursor: "pointer",
                  width: "44px",
                  height: "44px",
                }}
              />
            </BasicMenu>
          )}
          <span>{user?.roleName != "Administrator" ? user?.fullname : "Administrator"}</span>
        </div>
      </div>
    </div>
  );
}
