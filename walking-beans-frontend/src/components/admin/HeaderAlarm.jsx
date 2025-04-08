import {useEffect, useState, useRef} from "react";
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";
import "../admin/HeaderAlarm.css";
import {Link, useNavigate} from "react-router-dom";
import bellIcon from "../../assert/svg/bell.svg";
import alarmIcon from "../../assert/svg/alarm.svg";

//라이더용 벨 아이콘
import riderBellIcon from "../../assert/svg/riderBell.svg";
import riderAlarmIcon from "../../assert/svg/riderAlarm.svg";
import axios from "axios";


const HeaderAlarm = ({userId, bell}) => {
    const [alarmMessages, setAlarmMessages] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0); //알림 개수
    const [showDropdown, setShowDropdown] = useState(false); //토글
    const [notifications, setNotifications] = useState([]); //알림 리스트

    const [alarms, setAlarms] = useState([]); // 알림 리스트 (서버에서 불러온)
    const [count, setCount] = useState(0); // 읽지 않은 알람 수
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

                    if (receivedData.alarmUrl === window.location.pathname) { //채팅방에 들어가있으면 알람을 받지 않게 수정
                        console.log("해당페이지입니다.");
                        return;
                    }

                    if (receivedData.userId === userId ) {
                        setNotifications((prevNotifications) => [
                            {
                                message:receivedData.alarmContent,
                                type: receivedData.alarmRole,
                                url: receivedData.alarmUrl,
                                alarmId:receivedData.alarmId,
                            },
                            ...prevNotifications,
                        ])
                        console.log(receivedData.alarmId);
                        setUnreadCount((prevCount) => prevCount +1);
                    }
                })
                /************ 전체 알림 수신 코드 ********************/

                stompClient.subscribe(`/topic/alarms/admin`, (message) => {
                    console.log("관리자 알람 수신: ",message.body);
                    const receivedData = JSON.parse(message.body);

                    // 관리자의 알림을 처리
                    setNotifications((prevNotifications) => [
                        {
                            message: receivedData.alarmContent,
                            type: receivedData.alarmRole,  // 관리자 알림을 구분하는 type
                            url: receivedData.alarmUrl,
                            alarmId:receivedData.alarmId,
                        },
                        ...prevNotifications,
                    ]);
                    setUnreadCount((prevCount) => prevCount + 1);
                })

                /**************************** **************************/
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

    // 미확인 알림 가져오기
    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:7070/api/noreadalarms/${userId}`)
                .then((res) => {
                    // 알림 데이터를 이전 알림 목록에 추가
                    setNotifications((prevNotifications) => [
                        ...res.data.map((receivedData) => ({
                            message: receivedData.alarmContent,  // 알림 내용
                            type: receivedData.alarmRole,       // 관리자 알림을 구분하는 타입
                            url: receivedData.alarmUrl,         // 알림 URL
                            alarmId:receivedData.alarmId,
                        })),
                        ...prevNotifications,  // 이전 알림 목록
                    ]);

                    // 읽지 않은 알람의 개수 카운트
                    const countFalseStatus = res.data.filter(
                        (alarm) => alarm.alarmStatus === false
                    ).length;
                    setUnreadCount(countFalseStatus);
                    console.log("안읽은 알림: ", JSON.stringify(res.data, null, 2));
                })
                .catch((err) => {
                    console.log("읽지 않은 알람리스트 불러오기 실패" + err);
                });
        }
    }, []);


    //알람 토글
    const toggleAlarm = () => {
        if (showDropdown) { //true
            //setNotifications([]);// 알림 리스트를 초기화
        } else {
            // 알림을 열 때는 기존 알림 리스트를 비우지 않음
            //setUnreadCount(0);  // 알림 아이콘 배지 초기화
        }

        setShowDropdown(!showDropdown);  // 드롭다운 상태 토글
    };

    //모든 알람 읽음 처리
    const markAllReadAlarms = () => {
        axios
            .put("http://localhost:7070/api/allreadalarms/"+userId)
            .then(
                (res) => {
                    setNotifications([]);
                    setUnreadCount(0);
                }
            )
            .catch(
                (err)=>{
                    console.log("err" + err);
                }
            )
    }

    // 읽음 표시
    const changeAlarmStatus = (alarmId) => {
        axios
            .put("http://localhost:7070/api/read/"+alarmId)
            .then(
                (res) => {
                    console.log("상태 변경 완료");
                }
            )
            .catch(
                (err) => {
                    console.log("err",err);
                }
            )

    }

    return (
        <div className="notification-container">
            <div onClick={toggleAlarm} className={"AlarmNotificationContainer"}>
                <img src={showDropdown ? alarmIconToShow : bellIconToShow} className="header-icon" alt="notifications"/>
                {unreadCount > 0 && <span className={"AlarmBadge"}>{unreadCount}</span>}
            </div>
            {showDropdown && (
                <div className={"AlarmDropdown"}>
                    {
                        notifications.length > 0 ? (
                            notifications.map((noti, index) => (
                                <div key={index} className={"AlarmNotificationItem"} onClick={() => {
                                    if (noti.type === 1) {
                                        navigate("/alarmlist");
                                        setShowDropdown(false); // 알림목록 닫기
                                        setUnreadCount(-1); //알림 카운터 하나 빼기

                                        // 클릭된 알림 제거
                                        setNotifications((prevNotifications) =>
                                            prevNotifications.filter((notification, i) => i !== index)
                                        );
                                        changeAlarmStatus(noti.alarmId);

                                    } else if (noti.type === 2) {
                                        navigate(noti.url);
                                        setShowDropdown(false); // 알림목록 닫기
                                        setUnreadCount(-1); //알림 카운터 하나 빼기

                                        // 클릭된 알림 제거
                                        setNotifications((prevNotifications) =>
                                            prevNotifications.filter((notification, i) => i !== index)
                                        );
                                        changeAlarmStatus(noti.alarmId);

                                    }
                                }
                                }>
                                    <strong>{noti.type === 1 ? "🔔 알림" : noti.type === 2 ? "💬 채팅" : ""}:</strong><br/> {noti.message}
                                    </div>
                                    ))
                                    ) : (
                                    <div className={"NoAlarmNotificationItem"}>
                                    <p>알림이 없습니다.</p>
                                    <Link to="/alarmlist" className={"AlarmLink"}
                                          onClick={() => setShowDropdown(false)}>
                                        목록 보기
                                    </Link>
                                </div>
                            )}

                    {/*모든 알림 확인*/}

                    {notifications.length > 0 && (
                        <div className="MarkAllAsReadContainer" onClick={() => {
                            markAllReadAlarms();
                            setShowDropdown(false); // 알림목록 닫기
                        }}>
                            <button className="MarkAllAsReadBtn">모든 알림 확인 완료</button>
                        </div>
                    )}
                </div>
            )}
</div>
)
}
export default HeaderAlarm;