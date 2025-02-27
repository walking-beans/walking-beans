import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserHeader.css";

import bellIcon from "../../images/bell.svg";
import chatBubble from "../../images/chat_bubble.svg";
import closeIcon from "../../images/close.svg";
import logoImg from "../../images/walkingBeans.svg";
import packages from "../../images/package.svg";
import person from "../../images/person.svg";
import receipt from "../../images/receipt.svg";
import searchIcon from "../../images/search.svg";
import shoppingBasket from "../../images/shopping_basket.svg";
import toggleIcon from "../../images/togle.svg";
import userIcon from "../../images/user.svg";

const UserHeader = ({ user }) => {
    const [currentUser, setCurrentUser] = useState(user);
    const [navOpen, setNavOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, [user]);

    const handleToggleNav = () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
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

    return (
        <div className="user-header-wrapper">
            <header className="custom-header">
                <div className="custom-header-container">

                    <div className="left-icons">
                        <img src={userIcon} className="header-icon" alt="role-icon" />
                    </div>

                    <div className="center-logo">
                        <img
                            src={logoImg}
                            className="logo-img"
                            alt="logo"
                            onClick={() => navigate("/")}
                        />
                    </div>

                    <div className="right-icons">
                        {currentUser && (
                            <>
                                <img src={bellIcon} className="header-icon" alt="notifications" />
                                <img src={searchIcon} className="header-icon" alt="search" />
                            </>
                        )}
                        <img src={toggleIcon} className="header-icon" alt="toggle" onClick={handleToggleNav} />
                    </div>
                </div>

                <div className={`side-nav ${navOpen ? "open" : ""}`}>
                    <div className="side-nav-content">
                        <button className="close-btn" onClick={handleToggleNav}>
                            <img src={closeIcon} alt="닫기" />
                        </button>

                        <ul className="nav-menu list-unstyled">
                            <li>
                                <a href="/">
                                    <img src={person} /> 마이페이지
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src={shoppingBasket} /> 장바구니
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src={packages} /> 주문현황
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src={receipt} /> 주문내역
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src={chatBubble} /> 채팅
                                </a>
                            </li>
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

export default UserHeader;
