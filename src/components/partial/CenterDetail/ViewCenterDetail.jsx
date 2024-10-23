import { Container, Typography } from "@mui/material";
import ProgramSection from "./ProgramSection";
import CostSection from "./CostSection";
import LocationSection from "./LocationSection";
import CenterDetail from "./CenterDetail";
import { useParams } from "react-router-dom";

const centersData = [
  {
    id: 1,
    name: "Trung tâm Apollo",
    description:
      "Trung tâm Anh ngữ Apollo là một trong những trung tâm uy tín hàng đầu, nổi tiếng với phương pháp học tập tiên tiến, cơ sở vật chất hiện đại và đội ngũ giáo viên quốc tế giàu kinh nghiệm. Apollo luôn chú trọng đến việc phát triển kỹ năng tiếng Anh toàn diện, từ giao tiếp đến học thuật, mang lại cho học viên môi trường học tập thân thiện và sáng tạo. Trung tâm cung cấp các chương trình học dành cho nhiều độ tuổi, từ trẻ em đến người lớn, phù hợp với nhu cầu học tập của từng học viên.",
    imageUrl:
      "https://congchungnguyenhue.com/Uploaded/Images/Original/2023/10/16/Trung_tam_anh_ngu_Apollo__1610180420.png",
    programs: [
      {
        title: "Tiếng anh bắt đầu (3-6 tuổi)",
        description: [
          "Hình thành phản xạ ngôn ngữ và cách diễn đạt tự nhiên.",
          "Con nhận biết âm và đọc được từ đơn, nói được cả câu hoàn chỉnh.",
        ],
      },
      {
        title: "Tiếng anh thiếu nhi (6-10 tuổi)",
        description: [
          "Con tự tin giao tiếp trôi chảy bằng tiếng Anh.",
          "Thành thạo các kỹ năng tiếng Anh và viết bằng ngôn ngữ tự do.",
        ],
      },
    ],
    cost: [
      "7.920.000đ/khóa - 36 giờ học",
      "14.400.000đ/khóa - 72 giờ học",
      "20.520.000đ/khóa - 108 giờ học",
    ],
    locations: [
      "204 Đ. Trần Bình Trọng, Phường 4, Quận 5, Hồ Chí Minh",
      "310 Thích Quảng Đức, P. Phú Cường, TP. Thủ Dầu Một, Bình Dương",
      "Biệt thự 01-10 KĐT Mỗ Lao, Quận Hà Đông, Hà Nội",
    ],
  },
  {
    id: 2,
    name: "Trung tâm VUS",
    description:
    "VUS là hệ thống Anh ngữ hàng đầu tại Việt Nam, với hàng ngàn học viên tốt nghiệp mỗi năm. Với sứ mệnh đào tạo tiếng Anh theo tiêu chuẩn quốc tế, VUS cam kết đem đến chất lượng giáo dục vượt trội với đội ngũ giáo viên quốc tế chuyên nghiệp, giáo trình hiện đại và các chương trình học đa dạng, từ tiếng Anh cho trẻ em, thiếu niên đến người lớn. Trung tâm chú trọng phát triển toàn diện các kỹ năng nghe, nói, đọc, viết, giúp học viên tự tin giao tiếp và đạt kết quả cao trong các kỳ thi quốc tế.",
    imageUrl:
      "https://vus.edu.vn/webroot/upload/new_images/2024/202407/trung-tam-ielts-ha-noi.webp",
    programs: [
      {
        title: "Tiếng Anh mẫu giáo (3-5 tuổi)",
        description: [
          "Phát triển khả năng nghe và nói với giáo viên bản xứ.",
          "Học từ vựng và các mẫu câu cơ bản qua trò chơi và bài hát.",
        ],
      },
      {
        title: "Tiếng Anh thiếu niên (10-15 tuổi)",
        description: [
          "Phát triển kỹ năng nghe, nói, đọc và viết ở mức nâng cao.",
          "Chuẩn bị cho các kỳ thi Cambridge, IELTS.",
        ],
      },
    ],
    cost: [
      "9.500.000đ/khóa - 40 giờ học",
      "18.000.000đ/khóa - 80 giờ học",
      "25.500.000đ/khóa - 120 giờ học",
    ],
    locations: [
      "189 Nguyễn Thị Minh Khai, Quận 1, Hồ Chí Minh",
      "45 Lê Văn Việt, Quận 9, Hồ Chí Minh",
      "23 Lý Thường Kiệt, Quận Hoàn Kiếm, Hà Nội",
    ],
  },
  {
    id: 3,
    name: "Trung tâm ILA",
    description:
    "ILA là trung tâm đào tạo tiếng Anh uy tín với nhiều năm kinh nghiệm. Với triết lý giáo dục lấy học viên làm trung tâm, ILA tập trung vào việc phát triển các kỹ năng ngôn ngữ thông qua các hoạt động thực hành và tình huống thực tế. Chương trình học của ILA giúp học viên không chỉ thành thạo tiếng Anh mà còn phát triển tư duy phản biện, kỹ năng giải quyết vấn đề và kỹ năng làm việc nhóm, tạo nền tảng vững chắc cho sự thành công trong học tập và công việc.",
    imageUrl:
      "https://vnn-imgs-f.vgcloud.vn/2019/07/06/09/trai-nghiem-moi-truong-tieng-anh-chuan-quoc-te-o-ila-nha-trang.jpg",
    programs: [
      {
        title: "Khóa học giao tiếp người lớn",
        description: [
          "Phát triển kỹ năng giao tiếp tiếng Anh trong công việc và cuộc sống.",
          "Thực hành qua các tình huống thực tế và hoạt động nhóm.",
        ],
      },
      {
        title: "Luyện thi IELTS",
        description: [
          "Chiến lược thi IELTS và các kỹ năng cần thiết để đạt điểm cao.",
          "Luyện tập với đề thi thực tế và phản hồi chi tiết từ giáo viên.",
        ],
      },
    ],
    cost: [
      "12.000.000đ/khóa - 60 giờ học",
      "24.000.000đ/khóa - 120 giờ học",
      "32.000.000đ/khóa - 180 giờ học",
    ],
    locations: [
      "146 Nguyễn Đình Chiểu, Quận 3, Hồ Chí Minh",
      "71 Nguyễn Văn Huyên, Quận Cầu Giấy, Hà Nội",
      "123 Đinh Tiên Hoàng, Quận Bình Thạnh, Hồ Chí Minh",
    ],
  },
  {
    id: 4,
    name: "Trung tâm RES",
    description:
      "RES là trung tâm luyện thi IELTS, TOEFL hàng đầu tại Việt Nam. Với phương pháp giảng dạy hiện đại, đội ngũ giảng viên trình độ cao và sự hỗ trợ toàn diện, RES cam kết giúp học viên đạt được kết quả cao nhất trong các kỳ thi quốc tế. Trung tâm cung cấp chương trình đào tạo đa dạng từ các khóa học cơ bản đến nâng cao, giúp học viên phát triển toàn diện các kỹ năng ngôn ngữ và tự tin khi tham gia các kỳ thi lớn.",
    imageUrl:
      "https://res.edu.vn/wp-content/uploads/2021/11/cover-cac-khoa-hoc-tai-res-1400x533.jpg",
    programs: [
      {
        title: "Luyện thi TOEIC",
        description: [
          "Hướng dẫn các kỹ năng cần thiết cho kỳ thi TOEIC.",
          "Luyện đề và cung cấp các chiến thuật làm bài hiệu quả.",
        ],
      },
      {
        title: "Luyện thi IELTS cấp tốc",
        description: [
          "Khóa học cấp tốc giúp học viên đạt mục tiêu IELTS trong thời gian ngắn.",
          "Hỗ trợ cá nhân hóa kế hoạch học tập và phản hồi trực tiếp từ giảng viên.",
        ],
      },
    ],
    cost: [
      "15.000.000đ/khóa - 80 giờ học",
      "30.000.000đ/khóa - 160 giờ học",
      "40.000.000đ/khóa - 200 giờ học",
    ],
    locations: [
      "458 Nguyễn Thị Minh Khai, Quận 3, Hồ Chí Minh",
      "12 Trần Hưng Đạo, Quận Hoàn Kiếm, Hà Nội",
      "200 Hai Bà Trưng, Quận 1, Hồ Chí Minh",
    ],
  },
  {
    id: 5,
    name: "Trung tâm British Council",
    description:
    "British Council là tổ chức giáo dục quốc tế hàng đầu tại Việt Nam, chuyên cung cấp các chương trình đào tạo tiếng Anh chuẩn quốc tế. Với đội ngũ giáo viên bản xứ có kinh nghiệm lâu năm và giáo trình tiên tiến, British Council mang đến cho học viên nền tảng tiếng Anh vững chắc, phù hợp với mọi mục tiêu học tập từ giao tiếp cơ bản đến học thuật chuyên sâu. Các khóa học tại đây luôn được cập nhật để đáp ứng nhu cầu và xu hướng học tập toàn cầu.",
    imageUrl:
      "https://cdn.ivolunteervietnam.com/wp-content/uploads/2022/11/17225852/B%E1%BA%A3n-sao-c%E1%BB%A7a-K%C3%ADch-th%C6%B0%E1%BB%9Bc-800x500px_%E1%BA%A2nh-%C4%90%E1%BA%A1i-Di%E1%BB%87n-B%C3%A0i-%C4%90%C4%83ng-Website-iVolunteer-4-3.png",
    programs: [
      {
        title: "Tiếng Anh học thuật",
        description: [
          "Phát triển kỹ năng viết và nói chuyên sâu cho mục đích học thuật.",
          "Chuẩn bị cho các kỳ thi tiếng Anh như IELTS, TOEFL.",
        ],
      },
      {
        title: "Tiếng Anh thương mại",
        description: [
          "Tiếng Anh chuyên biệt cho môi trường kinh doanh và công việc.",
          "Học các kỹ năng giao tiếp, đàm phán, và thuyết trình bằng tiếng Anh.",
        ],
      },
    ],
    cost: [
      "20.000.000đ/khóa - 100 giờ học",
      "40.000.000đ/khóa - 200 giờ học",
      "50.000.000đ/khóa - 250 giờ học",
    ],
    locations: [
      "31 Thái Hà, Quận Đống Đa, Hà Nội",
      "285 Cách Mạng Tháng 8, Quận 10, Hồ Chí Minh",
      "50 Võ Văn Tần, Quận 3, Hồ Chí Minh",
    ],
  },
];

const ViewCenterDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const center = centersData.find((center) => center.id === parseInt(id));

  if (!center) {
    return <Typography>Trung tâm không tồn tại</Typography>;
  }
  return (
    <Container style={{ marginBottom: "25px" }}>
      <CenterDetail center={center} />
      <ProgramSection programs={center.programs} />
      <CostSection cost={center.cost} />
      <LocationSection locations={center.locations} />
    </Container>
  );
};

export default ViewCenterDetail;
