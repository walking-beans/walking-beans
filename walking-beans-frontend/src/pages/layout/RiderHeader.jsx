import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "./RiderHeader.css";

import riderLogoImg from "../../images/rider/walkingBeans_rider.svg";
import toggleIcon from "../../images/rider/toggle_rider.svg";
import myPage from "../../images/rider/myPageIcon.svg";
import incomeList from "../../images/rider/incomeListIcon.svg";
import income from "../../images/rider/incomeIcon.svg";
import chatting from "../../images/rider/chattingIcon.svg";
import customerService from "../../images/rider/customerServiceIcon.svg";


import apiRiderService from "../../components/rider/apiRiderService";
import starRatingPath from "../../components/star/starPath";

const RiderHeader = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [visible, setVisible] = useState(false);
    const [star, setStar] = useState(0);
    const [starPath, setStarPath] = useState("");
    const [errMessage, setErrMessage] = useState("");

    useEffect(() => {
        apiRiderService.getRiderStarRating(2, (newStar) => {
            setStar(newStar);
            starRatingPath.getStarPath(newStar, setStarPath);
        }, setErrMessage);
    }, []);

    console.log("star 정보 : ", star)
    {/* sessiong 정보 삭제 후 로그아웃 */}

    return (
        <header className="rider-header">
            {/* main log */}
            <div className="MainLogo">
                <Link to="/rider">
                    <img src={riderLogoImg}  className="logo-img"/>
                </Link>
            </div>

            {/* toggleIcon */}
            <div className="right-icons">
                <button onClick={() => setVisible(!visible)} className="">
                    <img src={toggleIcon}/>
                </button>
            </div>
            {
                visible? (
                    <div className="nav-bar-toggle-icon">
                        {/*<h5>{user.userName}</h5>*/}
                        {/* 리뷰 별점 받기 */}
                        <ul>
                            <li><Link to="/admin/mypage"><img src={myPage}/>마이페이지</Link></li>
                            <li><Link to="/rider/income"><img src={income}/>내 수입</Link></li>
                            <li><Link to="/rider/orderlist"><img src={incomeList}/>배달기록</Link></li>
                            <li><Link to="/admin/chatting/:userId"><img src={chatting}/>채팅</Link></li>
                            <li><Link to="/rider"><img src={customerService}/>고객센터 문의하기</Link></li>
                            <li><img src={starPath}/></li>
                        </ul>
                        <button>운행 종료</button>
                        <button>로그아웃</button>
                    </div>
                ) : (
                    <div></div>
                )
            }
        </header>
    )
}

export default RiderHeader;