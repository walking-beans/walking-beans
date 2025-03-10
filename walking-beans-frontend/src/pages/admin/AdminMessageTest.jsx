import {useState} from "react";

const AdminMessageTest = () => {
    const [ws, setWs] = useState();
    const [nickname, setNickname] = useState();
    const [message, setMessage] = useState();
    const [receiver, setReceiver] = useState();
    const [chatBox, setChatBox] = useState();

// 닉네임 설정
    function ssetNickname(e) {
        console.log("ssetNN :" + nickname);
        if (!nickname) {
            alert("닉네임을 입력하세요!");
            return;
        }
        startWebSocket();
    }

// 닉네임 설정 버튼 클릭 시 웹소켓 시작
    function startWebSocket() {
        if (ws && ws.readyState === WebSocket.OPEN) {
            console.log("WebSocket already connected.");
            return;
        }

        const newWs = new WebSocket("ws://localhost:7070/ws/chatTEST");

        newWs.onopen = function () {
            console.log("WebSocket Connected.");
        };

        newWs.onclose = function () {
            console.log("WebSocket Closed. Reconnecting...");
            setTimeout(startWebSocket, 5000);
        };

        newWs.onerror = function (error) {
            console.error("WebSocket Error: ", error);
        };

        newWs.onmessage = function (event) {
            let data = JSON.parse(event.data);
            let className = (data.sender === nickname) ? "message-sent" : "message-received";
            /* document.getElementById("chat-box").append(
                 `<p class="message ${className}">
                         <strong>${data.sender}</strong> to <strong>${data.receiver || '모두'}</strong>:
                         ${data.content}
                     </p>`
             );*/
            console.log(`받은 메시지: ${data.content}`)
            setChatBox(data.content);
        };

        setWs(newWs);
    }

// 메세지 전송
    function sendMessage() {
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            alert("WebSocket이 연결되지 않았습니다. 다시 시도하세요.");
            return;
        }

        if (!nickname) {
            alert("닉네임을 먼저 설정하세요!");
            return;
        }
        console.log(ws);
        if (!message) return;

        let chatMessage = {sender: nickname, receiver: receiver || null, content: message};
        ws.send(JSON.stringify(chatMessage));
        setMessage("");
    }

    const handleChangeValue = (e) => {
        const {name, value} = e.target;

        if (name === "receiver") setReceiver(value);
        else if (name === "message") setMessage(value);
        else if (name === "nickname") setNickname(value);

    }


    return (
        <div>
            <div>{chatBox}</div>

            <input
                id="nickname"
                name="nickname"
                value={nickname}
                placeholder="닉네임 입력"
                type="text"
                onChange={handleChangeValue}
            />
            <button onClick={ssetNickname}>닉네임 설정</button>
            <input
                id="receiver"
                name="receiver"
                value={receiver}
                placeholder="받는 사람 (빈칸 = 모두에게)"
                type="text"
                onChange={handleChangeValue}
            />
            <input
                id="message"
                name="message"
                value={message}
                placeholder="메시지 입력"
                type="text"
                onChange={handleChangeValue}
            />
            <button onClick={sendMessage}>전송</button>
        </div>

    )

}

export default AdminMessageTest;
