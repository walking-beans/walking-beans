import {useEffect, useState} from "react";


const AdminResultFindId = () => {
    const [messages, setMessages] = useState([]);
    const [chatSocket, setChatSocket] = useState(null);
    const [messageInput, setMessageInput] = useState("알림보내기");

    useEffect(() => {
        const wsChat = new WebSocket("ws://localhost:7070/ws/chat");
        setChatSocket(wsChat);

        wsChat.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        wsChat.onerror = (error) => {
            console.error("채팅 웹소켓 오류:", error);
        };

        return () => wsChat.close();
    }, []);

    const sendAlarmMessage = () => {
        if (messageInput.trim() !== "") {
            const messageData = {
                roomId: 1,                  // 채팅방 ID (1번 방)
                userId: 1,                  // 보내는 유저 ID (1번 유저)
                messageContent: "테스팅", // 메시지 내용
                messageRole: 1,             // 메시지 역할 (1: 일반 메시지)
                messageTime: new Date().toISOString(),  // 메시지 시간 (현재 시간)
            };

            chatSocket.send(JSON.stringify(messageData));
            setMessageInput("");
        }
    };

    return (
        <div>
            <p>알람 보내기</p>
            <button type="button" onClick={sendAlarmMessage}>보내기 알람</button>
        </div>
    )
}

export default AdminResultFindId;