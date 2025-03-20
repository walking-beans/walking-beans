import React, {useEffect, useRef, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import apiRiderService from "../../service/apiRiderService";

const AdminChattingroomTest = () => {

    const stompClient = useRef(null);
    const [chattingRoom, setChattingRoom] = useState([]);

    const userId = 1;
    const [receiverRelationLeft, setReceiverRelationLeft] = useState(2);
    const [receiverRelationRight, setReceiverRelationRight] = useState(3);
    const [receiverRelationLeftOrRight, setReceiverRelationLeftOrRight] = useState(false);
    const [leftButtonValue, setLeftButtonValue] = useState("");
    const [rightButtonValue, setRightButtonValue] = useState("");
    const [msg, setMsg] = useState(null);
    let checking = 1;

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
        const socket = new WebSocket("ws://localhost:7070/ws/TEST");
        console.log("✅ WebSocket Connected.");
        setReceiver();
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/sub/chatroom/1`, (message) => {
                console.log("connected && message : ", message);
                apiRiderService.getChattingRooms(userId, receiverRelationLeft, setChattingRoom);

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
        apiRiderService.getChattingRooms(userId, receiverRelationLeft, setChattingRoom);

        // 컴포넌트 언마운트 시 웹소켓 연결 해제
        return () => disconnect();
    }, []);

    function handleUpdateChattingRoom (receiverRelation) {
        apiRiderService.getChattingRooms(userId, receiverRelation, setChattingRoom);
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
    );
};

export default AdminChattingroomTest;