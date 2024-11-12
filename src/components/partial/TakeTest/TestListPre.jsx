import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { GetAllPremiumTest } from "../../../api/TestManageApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PageNavigation from "../../global/PageNavigation";
import PageSize from "../../global/PageSize";
import ScoreBoard from "./ScoreBoard";
import useAuth from "../../../hooks/useAuth";

export default function TestListPre() {
  const [selectedType, setSelectedType] = useState("");
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [data, setData] = useState();
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const getAllQuestion = async () => {
      const response = await GetAllPremiumTest(page, pageSize, user.id);
      if (response.ok) {
        const responseJson = await response.json();
        const data = responseJson.metaData.data;
        setData(data);
        setTotalPages(responseJson.metaData.totalPages);
      } else {
        toast.error("Error getting data");
      }
    };
    getAllQuestion();
  }, [page, totalPages, pageSize, user]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleNavigate = (value) => {
    navigate(`/take-test-premium/${value}`);
  };
  return (
    <Container maxWidth="xl">
      <Box sx={{ padding: 4 }}>
        <div className="flex gap-4 mb-4">
          <Typography variant="h4" mt={1}>
            Thư viện đề thi
          </Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="select-test-type-label">Loại đề thi</InputLabel>
            <Select
              labelId="select-test-type-label"
              value={selectedType}
              onChange={handleTypeChange}
              label="Loại đề thi"
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="IELTS">IELTS</MenuItem>
              <MenuItem value="TOEIC">TOEIC</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Grid container spacing={2}>
          {data &&
            data?.map((test, index) => (
              <Grid item xs={12} sm={6} md={3} key={test.id}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {test.description}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">60 phút</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <GroupIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">9999</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <ChatBubbleIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">{index + 10}</Typography>
                    </Box>
                    <Typography variant="body2">
                      {test.type} phần thi
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Chip
                        key={index}
                        label={`#${index + 1}`}
                        variant="outlined"
                        size="small"
                        sx={{ mr: 1 }}
                      />
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleNavigate(test.testId)}
                    >
                      Chi tiết
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
        {data && data.length > 0 && (
          <>
            <div
              style={{
                position: "relative",
                minHeight: "80px",
              }}
            >
              <ul
                style={{
                  marginTop: "28px",
                  marginBottom: "10px",
                  position: "absolute",
                  left: "50%",
                  transform: "translate(-50%)",
                }}
              >
                <PageNavigation
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
              </ul>
              <ul style={{ float: "right", marginTop: "12px" }}>
                <PageSize pageSize={pageSize} setPageSize={setPageSize} />
              </ul>
            </div>
          </>
        )}
        {user?.currentMembership == "Premium Plus Package" && (
          <>
            <hr />
            <ScoreBoard />
            <div className="text-center mt-3">
              <Button variant="contained" color="secondary">
                Làm mới
              </Button>
            </div>
          </>
        )}
      </Box>
    </Container>
  );
}
