import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import apiUserService from "../../service/apiUserService";
import '../../css/admin/AdminMypageUnlink.css';


function AdminMypageUnlink() {
    const [userId, setuserId] = useState('');
    const [isCheck, setCheck] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const navigate = useNavigate();
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
        console.log("현재 userId:", userId);
        if (isDelete && userId) {
            apiUserService.delete(userId,
                (msg) => {
                    alert(msg);
                    sessionStorage.clear();
                    setDelete(false);
                    window.location.replace("/");
                },
                (err) => {
                    console.log("회원탈퇴 실패", err)
                    alert("회원탈퇴에 실패하였습니다.");
                    setDelete(false);
                    navigate("/unlink.success")
                }
            )
        }
    }, [isDelete, userId, navigate]);

    const deleteUser = () => {
        if (!isCheck) {
            alert("탈퇴 약관에 동의해야 합니다.")
            return;
        }
        setDelete(true);
        navigate("/unlink/success");
    };

    return (
        <div className={`unlink-container ${userRole}`}>
            <div className="user-order-menu-container">
                <div className="mypage-title-center">탈퇴하기</div>
                <div className="mypage-hr" alt="구분선"></div>
                <div className="withdrawal-policy">
                    <div className="unlink-title-text">탈퇴약관</div>
                    <div className="unlink-text">
                        <p>1. 회원 탈퇴 시 회원님의 계정 정보 및 관련 데이터(프로필, 이용 이력 등)는 모두 삭제되며 복구가 불가능합니다.</p>
                        <p>2. 탈퇴 후에도 전자상거래법 및 관련 법령에 따라 일정 기간 보관해야 하는 정보는 법령이 정한 기간 동안 보관됩니다.</p>
                        <p>3. 탈퇴 후 동일한 이메일/아이디로 재가입이 불가능할 수 있습니다.</p>
                        <p>4. 탈퇴 시 사용 중인 서비스(포인트, 쿠폰, 게시글 등)는 모두 소멸되며, 환불 또는 복구되지 않습니다.</p>
                        <p>5. 작성하신 게시글 및 댓글은 탈퇴 후에도 사이트에 남을 수 있으며, 삭제를 원하실 경우 탈퇴 전에 직접 삭제해주시기 바랍니다.</p>
                        <p>6. 탈퇴 요청 후에는 즉시 처리되며, 번복이 불가능하오니 신중히 결정해주시기 바랍니다.</p>
                    </div>
                </div>
                <label>
                    <input
                        type="checkbox"
                        checked={isCheck}
                        onChange={() => setCheck(!isCheck)}
                    />
                    <span className="agree-text">위 약관에 동의합니다</span>
                </label>

                <div className="user-order-click-btn-one">
                    <button className="user-order-btn-b" onClick={deleteUser} disabled={!isCheck || isDelete}>
                        {isDelete ? "탈퇴 진행 중..." : "탈퇴하기"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminMypageUnlink;
