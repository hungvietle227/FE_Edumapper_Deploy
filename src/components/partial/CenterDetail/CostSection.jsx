import { Box, Typography } from "@mui/material";

const CostSection = ({ cost }) => (
  <Box mt={4}>
    <Typography variant="h6" color="blue" gutterBottom>
      Chi phí
    </Typography>
    {cost.map((costDetail, index) => (
      <Typography fontSize={18} key={index} paragraph>
        {costDetail}
      </Typography>
    ))}
  </Box>
);

export default CostSection;
