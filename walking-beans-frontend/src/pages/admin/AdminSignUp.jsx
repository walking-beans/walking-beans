
import apiUserService from "../../service/apiUserService";
import {useState} from "react";
// 유저 롤 업데이트 테스트용

const AdminSignUp = () => {
    const userEmail = "admin1";
    const userRole = "4";
    const [callback, setCallback] = useState("");

    const changeRole = () => {
        apiUserService.updateRole(userEmail, userRole, setCallback);
        if (callback === "success"){
            alert("등급이 수정되었습니다.");
        }
    }

    return(
        <div>
            <button onClick={changeRole}>롤 수정하기</button>
        </div>
    )
}

export default AdminSignUp;