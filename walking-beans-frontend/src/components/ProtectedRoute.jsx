import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children, allowedRoles}) => {

    // session 에 저장되어있는 user 변수명에 저장된 로그인 정보 확인
    const storedUser = localStorage.getItem("users");
    const user = storedUser ? JSON.parse(storedUser) : null;

    // 로그인이 안 되어 있으면 로그인 페이지로 이동
    if(!user) {
        alert("해당 페이지는 로그인 이후 이용이 가능합니다. 로그인 페이지로 이동하겠습니다.");
        return <Navigate to="/login" />;
    }

    // 현재 로그인이 되어있지만 사용자의 역할이 허용된 역할 리스트에 존재하지 않으면 접근 불가
    if (!allowedRoles.includes(user.userRole)) {
        alert("접근 권한이 없습니다. 메인 페이지로 이동하겠습니다.");
        return <Navigate to="/" />; //접근 권한이 없으면 메인으로 돌려보내기
    }

    return children;
};

export default ProtectedRoute;