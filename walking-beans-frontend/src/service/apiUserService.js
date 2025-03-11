import axios from "axios";
import {Link} from "react-router-dom";

const USER_API_URL = "http://localhost:7070/api/users"

const apiUserService = {
    // 로그인 api
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

    //로그아웃 api
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

    //세션 데이터를 가져오는 api
    sessionData:
        function (callback) {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                callback(user); // 콜백에 사용자 정보 전달
            } else {
                callback(null); // 사용자 정보가 없으면 null 전달
            }
        },

    // 유저 롤 수정하는 api
    updateRole:
        function (userEmail, userRole) {
            axios
                .put(`${USER_API_URL}/${userEmail}/${userRole}`)
                .then(
                    (res) => {
                        console.log("유저 롤이 수정되었습니다.");
                    }
                )
                .catch(
                    (err) => {
                        alert("유저 롤을 수정하는데 백엔드에서 문제가 생겼습니다.");
                    }
                )
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
        function (code, dataCallback){
            axios
                .get(`/oauth/kakao/callback?code=${code}`)
                .then(
                    (res) => {
                        if (res.data) {
                            dataCallback(res.data);
                        }
                    })
                .catch(
                    (err) => {
                        alert("백엔드에서 오류가 발생했습니다.");
                    }
                )
        },

    naverLogin:
        function (callback) {
            axios
                .get("/oauth/naver/login")
                .then(
                    (res) => {
                        callback(res.data);
                    }
                )
                .catch(
                    (err) => {
                        alert("백엔드와의 연결에 실패했습니다.");
                    }
                )
        },
}

export default apiUserService;