import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

export default function ScheduleSpeaking({ open, onClose, onAdd }) {
  const {user} = useAuth();
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [scheduleDate, setScheduleDate] = useState(getCurrentDateTime());

  const handleAdd = () => {
    const newSchedule = {
      userId: user?.id,
      testDate: scheduleDate,
    };
    onAdd(newSchedule);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, width: 600 }}>
        <h3 className="mb-4">Hẹn lịch speaking với giáo viên</h3>
        <Typography variant="h6" gutterBottom>
          Tên thí sinh: {user?.fullName}
        </Typography>
        <TextField
          label="Lịch hẹn với giáo viên"
          type="datetime-local"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
        />
        <div className="flex justify-end">
        <Button variant="contained" onClick={handleAdd} sx={{ mt: 2}}>
          Hẹn lịch
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
