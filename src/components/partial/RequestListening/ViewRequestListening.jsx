import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageNavigation from "../../global/PageNavigation";
import PageSize from "../../global/PageSize";
import AcceptSchedule from "./AcceptSchedule";
import RequestTable from "./RequestListeningTable";
import {
  GetAllSpeakingRequested,
  TeacherResponseSpeaking,
  TeacherScoreSpeaking,
} from "../../../api/ExamApi";
import StatusCode from "../../../utils/StautsCode";
import Messages from "../../../utils/Message";
import ScoreStudent from "./ScoreStudent";

export default function ViewRequestListening() {
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [data, setData] = useState([]);
  const [openAddSchedule, setOpenAddSchedule] = useState(false);
  const [openAddScore, setOpenAddScore] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [isAdd, setIsAdd] = useState();
  useEffect(() => {
    const fetchRequests = async () => {
      const response = await GetAllSpeakingRequested(page, pageSize);
      if (response.ok) {
        const responseJson = await response.json();
        const data = responseJson.metaData.data;
        setData(data);
        setTotalPages(responseJson.metaData.data.totalPages);
      } else {
        toast.error("Error getting data");
      }
    };
    fetchRequests();
  }, [page, pageSize, isAdd]);

  const handleOpenAddSchedule = (item) => {
    setOpenAddSchedule(true);
    setDataDetail(item);
  };

  const handleOpenAddScore = (item) => {
    setOpenAddScore(true);
    setDataDetail(item);
  };

  const handleCloseAddSchedule = async () => setOpenAddSchedule(false);

  const handleCloseAddScore = async () => setOpenAddScore(false);

  const handleAddSchedule = async (newSchedule) => {
    const data = {
      ...newSchedule,
      userEmail: dataDetail?.userEmail,
      examId: dataDetail?.examId,
    };
    const response = await TeacherResponseSpeaking(data);
    const responseJson = await response.json();
    if (responseJson.statusCode == StatusCode.CREATED) {
      toast.success("Đã hẹn lại lịch thành công");
      setIsAdd((pre) => !pre);
    } else {
      toast.error(Messages.ERROR.BAD_REQUEST);
    }
  };

  const handleAddScore = async (newSchedule) => {
    const data = {
      ...newSchedule,
      userId: dataDetail?.userId,
      examId: dataDetail?.examId,
    };
    const response = await TeacherScoreSpeaking(data);
    const responseJson = await response.json();
    if (responseJson.statusCode == StatusCode.DELETE) {
      toast.success("Đã chấm điểm thành công");
      setIsAdd((pre) => !pre);
    } else {
      toast.error(Messages.ERROR.BAD_REQUEST);
    }
  };

  return (
    <div
      style={{
        padding: "25px 25px 5px 25px",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <div
        style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Request Speaking
      </div>

      <RequestTable data={data} handleOpenAddSchedule={handleOpenAddSchedule} handleOpenAddScore={handleOpenAddScore} />

      {data && data.length > 0 && (
        <div style={{ position: "relative", minHeight: "80px" }}>
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
      )}
      <AcceptSchedule
        open={openAddSchedule}
        onClose={handleCloseAddSchedule}
        onAdd={handleAddSchedule}
        dataDetail={dataDetail}
      />
      <ScoreStudent
        open={openAddScore}
        onClose={handleCloseAddScore}
        onAdd={handleAddScore}
        dataDetail={dataDetail}
      />
    </div>
  );
}
