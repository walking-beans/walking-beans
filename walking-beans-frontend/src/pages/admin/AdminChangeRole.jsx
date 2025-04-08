import {useEffect, useState} from "react";
import apiUserService from "../../service/apiUserService";
import {useNavigate} from "react-router-dom";
import "../../css/admin/AdminChangeRole.css"
import signupSuccess from "../../assert/images/user/signupSuccess.svg"

const AdminChangeRole = () => {
    // 선택된 롤을 관리하는 상태
    const [selectedRole, setSelectedRole] = useState(1);
    const [userEmail, setUserEmail] = useState("");
    const [callBack, setCallBack] = useState("");
    const navigate = useNavigate();

    useEffect(() => { //로컬스토리지에 userEmail 가져오기
        const storedEmail = localStorage.getItem("user");
        const userObject = storedEmail ? JSON.parse(storedEmail) : {userEmail: "noEmail"}
        setUserEmail(userObject.user_email);
    }, []);

    const handleRoleChange = (event) => {
        setSelectedRole(Number(event.target.value)); //라디오버튼 변경되면 갱신
    }

    const saveRole = () => {
        apiUserService.updateRole(userEmail, selectedRole, setCallBack);
        if (callBack === "success") {
            reLogin();
        }

    }

    const reLogin = () => {
        // 기존 user 정보를 삭제
        localStorage.removeItem("user");
        // 새 롤을 반영한 로그인 요청
        apiUserService.login(userEmail, "0000", (status) => {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user.user_id
            if (status === "success") {
                // 역할에 맞는 페이지로 이동
                switch (selectedRole) {
                    case 1:
                        navigate("/"); // 일반 사용자
                        break;
                    case 2:
                        navigate("/rider"); // 라이더
                        break;
                    case 3:
                        navigate(`/user/${userId}/storeregister/`); // 매장 사장님
                        break;
                    default:
                        navigate("/"); // 기본값
                        break;
                }
            } else {
                console.error("로그인 실패");
            }
        });
    }
    return (
        <div className="admin-change-role-container">
            <div className="user-order-menu-container">
                <img src={signupSuccess}/>
                <div className="change-role-text">회원가입을 환영합니다.</div>

                <div className="box">
                    <div className="info-text-big">사용자 역할을 선택해 주세요</div>
                    <div className="info-text">가입이후 변경은 불가하오니 신중히 선택해 주세요</div>

                    <div className="role-input-label">
                        <div>
                            <label className="info-text-big">
                                <input
                                    type="radio"
                                    value={1}
                                    checked={selectedRole === 1}
                                    onChange={handleRoleChange}
                                    className="user-order-option-select"
                                />
                                일반
                            </label>
                            <div className="info-text">주문고객님</div>
                        </div>

                        <div>
                            <label className="info-text-big">
                                <input
                                    type="radio"
                                    value={2}
                                    checked={selectedRole === 2}
                                    onChange={handleRoleChange}
                                    className="user-order-option-select"
                                />
                                라이더
                            </label>
                            <div className="info-text">배달기사님</div>
                        </div>

                        <div>
                            <label className="info-text-big">
                                <input
                                    type="radio"
                                    value={3}
                                    checked={selectedRole === 3}
                                    onChange={handleRoleChange}
                                    className="user-order-option-select"
                                />
                                매장
                            </label>
                            <div className="info-text">가게사장님</div>
                        </div>
                    </div>
                </div>
                {/* 롤 저장 버튼 */}
                <div className="user-order-click-btn-one">
                    <button onClick={saveRole} className="user-order-btn-b">역할 선택 완료</button>
                </div>
            </div>
        </div>
    )
}

export default AdminChangeRole;