import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
    const [emailError, setEmailError] = useState("");
    const [codeError, setCodeError] = useState("");
    const location = useLocation();
    const redirectTo = location.state?.redirectTo || null;

    function authentication() {
        if (!email.trim()) {
            setEmailError("이메일을 입력해 주세요.");
            setMessage("");
            return;
        }

        if (!email.includes("@")) {
            setEmailError("이메일 형식을 맞춰 작성해 주세요. 예) beans@naver.com");
            setMessage("");
            return;
        }

        apiUserService.sendEmailCode(
            email,
            (data) => {
                setEmailError(data);
                setMessage("");
            },
            () => {
                setEmailError("이메일 전송에 실패했습니다. 다시 시도해 주세요.");
                setMessage("");
            }
        );
    }

    function verifyingAuthentication() {
        if (!code.trim()) {
            setCodeError("인증번호를 입력해 주세요.");
            return;
        }

        apiUserService.checkEmailCode(
            email,
            code,
            (data) => {
                setCodeError(data);
                setEmailError("");

                // 공백이면 넘어가지 않도록 조건 수정
                if (data === "") {
                    setIsVerified(true);

                    setTimeout(() => {
                        if (redirectTo) {
                            navigate(redirectTo);
                        }
                    }, 300);
                } else {
                    setCodeError(data); // 에러 메시지 보여주기
                }
            },
            () => {
                setCodeError("인증번호 확인 실패");
                setEmailError("");
            }
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
                <div className="user-order-menu-container">
                    <h2 className="mypage-title-center">이메일 인증하기</h2>
                    <div className="mypage-hr"></div>
                    <div className="info-text">해당 서비스는 이메일 인증 후 이용할 수 있습니다.</div>
                    <div className="title-text">이메일</div>

                    <div className="">
                        <div className="certification-grid">
                            <input
                                type="email"
                                placeholder="인증 받을 이메일을 입력해 주세요."
                                value={email}
                                onChange={(e) => setEmail(e.target.value.trim())}
                            />
                            <button className="click-btn" onClick={authentication}>인증번호 받기</button>
                        </div>
                        {(message || emailError) && (
                            <div className="error-text">{message || emailError}</div>
                        )}
                    </div>

                    <div className="mt-4">
                    <div className="title-text">인증번호</div>
                    <input
                        type="text"
                        placeholder="인증번호를 입력해 주세요."
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                        {codeError && <div className="error-text">{codeError}</div>}
                    </div>

                    <div className="user-order-click-btn-one mt-30px">
                        <button className="click-btn-b" onClick={verifyingAuthentication}>인증하기</button>
                    </div>
                </div>
        </div>
    );
}

export default AdminMypageCertification;
