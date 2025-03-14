/*
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

        const newWs = new WebSocket("ws://localhost:7070/ws/chatting");

        newWs.onopen = () => {
            console.log("✅ WebSocket Connected.");
            apiRiderService.getAllMessages(roomId, setChatBox);
        };

        newWs.onclose = () => {
            console.log("❌ WebSocket Closed. Reconnecting in 5 seconds...");
            setTimeout(() => startWebSocket(), 500);
        };

        newWs.onerror = (error) => {
            console.error("🚨 WebSocket Error: ", error);
        };

        newWs.onmessage = (event) => {
            console.log("new Msg");
            apiRiderService.getAllMessages(roomId, setChatBox);
        };

        setWs(newWs);

    }


    // messageRole = 1 일 경우
    function sendMessage() {
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            alert("WebSocket이 연결되지 않았습니다. 다시 시도하세요.");
            return;
        }

        console.log(ws);
        if (!message) return;

        // messageRole = 1 일 경우
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
*/
import React, { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import apiRiderService from "../../components/rider/apiRiderService";
import {useParams} from "react-router-dom";
import "../../css/admin/AdminMessage.css";
import UserDefaultIcon from "../../assert/images/admin/AdminMessage/UserIconDefault.svg";

import PictureButton from "../../assert/images/admin/AdminMessage/adminMessage-pictureButton.svg"

function AdminMessage({user}) {

    const {roomId} = useParams();
    const stompClient = useRef(null);
    // 채팅 내용들을 저장할 변수
    const [messages, setMessages] = useState([]);
    // 사용자 입력을 저장할 변수
    const [inputValue, setInputValue] = useState('');
    // input disabled
    const [isDisabled, setIsDisabled] = useState(false);

    // 입력 필드에 변화가 있을 때마다 inputValue를 업데이트
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const [previewImage, setPreviewImage] = useState(null);
    // 이미지 input 에 변화가 있을 때마다
    const handleImgChange = (event) => {
        const file = event.target.files[0];
        setInputValue("");
        setIsDisabled(true);
        console.log(file);
        if (file && file.type.startsWith("image/")) {
            console.log("image/");
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    // 웹소켓 연결 설정
    const connect = () => {
        const socket = new WebSocket("ws://localhost:7070/ws");
        console.log("✅ WebSocket Connected.");
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/sub/chatroom/${roomId}`, (message) => {
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
        console.log("user : ", user);
        connect();
        apiRiderService.getChattingMessageList(roomId,
            (newMessage) => {
                setMessages(newMessage);
                console.log(newMessage);
            });
        // 컴포넌트 언마운트 시 웹소켓 연결 해제
        return () => disconnect();
    }, []);

    //메세지 전송
    const sendMessage = () => {
        if (!stompClient.current) return alert("❌ WebSocket이 연결되지 않았습니다!");
        if (stompClient.current && inputValue) {
            const body = {
                roomId : roomId,
                userId : 1,
                messageRole : 1,
                messageContent : inputValue
            };
            stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
            stompClient.current.send(`/pub/chatting`, {}, JSON.stringify(body));
            setInputValue('');
            return;
        } else if (stompClient.current && previewImage) {
            /*const reader = new FileReader();
            reader.readAsDataURL(previewImage);

            const body = {
                roomId : roomId,
                userId : 1,
                messageRole : 2,
                messageContent : previewImage.name,
                data: reader.result,
            };
            stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));*/
            alert("이미지 삽입");
            // 이미지 미리보기 없애기
            setPreviewImage(null);
            // input disabled 해제하기
            setIsDisabled(false);
            return;
        }
        alert("메세지를 작성해주세요");
        // 알람 컴포넌트
    };

    return (
        <div className="admin-chattingroom-base">
            <ul>
                {/* 메시지 리스트 출력 */}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                    >
                        {
                            msg.userId !== 1 ? (
                                <div
                                    className="admin-message-notUserInput "
                                >
                                    <p><img src={(msg.userPictureUrl) ? `${msg.userPictureUrl}`: `${UserDefaultIcon}`} /> {msg.userName}</p>
                                    <p>{msg.messageContent}</p>
                                </div>
                            ) : (
                                <div
                                    className="admin-message-userInput"
                                >
                                    <p>{msg.messageContent}</p>
                                </div>
                            )
                        }

                    </div>
                ))}
                <div className="admin-message-previewImage">
                    {previewImage ? <div><img src={previewImage} /></div> : <div></div>}
                </div>
                {/* 입력 필드 */}
                <div className="col-12 admin-message-bottomdiv">
                    <input
                        type="text"
                        value={inputValue}
                        className="admin-message-input"
                        onChange={handleInputChange}
                        disabled={isDisabled}
                    />
                    <div className="admin-message-ImgAndBtnDiv">
                        <label htmlFor="fileInput"
                            className="admin-message-pictureBtn"
                        >
                            <img src={PictureButton}/>
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            style={{display: "none"}}
                            onChange={handleImgChange}
                        />
                        {/* 메시지 전송, 메시지 리스트에 추가 */}
                        <button
                            className="admin-message-button"
                            onClick={sendMessage}
                        >
                            전송
                        </button>
                    </div>
                </div>
            </ul>
        </div>
    );
}

export default AdminMessage;