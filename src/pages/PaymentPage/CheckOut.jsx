import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { MDBCardText, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Favorite } from "@mui/icons-material";
import { CreatePayment } from "../../api/PaymentApi";
import useAuth from "../../hooks/useAuth";
import HeaderCheckout from "../../components/layouts/Layouts_Payment/HeaderCheckout";
import FooterCheckOut from "../../components/layouts/Layouts_Payment/FooterCheckout";
import { formatPrice } from "../../utils/FormatPrice";
import StatusCode from "../../utils/StautsCode";
import Messages from "../../utils/Message";

const generateRandomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const Checkout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [captchaCode, setCaptchaCode] = useState(generateRandomCode());
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [memberShipBuy, setMemberShipBuy] = useState({});
  const [methodPayment, setMethodPayment] = useState("");

  const handleChange = (event) => {
    setMethodPayment(event.target.value);
  };

  const handleCaptchaChange = (e) => {
    setUserCaptchaInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userCaptchaInput !== captchaCode) {
      toast.error(Messages.ERROR.CAPTCHA);
      setCaptchaCode(generateRandomCode());
      setUserCaptchaInput("");
      return;
    }
    if (methodPayment == "" || methodPayment == undefined) {
      toast.error(Messages.ERROR.CHOOSE_PAYMENT);
      return;
    }
    //localStorage.setItem("memberShipBuy", JSON.stringify(memberShipBuy));
    const formBuyCoin = {
      userId: user?.id,
      paymentMethod: methodPayment,
      memberShipId: memberShipBuy?.memberShipId,
    };
    try {
      const response = await CreatePayment(formBuyCoin);
      if (response.status == StatusCode.CREATED) {
        const responseData = await response.json();
        if (responseData.statusCode == StatusCode.CREATED && methodPayment == "PAYOS") {
          window.location.replace(responseData.metaData.checkoutUrl);
        }else if (responseData.statusCode == StatusCode.CREATED && methodPayment == "Vnpay"){
          window.location.replace(responseData.metaData);
        } else {
          toast.error(responseData.message);
        }
      } else {
        toast.error("Bạn hiện đang sở hữu một gói trong tài khoản");
      }
    } catch (error) {
      console.log("Network error" + error);
    }
  };
  useEffect(() => {
    const test = location.state; // Trích xuất state từ location
    setMemberShipBuy(test);
  }, [location.state]);
  return (
    <div>
      <HeaderCheckout />
      <Box
        sx={{
          background: "#333333",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          paddingBottom: "24px",
          color: "#fff",
        }}
      >
        <Container>
          <Typography variant="h3" gutterBottom>
            Thông tin hóa đơn{" "}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Vui lòng kiểm tra kỹ thông tin trước khi thanh toán
          </Typography>
        </Container>
      </Box>
      <Container style={{ maxWidth: "1300px" }}>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "40px" }}>
          <form className="checkout-meta donate-page" onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom>
                  Hóa đơn chi tiết
                </Typography>
                <List>
                  <React.Fragment>
                    <ListItem
                      alignItems="flex-start"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0px",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={"/img/memberShip.png"}
                          alt="Coin buy"
                          variant="square"
                          style={{
                            width: "100px",
                            height: "100px",
                            marginRight: "20px",
                          }}
                        />
                      </ListItemAvatar>
                      <Box flexGrow={1}>
                        <ListItemText
                          primary={"Gói " + memberShipBuy?.memberShipName}
                          secondary={
                            <>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="span"
                              >
                                Số lượng: 1 gói
                              </Typography>
                              <br />
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="span"
                              >
                                Giá tiền:{" "}
                                {formatPrice(memberShipBuy?.price) || "0"}
                              </Typography>
                            </>
                          }
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        style={{ marginLeft: "20px" }}
                      >
                        Số lượng: 1 gói
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ marginLeft: "20px" }}
                      >
                        Giá tiền: {formatPrice(memberShipBuy?.price) || "0"}
                      </Typography>
                      <IconButton
                        edge="end"
                        aria-label="favorite"
                        style={{ marginLeft: "20px" }}
                      >
                        <Favorite />
                      </IconButton>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                </List>
                <MDBRow
                  style={{ justifyContent: "space-between", height: "50px" }}
                >
                  <MDBCol sm="3" style={{ margin: "auto 0" }}>
                    <MDBCardText>Tên người mua: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7" style={{ margin: "auto 0" }}>
                    <MDBCardText className="text-muted font-bold">
                      {user?.fullName}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <MDBRow
                  style={{ justifyContent: "space-between", height: "50px" }}
                >
                  <MDBCol sm="3" style={{ margin: "auto 0" }}>
                    <MDBCardText>Giới tính: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7" style={{ margin: "auto 0" }}>
                    <MDBCardText className="text-muted font-bold">
                      {user?.gender == "male" ? "nam" : "nữ"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <MDBRow
                  style={{ justifyContent: "space-between", height: "50px" }}
                >
                  <MDBCol sm="3" style={{ margin: "auto 0" }}>
                    <MDBCardText>Địa chỉ email: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7" style={{ margin: "auto 0" }}>
                    <MDBCardText className="text-muted font-bold">
                      {user?.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <MDBRow
                  style={{ justifyContent: "space-between", height: "50px" }}
                >
                  <MDBCol sm="3" style={{ margin: "auto 0" }}>
                    <MDBCardText>Số điện thoại: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7" style={{ margin: "auto 0" }}>
                    <MDBCardText className="text-muted font-bold">
                      {user?.phoneNumber}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>

                <Typography
                  variant="h6"
                  gutterBottom
                  marginTop={2}
                  style={{ marginLeft: "7px" }}
                >
                  Nhập mã dưới đây để tránh robot
                </Typography>
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      padding: "10px 20px",
                      marginTop: "10px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "5px",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      letterSpacing: "0.1em",
                      marginRight: "10px",
                    }}
                  >
                    {captchaCode}
                  </Box>
                  <TextField
                    required
                    label="Điền mã CAPTCHA"
                    variant="outlined"
                    onChange={handleCaptchaChange}
                    value={userCaptchaInput}
                    margin="normal"
                  />
                </Box>
              </Grid>
              <Grid item md={4} justifyContent="center">
                <Paper
                  elevation={3}
                  style={{
                    padding: "20px",
                    width: "90%",
                    background: "white",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "black",
                    borderRadius: "8px",
                    marginLeft: "25px",
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{ color: "black", marginBottom: "15px" }}
                  >
                    Cart Total
                  </Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Số lượng gói: </Typography>
                    <Typography>1 gói</Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    marginTop={2}
                    borderBottom="1px solid #e0e0e0"
                    paddingBottom={3}
                  >
                    <Typography>Tổng cộng (đã gồm thuế VAT):</Typography>
                    <Typography>
                      {formatPrice(memberShipBuy?.price) || "0 VND"}
                    </Typography>
                  </Box>
                  <Typography
                    className="mb-2"
                    variant="h6"
                    marginTop={2}
                    style={{ color: "black" }}
                  >
                    Payment Method
                  </Typography>
                  <RadioGroup
                    name="paymentMethod"
                    onChange={handleChange}
                    sx={{
                      marginBottom: "25px",
                      borderBottom: "1px solid #e0e0e0",
                      paddingBottom: "20px",
                    }}
                  >
                    <FormControlLabel
                      value="Vnpay"
                      control={<Radio />}
                      label={
                        <Box display="flex" alignItems="center">
                          <img
                            className="me-2"
                            width="30px"
                            style={{ height: "25px" }}
                            src="https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/cong-ty-cp-giai-phap-thanh-toan-viet-nam-vnpay-6194ba1fa3d66.jpg"
                            alt="VNPay logo"
                          />
                          VNPay
                        </Box>
                      }
                      style={{ color: "black", marginBottom: "25px" }}
                    />
                    <FormControlLabel
                      value="PAYOS"
                      control={<Radio />}
                      label={
                        <Box display="flex" alignItems="center">
                          <img
                            className="me-2"
                            width="30px"
                            style={{ height: "25px" }}
                            src="https://payos.vn/docs/img/logo.svg"
                            alt="PayOS logo"
                          />
                          PayOS
                        </Box>
                      }
                      style={{ color: "black" }}
                    />
                  </RadioGroup>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Thanh toán
                  </Button>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid black",
                      height: "35px",
                      marginTop: "25px",
                      borderRadius: "4px",
                    }}
                  >
                    <img
                      className="me-2"
                      width="90px"
                      style={{ height: "25px" }}
                      src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png"
                      alt="PayPal acceptance mark"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid black",
                      height: "35px",
                      marginTop: "25px",
                      borderRadius: "4px",
                    }}
                  >
                    <img
                      className="me-2"
                      width="90px"
                      style={{ height: "24px" }}
                      src="https://payos.vn/docs/img/logo.svg"
                      alt="PayPal acceptance mark"
                    />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <FooterCheckOut />
    </div>
  );
};

export default Checkout;
