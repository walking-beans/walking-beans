import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RiderHeader.css";

import chatBubble from "../../images/chat_bubble.svg";
import closeIcon from "../../images/close_white.svg";
import listAlt from "../../images/list_alt.svg";
import logoImg from "../../images/walkingBeans_black.png";
import monetizationOn from "../../images/monetization_on.svg";
import person from "../../images/person.svg";
import supportAgent from "../../images/support_agent.svg";
import toggleIcon from "../../images/menu_black.svg";

const RiderHeader = ({ user }) => {
    const [currentUser, setCurrentUser] = useState(user);
    const [riderNavOpen, setRiderNavOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, [user]);

    const handleToggleNav = () => {
        if (!currentUser) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        } else {
            setRiderNavOpen((prev) => !prev);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setCurrentUser(null);
        window.dispatchEvent(new Event("userChange"));
        alert("로그아웃 되었습니다.");
        setRiderNavOpen(false);
        navigate("/");
    };

    return (
        <div className="rider-header-wrapper">
            <header className="rider-custom-header">
                <div className="rider-custom-header-container d-flex justify-content-between align-items-center">
                    <div className="rider-logo-container">
                        <img src={logoImg} className="rider-logo-img" alt="rider-logo" />
                    </div>

                    <div className="rider-menu-container">
                        <img src={toggleIcon} className="rider-menu-icon" alt="rider-toggle" onClick={handleToggleNav} />
                    </div>
                </div>

                <div className={`rider-side-nav ${riderNavOpen ? "open" : ""}`}>
                    <button className="rider-close-btn" onClick={handleToggleNav}>
                        <img src={closeIcon} alt="닫기" />
                    </button>

                    <div className="rider-info">
                        <div className="rider-name-container">
                            <div className="d-flex align-items-center">
                                <div className="rider-name">{currentUser?.user_name}</div>
                                <div className="rider-role"> 라이더님</div>
                            </div>
                            <div className="rider-stars">⭐⭐⭐⭐⭐</div>
                        </div>

                        <button className="rider-status-btn">운행 중</button>
                    </div>

                    <ul className="rider-nav-menu list-unstyled">
                        <li><a href="/"> 마이페이지</a></li>
                        <li><a href="/"> 내 수입</a></li>
                        <li><a href="/"> 배달기록</a></li>
                        <li><a href="/"> 채팅</a></li>
                        <li><a href="/"> 고객센터 문의하기</a></li>
                    </ul>

                    <button className="rider-nav-logout-btn" onClick={handleLogout}>
                        로그아웃
                    </button>
                </div>
            </header>
        </div>
    );
};

export default RiderHeader;
