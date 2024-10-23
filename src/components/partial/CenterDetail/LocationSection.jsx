import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const LocationSection = ({ locations }) => (
  <Box mt={4}>
    <Typography variant="h6" color="primary" gutterBottom>
      Địa điểm
    </Typography>
    <List>
      {locations.map((location, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <LocationOnIcon style={{ color: "green" }} />
          </ListItemIcon>
          <ListItemText primary={location} />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default LocationSection;
