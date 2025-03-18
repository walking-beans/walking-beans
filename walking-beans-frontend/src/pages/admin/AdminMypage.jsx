import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiUserService from "../../service/apiUserService";
import defaultProfileImage from '../../images/user/defaultProfileImage.png'

const AdminMypage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setuserId] = useState(null);

    useEffect(() => {
        apiUserService.sessionData((response) => {  //  sessionData() 올바르게 호출
            if (response && response.user_id) {
                setuserId(response.user_id);  //  userId 설정
            } else {
                alert("로그인이 필요합니다.");
                navigate("/login");  //  로그인 페이지로 이동
            }
        });
    }, [navigate]);


    //     if (!userId) return;
    //     console.log("userId 설정 완료, API 요청 시작:", userId);
    //     axios.get(`/mypage/${userId}`)
    //         .then(response => {
    //             setUser(response.data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error("사용자 정보를 불러오는 중 오류 발생:", error);
    //             setError("사용자 정보를 불러오는 데 실패했습니다.");
    //             setLoading(false);
    //         });
    // }, [userId]);

        useEffect(() => {

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
        <div className="mypage-container">
            <h2>마이페이지</h2>
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
            <p>이름: {user.userName || "정보 없음"}</p>
            <p>이메일: {user.userEmail || "정보 없음"}</p>
            <p>전화번호: {user.userPhone || "정보 없음"}</p>
            <p>생일: {user.userBirthday || "정보 없음"}</p>

            <div className="menu-links">
                <button onClick={() => navigate("/certification")}>회원정보 수정</button>
                <button onClick={() => navigate("/reviews")}>리뷰 관리</button>
                <button onClick={() => navigate("/addresses")}>주소 관리</button>
                <button onClick={() => navigate("/logout")}>로그아웃</button>
                <button onClick={() => navigate("/unlink")}>회원 탈퇴</button>
                <button onClick={() => navigate("/terms")}>약관 및 정책</button>
                <button onClick={() => navigate("/support")}>고객 센터</button>
                <button onClick={() => navigate("/faq")}>자주 묻는 질문</button>
                <button onClick={() => navigate("/notices")}>공지 사항</button>
            </div>
        </div>
    );
};

export default AdminMypage;
