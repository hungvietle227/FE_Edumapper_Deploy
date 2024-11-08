import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { MDBTextArea } from "mdb-react-ui-kit";

export default function ScoreStudent({ open, onClose, onAdd, dataDetail }) {
  const [description, setDescription] = useState("");
  const [score, setScore] = useState("");

  const handleAdd = async () => {
    const newSchedule = {
      score,
      description
    };
    await onAdd(newSchedule);
    await onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, width: 500 }}>
        <h3>Chấm điểm thí sinh</h3>
        <Typography variant="h6" gutterBottom mt={3}>
          Thí sinh: {dataDetail?.fullName}
        </Typography>
        <TextField
          label="Chấm điểm"
          fullWidth
          type="number"
          margin="normal"
          sx={{mb: 3}}
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <MDBTextArea
          label="Nhận xét của bạn"
          rows={3}
          style={{ padding: "10px" }}
          placeholder="Nhập nhận xét của bạn..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end">
          <Button variant="contained" onClick={handleAdd} sx={{ mt: 2 }}>
            Xác nhận
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

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
