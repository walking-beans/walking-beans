import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../../css/admin/AdminAlarmList.css";
import "../../css/Order.css"
import alarm from "../../assert/images/user/alarm.svg"
import chatUser from "../../assert/images/user/chatUser.svg"
import chatRider from "../../assert/images/user/chatRider.svg"
import chatOwner from "../../assert/images/user/chatOwner.svg"


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
                    //setAlarmList(res.data);
                    //console.log(res.data);
                    const alarms = res.data;  // 알림 목록

                    // 두 번째 axios 요청 (userRole만 가져오기)
                    // 유저 정보에서 필요한 userRole만 추출하기 위해 여러 개의 요청을 반복해서 처리하는 방법을 사용
                    const fetchUserRoles = alarms.map((alarm) =>
                        axios.get(`http://localhost:7070/api/users/getuserdata/${alarm.alarmSenderId}`)  // 알림의 senderId로 유저 정보를 가져옴
                    );

                    // 모든 userRole을 가져온 후 알림 목록에 결합하기
                    Promise.all(fetchUserRoles)
                        .then((responses) => {
                            const updatedAlarmList = alarms.map((alarm, index) => ({
                                ...alarm,
                                userRole: responses[index].data.userRole,  // userRole만 결합
                                userName: responses[index].data.userName
                            }));

                            // 알림 목록 상태 업데이트
                            setAlarmList(updatedAlarmList);
                        })
                        .catch((err) => {
                            console.log("두 번째 요청 오류:", err);
                        });
                })
                .catch((err) => {
                    navigate("/error");
                });
        }
    }, [userId]);

    const deleteAllAlrams = () => {
        const confirmed = window.confirm("모든 알림을 지우시겠습니까?");

        if (confirmed) {
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
                        .then(
                            (res) => {
                                const alarms = res.data;  // 알림 목록

                                // 두 번째 axios 요청 (userRole만 가져오기)
                                // 유저 정보에서 필요한 userRole만 추출하기 위해 여러 개의 요청을 반복해서 처리하는 방법을 사용
                                const fetchUserRoles = alarms.map((alarm) =>
                                    axios.get(`http://localhost:7070/api/users/getuserdata/${alarm.alarmSenderId}`)  // 알림의 senderId로 유저 정보를 가져옴
                                );

                                // 모든 userRole을 가져온 후 알림 목록에 결합하기
                                Promise.all(fetchUserRoles)
                                    .then((responses) => {
                                        const updatedAlarmList = alarms.map((alarm, index) => ({
                                            ...alarm,
                                            userRole: responses[index].data.userRole,  // userRole만 결합
                                            userName: responses[index].data.userName
                                        }));

                                        // 알림 목록 상태 업데이트
                                        setAlarmList(updatedAlarmList);
                                        // setAlarmList(res.data); // 새로 고침된 알림 목록을 업데이트
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
                })
    }

    const setAlreadyRead = (alarmId) => {
        axios
            .put("http://localhost:7070/api/read/" + alarmId)
            .then(
                (res) => {
                    console.log("읽음처리 완료: " + res);
                }
            )
            .catch(
                (err) => {
                    console.log("에러: " + err);
                }
            )
    }
    console.log("확인", AlarmList);
    return (
        <div className="AlarmListcontainer">
            <div className="user-order-menu-container">
                <div className="user-title-center">알림</div>
                <div className="user-order-hr" alt="구분선"></div>

                <div className="mb-3">
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
                </div>
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
                                setAlreadyRead(value.alarmId);
                                navigate(targetUrl);
                            }}>
                            <div className="AlarmImgContainer">
                                <div className="AlarmImgAndDate">
                                    {/* 알림 내용에서 userRole에 따른 아이콘 표시 */}
                                    {value.alarmRole === 1 && <img src={alarm} alt="Notification Icon"/>}
                                    {value.alarmRole === 2 && (
                                        <div>
                                            {value.userRole === 1 && <img src={chatUser} alt="User Icon"/>}
                                            {value.userRole === 2 && <img src={chatRider} alt="Rider Icon"/>}
                                            {value.userRole === 3 && <img src={chatOwner} alt="Owner Icon"/>}
                                        </div>
                                    )}

                                    <span className="alarm-text-b">
                                        {value.alarmRole === 2 ? value.userName : "알림"}
                                        </span>
                                    <span className="AlarmDate">
                                {value?.alarmCreateDate
                                    ? new Date(value.alarmCreateDate).toLocaleString('ko-KR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        weekday: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })
                                        .replace(/\. /g, '-')  // YYYY.MM.DD → YYYY-MM-DD
                                        .replace(/\./, '')     // 마지막에 남은 점 제거
                                        .replace(/-(?=\([가-힣]{1}\))/, ' ')  // DD- (날짜 뒤의 `-`만 제거)
                                    : '날짜 정보 없음'}
                            </span>
                                </div>
                            </div>
                            <div className="alarm-text">{value.alarmContent}</div>
                        </div>
                    </div>
                ))
            )}
        </div>
        </div>
    )
}
export default AdminAlarmList;
