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
            <div className="message-box">
                <h2>탈퇴가 완료되었습니다!</h2>
            </div>
            <button onClick={() => navigate("/")}>
                메인페이지로 돌아가기
            </button>
        </div>
    );
}

export default AdminMypageUnlinkSuccess;
