import {useState} from "react";
import axios from "axios";

const AdminPage = () => {

    const [announcement, setAnnouncement] = useState("");

    const handleChange = (event) => {
        setAnnouncement(event.target.value);
    }

    const handleSubmit = () => {
        axios
            .post("/api/alarm/announcementAlarm", announcement ,{
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

    return(
        <div>
            <p>공지 내용 입력하기</p>
            <input
                id="adminAnnouncement"
                value={announcement}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            /><br/>
            <button onClick={handleSubmit}>보내기</button>
        </div>
    )
}

export default AdminPage;