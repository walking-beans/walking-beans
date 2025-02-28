import {useEffect, useState} from "react";
import apiUserService from "../../service/apiUserService";
import {useNavigate} from "react-router-dom";

const AdminLogin = () => {
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
            }else {
                setLoginresult("fail");
            }
        }));
    }

    useEffect(() => {
        if (loginResult === "success") {
            // 로그인 성공 후의 처리
            console.log("로그인 성공!");
            apiUserService.sessionData(setRole); // 세션 데이터 가져오기
        } else if (loginResult === "fail") {
            console.log("로그인 실패");
            setErrmessage("아이디나 비밀번호가 일치하지 않습니다");
        }
    }, [loginResult]); // loginResult가 변경될 때마다 실행

    useEffect(() => { // role이 업데이트된 후에 실행되는 effect
        console.log(role);
        if (role.user_role === 1,"1"){
            //navigate("/");
        }else if(role.user_role === 2,"2"){

        }
    }, [role]); // role이 변경될 때마다 실행

    return (
        <div>
            <p>아이디</p>
            <input
                type="text"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
            />

            <p>비밀번호</p>
            <input
                type="text"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
            />
            <p>{errMessage}</p>
            <button onClick={handleLongin}>로그인하기</button>
        </div>
    )
}

export default AdminLogin;