import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const ProgramSection = ({ programs }) => (
  <Box>
    <Typography variant="h6" color="green" gutterBottom mb={1}>Chương trình đào tạo</Typography>
    {programs.map((program, index) => (
      <Box key={index} mb={3}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>{program.title}</Typography>
        <List>
          {program.description.map((desc, i) => (
            <ListItem key={i}>
              <ListItemIcon><CheckIcon style={{ color: "green" }} /></ListItemIcon>
              <ListItemText primary={desc} />
            </ListItem>
          ))}
        </List>
      </Box>
    ))}
  </Box>
);

export default ProgramSection;
