import React, {useState} from "react";
import axios from "axios";
import "../../css/admin/AdminPage.css"
import MsgToast from "../../components/owner/MsgToast";

const AdminPage = () => {

    const [announcement, setAnnouncement] = useState("");
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

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
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
                        /><br/>
                        <button onClick={handleSubmit} className="user-sequence-from-select">보내기</button>
                    </div>
                    <br/>
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