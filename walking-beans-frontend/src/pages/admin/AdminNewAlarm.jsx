import SendAlarm from "../../components/admin/SendAlarm";
import {useState} from "react";


const AdminNewAlarm = () => {

    const [showSendAlert, setShowSendAlert] = useState(false);

    // 알람 보내기 버튼 클릭 시 호출되는 함수
    const handleSendAlarm = () => {
        setShowSendAlert(true); // SendAlarm을 렌더링하여 알림을 보냄
    };

    return (
        <div className="user-home-container">
            <p>알람 보내기</p>
            <button type="button" onClick={handleSendAlarm}>보내기 알람</button>

            {/* 버튼 클릭 시 SendAlarm 컴포넌트를 렌더링하고, props로 전달 */}
            {showSendAlert && (
                <SendAlarm
                    userId="2"
                    alarmRole="1"
                    senderId="1"
                    messageContent="새로운 알람입니다."
                />
            )}
        </div>
    )
}

export default AdminNewAlarm;