import { useState, useEffect } from "react";
import styles from "./HeaderTesting.module.css";
import { toast } from "react-toastify";
import {
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HeaderTesting = (pros) => {
  const { handleSubmit, timeRemaining, setTimeRemaining } = pros;
  const navigate = useNavigate();
  const [showExitModal, setShowExitModal] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [handleSubmit, setTimeRemaining]);

  useEffect(() => {
    // Cảnh báo khi còn 30 phút
    if (timeRemaining === 1200) {
      toast.warning("Còn 20 phút nữa là hết giờ!");
    }
    // Cảnh báo khi còn 10 phút
    if (timeRemaining === 600) {
      toast.warning("Còn 10 phút nữa là hết giờ!");
    }
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleExitConfirm = () => {
    setShowExitModal(false);
    navigate('/')
  };

  const toggleExitModal = () => setShowExitModal(!showExitModal); // Hàm đóng/mở modal

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <img src="/img/logoEdu.png" alt="Edu Mapper Logo" />
      </div>
      <div className={styles.timer}>
        {formatTime(timeRemaining)} minutes remaining
      </div>
      <div className={styles.actions}>
        <Button
          variant="brand"
          className={styles.exitTest}
          onClick={() => setShowExitModal(true)}
        >
          Exit Test
        </Button>
        <Button
          variant="contained"
          color="success"
          className={styles.submit}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <MDBModal open={showExitModal} setShow={setShowExitModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Xác nhận thoát</MDBModalTitle>
              <Button
                className="btn-close"
                color="none"
                onClick={toggleExitModal}
              >X</Button>
            </MDBModalHeader>
            <MDBModalBody>Bạn có chắc chắn muốn thoát không?</MDBModalBody>
            <MDBModalFooter>
              <Button className={styles.exitTest}  onClick={toggleExitModal}>
                Hủy
              </Button>
              <Button className={styles.submit} onClick={handleExitConfirm}>
                Đồng ý
              </Button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default HeaderTesting;
