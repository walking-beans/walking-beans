import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
        alert("로그인이 필요합니다.");
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
        alert("접근 권한이 없습니다.");
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
