import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import useAuth from "../../hooks/useAuth";
import { ResponsePayment } from "../../api/PaymentApi";
import { toast } from "react-toastify";
import StatusCode from "../../utils/StautsCode";
import Messages from "../../utils/Message";

function WaitingCheckout() {
  const { user } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState("pending");

  useEffect(() => {
    const queryParams = window.location.search;
    const urlParams = new URLSearchParams(queryParams);

    const vnp_OrderInfo = urlParams.get("vnp_OrderInfo");
    const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");
    const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");

    const pos_orderCode = urlParams.get("orderCode");
    const pos_status = urlParams.get("status");

    const processPayment = async () => {
      let data = null;
      let isSuccess = false;

      if (vnp_OrderInfo && vnp_ResponseCode && vnp_TransactionNo) {
        // Xử lý thanh toán VNPAY
        isSuccess = vnp_ResponseCode === "00";
        data = {
          userId: user?.id,
          transactionInfo: vnp_OrderInfo,
          transactionNumber: vnp_TransactionNo,
          isSuccess,
        };
      } else if (pos_orderCode && pos_status) {
        // Xử lý thanh toán PAYOS
        isSuccess = !(pos_status === "CANCELLED");
        data = {
          userId: user?.id,
          transactionInfo: isSuccess ? "Mua thành công" : "Mua thất bại",
          transactionNumber: pos_orderCode,
          isSuccess,
        };
      }

      const status = isSuccess ? "success" : "fail";

      if (data && user?.id) {
        try {
          const postMethod = await ResponsePayment(data);
          if (postMethod.ok) {
            const responseData = await postMethod.json();
            if (responseData.statusCode === StatusCode.CREATED) {
              if (isSuccess) {
                window.location.href = "/";
              } else {
                toast.error(Messages.ERROR.PAYMENT);
              }
            } else {
              console.log(responseData.message);
            }
          } else {
            console.log("There was an error processing");
          }
        } catch (error) {
          console.error(error);
          toast.error("An unexpected error occurred");
        }
      }

      setPaymentStatus(status);
    };

    processPayment();
  }, [user]);

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      {paymentStatus === "success" && (
        <Box className="status-payment">
          <Alert
            severity="success"
            style={{ fontSize: "35px", display: "flex", alignItems: "center" }}
          >
            Thanh toán thành công
          </Alert>
        </Box>
      )}

      {paymentStatus === "fail" && (
        <Box className="status-payment">
          <Alert
            severity="error"
            style={{ fontSize: "35px", display: "flex", alignItems: "center", textAlign: "center"}}
          >
            Thanh toán thất bại
          </Alert>
        </Box>
      )}

      <Box className="buttonLoading" marginTop={4}>
        <Box className="buttonItem" marginBottom={2}>
          <Link to="/">
            <Button variant="contained">Về trang chủ</Button>
          </Link>
        </Box>
        <Box className="buttonItem">
          <Link to="/package">
            <Button variant="contained">Về trang mua gói</Button>
          </Link>
        </Box>
      </Box>
      <CircularProgress sx={{ marginTop: "50px" }} />
    </Container>
  );
}

export default WaitingCheckout;
