import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserHeader.css";
import axios from "axios"; //
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
import OrderNotification from "../owner/teacherUi/OrderNotification";

const OwnerHeader = ({user}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(user);
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, [user]);


    const handleToggleNav = () => {
        if (!localStorage.getItem("user")) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        } else {
            setNavOpen((prev) => !prev);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        alert("로그아웃 되었습니다.");
        setCurrentUser(null);
        setNavOpen(false);
        navigate("/");
    };


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

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log("로드된 사용자 정보:", parsedUser);

            if (!parsedUser.storeId) {
                console.warn("⚠ storeId가 없음. API에서 가져오는 중...");
                fetchStoreId(parsedUser.user_id, parsedUser);
            } else {
                setCurrentUser(parsedUser);
            }
        } else {
            console.warn("⚠ localStorage에서 사용자 정보를 찾을 수 없음.");
        }
    }, []);

    const fetchStoreId = async (userId, parsedUser) => {

        console.log("userId" ,userId);
        try {
            const response = await axios.get(`http://localhost:7070/api/store/mystore/${userId}`);
            const storeId = response.data.storeId;

            console.log("🏪 API에서 가져온 storeId:", storeId);

            if (storeId) {
                const updatedUser = { ...parsedUser, storeId };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setCurrentUser(updatedUser);
            } else {
                console.warn("storeId를 가져올 수 없음.");
            }
        } catch (error) {
            console.error("storeId를 가져오는 중 오류 발생:", error);
        }
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
                        {currentUser && currentUser.storeId ? (
                            <OrderNotification storeId={currentUser.storeId} />
                        ) : (
                            console.warn("⚠ currentUser.storeId가 undefined입니다.")
                        )
                        }
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