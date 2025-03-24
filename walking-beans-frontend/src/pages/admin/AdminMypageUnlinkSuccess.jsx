import {useEffect} from "react";
import apiUserService from "../../service/apiUserService";


function AdminMypageUnlinkSuccess() {

    useEffect(() => {
        apiUserService.logout();
    }, []);

    return (
        <div>
            <h2>회원 탈퇴가 완료되었습니다.</h2>
            <p>이용해 주셔서 감사합니다.</p>
            <a href="/">홈으로</a>
        </div>
    );
}

export default AdminMypageUnlinkSuccess;

