import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import styles from "./Test.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { GetScoreByUserId } from "../../../api/TestManageApi";

export default function ScoreBoard() {
  const [data, setData] = useState();
  const {user} = useAuth();
  useEffect(() => {
    const getAllScore = async () => {
      const response = await GetScoreByUserId(user.id);
      if (response.ok) {
        const responseJson = await response.json();
        const data = responseJson.metaData.testResultDTOs;
        setData(data);
      } else {
        toast.error("Error getting data");
      }
    };
    getAllScore();
  }, [user]);

  return (
    <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
      <TableContainer component={Paper} className={styles.scoreTableContainer}>
        <Typography
          variant="h6"
          align="center"
          className={styles.scoreBoardTitle}
        >
          DANH SÁCH BẢNG GHI ĐIỂM
        </Typography>
        <Typography
          variant="body2"
          align="center"
          className={styles.scoreBoardSubtitle}
        >
          Lưu dữ các bản ghi điểm các bài thi thử của bạn
        </Typography>
        <Table>
          <TableHead>
            <TableRow className={styles.tableHeaderRow}>
              <TableCell align="center" className={styles.tableHeaderCell}>
                NO.
              </TableCell>
              <TableCell align="center" className={styles.tableHeaderCell}>
                READING
              </TableCell>
              <TableCell align="center" className={styles.tableHeaderCell}>
                LISTENING
              </TableCell>
              <TableCell align="center" className={styles.tableHeaderCell}>
                WRITING
              </TableCell>
              <TableCell align="center" className={styles.tableHeaderCell}>
                SPEAKING
              </TableCell>
              <TableCell align="center" className={styles.tableHeaderCell}>
                OVERALL
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data?.map((row, index) => (
              <TableRow key={index} className={styles.tableBodyRow}>
                <TableCell align="center" className={styles.tableBodyCell}>
                  {index + 1}
                </TableCell>
                <TableCell align="center" className={styles.tableBodyCell}>
                  {row.reading ?? "Chưa có"}
                </TableCell>
                <TableCell align="center" className={styles.tableBodyCell}>
                  {row.listening ?? "Chưa có"}
                </TableCell>
                <TableCell align="center" className={styles.tableBodyCell}>
                  {row.writing ?? "Chưa có"}
                </TableCell>
                <TableCell align="center" className={styles.tableBodyCell}>
                  {row.speaking ?? "Chưa có"}
                </TableCell>
                <TableCell align="center" className={styles.tableBodyCell}>
                  {row.total ?? "Chưa có"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
