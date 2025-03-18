import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "../../css/admin/AdminAlarmList.css";


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

    const deleteAllAlrams = () => {
        const confirmed = window.confirm("모든 알림을 지우시겠습니까?");

        if(confirmed) {
            axios
                .delete(`http://localhost:7070/api/alarm/delete/${userId}`)
                .then(
                    () => {
                        setAlarmList([]); //리스트 비우기
                        alert("삭제가 완료되었습니다.");
                    }
                )
                .catch(
                    (err) => {
                        console.log("err: ", err);
                        alert("백엔드에 문제가 생겼습니다.");
                    }
                )
        }
    }

    return (
        <div className="AlarmListcontainer">
            {AlarmList.length > 0 && (
                <div className="AlarmDeleteContainer">
                    <button type={"submit"} onClick={deleteAllAlrams} className="AlarmDeleteBtn">
                        알림 모두 지우기
                    </button>
                </div>
            )}

            {/* 알림 리스트가 없을 때 */}
            {AlarmList.length === 0 ? (
                <h3 className="NoAlarmList">알람이 없습니다</h3>
            ) : (
                AlarmList.map((value, index) => (
                    <div key={index}>
                        <div className="AlarmList">
                            <h3>{value.alarmRole === 1
                                ? "🔔" : value.alarmRole === 2 ? "💬" : ""}</h3>
                            <p>{value.alarmRole === 1
                                ? <Link to="/link1">{value.alarmContent}</Link>
                                : value.alarmRole === 2
                                    ? <Link to={`/chat/message/${value.alarmSenderId}`}>{value.alarmContent}</Link>
                                    : value.alarmContent}</p>
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
// 메세지 발신인 띄우기
// DB문제 해결 -> null 문제
export default AdminAlarmList;
