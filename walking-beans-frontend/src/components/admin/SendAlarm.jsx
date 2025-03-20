/*
import { useEffect, useState } from "react";

const SendAlarm = ({ userId, alarmRole, senderId, messageContent }) => {
    const [chatSocket, setChatSocket] = useState(null);
    const [isSocketOpen, setIsSocketOpen] = useState(false); // 웹소켓 상태 추적
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const wsChat = new WebSocket("ws://localhost:7070/ws/chat");
        setChatSocket(wsChat);

        wsChat.onopen = () => {
            console.log("웹소켓 연결 성공");
            setIsSocketOpen(true); // 연결 성공 시 상태 업데이트
        };

        wsChat.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        wsChat.onerror = (error) => {
            console.error("채팅 웹소켓 오류:", error);
            setIsSocketOpen(false); // 오류 발생 시 연결 상태 업데이트
        };

        wsChat.onclose = () => {
            console.log("웹소켓 연결 종료");
            setIsSocketOpen(false); // 연결 종료 시 상태 업데이트
        };

        return () => {
            wsChat.close();
        };
    }, []);

    useEffect(() => {
        if (chatSocket && isSocketOpen) {
            const messageData = {
                userId,
                alarmRole,
                alarmSenderId: senderId,
                alarmContent: messageContent,
                alarmStatus: false,
                alarmCreateDate: new Date().toISOString(),
            };

            chatSocket.send(JSON.stringify(messageData));
            console.log("알람 메시지 전송:", messageData);
        }
    }, [chatSocket, isSocketOpen, userId, alarmRole, senderId, messageContent]);

    return null; // UI는 보이지 않게 처리
};

export default SendAlarm;*/
