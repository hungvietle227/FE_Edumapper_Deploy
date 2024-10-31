import { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

export default function AcceptSchedule({ open, onClose, onAdd }) {
  const [userEmail, setUserEmail] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [linkMeet, setLinkMeet] = useState("");

  const handleAdd = () => {
    const newSchedule = {
      userEmail,
      scheduleDate,
      linkMeet,
    };
    onAdd(newSchedule);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, width: 400 }}>
        <h2>Thêm lịch hẹn</h2>
        <TextField
          label="User Email"
          fullWidth
          margin="normal"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <TextField
          label="Schedule Date"
          type="datetime-local"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
        />
        <TextField
          label="Link Meet"
          fullWidth
          margin="normal"
          value={linkMeet}
          onChange={(e) => setLinkMeet(e.target.value)}
        />
        <Button variant="contained" onClick={handleAdd} sx={{ mt: 2 }}>
          Thêm
        </Button>
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
