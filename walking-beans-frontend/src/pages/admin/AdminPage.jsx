import React, {use, useState} from "react";
import axios from "axios";
import "../../css/admin/AdminPage.css"

const AdminPage = () => {

    const [announcement, setAnnouncement] = useState("");
    const [loginCutEmail, setLoginCutEmail] = useState("");
    const [loginCutDate, setLoginCutDate] = useState("");


    const handleChange = (event) => {
        setAnnouncement(event.target.value);
    }

    const handleEmailChange = (event) => {
        setLoginCutEmail(event.target.value);
    };

    const handleDateChange = (event) => {
        setLoginCutDate(event.target.value);  // 날짜 변경 시 상태 업데이트
    };

    const handleSubmit = () => {
        axios
            .post("/api/alarm/announcementAlarm", announcement, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(
                (res) => {
                    alert("전체 공지 발송이 완료되었습니다.");
                    setAnnouncement("");
                }
            )
            .catch(
                (err) => {
                    console.log("err", err);
                    alert("백엔드에서 오류가 났습니다.");
                }
            )
    }

    const handleSubmitEmailAndDate = () => {
        axios
            .put("http://localhost:7070/api/users/updateuserdate" ,null, {
                params: {
                    userEmail: loginCutEmail,
                    userDate : loginCutDate,
                },
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(
                (res) => {
                    alert("성공적으로 갱신했습니다.");
                    setLoginCutEmail("");  // 이메일 입력창 비우기
                    setLoginCutDate("");  // 날짜 입력창 비우기
                }
            )
            .catch(
                (err) => {
                    alert("백엔드 오류");
                }
            )
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    }

    const cancelLoginCut = () => {
        const toDate = new Date().toISOString().split('T')[0];

        axios
            .put("http://localhost:7070/api/users/updateuserdate" ,null, {
                params: {
                    userEmail: loginCutEmail,
                    userDate : toDate,
                },
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(
                (res) => {
                    alert("성공적으로 갱신했습니다.");
                    setLoginCutEmail("");  // 이메일 입력창 비우기
                    setLoginCutDate("");  // 날짜 입력창 비우기
                }
            )
            .catch(
                (err) => {
                    alert("백엔드 오류");
                }
            )
    }

    return (
        <div className="user-ordering-container">
            <div className="user-ordering">
                <div className="user-order-menu-container">
                    <p className="user-title-center">공지 내용 입력하기</p>
                    <div className="user-order-hr" alt="구분선"></div>
                    <div>
                        <input className="insert-address"
                               id="adminAnnouncement"
                               value={announcement}
                               placeholder="공지 내용을 입력하세요"
                               onChange={handleChange}
                               onKeyDown={handleKeyDown}
                        />
                        <button onClick={handleSubmit} className="user-sequence-from-select">보내기</button>
                    </div>

                    <div className="user-order-hr" alt="구분선"></div>
                    <div>
                        <p className="user-title-center">아이디 정지</p>
                        <p>*정지 해제시 아이디만 입력하세요*</p>
                        <input className="insert-address"
                            id="loginCut"
                            value={loginCutEmail}
                            placeholder="이메일을 입력하세요"
                            onChange={handleEmailChange}
                        /><br/>
                        <input className="insert-address"
                            type="date"
                            id="loginCutDate"
                            value={loginCutDate}
                            placeholder="정지 기간을 입력해주세요(~까지 정지 적용)"
                            onChange={handleDateChange}
                        />
                        <br/>
                        <button onClick={handleSubmitEmailAndDate} className="user-sequence-from-select">
                            정지 적용
                        </button>
                        <br/>
                        <button onClick={cancelLoginCut} className="user-sequence-from-select">
                            정지 해제
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;