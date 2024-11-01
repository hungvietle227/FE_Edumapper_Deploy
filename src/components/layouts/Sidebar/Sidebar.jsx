import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import useAuth from "../../../hooks/useAuth";
import GroupIcon from "@mui/icons-material/Group";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ReportIcon from "@mui/icons-material/Report";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ArticleIcon from "@mui/icons-material/Article";
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
export default function Sidebar() {
  const { user } = useAuth();
  const Menus = [
    {
      title: "Trang cá nhân",
      path: "/user-profile",
      icon: <PersonIcon />,
      id: 1,
      src: "/user-profile",
    }
  ];
  if (user?.roleName === "Teacher") {
    Menus.push(
      {
        title: "Lịch hẹn nói",
        path: "/request-speaking",
        icon: <PendingActionsIcon />,
        id: 66,
        src: "/request-speaking",
      },
      {
        title: "Chấm writing",
        path: "/request-writing",
        icon: <PendingActionsIcon />,
        id: 84,
        src: "/request-writing",
      }
    );
  }
  if (user?.roleName === "Administrator") {
    Menus.push(
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <DashboardIcon />,
        id: 44,
        src: "/dashboard",
      },
      {
        title: "MemberShip",
        path: "/membership",
        icon: <CardMembershipIcon />,
        id: 99,
        src: "/membership",
      },
      {
        title: "Tạo bài thi",
        path: "/test-management",
        icon: <QuizIcon />,
        id: 33,
        src: "/test-management",
      },
      {
        title: "Tạo đề thi",
        path: "/exam-management",
        icon: <ArticleIcon />,
        id: 91,
        src: "/exam-management",
      },
      {
        title: "Tạo đoạn văn",
        path: "/passage-management",
        icon: <AutoStoriesIcon />,
        id: 96,
        src: "/passage-management",
      },
      {
        title: "Tạo câu hỏi",
        path: "/question-management",
        icon: <QuestionAnswerIcon />,
        id: 98,
        src: "/question-management",
      },
      {
        title: "Giao dịch",
        path: "/transaction-management",
        icon: <AccountBalanceIcon />,
        id: 36,
        src: "/transaction-management",
      },
      {
        title: "Lịch hẹn nói",
        path: "/request-speaking",
        icon: <PendingActionsIcon />,
        id: 66,
        src: "/request-speaking",
      },
      {
        title: "Chấm writing",
        path: "/request-writing",
        icon: <PendingActionsIcon />,
        id: 84,
        src: "/request-writing",
      }
    );
  }
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("/dashboard");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.header_container}>
          <img src="/img/logoEdu.png" alt="avatar logo" width={75} />
          <div className={styles.header_sidebar}>Edummaper</div>
        </div>
        <hr style={{ border: "1px solid white" }} />
        <ul className={styles["sidebar-nav"]}>
          {Menus.map((menu) => (
            <li key={menu.id} className={styles["sidebar-nav-item"]}>
              <NavLink
                exact
                to={menu.path}
                className={`${styles["sidebar-nav-link"]} ${
                  currentPath === menu.path && styles.active
                }`}
              >
                <p>
                  {menu.icon} {menu.title}
                </p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
