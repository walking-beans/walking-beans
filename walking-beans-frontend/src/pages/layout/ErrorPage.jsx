import failIcon from "../../assert/images/user/failIcon.svg"
import {useNavigate} from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="user-order-background">
            <div className="user-order-loading">
            <img src={failIcon}/>
            <div className="user-title-center">페이지를 찾을 수 없습니다.</div>
            <div className="response-text">페이지의 주소가 올바르지 않거나, 변경/ 삭제되어 이용할 수 없습니다.</div>
            <div className="user-order-click-btn-one">
            <button onClick={()=> navigate(`/`)} className="user-order-btn-b">홈으로 이동</button>
            </div>
            </div>
        </div>
    )
};

export default ErrorPage;