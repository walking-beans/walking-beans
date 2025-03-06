import React, {useEffect, useState} from "react";
import apiUserService from "../../service/apiUserService";
import {useNavigate} from "react-router-dom";

const AdminLogin = () => {
    return (
        <div>
            <AdminLoginNomal /> {/*아이디 비밀번호 로그인*/}
            {/*<AdminLoginSocial/>*/} {/*소셜 로그인*/}
        </div>
    )

}

const AdminLoginNomal = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [loginResult, setLoginresult] = useState("");
    const [role, setRole] = useState("");
    const [errMessage, setErrmessage] = useState("");


    const handleLongin = () => {
        apiUserService.login(userEmail, userPassword, (response => {
            if (response === "success") { // 로그인 결과에 따른 값
                setLoginresult("success");
            } else {
                setLoginresult("fail");
            }
        }));
    }

    useEffect(() => {
        if (loginResult === "success") {
            // 로그인 성공 후의 처리
            console.log("로그인 성공!");
            //apiUserService.sessionData(setRole); // 세션 데이터 가져오기

            apiUserService.sessionData((data) => {
                // data를 콘솔에 출력
                console.log("세션 데이터: ", data);
                setRole(data.role); // 역할 설정 예시
            });

            // sessionStorage에서 직접 데이터 확인
            const user = JSON.parse(localStorage.getItem("user"));
            console.log("localStorage에서 가져온 사용자 데이터: ", user); // 콘솔에 출력

            navigate("/");
        } else if (loginResult === "fail") {
            console.log("로그인 실패");
            setErrmessage("아이디나 비밀번호가 일치하지 않습니다");
        }
    }, [loginResult]); // loginResult가 변경될 때마다 실행

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <h3>로그인</h3>
                </div>
                <form>
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
                    <button type="button" onClick={handleLongin} className="login-btn">
                        로그인
                    </button>
                </form>

                <div className="social-login">
                    <button className="kakao-login">
                        <img src="/images/kakao_icon.png" alt="Kakao"/>
                        로그인
                    </button>
                    <button className="naver-login">
                        <img src="/images/naver_icon.png" alt="Naver"/>
                        로그인
                    </button>
                </div>

                <div className="login-footer">
                    <a href="/signup">회원 가입</a> | <a href="/find-account">아이디 / 비밀번호 찾기</a>
                </div>
            </div>
        </div>
    )
}

const AdminLoginSocial = () => {


    const kakaoLogin = () => {

    }

    return (
        <div>
            <div className="login-container">
                <h3>로그인</h3>
                <div className="social-login">
                    <button className="kakao-login">
                        <img src={require('../../images/kakaoLoginButton.png')} onClick={kakaoLogin}/>
                    </button>
                    <button className="naver-login">
                        <img src={require('../../images/naverLoginButton.png')}/>
                    </button>
                </div>
            </div>
        </div>
    )
}


export default AdminLogin;