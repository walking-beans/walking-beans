import axios, {call} from "axios";
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
        function (userEmail, userRole, callback) {
            axios
                .put(`${USER_API_URL}/${userEmail}/${userRole}`)
                .then(
                    (res) => {
                        callback("success");
                    }
                )
                .catch(
                    (err) => {
                        alert("등급을 수정하는데 백엔드에서 문제가 생겼습니다.");
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


    // 마이페이지
    mypage:
        function (userId, callback, errorCallback) {
            axios
                .get(`${USER_API_URL}/mypage/${userId}`)
                .then((res) => {
                    callback(res.data);
                })
                .catch((err) => {
                    console.error("사용자 정보를 불러오는 중 오류 발생:", err);
                    errorCallback("사용자 정보를 불러오는 데 실패했습니다.");
                });
        },

    // 프로필 사진
    uploadProfileImage:
        function (userId, file, callback, errorCallback) {
        const formData = new FormData();
        formData.append("file",file);

            console.log("📢 업로드할 파일:", file);

            axios
            .post(`${USER_API_URL}/mypage/${userId}/uploadProfile`, formData, {

                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log("✅ 프로필 업로드 성공:", res.data);
                callback(res.data);
            })
            .catch((err) => {
                console.error("프로필 이미지 업로드 중 오류 발생:", err);
                errorCallback("프로필 이미지를 업로드하는 데 실패했습니다.");
            });
        },

    // 회원정보 수정
    infoCorrection:
    function (userId, userPhone, callback, errorCallback ) {
        axios
            .put(`${USER_API_URL}/infoCorrection`,null,{
                params: { userId: userId, userPhone: userPhone }
            })
            .then((res) => {
            callback(res.data)
        })
            .catch((err) => {
                console.log("오류",err)
                errorCallback("전화번호 수정에 실패하였습니다.")
            })
    },

    // 회원 탈퇴
    delete:
    function (userId, callback, errorCallback) {
        axios
            .delete(`${USER_API_URL}/unlink/${userId}`)
            .then((res)=>callback&&callback(res.data))
            .catch((err)=>errorCallback&&errorCallback(err));

    },

    primaryAddress:
    function (userId,setUserAddress,setUserLat,setUserLng){
        if (userId) {
            axios.get(`http://localhost:7070/api/addresses/${userId}`)
                .then((res) => {
                    console.log("API 응답 데이터:", res.data);
                    const primaryAddress = res.data.find(addr => addr.addressRole === 1);
                    if (primaryAddress) {
                        setUserAddress(primaryAddress);
                        setUserLat(primaryAddress.addressLatitude);
                        setUserLng(primaryAddress.addressLongitude);
                    } else {
                        console.log("기본 주소가 없습니다.");
                    }
                })
                .catch((error) => {
                    console.error("주소 목록 불러오기 오류:", error);
                });
        }
    },


    sendEmailCode: function (email, callback, errorCallback) {
        axios
            .post(`${USER_API_URL}/sendCode`, { email })
            .then((res) => callback && callback(res.data))
            .catch((err) => errorCallback && errorCallback(err));
    },

    checkEmailCode: function (email, code, callback, errorCallback) {
        axios
            .post(`${USER_API_URL}/checkCode`, { email, code })
            .then((res) => callback && callback(res.data))
            .catch((err) => errorCallback && errorCallback(err));
    },



}

export default apiUserService;