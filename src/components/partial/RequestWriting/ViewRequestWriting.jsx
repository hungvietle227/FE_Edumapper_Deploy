import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageNavigation from "../../global/PageNavigation";
import PageSize from "../../global/PageSize";
import RequestWritingTable from "./RequestWritingTable";
import { GetAllWritingRequest } from "../../../api/ExamApi";
import ViewDetailWriting from "./DetailWriting";

export default function ViewRequestWriting() {
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [data, setData] = useState([]);
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [dataView, setDataView] = useState();

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await GetAllWritingRequest(page, pageSize);
      if (response.ok) {
        const responseJson = await response.json();
        const data = responseJson.metaData.data;
        setData(data);
        setTotalPages(responseJson.metaData.totalPages);
      } else {
        toast.error("Error getting data");
      }
    };
    fetchRequests();
  }, [page, pageSize]);

  const handleOpenViewDetail = (item) => {
    setOpenViewDetail(true)
    setDataView(item)
  };
  const handleCloseViewDetail = () => setOpenViewDetail(false);
  
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
        Request Writing
      </div>

      <RequestWritingTable data={data} handleOpenViewDetail={handleOpenViewDetail} />

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
      <ViewDetailWriting         
        open={openViewDetail}
        onClose={handleCloseViewDetail}
        userChoice={dataView}/>
    </div>
  );
}
