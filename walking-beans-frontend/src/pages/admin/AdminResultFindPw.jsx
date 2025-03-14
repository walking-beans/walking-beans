import React, { useState } from "react";
import SendAlarm from "../../components/admin/SendAlarm";

const AdminResultFindPw = () => {
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
                    userId="2"
                    alarmRole="2"
                    senderId="1"
                    messageContent="또다시테스팅을한다123"
                />
            )}
        </div>
    );
};

export default AdminResultFindPw;
