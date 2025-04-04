import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OwnerHeader.css";

import bellIcon from "../../assert/svg/bell.svg";
import chatBubble from "../../assert/svg/userNav/chat_bubble.svg";
import logoImg from "../../assert/svg/userNav/walkingBeans.svg";
import packages from "../../assert/svg/userNav/package.svg";
import receipt from "../../assert/svg/userNav/receipt.svg";
import home from "../../assert/svg/ownerNav/home.svg";
import store from "../../assert/svg/ownerNav/store.svg";
import barChart from "../../assert/svg/ownerNav/bar_chart.svg";
import chefHat from "../../assert/svg/ownerNav/chefhat.svg";
import searchIcon from "../../assert/svg/userNav/search.svg";
import shoppingBasket from "../../assert/svg/userNav/shopping_basket.svg";
import toggleIcon from "../../assert/svg/togle.svg";
import storeIcon from "../../assert/svg/ownerNav/storeIcon.svg";

const OwnerHeader = ({user}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(user);
    const [navOpen, setNavOpen] = useState(false);

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
     * userIcon from "../../assert/svg/user.svg
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
            owner: location.pathname === "/owner" ? "/" : "/owner",
            admin: "/admin"
        };
        navigate(rolePaths[parsedUser.user_role] || "/");
    };

    return (
        <div className="user-header-wrapper">
            <header className="custom-header">
                <div className="custom-header-container">
                    <div className="left-icons">
                        <img src={storeIcon}
                             className="header-icon"
                             alt="role-icon"
                             onClick={handleUserIconClick}/>
                    </div>
                    <div className="center-logo">
                        <img src={logoImg} className="logo-img" alt="logo" onClick={() => navigate("/")}/>
                    </div>
                    <div className="user-menu-container">
                        {currentUser && (
                            <>
                                <img src={bellIcon} className="header-icon" alt="notifications"/>
                                <img src={searchIcon} className="header-icon" alt="search"/>
                            </>
                        )}
                        <img src={toggleIcon} className="header-icon" alt="toggle" onClick={handleToggleNav}/>
                    </div>
                </div>

                <div className={`side-nav ${navOpen ? "open" : ""}`}>
                    <div className="side-nav-content">
                        {/*
                        <button className="close-btn" onClick={handleToggleNav}>
                            <img src={closeIcon} alt="닫기" />
                        </button>
                        */}
                        <ul className="nav-menu list-unstyled">
                            {[


                                {icon: store, text: "내 가게 정보", path: "/"},
                                {icon: chefHat, text: "메뉴관리", path: "/"},
                                {icon: receipt, text: "주문보기", path: "/"},
                                {icon: barChart, text: "매출조회", path: "/"},
                                {icon: chatBubble, text: "채팅", path: "/"}
                            ].map(({icon, text, path}) => (
                                <li key={text}>
                                    <a href={path}>
                                        <img src={icon} alt={text}/> {text}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <button className="nav-logout-btn" onClick={handleLogout}>
                            로그아웃
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default OwnerHeader;