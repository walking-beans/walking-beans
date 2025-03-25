import {useEffect, useState} from "react";
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";
//import "./HeaderAlarm.css";
import {Link, useNavigate} from "react-router-dom";
import bellIcon from "../../assert/svg/bell.svg";
import alarmIcon from "../../assert/svg/alarm.svg";
import "../../pages/layout/UserHeader.css";

//라이더용 벨 아이콘
import riderBellIcon from "../../assert/svg/riderBell.svg";
import riderAlarmIcon from "../../assert/svg/riderAlarm.svg";


const HeaderAlarm = ({userId, bell}) => {
    const [alarmMessages, setAlarmMessages] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0); //알림 개수
    const [showDropdown, setShowDropdown] = useState(false); //토글
    const [notifications, setNotifications] = useState([]); //알림 리스트
    const navigate = useNavigate();

    const alarmIconToShow = bell ? riderAlarmIcon : alarmIcon;
    const bellIconToShow = bell ? riderBellIcon : bellIcon;

    useEffect(() => {
        console.log("🔌 WebSocket 연결 시도...");

        const socket = new SockJS("http://localhost:7070/ws-alarm");
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("✅ WebSocket 연결 성공");
                stompClient.subscribe(`/topic/alarms/${userId}`, (message) => {
                    console.log("알림 수신:", message.body);
                    const receivedData = JSON.parse(message.body);
                    console.log(receivedData);  // 알림 데이터가 어떻게 들어오는지 확인
                    if (receivedData.userId === userId ) {
                        setNotifications((prevNotifications) => [
                            {
                                message:receivedData.alarmContent,
                                type: receivedData.alarmRole,
                                url: receivedData.alarmUrl,
                            },
                            ...prevNotifications,
                        ])

                        setUnreadCount((prevCount) => prevCount +1);
                    }
                });
            },
            onStompError: (frame) => {
                console.error("❌ WebSocket 오류:", frame);
            },
            onWebSocketClose: () => {
                console.warn("⚠ WebSocket 연결 종료");
            },
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [userId]);

    //알람 토글
    const toggleAlarm = () => {
        if (showDropdown) { //true
            setNotifications([]);// 알림 리스트를 초기화
        } else {
            // 알림을 열 때는 기존 알림 리스트를 비우지 않음
            setUnreadCount(0);  // 알림 아이콘 배지 초기화
        }

        setShowDropdown(!showDropdown);  // 드롭다운 상태 토글
    };

    return (
        <div className="notification-container">
            <div onClick={toggleAlarm} className={"AlarmNotificationContainer"}>
                <img src={showDropdown ? alarmIconToShow : bellIconToShow} className="header-icon" alt="notifications"/>
                {unreadCount > 0 && <span className={"AlarmBadge"}>{unreadCount}</span>}
            </div>
            {showDropdown && (
                <div className={"AlarmDropdown"}>
                    {notifications.length > 0 ? (
                        notifications.map((noti, index) => (
                            <div key={index} className={"AlarmNotificationItem"} onClick={() => {
                                if (noti.type === 1) {
                                    navigate("/alarmlist");
                                    setShowDropdown(false); // 알림목록 닫기
                                } else if (noti.type === 2) {
                                    navigate(noti.url);
                                    setShowDropdown(false); // 알림목록 닫기
                                }
                            }
                            }>
                                <strong>{noti.type === 1 ? "🔔 알림" : noti.type === 2 ? "💬 채팅" : ""}:</strong><br/> {noti.message}
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
        </div>
    )
}
export default HeaderAlarm;