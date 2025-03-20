import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import apiRiderService from "../../service/apiRiderService";
import {useParams} from "react-router-dom";

function AdminMessageTEST() {

    const {roomId} = useParams();
    const stompClient = useRef(null);
    // 채팅 내용들을 저장할 변수
    const [messages, setMessages] = useState([]);
    // 사용자 입력을 저장할 변수
    const [inputValue, setInputValue] = useState('');
    // 입력 필드에 변화가 있을 때마다 inputValue를 업데이트
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // 웹소켓 연결 설정
    const connect = () => {
        const socket = new WebSocket("ws://localhost:7070/ws/TEST");
        console.log("✅ WebSocket Connected.");
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/sub/chatroom/1`, (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        });
    };
    // 웹소켓 연결 해제
    const disconnect = () => {
        if (stompClient.current) {
            stompClient.current.disconnect();
        }
    };

    useEffect(() => {
        connect();
        apiRiderService.getChattingListTest(1, setMessages);
        // 컴포넌트 언마운트 시 웹소켓 연결 해제
        return () => disconnect();
    }, []);

    //메세지 전송
    const sendMessage = () => {
        if (stompClient.current && inputValue) {
            const body = {
                roomId : roomId,
                userId : 1,
                messageRole : 1,
                messageContent : inputValue
            };
            stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
            setInputValue('');
        }
    };

    return (
        <div>
            <ul>
                <div>
                    {/* 입력 필드 */}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    {/* 메시지 전송, 메시지 리스트에 추가 */}
                    <button onClick={sendMessage}>입력</button>
                </div>
                {/* 메시지 리스트 출력 */}
                {messages.map((item, index) => (
                    <div key={index} className="list-item">{item.messageContent}</div>
                ))}
            </ul>
        </div>
    );
}

export default AdminMessageTEST;