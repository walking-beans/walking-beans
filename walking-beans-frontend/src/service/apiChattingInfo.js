import axios from "axios";

const API_URL = "http://localhost:7070/api/chattinginfo";

const apiChattingInfo = {

    // getChattingInfoBySenderId
    getChattingInfoBySenderId : function (senderId, setChattingList) {
        axios
            .get(`${API_URL}/map?senderId=${senderId}`)
            .then(
                (res) => {
                    setChattingList(res.data);
                }
            )
            .catch(
                (err) => {
                    alert("채팅 목록을 불러오는 중 오류가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            );
    },
}

export default apiChattingInfo;