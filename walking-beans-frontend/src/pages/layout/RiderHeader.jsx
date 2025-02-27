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
        <header>
            <nav className="navbar bg-body-tertiary">
                <div className="rider-header container-fluid">
                    <div></div>
                    <Link className="navbar-brand" to="/rider"><img src={riderLogoImg}  className="logo-img"/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar"
                         aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <div>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                        aria-label="Close">
                                </button>
                            </div>

                            <div>
                                <h5 className="offcanvas-title col-6" id="offcanvasNavbarLabel">Offcanvas</h5>
                                {
                                    user ? (
                                        <div className="btn btn-warning onDuty-btn">운행 중</div>
                                    ) : (
                                        <div className="btn btn-secondary">운행 종료</div>
                                    )
                                }
                            </div>

                            <div><img src={starPath}/></div>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link to="/rider" className="nav-link active" aria-current="page">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/mypage" className="nav-link"><img src={myPage}/>마이페이지</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/rider/income" className="nav-link"><img src={income}/>내 수입</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/rider/orderlist" className="nav-link"><img src={incomeList}/>배달기록</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/chatting/:userId" className="nav-link"><img src={chatting}/>채팅</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/rider" className="nav-link"><img src={customerService}/>고객센터 문의하기</Link>
                                </li>
                            </ul>
                            <button className="btn btn-outline-secondary">운행 종료</button>
                            <button className="btn btn-outline-primary">로그아웃</button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
/*<div className="rider-header">
    {/!* main log *!/}
    <div className="MainLogo">
        <Link to="/rider">
            <img src={riderLogoImg}  className="logo-img"/>
        </Link>
    </div>

    {/!* toggleIcon *!/}
    <div className="right-icons">
        <button onClick={() => setVisible(!visible)} className="">
            <img src={toggleIcon}/>
        </button>
    </div>
</div>
{
    visible? (
        <div className="nav-bar-toggle-icon">
            {/!*<h5>{user.userName}</h5>*!/}
            {/!* 리뷰 별점 받기 *!/}
            <div>라이더님</div>
            <div><img src={starPath}/></div>
            <div>운행종료</div>
            <ul>
                <li><Link to="/admin/mypage" onClick={visibility}><img src={myPage}/>마이페이지</Link></li>
                <li><Link to="/rider/income" onClick={visibility}><img src={income}/>내 수입</Link></li>
                <li><Link to="/rider/orderlist" onClick={visibility}><img src={incomeList}/>배달기록</Link></li>
                <li><Link to="/admin/chatting/:userId" onClick={visibility}><img src={chatting}/>채팅</Link></li>
                <li><Link to="/rider" onClick={visibility}><img src={customerService}/>고객센터 문의하기</Link></li>
            </ul>
            <button>운행 종료</button>
            <button>로그아웃</button>
        </div>
    ) : (
        <div></div>
    )
}*/

export default RiderHeader;