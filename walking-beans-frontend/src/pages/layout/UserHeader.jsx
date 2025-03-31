import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserHeader.css";

import bellIcon from "../../assert/svg/bell.svg";
import alarmIcon from "../../assert/svg/alarm.svg";
import chatBubble from "../../assert/svg/userNav/chat_bubble.svg";
import logoImg from "../../assert/svg/userNav/walkingBeans.svg";
import packages from "../../assert/svg/userNav/package.svg";
import person from "../../assert/svg/riderNav/person.svg";
import receipt from "../../assert/svg/userNav/receipt.svg";
import searchIcon from "../../assert/svg/userNav/search.svg";
import shoppingBasket from "../../assert/svg/userNav/shopping_basket.svg";
import toggleIcon from "../../assert/svg/togle.svg";
import userIcon from "../../assert/svg/user.svg";
import apiUserService from "../../service/apiUserService";

const UserHeader = ({user}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(user);
    const [navOpen, setNavOpen] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [displayStores, setDisplayStores] = useState([]);

    const [unreadCount, setUnreadCount] = useState(0); //알림 개수
    const [showDropdown, setShowDropdown] = useState(false); //토글
    const [notifications, setNotifications] = useState([]); //알림 리스트
    const [alretSoket, setAlertSocket] = useState(null); // 웹소켓 상태

    const [userAddress, setUserAddress] = useState(null);  // 주소 상태 관리
    const [userId, setUserId] = useState(null);  // userId 상태
    const [userLat, setUserLat] = useState(null);
    const [userLng, setUserLng] = useState(null);

    // 웹소켓 열기
    useEffect(() => {
        const wsAlert = new WebSocket("ws://localhost:7070/ws/alert");
        const storedUserId = localStorage.getItem("user");
        // JSON 문자열을 객체로 변환
        const userObject = storedUserId ? JSON.parse(storedUserId) : {user_id : "noId"} // user가 null이면 noId넣기

        // 객체에서 user_id를 가져옵니다.
        const userId = userObject.user_id;

        wsAlert.onopen = () => {
            console.log("✅ 알림 WebSocket 연결 성공");
        };

        wsAlert.onmessage = (event) => {

            console.log("📩 새 알림 도착:", event.data); // event.data 로그로 실제 내용을 확인
            try {
                const receivedData = JSON.parse(event.data);  // event.data를 JSON.parse로 변환
                if (receivedData.userId === userId) {
                    setNotifications((prevNotifications) => [
                        ...prevNotifications,
                        {message: receivedData.alarmContent, type: receivedData.alarmRole, senderId: receivedData.alarmSenderId},// 알람리스트
                    ]);

                    setUnreadCount((prevCount) => prevCount + 1);
                }
            } catch (error) {
                console.error("JSON 파싱 오류:", error);  // JSON.parse 오류 발생 시
            }
        };

        //웹 소켓 연결 오류
        wsAlert.onerror = (error) => {
            console.error("🚨 WebSocket 오류:", error);
        };

        // 웹소켓 연결 종료
        wsAlert.onclose = () => {
            console.warn("❌ 알림 WebSocket 연결 종료");
        };

        setAlertSocket(wsAlert);

        return () => wsAlert.close();
    }, []);

    // 유저 정보 로드
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setCurrentUser(parsedUser);
            setUserId(parsedUser.user_id);
        }
    }, [user]);
    //  userId가 설정된 후 대표 주소 가져오기
    useEffect(() => {

        apiUserService.primaryAddress(userId, setUserAddress, setUserLat, setUserLng);
    }, [userId]);

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
        apiUserService.logout();
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
            user: location.pathname === "/mypage" ? "/" : "/mypage",
            rider: location.pathname === "/rider" ? "/" : "/rider",
            owner: location.pathname === "/owner" ? "/" : "/owner",
            admin: "/admin"
        };
        navigate(rolePaths[parsedUser.user_role] || "/");
    };



    // /user/search/map
    const handleOpenSearch = () => {
        if (!userLat || !userLng) {
            alert("대표 주소 정보를 불러올 수 없습니다.");
            return;
        }
        navigate("/user/search/map",{ state: { lat: userLat, lng: userLng }  });
    };

    //알람 토글
    const toggleAlarm = () => {
        if (showDropdown) { //true
            setNotifications([]);// 알림 리스트를 초기화
        } else {
            // 알림을 열 때는 기존 알림 리스트를 비우지 않음
            setUnreadCount(0);  // 알림 아이콘 배지 초기화
        }

        setShowDropdown(!showDropdown);  // 드롭다운 상태 토글
        //setShowDropdown(!showDropdown);
        //setUnreadCount(0);
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
                                <div onClick={toggleAlarm} className={"AlarmNotificationContainer"}>
                                    <img src={showDropdown ? alarmIcon : bellIcon} className="header-icon" alt="notifications" />
                                    {unreadCount > 0 && <span className={"AlarmBadge"}>{unreadCount}</span>}
                                </div>
                                {showDropdown && (
                                    <div className={"AlarmDropdown"}>
                                        {notifications.length > 0 ? (
                                            notifications.map((noti, index) => (
                                                <div key={index} className={"AlarmNotificationItem"} onClick={() => {
                                                    if (noti.type === 1) {
                                                        navigate("/alarmlist");
                                                        //setNotifications([]);//알림 목록 비우기
                                                        setShowDropdown(false); // 알림목록 닫기
                                                    } else if (noti.type === 2) {
                                                        navigate(`/chat/message/${noti.senderId}`);
                                                        setShowDropdown(false); // 알림목록 닫기
                                                    }
                                                }
                                                }>
                                                    <strong>{noti.type === 1 ? "🔔 알림" : noti.type === 2 ? "💬 채팅" : ""}:</strong><br /> {noti.message}
                                                </div>
                                            ))
                                        ) : (
                                            <div className={"NoAlarmNotificationItem"}>
                                                <p>알림이 없습니다.</p>
                                                <Link to="/alarmlist" className={"AlarmLink"} onClick={() => setShowDropdown(false)}>
                                                    목록 보기
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <img src={searchIcon} className="header-icon" alt="search" onClick={handleOpenSearch}/>

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
                                {icon: person, text: "마이페이지", path: "/"},
                                {icon: shoppingBasket, text: "장바구니", path: "/"},
                                {icon: packages, text: "주문현황", path: "/"},
                                {icon: receipt, text: "주문내역", path: "/"},
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

export default UserHeader;