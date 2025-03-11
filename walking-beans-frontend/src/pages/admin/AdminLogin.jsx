import React, {use, useEffect, useState} from "react";
import apiUserService from "../../service/apiUserService";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {call} from "axios";

const AdminLogin = () => {
    return (
        <div>
            <AdminLoginNomal/>{/*아이디 비밀번호 로그인*/}
            {/*<AdminLoginSocial/>*/}{/*소셜 로그인*/}
        </div>
    )

}

const AdminLoginNomal = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [loginResult, setLoginresult] = useState("");
    const [role, setRole] = useState(null);
    const [errMessage, setErrmessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLongin();
    }

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

            apiUserService.sessionData((data) => {
                // 세션 데이터에서 role을 받아서 설정
                console.log("세션 데이터: ", data);
                setRole(data.user_role); // 역할 설정
            });

            // sessionStorage에서 직접 데이터 확인
            const user = JSON.parse(localStorage.getItem("user"));
            console.log("localStorage에서 가져온 사용자 데이터: ", user); // 콘솔에 출력
        } else if (loginResult === "fail") {
            console.log("로그인 실패");
            setErrmessage("아이디나 비밀번호가 일치하지 않습니다");
        }
    }, [loginResult]); // loginResult가 변경될 때마다 실행

    useEffect(() => {
        if (role !== null) {
            switch (role) {
                case "user":
                    navigate("/");
                    break;
                case "rider":
                    navigate("/rider");
                    break;
                case "owner":
                    navigate("/owner");
                    break;
                default:
                    navigate("/");
                    break;
            }
        }
    }, [role]); // role이 변경될 때마다 실행

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <h3>로그인</h3>
                </div>
                <form onSubmit={handleSubmit}>
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
    const [KakaoCallback, setKakaoCallback] = useState("");
    const [NaverCallback, setNaverCallback] = useState("");
    const [role, setRole] = useState(null);
    //const [code, setCode] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // url 에서 이메일 가져와서 비밀번호랑 로그인
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const email = params.get("email");
        if (email) {
            // 로그인 API 호출 (임의 비밀번호 '0000'을 사용)
            apiUserService.login(email, "0000", (status) => {
                if (status === "success") {
                    // 로그인 성공 후 로컬 스토리지에 저장된 사용자 정보 출력
                    const user = JSON.parse(localStorage.getItem("user"));
                    console.log("로그인 성공! 로컬 스토리지의 사용자 정보: ", user);

                    setRole(user.user_role);
                } else {
                    console.log("로그인 실패");
                }
            });
        }
    }, [location, navigate]);

    const kakaoLogin = () => {
        apiUserService.kakaoLogin(setKakaoCallback);
    }

    useEffect(() => {
        if (KakaoCallback) {
            window.location.href = KakaoCallback;
        }
    }, [KakaoCallback]);

    /*
    useEffect(() => {
        if (code){
            finalLogin();
        }
    }, [code]);

    const finalLogin = () => {
        apiUserService.kakaoCallback(code, setCallback);
        navigate("/");
    }*/

    const naverLogin = () => {
        apiUserService.naverLogin(setNaverCallback);
    }

    useEffect(() => {
        if (NaverCallback) {
            window.location.href = NaverCallback;
        }
    }, [NaverCallback]);

    useEffect(() => {
        if (role !== null) {
            switch (role) {
                case "user":
                    navigate("/");
                    break;
                case "rider":
                    navigate("/rider");
                    break;
                case "owner":
                    navigate("/owner");
                    break;
                default:
                    navigate("/");
                    break;
            }
        }
    }, [role]); // role이 변경될 때마다 실행

    return (
        <div>
            <div className="login-container">
                <h3>로그인</h3>
                <div className="social-login">
                    <button className="kakao-login">
                        <img src={require('../../images/kakaoLoginButton.png')} onClick={kakaoLogin}/>
                    </button>
                    <button className="naver-login">
                        <img src={require('../../images/naverLoginButton.png')} onClick={naverLogin}/>
                    </button>
                </div>
                <p>* 가입된 정보가 없을 경우 자동으로 가입됩니다! *</p>
            </div>
        </div>
    )
}


export default AdminLogin;