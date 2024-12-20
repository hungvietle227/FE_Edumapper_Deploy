import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function GuestAuth({ children }) {
    const { isAuthenticated, user } = useAuth();

    if (isAuthenticated) {
        if (user && user?.roleName == "Moderator") {
            return <Navigate to="/personal-profile" />;
        } else if (user && (user?.roleName == "Administrator")) {
            return <Navigate to="/dashboard" />;
        } else if (user && user?.roleName == "Tutor" && (user?.status == "Pending")) {
            return <Navigate to="/RegisterTutor" />;
        } else if (user && user?.roleName == "Tutor" && (user?.status == "Checking")) {
            return <Navigate to="/checking-page" />;
        } else if (user && user?.roleName == "Tutor" && user?.status == "Active") {
            return <Navigate to="/home-tutor" />;
        }
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}