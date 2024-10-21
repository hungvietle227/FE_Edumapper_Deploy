import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import { GetAllMemberShip } from "../../../api/MemberShipApi";
import PageNavigation from "../../global/PageNavigation";
import PageSize from "../../global/PageSize";
import CreateModal from "./CreateModal";
import MemberShipTable from "./MemberShipTable";
import Inventory2Icon from "@mui/icons-material/Inventory2";
export default function ViewMemberShip() {
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [data, setData] = useState([]);
  const [centredModal, setCentredModal] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  useEffect(() => {
    const getAllMemberShip = async () => {
      const response = await GetAllMemberShip(page, pageSize);
      if (response.ok) {
        const responseJson = await response.json();
        const data = responseJson.metaData;
        setData(data);
        // setTotalPages(responseJson.data.totalPages);
      } else {
        toast.error("Error getting transaction");
      }
    };
    getAllMemberShip();
  }, [page, totalPages, pageSize, isCreated]);

  const handleClickUpdate = (data) => {
    setDataDetail(data);
    setOpenDetail(true);
  };
  const handleClickDelete = (data) => {
    setDataDetail(data);
    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpenDelete(false);
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
        Các gói Member
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Button
          variant="contained"
          style={{ fontWeight: "bold" }}
          onClick={() => setCentredModal(true)}
        >
          <Inventory2Icon />
          Tạo gói mới
        </Button>
      </div>
      <MemberShipTable
        data={data}
        handleClickUpdate={handleClickUpdate}
        handleClickDelete={handleClickDelete}
      />
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
      <CreateModal
        centredModal={centredModal}
        setCentredModal={setCentredModal}
        setIsCreated={setIsCreated}
      />
      <UpdateModal
        centredModal={openDetail}
        setCentredModal={setOpenDetail}
        membershipData={dataDetail}
        setIsCreated={setIsCreated}
      />
      <DeleteModal
        show={openDelete}
        handleClose={handleClose}
        data={dataDetail}
        setIsCreated={setIsCreated}
      />
    </div>
  );
}
