import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiUserService from "../../service/apiUserService";
import defaultProfileImage from '../../images/user/defaultProfileImage.jpeg'
import '../../css/admin/AdminMypage.css'

const AdminMypage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setuserId] = useState(null);
    const [userRole, setUserRole] = useState("user");

    useEffect(() => {
        apiUserService.sessionData((response) => {  //  sessionData() 올바르게 호출
            if (response && response.user_id) {
                setuserId(response.user_id);  //  userId 설정
                setUserRole(response.user_role || "user");
            } else {
                alert("로그인이 필요합니다.");
                navigate("/login");  //  로그인 페이지로 이동
            }
        });
    }, [navigate]);


        useEffect(() => {
            console.log("마이페이지 userId:", userId);

            if (!userId) return; // userId가 없으면 실행하지 않음

            apiUserService.mypage(
                userId,
                (data) => {
                    setUser(data);
                    setLoading(false);
                },
                (errorMessage) => {
                    setError(errorMessage);
                    setLoading(false);
                }
            );
        }, [userId]);

    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        if (file && userId) {
            apiUserService.uploadProfileImage(
                userId,
                file,
                (data) => {
                    console.log("프로필 이미지 변경 성공:", data);
                    setUser({ ...user, user_picture_url: data.imageUrl });
                },
                (errorMessage) => {
                    console.error(errorMessage);
                }
            );
        }
    };


    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={`mypage-container ${userRole}`}>

            <div className="profile-section">
                <img
                    src={user?.user_picture_url || defaultProfileImage}
                    alt="프로필 사진"
                    className="profile-picture"
                    onClick={() => document.getElementById("profileInput").click()}
                />
                <input
                    type="file"
                    id="profileInput"
                    style={{display: "none"}}
                    onChange={handleProfileChange}
                />
            </div>

            <div className="profile-userName">
                <p>이름: {user.userName || "정보 없음"}</p>
            </div>

            <div className="sub-menu-links">
                <div onClick={() => navigate("/reviews")}>리뷰 관리</div>
                <div onClick={() => navigate("/addresses")}>주소 관리</div>
            </div>

            <div className="infoCertification">
                <div onClick={() => navigate("/certification")}>회원정보 수정</div>
            </div>

            <div className="mypage-info">
                <p>이름: {user.userName || "정보 없음"}</p>
                <p>이메일: {user.userEmail || "정보 없음"}</p>
                <p>전화번호: {user.userPhone || "정보 없음"}</p>
                <p>생일: {user.userBirthday || "정보 없음"}</p>
            </div>

            <div className="menu-links">
                <div onClick={() => navigate("/terms")}>약관 및 정책</div>
                <div onClick={() => navigate("/support")}>고객 센터</div>
                <div onClick={() => navigate("/faq")}>자주 묻는 질문</div>
                <div onClick={() => navigate("/notices")}>공지 사항</div>
            </div>
            <div className="mypage-end-menu-links">
                <div onClick={() => navigate("/unlink")}>회원 탈퇴</div>
            </div>
        </div>
    );
};

export default AdminMypage;
