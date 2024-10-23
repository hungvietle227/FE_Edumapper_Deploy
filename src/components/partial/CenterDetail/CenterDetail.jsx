import { Container, Typography, Grid } from "@mui/material";

const CenterDetail = ({ center }) => (
  <Container>
        <img src={center.imageUrl} alt="Center Image" style={{ width: "100%", borderRadius: "8px", height: "500px" }} />
    <Typography mt={3} variant="h4" align="center" color="green" gutterBottom>
      {center.name}
    </Typography>
    <Grid container spacing={4}>
      <Grid item xs={12} md={12} style={{ paddingLeft: "10px" }}>
        <Typography mb={3} variant="h5" color="blue">Sơ lược {center.name}</Typography>
        <Typography paragraph>{center.description}</Typography>
      </Grid>

    </Grid>
  </Container>
);

export default CenterDetail;
