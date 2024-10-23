import React, { useState } from "react";
import EnglishCenters from "./EnglishCenters";
import { Container, Typography } from "@mui/material";
import PageNavigation from "../../global/PageNavigation";
import PageSize from "../../global/PageSize";
import FilterCenters from "./FilterCenters";
import { useNavigate } from "react-router-dom";

export default function ViewEnglishCenters() {
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [tempFilter, setTempFilter] = useState({
    type: "",
    location: "",
  });
  const [filter, setFilter] = useState({
    type: "",
    location: "",
  });
  const handleChangeFilter = (field, value) => {
    setTempFilter((pre) => ({
      ...pre,
      [field]: value,
    }));
  };
  const applyFilter = () => {
    setFilter(tempFilter);
  };
  const centers = [
    {
      id: 1,
      name: "Trung tâm Apollo",
      location: "TP. Hồ Chí Minh, Hà Nội, Đà Nẵng",
      description:
        "Học viên có nhiều lựa chọn học trực tiếp tại trung tâm hoặc học online phù hợp với thời gian",
      type: "both",  
      facilities:
        "Cơ sở vật chất hiện đại, giao tiếp, học chung với người bản xứ nhiều",
      imageUrl: "https://congchungnguyenhue.com/Uploaded/Images/Original/2023/10/16/Trung_tam_anh_ngu_Apollo__1610180420.png",
    },
    {
      id: 3,
      name: "Trung tâm tiếng Anh ILA",
      location: "Hệ thống trên toàn quốc",
      description:
        "Học viên có nhiều lựa chọn học trực tiếp tại trung tâm hoặc học online phù hợp với thời gian",
      type: "online",  
      facilities:
        "Cơ sở vật chất hiện đại, giao tiếp, học chung với người bản xứ nhiều",
      imageUrl: "https://vnn-imgs-f.vgcloud.vn/2019/07/06/09/trai-nghiem-moi-truong-tieng-anh-chuan-quoc-te-o-ila-nha-trang.jpg",
    },
    {
      id: 4,
      name: "Trung tâm Anh Ngữ RES",
      location: "TP. Hồ Chí Minh, Hà Nội",
      type: "online", 
      description:
        "Chương trình học online hiện đại, tương tác trực tiếp với giảng viên và học viên toàn cầu.",
      facilities:
        "Lớp học online linh hoạt, nội dung phong phú và học với giảng viên bản xứ.",
      imageUrl: "https://res.edu.vn/wp-content/uploads/2021/11/gioi-thieu-ve-res_opt.jpg",
    },
    {
      id: 5,
      name: "Trung tâm Anh Ngữ British Council",
      location: "TP. Hồ Chí Minh, Đà Nẵng",
      type: "offline",
      description:
        "Chương trình học tập trung tại các cơ sở đạt tiêu chuẩn quốc tế với đội ngũ giảng viên chất lượng.",
      facilities:
        "Cơ sở vật chất hiện đại, môi trường học thân thiện, đội ngũ giảng viên chuyên nghiệp.",
      imageUrl: "https://ib.vib.com.vn/banners/Promotion/20190822152649617_British__Council_4236315.jpg",
    },
    {
      id: 2,
      name: "Trung tâm Anh Ngữ VUS",
      location: "Hệ thống trên toàn quốc",
      type: "both", 
      description:
        "Chương trình đào tạo tiên tiến với lựa chọn học trực tiếp hoặc online, đáp ứng nhu cầu linh hoạt của học viên.",
      facilities:
        "Trang thiết bị tiên tiến, lớp học chất lượng cao, học viên được hỗ trợ tối đa.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XsTMYimGmf274BJMtOuRYe_XKdOVav8SXA&s",
    },
  ];
  const filteredCenters = centers?.filter((center) => {
      return (
        (filter.type === "" || center.type === filter.type || center.type === "both") &&
        (filter.location === "" || center.location.includes(filter.location))
      );
  });
  const handleViewDetail = (id) => {
    navigate(`/english-center-detail/${id}`);
  };
  return (
    <>
      <Container style={{marginTop: "40px"}}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ marginTop: "20px", fontWeight: "bold", color: "#4CAF50" }}
        >
          Trung Tâm Tiếng Anh
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Những trung tâm tiếng anh hàng đầu được nhiều đánh giá cao từ người
          dùng
        </Typography>
        <FilterCenters
          filter={tempFilter}
          handleChangeFilter={handleChangeFilter}
          applyFilter={applyFilter}
        />
        <EnglishCenters centers={filteredCenters} handleViewDetail={handleViewDetail} />
        {centers && centers.length > 0 && (
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
                  totalPages={totalPages || "1"}
                />
              </ul>
              <ul style={{ float: "right", marginTop: "12px" }}>
                <PageSize pageSize={pageSize} setPageSize={setPageSize} />
              </ul>
            </div>
          </>
        )}
      </Container>
    </>
  );
}
