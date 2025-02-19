import {Link, useNavigate} from "react-router-dom";
import userHome from "../components/UserHome";
import {useState} from "react";

const RiderHeader = () => {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    {/* sessiong 정보 삭제 후 로그아웃 */}
    const handleLogOut = () => {
        // invalidate session


        // main 으로 돌아가기
        navigate("/");
    }

    return (
        <header>
            <h3>Rider Header</h3>
            <h5>{user.userName}</h5>
            {/* 리뷰 별점 받기 */}

            <nav>
               <ul>
                   <li><Link to="/admin/mypage">마이페이지</Link></li>
                   <li><Link to="/rider/income">내 수입</Link></li>
                   <li><Link to="/rider/orderlist">배달기록</Link></li>
                   <li><Link to="/admin/chatting/:userId">채팅</Link></li>
                   <li><Link to="/rider">고객센터 문의하기</Link></li>
               </ul>
            </nav>
            <button onClick={handleLogOut}>로그아웃</button>
        </header>
    )
}

export default RiderHeader;