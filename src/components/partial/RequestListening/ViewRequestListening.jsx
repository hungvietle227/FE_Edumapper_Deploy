import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageNavigation from "../../global/PageNavigation";
import PageSize from "../../global/PageSize";
import AcceptSchedule from "./AcceptSchedule";
import RequestTable from "./RequestListeningTable";
import { GetAllMemberShip } from "../../../api/MemberShipApi";

export default function ViewRequestListening() {
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [data, setData] = useState([]);
  const [openAddSchedule, setOpenAddSchedule] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await GetAllMemberShip(page, pageSize); // API mới
      if (response.ok) {
        const responseJson = await response.json();
        const data = responseJson.metaData;
        setData(data);
        setTotalPages(responseJson.metaData.totalPages);
      } else {
        toast.error("Error getting data");
      }
    };
    fetchRequests();
  }, [page, pageSize]);

  const handleOpenAddSchedule = () => setOpenAddSchedule(true);
  const handleCloseAddSchedule = () => setOpenAddSchedule(false);
  
  const handleAddSchedule = (newSchedule) => {
    console.log("Lịch hẹn mới:", newSchedule);
    // Thêm xử lý lưu lịch hẹn ở đây
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
        Request Listening
      </div>

      <RequestTable data={data} handleOpenAddSchedule={handleOpenAddSchedule} />

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
      />
    </div>
  );
}
