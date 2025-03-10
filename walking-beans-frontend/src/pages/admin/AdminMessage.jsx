/*
import {useState} from "react";

const AdminMessage = () => {
    const [ws, setWs] = useState();
    const [nickname, setNickname] = useState();

// 닉네임 설정
    function ssetNickname() {
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

        setWs(new WebSocket("ws://localhost:8080/ws/chat"));

        ws.onopen = function () {
            console.log("WebSocket Connected.");
        };

        ws.onclose = function () {
            console.log("WebSocket Closed. Reconnecting...");
            setTimeout(startWebSocket, 5000);
        };

        ws.onerror = function (error) {
            console.error("WebSocket Error: ", error);
        };

        ws.onmessage = function (event) {
            let data = JSON.parse(event.data);
            let className = (data.sender === nickname) ? "message-sent" : "message-received";
            document.getElementById("cha").append(
                `<p class="message ${className}">
                        <strong>${data.sender}</strong> to <strong>${data.receiver || '모두'}</strong>:
                        ${data.content}
                    </p>`
            );
        };
    }

// 메세지 전송
    function sendMessage() {
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            alert("WebSocket이 연결되지 않았습니다. 다시 시도하세요.");
            return;
        }

        let receiver = $("#receiver").val();
        let message = $("#message").val();
        if (!nickname) {
            alert("닉네임을 먼저 설정하세요!");
            return;
        }
        if (!message) return;

        let chatMessage = {sender: nickname, receiver: receiver || null, content: message};
        ws.send(JSON.stringify(chatMessage));
        $("#message").val("");
    }


    return (
        <div>
            <div id="chat-box"></div>

            <input id="nickname" placeholder="닉네임 입력" type="text"/>
            <button onClick={ssetNickname}>닉네임 설정</button>
            <input id="receiver" placeholder="받는 사람 (빈칸 = 모두에게)" type="text"/>
            <input id="message" placeholder="메시지 입력" type="text"/>
            <button onClick={sendMessage}>전송</button>
        </div>

    )

}

export default AdminMessage;*/
