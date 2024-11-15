import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import FilterCourse from "./FilterCourse";
import Course from "./Course";
import PageNavigation from "../../global/PageNavigation";
import PageSize from "../../global/PageSize";

export default function ViewCourse() {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filter, setFilter] = useState({
    age: "",
    target: "",
    location: "",
    financial: "",
    program: "",
  });
  const courses = [
    {
      name: "Khóa học IELTS cơ bản",
      location: "Hà Nội",
      description: "Khóa học IELTS từ 4.0 đến 6.5+",
      imageUrl: "https://ieltsxuanphi.edu.vn/wp-content/uploads/2022/04/Khoa-hoc-IELTS-tron-goi-4-ky-nang-co-ban-cho-Beginner.jpg",
      age: "18+",
      target: 6.5,
      financial: "5-10 triệu",
      program: "IELTS",
    },
    {
      name: "Khóa học giao tiếp",
      location: "TP. Hồ Chí Minh",
      description: "Khóa học dành cho người mới bắt đầu",
      imageUrl: "https://mshoagiaotiep.com/uploads/images/userfiles/2020/08/lotrinhkhtructuyen.png",
      age: "18+",
      target: 5.0,
      financial: "0-5 triệu",
      program: "Giao tiếp",
    },
    {
      name: "Khóa học TOEIC cấp tốc",
      location: "Đà Nẵng",
      description: "Khóa học TOEIC từ 500 đến 750+ trong 2 tháng",
      imageUrl: "https://khokhoahoc.org/wp-content/uploads/2022/06/Share-Khoa-hoc-Luyen-thi-TOEIC-cap-toc-de-moi-Khoa-1-Cung-Toeic-Moi-Ngay.png",
      age: "18+",
      target: 750,
      financial: "5-10 triệu",
      program: "TOEIC",
    },
    {
      name: "Khóa học tiếng Anh cho Cty",
      location: "Hà Nội",
      description: "Khóa học tiếng Anh chuyên biệt cho môi trường kinh doanh",
      imageUrl: "https://www.britishcouncil.vn/sites/default/files/630x354-myclass-ta-cho-doanh-nghiep.jpg",
      age: "18+",
      target: 5.5,
      financial: "10+ triệu",
      program: "Giao tiếp",
    },
    {
      name: "Khóa học tiếng Anh trẻ em",
      location: "TP. Hồ Chí Minh",
      description: "Khóa học tiếng Anh cho trẻ từ 6 đến 12 tuổi",
      imageUrl: "https://koreanhalong.edu.vn/data/media/1113/images/banner3-04T-01.png",
      age: "6-12",
      target: 3.0,
      financial: "0-5 triệu",
      program: "Cơ bản",
    },
    {
      name: "Khóa học IELTS nâng cao",
      location: "Hà Nội",
      description: "Khóa học IELTS từ 6.5+ đến 8.0",
      imageUrl: "https://betterway.vn/wp-content/uploads/2023/07/Khoa-ielts-5.0-6.0.png",
      age: "18+",
      target: 8.0,
      financial: "10+ triệu",
      program: "IELTS",
    },
  ];
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const handleChangeFilter = (field, value) => {
    setFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFilter = () => {
    const filteredCourses = courses.filter((course) => {
      return (
        (!filter.age || course.age === filter.age) &&
        (!filter.target || course.target >= Number(filter.target)) &&
        (!filter.location || course.location === filter.location) &&
        (!filter.financial || course.financial === filter.financial) &&
        (!filter.program || course.program === filter.program)
      );
    });
    setFilteredCourses(filteredCourses);
  };

  return (
    <Container style={{ marginTop: "40px" }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ marginTop: "20px", fontWeight: "bold", color: "#4CAF50" }}
      >
        Các Khóa Học Tiếng Anh
      </Typography>
      <Typography mb={3} variant="h6" align="center" gutterBottom>
        Lựa chọn khóa học phù hợp với nhu cầu của bạn
      </Typography>
      <FilterCourse
        filter={filter}
        handleChangeFilter={handleChangeFilter}
        handleFilter={handleFilter}
      />
      <Course courses={filteredCourses} />
      {filteredCourses.length > 0 && (
        <>
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
                totalPages={totalPages || 1}
              />
            </ul>
            <ul style={{ float: "right", marginTop: "12px" }}>
              <PageSize pageSize={pageSize} setPageSize={setPageSize} />
            </ul>
          </div>
        </>
      )}
    </Container>
  );
}
