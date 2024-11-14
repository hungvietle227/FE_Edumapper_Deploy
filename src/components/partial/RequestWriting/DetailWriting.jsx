import { Modal, Box, Typography, Grid, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetAnswerWritingById } from "../../../api/TestManageApi";
import { MDBTextArea } from "mdb-react-ui-kit";
import { ScoreWriting } from "../../../api/ExamApi";
import StatusCode from "../../../utils/StautsCode";
import Messages from "../../../utils/Message";

export default function ViewDetailWriting({ open, onClose, userChoice, setIsAdd }) {
  const [data, setData] = useState();
  const [dataSubmit, setDataSubmit] = useState();

  useEffect(() => {
    const getAllData = async () => {
      const response = await GetAnswerWritingById(
        userChoice?.userId,
        userChoice?.examId
      );
      if (response.ok) {
        const responseJson = await response.json();
        const data = responseJson.metaData;
        setData(data);

        const initialDataSubmit = data.getUserAnswerDTO.map((item, index) => ({
          questionId: item.questionId,
          userId: userChoice?.userId,
          description: "",
          questionIndex: index,
          score: 0,
        }));
        setDataSubmit(initialDataSubmit);
      } else {
        toast.error("Error getting data");
      }
    };
    getAllData();
  }, [userChoice]);

  const handleSubmit = async () => {
    console.log("Data submitted:", { listAnswerDTO: dataSubmit });
    const dataRequest = {
      listAnswerDTO: dataSubmit,
    };
    const response = await ScoreWriting(dataRequest);
    if (response.status == StatusCode.CREATED) {
      toast.success(Messages.SUCCESS.SCORE);
      setIsAdd(pre => !pre)
      await onClose();
    } else {
      toast.error(Messages.ERROR.BAD_REQUEST);
    }
  };

  const handleChange = (index, field, value) => {
    setDataSubmit((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: field === "score" ? Number(value) : value,
            }
          : item
      )
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, width: 1000, maxHeight: "80vh", overflowY: "auto" }}>
        <Typography variant="h5" gutterBottom>
          Chi tiết phần thi
        </Typography>
        <hr />
        {/* Hiển thị nội dung bài viết */}
        <Box>
          {data ? (
            data &&
            data?.getUserAnswerDTO?.map((line, index) => (
              <>
                <Grid
                  container
                  spacing={2}
                  style={{ borderBottom: "1px solid #d1cbce" }}
                  padding={2}
                >
                  <Grid
                    item
                    xs={6}
                    borderRight={"1px solid #d1cbce"}
                    paddingRight={2}
                  >
                    <Typography
                      textAlign={"justify"}
                      key={index}
                      paragraph
                      style={{ height: "200px", overflowY: "auto" }}
                    >
                      {line?.userChoice ? (
                        line?.userChoice?.split("\n").map((item, itemIndex) => (
                          <>
                            <p key={itemIndex}>{item}</p>
                          </>
                        ))
                      ) : (
                        <>
                          <p style={{ paddingRight: "10px" }}>
                            Thí sinh bỏ trắng phần thi này.
                          </p>
                        </>
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Typography>Câu hỏi: {line.questionText}</Typography>
                      <TextField
                        label="Điểm bài viết"
                        type="number"
                        fullWidth
                        sx={{ marginBottom: "20px" }}
                        value={dataSubmit[index]?.score || "0"}
                        onChange={(e) =>
                          handleChange(index, "score", e.target.value)
                        }
                        margin="normal"
                      />
                      <MDBTextArea
                        label="Nhận xét của bạn"
                        rows={3}
                        style={{ padding: "10px" }}
                        placeholder="Nhập nhận xét của bạn..."
                        value={dataSubmit[index]?.description || ""}
                        onChange={(e) =>
                          handleChange(index, "description", e.target.value)
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              Không có nội dung bài viết
            </Typography>
          )}
        </Box>
        <div className="flex justify-end">
          <Button
            variant="contained"
            onClick={onClose}
            color="error"
            sx={{ mt: 2, mr: 2 }}
          >
            Đóng
          </Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
            Hoàn tất
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

// Styles cho modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
