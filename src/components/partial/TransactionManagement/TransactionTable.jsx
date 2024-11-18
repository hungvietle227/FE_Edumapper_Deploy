import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import { tableCellClasses } from "@mui/material/TableCell";
  import Paper from "@mui/material/Paper";
  import styles from "./status.module.css";
  import { styled } from "@mui/material/styles";
  import NoDataPage from "../../global/NoDataPage";
import { formatPrice } from "../../../utils/FormatPrice";
  export default function TransactionTable({
    data,
  }) {
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
    const TableHeader = [
      "Số",
      "Thông tin",
      "Ngày",
      "Tổng tiền",
      "Trạng thái",
      "Cổng thanh toán",
      "Email",
    ];
    const StatusType = ["Đang chờ", "Cancel", "Đã thanh toán"];
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
                    align="left"
                    key={index}
                  >
                    <span style={{ fontSize: "larger" }}>{row}</span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!data && <NoDataPage />}
              {data && data.length === 0 && <NoDataPage />}
              {data &&
                data.map((row, index) => {
                  return (
                    <StyledTableRow
                      style={{ textAlign: "center", height: "60px" }}
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell
                        style={{ fontWeight: "600" }}
                        align="middle"
                      >
                        {row.transactionNumber}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ fontWeight: "600" }}
                        align="middle"
                      >
                        {row.transactionInfo}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ fontWeight: "600" }}
                        align="middle"
                      >
                        {row.transactionDate?.split("T")[0]}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ fontWeight: "600" }}
                        align="middle"
                      >
                        {formatPrice(row.amount)}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          width: "150px",
                          paddingLeft: "0px",
                          paddingRight: "20px",
                        }}
                        style={{ fontWeight: "600" }}
                        align="middle"
                      >
                        {StatusType &&
                          StatusType.map((type, index) => {
                            if (row.status == type) {
                              let styleName;
                              switch (type) {
                                case "Đã thanh toán":
                                  styleName = styles.completed;
                                  break;
                                case "Cancel":
                                  styleName = styles.rejected;
                                  break;
                                case "Đang chờ":
                                  styleName = styles.pendingConfirmation;
                                  break;
                                default:
                                  styleName = "";
                              }
                              return (
                                <div className={styleName} key={index}>
                                  {type}
                                </div>
                              );
                            }
                          })}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ fontWeight: "600" }}
                        align="middle"
                      >
                        {row.paymentMethod}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ fontWeight: "600" }}
                        align="middle"
                      >
                        {row.email}
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