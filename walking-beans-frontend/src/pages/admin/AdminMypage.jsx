import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiUserService from "../../service/apiUserService";

const AdminMypage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setuserId] = useState(null);

    useEffect(() => {
        apiUserService.sessionData((response) => {  // ✅ sessionData() 올바르게 호출
            if (response && response.userId) {
                setuserId(response.userId);  // ✅ userId 설정
            } else {
                alert("로그인이 필요합니다.");
                navigate("/login");  // ✅ 로그인 페이지로 이동
            }
        });
    }, [navigate]);

    useEffect(() => {
        // const userId = localStorage.getItem("userId"); // 로그인된 유저 ID 가져오기
        // if (!userId) {
        //     navigate("/login"); // 로그인되지 않았다면 로그인 페이지로 이동
        //     return;
        // }

        // apiUserService.SessionData((response) => {
        //     if (response && response.userId) {
        //         setuserId(response.userId); // 로그인한 사용자의 userId 설정
        //     } else {
        //         alert("로그인이 필요합니다.");
        //         navigate("/login"); // 로그인되지 않았다면 로그인 페이지로 이동
        //     }
        // });

        axios.get(`/admin/mypage/${userId}`)
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("사용자 정보를 불러오는 중 오류 발생:", error);
                setError("사용자 정보를 불러오는 데 실패했습니다.");
                setLoading(false);
            });
    }, [navigate]);

    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // 프로필 이미지 변경 로직 추가 가능 (예: 서버에 업로드)
            console.log("선택된 파일:", file);
        }
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="mypage-container">
            <h2>마이페이지</h2>
            <div className="profile-section">
                <img
                    src={user?.user_picture_url || "/default-profile.png"}
                    alt="프로필 사진"
                    className="profile-picture"
                    onClick={() => document.getElementById("profileInput").click()}
                />
                <input
                    type="file"
                    id="profileInput"
                    style={{ display: "none" }}
                    onChange={handleProfileChange}
                />
            </div>
            <p>이름: {user?.user_name}</p>
            <p>이메일: {user?.user_email}</p>
            <p>전화번호: {user?.user_phone}</p>
            <p>생일: {user?.user_birthday}</p>

            <div className="menu-links">
                <button onClick={() => navigate("/edit-profile")}>회원정보 수정</button>
                <button onClick={() => navigate("/reviews")}>리뷰 관리</button>
                <button onClick={() => navigate("/addresses")}>주소 관리</button>
                <button onClick={() => navigate("/logout")}>로그아웃</button>
                <button onClick={() => navigate("/delete-account")}>회원 탈퇴</button>
                <button onClick={() => navigate("/terms")}>약관 및 정책</button>
                <button onClick={() => navigate("/support")}>고객 센터</button>
                <button onClick={() => navigate("/faq")}>자주 묻는 질문</button>
                <button onClick={() => navigate("/notices")}>공지 사항</button>
            </div>
        </div>
    );
};

export default AdminMypage;
