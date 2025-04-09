import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import apiUserService from "../../service/apiUserService";
import '../../css/admin/adminMypageUnlinkSuccess.css';

function AdminMypageUnlinkSuccess() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState("user");

    useEffect(() => {
        apiUserService.logout(undefined, {silent: true});
        apiUserService.sessionData((res) => {
            if (res?.user_role) {
                setUserRole(res.user_role);
            }
        });
    }, []);

    return (
        <div className={`unlink-success-container ${userRole}`}>
            <div className="user-order-menu-container">
                <div className="message-box">
                    <div className="unlink-big-text">회원탈퇴가 완료되었습니다.</div>
                    <div className="unlink-text">워킹빈즈를 이용해 주셔서 감사합니다.</div>
                </div>
                <div className="user-order-click-btn-one">
                    <button className="user-order-btn-b" onClick={() => navigate("/")}>
                        메인페이지 바로가기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminMypageUnlinkSuccess;