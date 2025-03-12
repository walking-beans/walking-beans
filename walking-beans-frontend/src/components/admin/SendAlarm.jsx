import {useEffect, useState} from "react";


const SendAlarm = ({userId, alarmRole, senderId, messageContent}) => {
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
                userId: userId,                      // 알람을 받을 유저 ID (여기선 예시로 1번 유저)
                alarmRole: alarmRole,                   // 알람의 종류 (1 = 알림, 2 = 채팅)
                alarmSenderId: senderId,               // 알람을 보낸 유저 ID (여기선 예시로 1번 유저)
                alarmContent: messageContent, // 알람 내용 (props로 전달된 메시지)
                alarmStatus: false,              // 알람 읽음 여부 (기본값 false)
                alarmCreateDate: new Date().toISOString(), // 알람 생성 시간 (현재 시간)
            };

            chatSocket.send(JSON.stringify(messageData));
        }
    };



    return (
        <div>
        </div>
    )
}

export default SendAlarm;