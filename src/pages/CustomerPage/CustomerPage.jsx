import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SideBarCustomer from "../../components/layouts/Sidebar/SidebarCustomer/SideBarCustomer";
import CustomerProfile from "../../components/partial/CustomerProfile/CustomerProfile";
import FlowAccount from "../../components/partial/FlowAccount/FlowAccount";
export default function CustomerPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div>
      <div style={{ height: "90vh", position: "relative", top: "0" }}>
        <div
          style={{
            position: "fixed",
            top: "0",
            height: "100%",
            bottom: "0",
            width: "255px",
            left: "0",
            borderRight: "1px solid #ddd",
            background: "rgba(202, 234, 243, 0.28)",
          }}
        >
          <SideBarCustomer />
        </div>
        <div
          className="fixed top-0 left-64 z-10"
          style={{ width: "calc(100% - 255px)", float: "right" }}
        >
          <AppBar position="static" sx={{ backgroundColor: "black" }}>
            <Toolbar>
              <Link style={{ color: "white" }}>
                <IconButton
                  onClick={handleClick}
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                EduMapper
              </Typography>
              <Box sx={{ display: "flex", gap: "15px" }}>
                <Link
                  onClick={handleClick}
                  color="inherit"
                  underline="none"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <HomeIcon sx={{ mr: 0.5 }} /> Trang chủ
                </Link>
              </Box>
            </Toolbar>
          </AppBar>
        </div>
        <div
          style={{
            overflowY: "hidden",
            float: "right",
            position: "relative",
            width: "calc(100% - 260px)",
            height: "100%",
            maxHeight: "100%",
            marginTop: "69px",
            background: "#f2f2f2"
          }}
          className="p-4 overflow-y-auto"
        >
          <FlowAccount />
          <CustomerProfile />
        </div>
      </div>
    </div>
  );
}
