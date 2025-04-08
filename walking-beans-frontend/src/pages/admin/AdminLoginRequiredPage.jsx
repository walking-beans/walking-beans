import {useLocation, useNavigate} from "react-router-dom";
import failIcon from "../../assert/images/user/failIcon.svg";
import {useEffect, useState} from "react";
import axios from "axios";

const AdminLoginRequiredPage = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const location = useLocation();
    const userId = location.state?.data;
    console.log(location.state);

    console.log(userId);
    useEffect(() => {
        axios
            .get("http://localhost:7070/api/users/getuserdata/" + userId)
            .then(
                (res) => {
                    setDate(res.data.userDate);
                }
            )
            .catch(
                (err) => {
                    console.log("에러");
                    //navigate("/error");
                }
            )
    }, []);


    return (
        <div className="user-order-background">
            <div className="user-order-loading">
                <img src={failIcon}/>
                <div className="user-title-center">계정이 정지되었습니다.</div>
                <div className="response-text">정지 해제 날짜: {date}</div>
                <div className="response-text">서비스 운영정책을 위반하여 계정이 정지되었습니다.</div>
                <div className="response-text">자세한 사항은 고객센터로 문의하세요.</div>
                <div className="user-order-click-btn-one">
                    <button onClick={()=> navigate(`/`)} className="user-order-btn-b">홈으로 이동</button>
                </div>
            </div>
        </div>
    )
}

export default AdminLoginRequiredPage;