import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

export default function AcceptSchedule({ open, onClose, onAdd, dataDetail }) {
  const [linkMeet, setLinkMeet] = useState("");

  const handleAdd = async () => {
    const newSchedule = {
      linkMeet,
    };
    await onAdd(newSchedule);
    await onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, width: 500 }}>
        <h3>Hẹn lịch với thí sinh</h3>
        <Typography variant="h6" gutterBottom mt={3}>
          Thí sinh yêu cầu: {dataDetail?.fullName}
        </Typography>
        <TextField
          label="Link Meet"
          fullWidth
          margin="normal"
          value={linkMeet}
          onChange={(e) => setLinkMeet(e.target.value)}
        />
        <div className="flex justify-end">
        <Button variant="contained" onClick={handleAdd} sx={{ mt: 2 }}>
          Nhận lịch
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
