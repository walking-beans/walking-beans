/*  알림 컴포넌트 제작 페이지
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';


const SendAlarm = forwardRef((props, ref) => {
  const [chatSocket, setChatSocket] = useState(null);

    // 웹소켓 연결 설정
    useEffect(() => {
        const wsChat = new WebSocket("ws://localhost:7070/ws/chat");
        setChatSocket(wsChat);

        wsChat.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            console.log("받은 메시지:", newMessage); // 수신한 메시지 처리
        };

        wsChat.onerror = (error) => {
            console.error("채팅 웹소켓 오류:", error);
        };

        return () => {
            wsChat.close();
        };
    }, []);

    // 부모 컴포넌트에서 호출 가능한 sendAlarm 함수 구현
    useImperativeHandle(ref, () => ({
        sendAlarm: (alarmData) => {
            if (chatSocket) {
                chatSocket.send(JSON.stringify(alarmData)); // 알람 데이터 전송
            }
        }
    }));

    return null; // UI는 렌더링하지 않음
});

export default SendAlarm;

 */
