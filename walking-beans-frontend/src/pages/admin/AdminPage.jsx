import React, {useState} from "react";
import axios from "axios";
import "../../css/admin/AdminPage.css"
import MsgToast from "../../components/owner/MsgToast";

const AdminPage = () => {

    const [announcement, setAnnouncement] = useState("");
    const [loginCutEmail, setLoginCutEmail] = useState("");
    const [loginCutDate, setLoginCutDate] = useState("");
    const [menuId,setMenuId] = useState(); // 복구할 메뉴 아이디
    const [toastMsg,setToastMsg] = useState(null); // 안내문구

    // 복구인풋제어
    const handelInput = (e) => {
        const value = e.target.value;
        setMenuId(value);
    }
    // 복구 실행
    const handleRecovery = (menuId) => {
        axios
            .patch(`http://localhost:7070/api/menu/admin/menu/${menuId}`)
            .then((res)=>{
                setToastMsg(menuId+"메뉴 복구 완료되었습니다.")
                console.log("복구완료 Id :",menuId )
            })
            .catch((err)=>{
                console.log("복구실패 Id :",menuId + err)
                setToastMsg(menuId+"메뉴 복구에 실패했습니다. 로그를 확인해주세요.")
            })
    }

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
                        <div className="user-order-click-btn">
                            <button onClick={handleSubmitEmailAndDate} className="user-mini-btn-b">
                                정지 적용
                            </button>
                            <button onClick={cancelLoginCut} className="user-mini-btn-sb">
                                정지 해제
                            </button>
                        </div>
                    </div>

                    {/*복구기능*/}

                    <div className="user-order-hr" alt="구분선"></div>
                    <div>
                        <input className="insert-address"
                               placeholder="메뉴번호를 입력하세요"
                               onChange={handelInput}
                               id="menuId"
                               value={menuId}
                               type={"number"}
                        /><br/>
                        <button onClick={() => handleRecovery(menuId)} className="user-sequence-from-select">복구하기</button>
                        {/*토스트메세지*/}
                    </div>

                    <MsgToast
                        message={toastMsg}
                        duration={3000}
                        onClose={() => setToastMsg(null)}
                    />

                </div>
            </div>
        </div>
    )
}

export default AdminPage;
