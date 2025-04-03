import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../../css/admin/AdminAlarmList.css";


const AdminAlarmList = () => {
    const [userId, setUserId] = useState(0);
    const [AlarmList, setAlarmList] = useState([]);
    const navigate = useNavigate();

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
                    console.log(res.data);
                })
                .catch((err) => {
                    navigate("/error");
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
                        navigate("/error");
                    }
                )
        }
    }

    const AllReadAlrms = () => {
        axios
            .put("http://localhost:7070/api/allreadalarms/" + userId)
            .then(
                () => { // 읽음 처리후 다시 리스트 불러오기
                    axios
                        .get(`http://localhost:7070/api/chat/${userId}`)
                        .then((res) => {
                            setAlarmList(res.data); // 새로 고침된 알림 목록을 업데이트
                        })
                        .catch((err) => {
                            console.log("알림 목록 불러오기 오류:", err);
                        });
                }
            )
            .catch(
                (err) => {
                    console.log("err" + err);
                }
            )
    }

    return (
        <div className="AlarmListcontainer">
            {AlarmList.length > 0 && (
                <div className="AlarmDeleteContainer">
                    <button className="AllReadBtn" onClick={AllReadAlrms}>
                        모두 읽음
                    </button>

                    <button type={"submit"} onClick={deleteAllAlrams} className="AlarmDeleteBtn">
                        전체 삭제
                    </button>
                </div>
            )}

            {/* 알림 리스트가 없을 경우 / 알림 리스트가 있을 경우*/}
            {AlarmList.length === 0 ? (
                <h3 className="NoAlarmList">알람이 없습니다</h3>
            ) : (
                AlarmList.map((value, index) => (
                    <div key={index}>
                        <div
                            className={`${value.alarmStatus ? 'AlarmListRead' : 'AlarmListUnread'}`}
                            onClick={() => {
                            const targetUrl = value.alarmUrl;
                            navigate(targetUrl);
                        }}>
                            <h3>{value.alarmRole === 1
                                ? "🔔" : value.alarmRole === 2 ? "💬" : ""}</h3>
                            <p>{value.alarmContent}</p>
                            <p>
                                {new Date(value.alarmCreateDate).toLocaleDateString('ko-KR').replace(/\./g, '')}<br/>
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
    )
}
export default AdminAlarmList;
