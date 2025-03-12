import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserHeader.css";

import bellIcon from "../../assert/svg/bell.svg";
import chatBubble from "../../assert/svg/userNav/chat_bubble.svg";
import logoImg from "../../assert/svg/userNav/walkingBeans.svg";
import packages from "../../assert/svg/userNav/package.svg";
import person from "../../assert/svg/riderNav/person.svg";
import receipt from "../../assert/svg/userNav/receipt.svg";
import searchIcon from "../../assert/svg/userNav/search.svg";
import shoppingBasket from "../../assert/svg/userNav/shopping_basket.svg";
import toggleIcon from "../../assert/svg/togle.svg";
import userIcon from "../../assert/svg/user.svg";

const UserHeader = ({user}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(user);
    const [navOpen, setNavOpen] = useState(false);

    // �쑀�� �젙蹂� 濡쒕뱶
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, [user]);

    /**
     * �꽕鍮꾧쾶�씠�뀡諛� �넗湲�븘�씠肄�  �븿�닔
     * toggleIcon from "../../assert/svg/togle.svg
     */
    const handleToggleNav = () => {
        if (!localStorage.getItem("user")) {
            alert("濡쒓렇�씤�씠 �븘�슂�빀�땲�떎.");
            navigate("/login");
        } else {
            setNavOpen((prev) => !prev);
        }
    };

    // 濡쒓렇�븘�썐 �븿�닔
    const handleLogout = () => {
        localStorage.removeItem("user");
        alert("濡쒓렇�븘�썐 �릺�뿀�뒿�땲�떎.");
        setCurrentUser(null);
        setNavOpen(false);
        navigate("/");
    };

    /**
     * userIcon from "../../assert/svg/user.svg
     * �궗�슜�옄 �븘�씠肄� �겢由� �떆 �씠�룞
     */
    const handleUserIconClick = () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            alert("濡쒓렇�씤�씠 �븘�슂�빀�땲�떎.");
            navigate("/login");
            return;
        }

        const parsedUser = JSON.parse(storedUser);
        const rolePaths = {
            user: location.pathname === "/mypage" ? "/" : "/mypage",
            rider: location.pathname === "/rider" ? "/" : "/rider",
            owner: location.pathname === "/owner" ? "/" : "/owner",
            admin: location.pathname === "/admin" ? "/" : "/admin"
        };

        /*
            위 rolePaths 의 경우
            const roles = ["user", "rider", "owner", "admin"];
            const rolePaths = Object.fromEntries(
                roles.map(role => [
                    role,
                    location.pathname === `/${role === "user" ? "mypage" : role}`
                        ? "/"
                        : `/${role === "user" ? "mypage" : role}`
                ])
            );
            추후 이 코드로 변경해주는 것이 좋음
        */
        navigate(rolePaths[parsedUser.user_role] || "/");
    };

    return (
        <div className="user-header-wrapper">
            <header className="custom-header">
                <div className="custom-header-container">
                    <div className="left-icons">
                        <img src={userIcon} className="header-icon" alt="role-icon" onClick={handleUserIconClick}/>
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
                            <img src={closeIcon} alt="�떕湲�" />
                        </button>
                        */}
                        <ul className="nav-menu list-unstyled">
                            {[
                                {icon: person, text: "留덉씠�럹�씠吏", path: "/"},
                                {icon: shoppingBasket, text: "�옣諛붽뎄�땲", path: "/"},
                                {icon: packages, text: "二쇰Ц�쁽�솴", path: "/"},
                                {icon: receipt, text: "二쇰Ц�궡�뿭", path: "/"},
                                {icon: chatBubble, text: "梨꾪똿", path: "/"}
                            ].map(({icon, text, path}) => (
                                <li key={text}>
                                    <a href={path}>
                                        <img src={icon} alt={text}/> {text}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <button className="nav-logout-btn" onClick={handleLogout}>
                            濡쒓렇�븘�썐
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default UserHeader;