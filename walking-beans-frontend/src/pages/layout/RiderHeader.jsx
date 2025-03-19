import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RiderHeader.css";

import list from "../../assert/svg/riderNav/list.svg";
import logoImg from "../../assert/svg/riderNav/walkingBeansBlack.svg";
import payment from "../../assert/svg/riderNav/payments.svg";
import person from "../../assert/svg/riderNav/person_round_black.svg";
import rider from "../../assert/svg/riderNav/delivery_dining.svg";
import supportAgent from "../../assert/svg/riderNav/support_agent.svg";
import textsms from "../../assert/svg/riderNav/textsms.svg";
import toggleIcon from "../../assert/svg/menu_black.svg";

import apiRiderService from "../../service/apiRiderService";
import starRatingPath from "../../components/star/starPath";


const RiderHeader = ({user}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(user);
    const [navOpen, setNavOpen] = useState(false);

    const [star, setStar] = useState(0);
    const [starPath, setStarPath] = useState("");

    // 유저 정보 로드
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, [user]);

    /**
     * 네비게이션바 토글아이콘  함수
     * toggleIcon from "../../assert/svg/togle.svg
     */
    const handleToggleNav = () => {
        if (!localStorage.getItem("user")) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        } else {
            setNavOpen((prev) => !prev);
        }
    };

    // 로그아웃 함수
    const handleLogout = () => {
        localStorage.removeItem("user");
        alert("로그아웃 되었습니다.");
        setCurrentUser(null);
        setNavOpen(false);
        navigate("/");
    };

    /**
     * person from "../../assert/svg/riderNav/person_round_black.svg"
     * 사용자 아이콘 클릭 시 이동
     */
    const handleUserIconClick = () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        const parsedUser = JSON.parse(storedUser);
        const rolePaths = {
            user: "/mypage",
            rider: location.pathname === "/rider" ? "/" : "/rider",
            store: "/owner",
            admin: "/admin"
        };

        navigate(rolePaths[parsedUser.user_role] || "/");
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        apiRiderService.getRiderStarRating(2, (newStar) => {
            setStar(newStar);
            starRatingPath.getStarPath(newStar, setStarPath);
        });
    }, []);


    return (
        <div className="rider-header-wrapper">
            <header className="rider-header">
                <div className="rider-header-container">
                    <div className="left-icons">
                        <img src={rider}
                             className="header-icon"
                             alt="role-icon"
                             onClick={handleUserIconClick}
                        />
                    </div>
                    <div className="center-logo">
                        <img src={logoImg}
                             className="logo-img"
                             alt="logo"
                             onClick={() => navigate("/rider")}
                        />
                    </div>
                    <div className="rider-menu-container">
                        {currentUser && (
                            <>
                                {/*
                                알림 및 검색 아이콘을 필요하면 추가
                                <img src={bellIcon} className="header-icon" alt="notifications" />
                                <img src={searchIcon} className="header-icon" alt="search" />
                             */}
                            </>
                        )}
                        <img src={toggleIcon}
                             className="header-icon"
                             alt="toggle"
                             onClick={handleToggleNav}/>
                    </div>
                </div>

                <div className={`rider-side-nav ${navOpen ? "open" : ""}`}>
                    <div className="rider-side-nav-content">
                        <div className="rider-info">
                            <div className="rider-name-container">
                                <div className="d-flex align-items-center">
                                    <div className="rider-name">
                                        {currentUser?.user_name}
                                    </div>
                                    <div className="rider-role">
                                        라이더님
                                    </div>
                                </div>
                                <div className="rider-stars">
                                    <img src={starPath}/>
                                </div>
                            </div>
                            <button className="rider-status-btn">
                                운행 중
                            </button>
                        </div>

                        <ul className="rider-nav-menu list-unstyled">
                            {[
                                {icon: person, text: "마이페이지", path: "/rider"},
                                {icon: payment, text: "내 수입", path: "/rider/income"},
                                {icon: list, text: "배달기록", path: "/rider/orderlist"},
                                {icon: textsms, text: "채팅", path: "/chat/chattingroom"},
                                {icon: supportAgent, text: "고객센터 문의하기", path: "/rider"}
                            ].map(({icon, text, path}) => (
                                <li key={text}>
                                    <a href={path}>
                                        <img src={icon} alt={text}/> {text}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <button className="rider-nav-logout-btn"
                                onClick={handleLogout}
                        >
                            로그아웃
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default RiderHeader;
