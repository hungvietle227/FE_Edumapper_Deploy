import { Grid, Typography, Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { GetResultExam } from "../../../api/ExamApi";
import InventoryIcon from "@mui/icons-material/Inventory";

const totalQuestions = 40;
const maxTime = "60:00";

const TestResult = () => {
  const { examId } = useParams();
  const { user } = useAuth();
  const [dataResult, setDataResult] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await GetResultExam(user.id, examId);
        const data = await response.json();
        const result = data.metaData;
        setDataResult(result);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };
    fetchResult();
  }, [examId, user]);

  return (
    <Container style={{ marginBottom: "3rem", marginTop: "3rem"}}>
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ textAlign: "center" }}
    >
      <Typography variant="h4" sx={{ margin: "10px 0" }}>
        Kết quả bài thi
      </Typography>

      {/* Phần kết quả */}
      <Grid container spacing={2} justifyContent="center" mb={2}>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ marginBottom: 1 }}>
              Tổng điểm
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {dataResult?.score}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ marginBottom: 1 }}>Đáp án đúng</Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {dataResult?.totalCorrect}/{totalQuestions}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ marginBottom: 1 }}>
              Thời gian làm bài
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {dataResult?.time?.slice(3, 8)} / {maxTime}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Phần đáp án */}
      <Typography
        variant="h6"
        sx={{ textAlign: "left", fontWeight: "bold", marginBottom: 3 }}
      >
        Đáp án chi tiết
      </Typography>

      <Grid container spacing={2}>
        {dataResult && dataResult?.answers && dataResult?.answers?.length === 0 && (
          <Box style={{width: "100%", textAlign: "center", height: "38vh"}}>
            <InventoryIcon />
            Không có câu trả lời
          </Box>
        )}

        {/* Khung chứa các đáp án với cuộn khi quá 8 items */}
        <Grid item xs={12} style={{ maxHeight: "500px", overflowY: "auto" }}>
          <Grid container spacing={2}>
            {dataResult &&
              dataResult?.answers?.map((section, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box
                    sx={{
                      backgroundColor: section.isCorrect ? "#e8f5e9" : "#ffebee",
                      padding: 2,
                      borderRadius: 2,
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                      marginBottom: 2,
                      display: "flex", 
                      flexDirection: "column", 
                      height: "100%", 
                    }}
                  >
                    <Typography textAlign={"justify"} variant="body1">
                      <b>Câu {section.questionIndex}:</b> {section.questionText}
                    </Typography>
                    <Typography textAlign={"left"} variant="body2" sx={{ marginTop: 2, fontSize: "1rem" }}>
                      <b className="text-base">Đáp án là:{" "}</b>
                        {section.correctAnswer}
                    </Typography>
                    <Typography textAlign={"left"} variant="body2" sx={{ marginTop: 2, fontSize: "1rem"  }}>
                      <b>Câu trả lời của bạn:{" "}</b>
                        {section.userChoice == null ? "None" : section.userChoice}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: section.isCorrect ? "#2e7d32" : "#d32f2f",
                        textAlign: "right",
                        marginTop: "auto",
                      }}
                    >
                      {section.isCorrect ? "✔" : "✘"}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Container>
  );
};

export default TestResult;
