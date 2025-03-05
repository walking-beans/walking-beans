import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:7070/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userEmail, userPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                window.dispatchEvent(new Event("userChange")); // 상태 변경 이벤트 발생

                alert("로그인 성공! 메인 페이지로 이동합니다.");
                navigate("/");
            } else {
                setError(data.message || "로그인에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("로그인 요청 중 오류 발생:", error);
            setError("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <h3>로그인</h3>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">아이디(이메일)</label>
                        <input
                            type="text"
                            className="form-control"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">비밀번호</label>
                        <input
                            type="password"
                            className="form-control"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">
                        로그인
                    </button>
                </form>

                <div className="social-login">
                    <button className="kakao-login">
                        <img src="/images/kakao_icon.png" alt="Kakao" />
                        로그인
                    </button>
                    <button className="naver-login">
                        <img src="/images/naver_icon.png" alt="Naver" />
                        로그인
                    </button>
                </div>

                <div className="login-footer">
                    <a href="/signup">회원 가입</a> | <a href="/find-account">아이디 / 비밀번호 찾기</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
