import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import apiUserService from "../../service/apiUserService";
import defaultProfileImage from '../../assert/images/user/defaultProfileImage.jpeg'
import '../../css/admin/AdminMypage.css'
import "../../css/Order.css"
import detailbtn from "../../assert/images/user/detailbtn.svg"
import detailbtnB from "../../assert/images/user/detailbtnB.svg"

const AdminMypage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setuserId] = useState(null);
    const [userRole, setUserRole] = useState("user");

    useEffect(() => {
        apiUserService.sessionData((response) => {
            if (response && response.user_id) {
                setuserId(response.user_id);
                setUserRole(response.user_role || "user");
            } else {
                alert("로그인이 필요합니다.");
                navigate("/login");
            }
        });
    }, [navigate]);

    useEffect(() => {
        if (!userId) return;

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
                    setUser({...user, user_picture_url: data.imageUrl});
                },
                (errorMessage) => {
                    console.error(errorMessage);
                }
            );
        }
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    // 역할별 클래스 설정
    const roleClass = userRole === "rider" || userRole === "3" ? "rider" : "user";
    const textColor = roleClass === "rider" ? "#010C22" : "#5A3D21";
    const backgroundColor = roleClass === "rider" ? "#E2F2FA" : "#F4EDDF";

    // 역할에 따른 이동 경로 설정
    let orderRoute = "/order";
    let orderText = "주문 내역";

    if (userRole === "rider" || userRole === "3") {
        orderRoute = "/rider/orderlist";
        orderText = "배달 기록";
    } else if (userRole === "owner" || userRole === "2") {
        orderRoute = "/owner/revenue";
        orderText = "매출 조회";
    }

    return (
        <div className={`mypage-container ${roleClass}`}>
            <div className="user-order-background" style={{backgroundColor}}>
                <div className="user-order-menu-container">
                    <h2 className="mypage-title-center" style={{color: textColor}}>마이페이지</h2>
                    <div className="mypage-hr"></div>

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

                        <div className="mypage-info">
                            <div>
                                <span className="mypage-text-big" style={{color: textColor}}>
                                    {user.userName || "정보 없음"}
                                </span>
                                <span className="mypage-text" style={{color: textColor}}>님</span>
                            </div>
                            <div className="mt-4">
                                <div className="mypage-text"
                                     style={{color: textColor}}>{user.userEmail || "정보 없음"}</div>
                                <div className="mypage-text" style={{color: textColor}}>
                                    {user.userPhone.replace(/^(\d{3})(\d{4})(\d{4})$/, " $1-$2-$3") || "정보 없음"}
                                </div>
                                <div className="mypage-text"
                                     style={{color: textColor}}>{user.userBirthday || "정보 없음"}</div>
                            </div>
                        </div>
                    </div>

                    <div className="user-order-hr"></div>
                    <div>
                        <div className="mypage-item" onClick={() => navigate("/certification", { state: { redirectTo: "/infoCorrection" } })}>
                            <div className="mypage-item-text" style={{color: textColor}}>회원정보 수정</div>
                            <img src={userRole === "rider" || userRole === "3" ? detailbtnB : detailbtn}
                                 alt="바로가기 버튼"/>
                        </div>
                        <div className="mypage-hr-mini"></div>
                        <div className="mypage-item" onClick={() => navigate("/user/insertAddress")}>
                            <div className="mypage-item-text" style={{color: textColor}}>주소 관리</div>
                            <img src={userRole === "rider" || userRole === "3" ? detailbtnB : detailbtn}
                                 alt="바로가기 버튼"/>
                        </div>

                        <div className="mypage-hr-mini"></div>
                        <div className="mypage-item" onClick={() => navigate(orderRoute)}>
                            <div className="mypage-item-text" style={{color: textColor}}>{orderText}</div>
                            <img src={userRole === "rider" || userRole === "3" ? detailbtnB : detailbtn}
                                 alt="바로가기 버튼"/>
                        </div>

                    </div>
                    <div className="user-order-hr"></div>
                    <div className="mypage-grid" onClick={() => navigate("/certification", { state: { redirectTo: "/unlink" } })}>
                    <div className="mypage-text" style={{color: textColor}}>회원 탈퇴</div>
                        <img src={userRole === "rider" || userRole === "3" ? detailbtnB : detailbtn} alt="회원 탈퇴 버튼"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMypage;
