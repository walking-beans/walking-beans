import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UserProtectedRoute = () => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    // 사용자가 로그인하지 않았거나 일반 사용자가 아닌 경우
    if (!user || (user.user_role !== 'user' && user.user_role !== 1)) {
        alert("해당 페이지는 일반으로 가입해야 이용할 수 있습니다.\n 일반이용자로 가입하여 이용해 주세요.");
        return <Navigate to="/" replace />;
    }

    // 사용자 권한이 확인되면 자식 라우트를 렌더링
    return <Outlet />;
};

export default UserProtectedRoute;