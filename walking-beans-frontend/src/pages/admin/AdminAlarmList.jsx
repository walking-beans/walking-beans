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
        <div className="user-home-container">
            {AlarmList.length === 0 ? (
                <h3 style={style.NoAlarmList}>알람이 없습니다</h3>
            ) : (
                AlarmList.map((value, index) => (
                    <div key={index}>
                        <div style={style.AlarmList}>
                            <h3>{value.alarmRole === 1
                                ? "알람" : value.alarmRole === 2 ? "메시지" : ""}</h3>
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
            {AlarmList.length > 0 && (
                <div style={style.AlarmDeleteContainer}>
                    <button type={"submit"} onClick={deleteAllAlrams} style={style.AlarmDeleteBtn}>
                        알림 모두 지우기
                    </button>
                </div>
            )}
        </div>
    );
};
// 메세지 발신인 띄우기
// DB문제 해결 -> null 문제

const style = {
    AlarmList: {
        border: "1px solid #5A3D21",
        borderRadius: "35px",
        margin: "20px",
        textAlign: "center",
        backgroundColor: "#FAF1D0",
        padding: "8px",
    },
    NoAlarmList : {
        textAlign: "center",
        minHeight: "70vh",
    },

    AlarmDeleteContainer : {
        textAlign: "right",
    },

    AlarmDeleteBtn : {

    }
}
export default AdminAlarmList;
