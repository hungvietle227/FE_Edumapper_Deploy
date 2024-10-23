import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function FilterCenters(pros) {
  const { filter, handleChangeFilter, applyFilter } = pros;
  return (
    <>
      <Grid
        mt={3}
        container
        spacing={2}
        justifyContent="center"
        sx={{ marginBottom: "20px" }}
      >
        <Grid item xs={12} sm={4} md={3} style={{ zIndex: "0" }}>
          <FormControl fullWidth>
            <InputLabel>Hình thức học</InputLabel>
            <Select
              label="Hình thức học"
              value={filter.type || ""}
              onChange={(e) => handleChangeFilter("type", e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="offline">Học trực tiếp</MenuItem>
              <MenuItem value="online">Học online</MenuItem>
              <MenuItem value="both">Both</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={3} style={{ zIndex: "0" }}>
          <FormControl fullWidth>
            <InputLabel>Khu vực</InputLabel>
            <Select
              label="Khu vực"
              value={filter.location || ""}
              onChange={(e) => handleChangeFilter("location", e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</MenuItem>
              <MenuItem value="Hà Nội">Hà Nội</MenuItem>
              <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3} display="flex" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              backgroundColor: "#4CAF50",
              "&:hover": {
                backgroundColor: "#45a049",
              },
              fontWeight: "bold",
              padding: "12px 16px",
              borderRadius: "8px",
              textTransform: "none",
            }}
            onClick={applyFilter}
          >
            Lọc
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
