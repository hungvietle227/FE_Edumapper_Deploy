// src/App.js
import ScoreBoard from "./ScoreBoard";
import styles from "./Test.module.css";
import {
  Typography,
  Button,
  Grid,
  Divider,
  Card,
  Box,
} from "@mui/material";
import { Create, MenuBook, Mic } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { toast } from "react-toastify";

export default function ViewTakeTestPre() {
  let { testId } = useParams();
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {/* Top Section with Image and Text */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        className={styles.topSection}
      >
        <Grid item xs={12} md={3}>
          <img
            src="/img/test-pre.png" // Update the image path
            alt="Illustration"
            className={styles.topImage}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="h4" mb={2} className={styles.premiumTitle}>
            Premium plus test
          </Typography>
          <Typography variant="body1" className={styles.premiumDescription}>
            Chào mừng bạn đến với phần Thi Premium ! Đây là nơi bạn có thể kiểm tra
            kiến thức của mình một cách thú vị và hiệu quả. Với các bài thi được
            thiết kế chuyên nghiệp, bạn sẽ có cơ hội trải nghiệm cảm giác như
            trong một kỳ thi thật sự. Chúng tôi cung cấp nhiều chủ đề khác nhau,
            từ ngữ pháp, từ vựng đến các kỹ năng nghe, nói, đọc, viết. Đừng lo
            lắng nếu bạn chưa hoàn hảo, vì đây là một cơ hội tuyệt vời để học
            hỏi và cải thiện bản thân!
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      {/* Testing Section */}
      <Typography mt={4} mb={2} variant="h5" className={styles.testingTitle}>
        TESTING
      </Typography>
      <Box className={styles.root}>
        <Grid container spacing={2} justifyContent="center">
          {/* Listening */}
          <Grid item xs={6} sm={3}>
            <Card className={styles.testCard}>
              <HeadphonesIcon className={styles.icon} />
              <Typography variant="h6" mb={4}>Listening</Typography>
              <Button
                variant="contained"
                style={{ background: "#73fbfd" }}
                className={styles.testButton}
                onClick={() => navigate(`/listening-test/${testId}`)}
              >
                Take Test
              </Button>
            </Card>
          </Grid>

          {/* Reading */}
          <Grid item xs={6} sm={3}>
            <Card className={styles.testCard}>
              <MenuBook className={styles.icon2} />
              <Typography variant="h6" mb={4}>Reading</Typography>
              <Button
                variant="contained"
                color="secondary"
                style={{ background: "#73fd91" }}
                className={styles.testButton}
                onClick={() => navigate(`/reading-test/${testId}`)}
              >
                Take Test
              </Button>
            </Card>
          </Grid>

          {/* Writing */}
          <Grid item xs={6} sm={3}>
            <Card className={styles.testCard}>
              <Create className={styles.icon3} />
              <Typography variant="h6" mb={4}>Writing</Typography>
              <Button
                variant="contained"
                color="secondary"
                style={{ background: "#f29d38" }}
                className={styles.testButton}
                onClick={() => navigate(`/writing-test/${testId}`)}
              >
                Take Test
              </Button>
            </Card>
          </Grid>

          {/* Speaking */}
          <Grid item xs={6} sm={3}>
            <Card className={styles.testCard}>
              <Mic className={styles.icon4} />
              <Typography variant="h6" mb={4}>Speaking</Typography>
              <Button
                variant="contained"
                color="secondary"
                style={{ background: "#ea3ef7" }}
                className={styles.testButton}
                onClick={() => toast.success('Đặt lịch thành công. Bạn vui lòng chờ mail của mình để nhận thông báo')}
              >
                Take Test
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
      {/* Scoreboard Table */}
      <ScoreBoard />

      {/* Refresh Button */}
      <div className={styles.refreshButton}>
        <Button variant="contained" color="secondary">
          Làm mới
        </Button>
      </div>
    </div>
  );
}
