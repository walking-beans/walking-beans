import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUserService from "../../service/apiUserService";
import '../../css/admin/AdminMypageCertification.css';

function AdminMypageCertification() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [userId, setuserId] = useState(null);
    const [userRole, setUserRole] = useState("user");
    const [isVerified, setIsVerified] = useState(false);

    function 인증번호전송() {
        apiUserService.sendEmailCode(
            email,
            (data) => setMessage(data),
            () => setMessage("인증 이메일 전송 실패")

        );
    }

    function 인증확인() {
        apiUserService.checkEmailCode(
            email,
            code,
            (data) => {
                setMessage(data);
                if (data.includes("일치")) {
                    setIsVerified(true); // ✅ 인증 통과
                }
            },
            () => setMessage("인증번호 확인 실패")
        );
    }

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

    return (
        <div className={`certification-container ${userRole}`}>
            <input
                type="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={인증번호전송}>인증번호 받기</button>

            <input
                type="text"
                placeholder="인증번호를 입력해주세요."
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={인증확인}>인증하기</button>

            <p>{message}</p>
            {isVerified && (
                <div className="Cerification-nav">
                    <div onClick={() => navigate("/infoCorrection")}>회원정보 수정</div>
                    <div onClick={() => navigate("/unlink")}>회원 탈퇴</div>
                </div>
            )}
        </div>
    );
}

export default AdminMypageCertification;