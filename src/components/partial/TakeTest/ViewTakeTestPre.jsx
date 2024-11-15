import styles from "./Test.module.css";
import { Typography, Button, Grid, Divider, Card, Box } from "@mui/material";
import { Create, MenuBook, Mic } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import Messages from "../../../utils/Message";
import ScheduleSpeaking from "./ScheduleSpeaking";
import { useState } from "react";
import { GetSpeakingTest, StartTest } from "../../../api/TestManageApi";
import { UserRequestSpeaking } from "../../../api/ExamApi";
import StatusCode from "../../../utils/StautsCode";

export default function ViewTakeTestPre() {
  let { testId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openAddSchedule, setOpenAddSchedule] = useState(false);

  const handleOpenAddSchedule = () => setOpenAddSchedule(true);

  const handleCloseAddSchedule = () => setOpenAddSchedule(false);

  const handleAddSchedule = async (newSchedule) => {
    try {
      const exam = await GetSpeakingTest(testId); // Lấy examId từ testId
      console.log(exam?.metaData[0]?.exams[0]?.examId);
      if (!exam) {
        toast.error("Không thể lấy được examId");
        return;
      }
      const examId = exam?.metaData[0]?.exams[0]?.examId;

      const scheduleData = {
        ...newSchedule,
        examId,
      };

      const startTest = {
        examId: examId,
        userId: user.id
      }
      const response = await UserRequestSpeaking(scheduleData)
      await StartTest(startTest)
      const responseJson = await response.json();
      if (responseJson.statusCode == StatusCode.CREATED){
        toast.success('Đặt lịch đến giáo viên thành công')
      }else{
        toast.error(Messages.ERROR.BAD_REQUEST);
      }
    } catch (error) {
      toast.error("Lịch đã được đặt từ trước rồi");
      console.error("Error adding schedule:", error);
    }
  };
  

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
            Premium Test
          </Typography>
          <Typography variant="body1" className={styles.premiumDescription}>
            Chào mừng bạn đến với phần Thi Premium ! Đây là nơi bạn có thể kiểm
            tra kiến thức của mình một cách thú vị và hiệu quả. Với các bài thi
            được thiết kế chuyên nghiệp, bạn sẽ có cơ hội trải nghiệm cảm giác
            như trong một kỳ thi thật sự. Chúng tôi cung cấp nhiều chủ đề khác
            nhau, từ ngữ pháp, từ vựng đến các kỹ năng nghe, nói, đọc, viết.
            Đừng lo lắng nếu bạn chưa hoàn hảo, vì đây là một cơ hội tuyệt vời
            để học hỏi và cải thiện bản thân!
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
              <Typography variant="h6" mb={4}>
                Listening
              </Typography>
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
              <Typography variant="h6" mb={4}>
                Reading
              </Typography>
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
              <Typography variant="h6" mb={4}>
                Writing
              </Typography>
              {user?.currentMembership == "Premium Plus Package" && (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ background: "#f29d38" }}
                  className={styles.testButton}
                  onClick={() => navigate(`/writing-test/${testId}`)}
                >
                  Take Test
                </Button>
              )}
              {user?.currentMembership == "Premium Package" && (
                <Button
                  variant="contained"
                  disabled
                  className={styles.testButton}
                  style={{ fontWeight: "bold" }}
                >
                  👑 Premium Plus Test
                </Button>
              )}
            </Card>
          </Grid>

          {/* Speaking */}
          <Grid item xs={6} sm={3}>
            <Card className={styles.testCard}>
              <Mic className={styles.icon4} />
              <Typography variant="h6" mb={4}>
                Speaking
              </Typography>
              {user?.currentMembership == "Premium Plus Package" && (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ background: "#ea3ef7" }}
                  className={styles.testButton}
                  onClick={() => handleOpenAddSchedule()}
                >
                  Take Test
                </Button>
              )}
              {user?.currentMembership == "Premium Package" && (
                <Button
                  variant="contained"
                  disabled
                  className={styles.testButton}
                  style={{ fontWeight: "bold" }}
                >
                  👑 Premium Plus Test
                </Button>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>

      {user?.currentMembership != "Premium Plus Package" && (
        <Box className={styles.eduMapperSection}>
          <Typography variant="h6" className={styles.eduMapperTitle}>
            Trải nghiệm trọn vẹn các đặc quyền từ{" "}
            <span className={styles.eduMapperBrand}>EduMapper</span>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Trọn bộ 4 kỹ năng
          </Typography>
          <Box className={styles.upgradeImageContainer}>
            <img
              src="/img/Img-Ad.png"
              alt="IELTS"
              className={styles.upgradeImage}
            />
          </Box>
          <Button
            variant="contained"
            color="success"
            className={styles.upgradeButton}
            onClick={() => navigate("/package")}
          >
            Nâng cấp lên Premium Plus
          </Button>
        </Box>
      )}
      {user?.currentMembership == "Premium Plus Package" && (
        <Box className={styles.eduMapperSection}>
          <Typography variant="h6" className={styles.eduMapperTitle}>
            Full đặc quyền{" "}
            <span className={styles.eduMapperBrand}>EduMapper</span>
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            mt={1}
            fontWeight={600}
          >
            Trọn bộ 4 kỹ năng
          </Typography>
          <Box className={styles.upgradeImageContainer}>
            <img
              src="https://tailieutoeic.com/wp-content/uploads/2020/08/unnamed.png"
              alt="IELTS"
              className={styles.upgradeImage}
            />
          </Box>
        </Box>
      )}
      <ScheduleSpeaking
        open={openAddSchedule}
        onClose={handleCloseAddSchedule}
        onAdd={handleAddSchedule}
      />
    </div>
  );
}
