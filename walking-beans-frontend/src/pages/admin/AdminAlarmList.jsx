import {useEffect, useState} from "react";
import axios from "axios";

const AdminAlarmList = () => {
    const [userId, setUserId] = useState(0);
    const [AlarmList, setAlarmList] = useState([]);

    useEffect(() => {
        // localStorage에서 user 객체를 가져온 후 JSON.parse로 객체로 변환
        const localSession = localStorage.getItem("user");

        // user_id 추출
        if (localSession) {
            const parsedSession = JSON.parse(localSession);
            setUserId(parsedSession.user_id);
        }
    }, []);

    console.log(userId);

    useEffect(() => {
        if (userId !== 0) {
            axios
                .get(`http://localhost:7070/api/chat/${userId}`)
                .then((res) => {
                    setAlarmList(res.data);
                })
                .catch((err) => {
                    alert("백엔드에서 리스트를 가져오는데 실패했습니다.");
                });
        }
    }, [userId]);

    console.log(AlarmList);
    return (
        <div>
            {AlarmList.length === 0 ? (
                <p>알람이 없습니다.</p>
            ) : (
                AlarmList.map((value, index) => (
                    <div key={index}>
                        <div>
                            {value.alarmRole === 1 ? "알람" : value.alarmRole === 2 ? "메시지" : ""}
                            <p>{value.alarmContent}</p>
                            <p>
                                {new Date(value.alarmCreateDate).toLocaleDateString('ko-KR').replace(/\./g, '')} /
                                {new Date(value.alarmCreateDate).toLocaleTimeString('en-GB', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminAlarmList;
