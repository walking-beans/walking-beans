import React, { useState } from "react";
import SendAlarm from "../../components/admin/SendAlarm";

const AdminResultFindPw = () => {
    const userId = 1;  // 알람 받을 유저 ID
    const alarmRole = 1;  // 알람 종류 (1 = 알림, 2 = 채팅)
    const senderId = 1;  // 알람을 보낸 유저 ID
    const messageContent = "테스트 알림";  // 알림 내용

    const [isAlarmSent, setIsAlarmSent] = useState(false);  // 알람 전송 상태

    const handleSendAlarm = () => {
        setIsAlarmSent(true);  // 알람을 보냈다는 상태 업데이트
    };

    return (
        <div className="user-home-container">
            <p>알람 보내기</p>

            {/* 알람 보내기 버튼 */}
            <button type="button" onClick={handleSendAlarm}>
                보내기 알람
            </button>

            {/* 알람 전송 상태가 true일 때만 SendAlarm 컴포넌트 렌더링 */}
            {isAlarmSent && (
                <SendAlarm
                    userId={userId}
                    alarmRole={alarmRole}
                    senderId={senderId}
                    messageContent={messageContent}
                />
            )}
        </div>
    );
};

export default AdminResultFindPw;
