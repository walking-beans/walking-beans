import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import apiRiderService from "../../components/rider/apiRiderService"; // SockJS 라이브러리

const AdminMessage = () => {
    const userId = 1;
    const [ws, setWs] = useState();
    const [message, setMessage] = useState("");
    const [chatBox, setChatBox] = useState([]);
    const [members, setMembers] = useState(null);

    const {roomId} = useParams();


    useEffect(() => {
        apiRiderService.getAllChattingMember(roomId, userId, setMembers);
    }, [roomId, userId]);

    useEffect(() => {

        startWebSocket();
    }, []);

    function startWebSocket() {
        if (ws && ws.readyState === WebSocket.OPEN) {
            console.log("WebSocket already connected.");
            return;
        }

        const newWs = new WebSocket("ws://localhost:7070/ws/message");

        newWs.onopen = () => {
            console.log("✅ WebSocket Connected.");
            apiRiderService.getAllMessages(roomId, setChatBox);
        };

        newWs.onclose = () => {
            console.log("❌ WebSocket Closed. Reconnezcting in 5 seconds...");
            setTimeout(() => startWebSocket(), 5000);
        };

        newWs.onerror = (error) => {
            console.error("🚨 WebSocket Error: ", error);
        };

        newWs.onmessage = (event) => {
            apiRiderService.getAllMessages(roomId, setChatBox);
        };

        setWs(newWs);

    }


    function sendMessage() {
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            alert("WebSocket이 연결되지 않았습니다. 다시 시도하세요.");
            return;
        }

        console.log(ws);
        if (!message) return;

        let chatMessage = {roomId : roomId, userId: userId, messageRole : 1, messageContent: message};
        ws.send(JSON.stringify(chatMessage));
        setMessage("");
    }

    const handleChangeValue = (e) => {
        if (e.target.name === "message") setMessage(e.target.value);
    }

    return (
        <div>
            <div>
                {Array.isArray(chatBox) ? (
                    chatBox.map((msg, index) => (
                        <div
                            key={index}
                        >{msg.messageContent}</div>
                    ))
                ) : (
                    <p>채팅 기록이 없습니다.</p>
                )}
            </div>

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


};



export default AdminMessage;
