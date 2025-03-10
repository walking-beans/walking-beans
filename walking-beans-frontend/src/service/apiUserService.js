import axios from "axios";
import {Link} from "react-router-dom";

const USER_API_URL = "http://localhost:7070/api/users"

const apiUserService = {
    login:
        function (userEmail, userPassword, callback) {
            axios
                .post(`${USER_API_URL}/login`,
                    {userEmail, userPassword}, {withCredentials: true}
                )
                .then(
                    (res) => {
                        if (res.data.status === "success") {
                            localStorage.setItem("user", JSON.stringify(res.data.user));
                            callback("success");
                        } else {
                            callback("fail");
                        }
                    }
                )
                .catch(
                    (err) => {
                        console.log("백엔드에서 오류가 발생했습니다.(로그인)" + err);
                    }
                )
        },

    logout:
        function () {
            axios
                .post(`${USER_API_URL}/logout`, {withCredentials: true})
                .then(
                    (res) => {
                        alert("로그아웃 완료");
                        localStorage.removeItem("user");
                    }
                )
                .catch(
                    (err) => {
                        console.log("백엔드에서 오류가 발생했습니다.(로그아웃)" + err);
                    }
                )
        },

    sessionData:
        function (callback) {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                callback(user); // 콜백에 사용자 정보 전달
            } else {
                callback(null); // 사용자 정보가 없으면 null 전달
            }
        },

    kakaoLogin:
        function (callback) {
            axios
                .get("/oauth/kakao/login")
                .then(
                    (res)=>{
                        callback(res.data);
                    }
                )
                .catch(
                    (err) => {
                        alert("백엔드와의 연결에 실패했습니다.");
                        console.log("err: ", err);
                    }
                )
        },

    kakaoCallback:
        function (code){
            axios
                .get(`/oauth/kakao/callback?code=${code}`)
                .then(
                    (res) => {
                        if (res.data){
                            window.location.href = res.data.redirectUrl;
                            // DB에 저장까지 끝내고 리엑트 페이지로 돌아오기 해결
                        }else {
                            console.log("리다이렉트 url 불러오기 실패");
                        }
                    }
                )
                .catch(
                    (err) => {
                        alert("백엔드에서 오류가 발생했습니다.");
                    }
                )
        },
}

export default apiUserService;