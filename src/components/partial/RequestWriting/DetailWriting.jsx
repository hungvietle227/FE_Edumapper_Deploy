import { Modal, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetAnswerWritingById } from "../../../api/TestManageApi";

export default function ViewDetailWriting({ open, onClose, userChoice }) {
  const [data, setData] = useState();

  useEffect(() => {
    const getAllData = async () => {
      const response = await GetAnswerWritingById(userChoice.userAnswerId);
      if (response.ok) {
        const responseJson = await response.json();
        const data = responseJson.metaData;
        setData(data);
      } else {
        toast.error("Error getting data");
      }
    };
    getAllData();
  }, [userChoice]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, width: 800, maxHeight: "80vh", overflowY: "auto" }}>
        <Typography variant="h5" gutterBottom>
          Chi tiết bài viết
        </Typography>

        <hr />

        {/* Hiển thị nội dung bài viết */}
        <Box>
          {data && data?.userChoice ? (
            data?.userChoice?.split("\n").map((line, index) => (
              <Typography key={index} paragraph>
                {line}
              </Typography>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              Không có nội dung bài viết
            </Typography>
          )}
        </Box>
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
