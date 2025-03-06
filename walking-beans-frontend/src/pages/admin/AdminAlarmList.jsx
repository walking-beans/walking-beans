import {useEffect, useState} from "react";


const AdminAlarmList = () => {
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [alertSocket, setAlertSocket] = useState(null);


    useEffect(() => {
        const wsAlert = new WebSocket("ws://localhost:7070/ws/alert");

        wsAlert.onopen = () => {
            console.log("✅ 알림 WebSocket 연결 성공");
        };

        wsAlert.onmessage = (event) => {
            console.log("📩 새 알림 도착:", event.data);

            // prevNotifications 를 통해 이전 배열의 내용을 복사해서 새로운 배열로 만들어서 내용추가
            // 즉 이전 내용에서 추가하기 위한것임
            // 채팅 타입으로 이벤트가 발생한 내용을 넣는다.
            // const notifications = [
            //     { message: "새로운 메시지가 도착했음", type: "채팅" },
            //     { message: "두 번째 메시지", type: "채팅" }
            // ]; 이런식
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                {message: event.data, type: "채팅"},
            ]);

            setUnreadCount((prevCount) => prevCount + 1);
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

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
        setUnreadCount(0);
    };
    return (
        <div>

            <div onClick={toggleDropdown}>
                🔔
                {unreadCount > 0 && <span>{unreadCount}</span>}
            </div>

            {showDropdown && (
                <div>
                    <h4>📢 알림</h4>
                    {notifications.length > 0 ? (
                        notifications.map((noti, index) => (
                            <div key={index}>
                                <strong>{noti.type === "채팅" ? "💬 채팅" : "🔔 알림"}:</strong> {noti.message}
                            </div>
                        ))
                    ) : (
                        <p>알림이 없습니다.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default AdminAlarmList;