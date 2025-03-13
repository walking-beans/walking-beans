/*
import React, {useEffect, useState} from "react";
import apiRiderService from "../../components/rider/apiRiderService";

const AdminChattingroom = () => {

    const userId = 1;
    const [ws, setWs] = useState();
    const [chattingRoom, setChattingRoom] = useState([]);

    const [receiverRelationLeft, setReceiverRelationLeft] = useState(2);
    const [receiverRelationRight, setReceiverRelationRight] = useState(3);
    const [receiverRelationLeftOrRight, setReceiverRelationLeftOrRight] = useState(false);
    const [leftButtonValue, setLeftButtonValue] = useState("");
    const [rightButtonValue, setRightButtonValue] = useState("");
    const [msg, setMsg] = useState(null);

    // userId 에 따른 채팅목록 설정
    function setReceiver() {
        if (userId === 1) {
            // 라이더 목록 초기화
            setReceiverRelationRight(2);
            setLeftButtonValue("라이더");
            // 매장 목록 초기화
            setReceiverRelationRight(3);
            setRightButtonValue("매장");
        } else if (userId === 2) {
            // 고객 목록 초기화
            setReceiverRelationLeft(1);
            setLeftButtonValue("빈즈");
            // 매장 목록초기화
            setReceiverRelationRight(3);
            setRightButtonValue("매장");
        } else {
            // 고객 목록 초기화
            setReceiverRelationLeft(1);
            setLeftButtonValue("빈즈")
            // 라이더 목록 초기화
            setReceiverRelationRight(2);
            setRightButtonValue("라이더");
        }
    }

    useEffect(() => {
        // 채팅 목록 설정
        setReceiver();
        apiRiderService.getChattingRooms(userId, receiverRelationLeft, setChattingRoom);
    }, [userId]);

    function handleUpdateChattingRoom (receiverRelation) {
        apiRiderService.getChattingRooms(userId, receiverRelation, setChattingRoom);
    }

    useEffect(() => {
        startWebSocket();
    }, []);

    function startWebSocket() {
        if (ws && ws.readyState === WebSocket.OPEN) {
            console.log("WebSocket already connected.");
            return;
        }

        const newWs = new WebSocket("ws://localhost:7070/ws/chat");

        newWs.onopen = () => {
            console.log("✅ WebSocket Connected.");
        };

        newWs.onclose = () => {
            console.log("❌ WebSocket Closed. Reconnecting in 5 seconds...");
            setTimeout(() => startWebSocket(), 5000);
        };

        newWs.onerror = (error) => {
            console.error("🚨 WebSocket Error: ", error);
        };

        newWs.onmessage = (event) => {
            let data = JSON.parse(event.data)
            console.log("onmessage");
            setMsg(data);
            receiverRelationLeftOrRight ? apiRiderService.getChattingRooms(userId, receiverRelationLeft, setChattingRoom) : apiRiderService.getChattingRooms(userId, receiverRelationRight, setChattingRoom);
        };

        setWs(newWs);

    }

    return (
        <div>
            <div>
                <button>
                    {leftButtonValue}
                </button>
                <button>
                    {rightButtonValue}
                </button>
            </div>
            <div>
                {Array.isArray(chattingRoom) ? (
                    chattingRoom.map((room, index) => (
                        <div
                            key={index}
                        >
                            <p>{room.roomId}</p>
                            <p>{room.orderId}</p>
                            <p>{room.lastMessage}</p>
                        </div>
                    ))
                ) : (
                    <p>채팅 기록이 없습니다.</p>
                )}
            </div>
        </div>

    )

}

export default AdminChattingroom;*/
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import apiRiderService from "../../components/rider/apiRiderService";
import "../../css/admin/AdminChattingroom.css";

