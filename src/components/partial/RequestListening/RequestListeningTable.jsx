import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import NoDataPage from "../../global/NoDataPage";
import PendingActionsIcon from '@mui/icons-material/PendingActions';

export default function RequestTable({ data, handleOpenAddSchedule }) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const TableHeader = ["ID đoạn văn", "Tên", "Mô tả", "Hành động"];

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead style={{ backgroundColor: "#000000" }}>
            <TableRow>
              {TableHeader.map((row, index) => (
                <TableCell
                  style={{
                    color: "white",
                    alignItems: "center",
                    height: "50px",
                  }}
                  sx={{
                    "&:last-child th": {
                      textAlign: "center",
                    },
                  }}
                  align="center"
                  key={index}
                >
                  <span style={{ fontSize: "larger" }}>{row}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!data && <NoDataPage />}
            {data && (data.length == 0 || data.length == undefined) && (
              <NoDataPage />
            )}
            {data &&
              data.length > 0 &&
              data.map((row, index) => {
                return (
                  <StyledTableRow
                    style={{ textAlign: "center", height: "60px" }}
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell
                      style={{
                        fontWeight: "600",
                        textAlign: "center",
                        width: "500px",
                      }}
                      component="th"
                      scope="row"
                    >
                      {row.memberShipName}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600" }}
                      align="center"
                    >
                      {row.memberShipName}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        fontWeight: "600",
                        alignItems: "center",
                        width: "500px",
                      }}
                      align="center"
                    >
                      {row.memberShipName}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600" }}
                      align="center"
                    >
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleOpenAddSchedule(row)}
                        sx={{
                          background: "#0b7234",
                          color: "white",
                          borderRadius: "18px",
                          marginRight: "15px",
                          fontSize: "10px",
                        }}
                      >
                        <PendingActionsIcon /> Hẹn lịch
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
