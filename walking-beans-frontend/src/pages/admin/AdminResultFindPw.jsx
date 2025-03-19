/*
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


            <button type="button" onClick={handleSendAlarm}>
                보내기 알람
            </button>


            {isAlarmSent && (
                <SendAlarm
                    userId="1"
                    alarmRole="1"
                    senderId="1"
                    messageContent="또다시테스팅을한다123"
                />
            )}
        </div>
    );
};

export default AdminResultFindPw;*/