const AdminChattingroom = () => {

    const navigate = useNavigate();
    const stompClient = useRef(null);
    const [chattingRoom, setChattingRoom] = useState([]);

    const userId = 1;
    const [receiverRelationLeft, setReceiverRelationLeft] = useState(2);
    const [receiverRelationRight, setReceiverRelationRight] = useState(3);
    const [receiverRelationLeftOrRight, setReceiverRelationLeftOrRight] = useState(false);
    const [leftButtonValue, setLeftButtonValue] = useState("");
    const [rightButtonValue, setRightButtonValue] = useState("");
    const [msg, setMsg] = useState(null);

    // userId 에 따른 채팅목록 설정
    function setReceiver() {
        if (userId === 1) {
            // 라이더 목록 초기화
            setReceiverRelationRight(2);
            setLeftButtonValue("라이더");
            // 매장 목록 초기화
            setReceiverRelationRight(3);
            setRightButtonValue("매장");
        } else if (userId === 2) {
            // 고객 목록 초기화
            setReceiverRelationLeft(1);
            setLeftButtonValue("빈즈");
            // 매장 목록초기화
            setReceiverRelationRight(3);
            setRightButtonValue("매장");
        } else {
            // 고객 목록 초기화
            setReceiverRelationLeft(1);
            setLeftButtonValue("빈즈")
            // 라이더 목록 초기화
            setReceiverRelationRight(2);
            setRightButtonValue("라이더");
        }
    }
    // 웹소켓 연결 설정
    const connect = () => {
        const socket = new WebSocket("ws://localhost:7070/ws");
        console.log("✅ WebSocket Connected.");
        setReceiver();
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/sub/chatroom/1`, (message) => {
                console.log("connected && message : ", message);
                (receiverRelationLeftOrRight) ? apiRiderService.getUserChattingRoomByUserId(userId, receiverRelationRight, setChattingRoom) : apiRiderService.getUserChattingRoomByUserId(userId, receiverRelationLeft, setChattingRoom);
            });
        });
    };
    // 웹소켓 연결 해제
    const disconnect = () => {
        if (stompClient.current) {
            stompClient.current.disconnect();
            console.log("❌ WebSocket Closed. Reconnecting in 5 seconds...");
        }
        connect();
    };

    useEffect(() => {
        connect();
        // apiRiderService.getChattingListTest(1, setMessages);
        apiRiderService.getUserChattingRoomByUserId(userId, receiverRelationLeft,
            (newCR) => {
                setChattingRoom(newCR);
                console.log(newCR);
            });

        // 컴포넌트 언마운트 시 웹소켓 연결 해제
        return () => disconnect();
    }, []);

    const handleButton = (whichOne) => {
        console.log(whichOne);
        (whichOne) ? apiRiderService.getUserChattingRoomByUserId(userId, receiverRelationRight, setChattingRoom) : apiRiderService.getUserChattingRoomByUserId(userId, receiverRelationLeft, setChattingRoom);
    }


    return (
        <div className="admin-chattingroom-base ">
            <ul className="nav nav-underline">
                <div className="admin-button-base col-12">
                    <button type="button"
                            className="btn btn-dark btn-lg"
                            onClick={() => handleButton(false)}
                    >
                        {leftButtonValue}
                    </button>
                    <button type="button"
                            className="btn btn-light btn-lg"
                            onClick={() => handleButton(true)}
                    >
                        {rightButtonValue}
                    </button>

                </div>
                <div className="admin-chattingroom-list">
                    {Array.isArray(chattingRoom) ? (
                        chattingRoom.map((room, index) => (
                            <Link to={`/chat/message/${room.roomId}`}>
                                <div
                                    key={index}
                                    className="admin-chattingroom-list-chat"
                                >
                                    <p>{room.userName}</p>
                                    <p>{room.userPictureUrl}</p>
                                    <p>{room.messageContent}</p>
                                    <p>{room.messageTime}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>채팅 기록이 없습니다.</p>
                    )}
                </div>
            </ul>
        </div>
    );
};

export default AdminChattingroom;