import React, {useState} from "react";
import axios from "axios";
import "../../css/admin/AdminPage.css"

const AdminPage = () => {

    const [announcement, setAnnouncement] = useState("");

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
                </div>
            </div>
        </div>
    )
}

export default AdminPage;