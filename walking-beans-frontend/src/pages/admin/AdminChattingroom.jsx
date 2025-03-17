/*
import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import apiRiderService from "../../components/rider/apiRiderService";
import "../../css/admin/AdminChattingroom.css";

const AdminChattingroom = ({user}) => {
    const stompClient = useRef(null);
    const [chattingRoom, setChattingRoom] = useState([]);

    const [receiverRelationLeft, setReceiverRelationLeft] = useState(2);
    const [receiverRelationRight, setReceiverRelationRight] = useState(3);
    const [receiverRelationLeftOrRight, setReceiverRelationLeftOrRight] = useState(false);
    const [leftButtonValue, setLeftButtonValue] = useState("");
    const [rightButtonValue, setRightButtonValue] = useState("");

    const [classLeftBtn, setClassLeftBtn] = useState("btn btn-dark btn-lg");
    const [classRightBtn, setClassRightBtn] = useState("btn btn-light btn-lg");


    const userId= 1;

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
        setReceiver();
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
        if (whichOne) {
            setReceiverRelationLeftOrRight(true);
            apiRiderService.getUserChattingRoomByUserId(userId, receiverRelationRight, setChattingRoom);
            setClassRightBtn("btn btn-dark btn-lg");
            setClassLeftBtn("btn btn-light btn-lg");
        } else {
            setReceiverRelationLeftOrRight(false);
            apiRiderService.getUserChattingRoomByUserId(userId, receiverRelationLeft, setChattingRoom);
            setClassLeftBtn("btn btn-dark btn-lg");
            setClassRightBtn("btn btn-light btn-lg");
        }
    }


    return (
        <div className="admin-chattingroom-base ">
            <ul className="nav nav-underline">
                <div className="admin-button-base col-12">
                    <button type="button"
                            className={classLeftBtn}
                            onClick={() => handleButton(false)}
                    >
                        {leftButtonValue}
                    </button>
                    <button type="button"
                            className={classRightBtn}
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

export default AdminChattingroom;*/
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import apiRiderService from "../../components/rider/apiRiderService";
import "../../css/admin/AdminChattingroom.css";
import UserDefaultIcon from "../../assert/images/admin/AdminMessage/UserIconDefault.svg";

const AdminChattingroom = ({user}) => {

    const navigate = useNavigate();
    const stompClient = useRef(null);
    const [chattingRoom, setChattingRoom] = useState([]);

    const [receiverRelationLeft, setReceiverRelationLeft] = useState(2);
    const [receiverRelationRight, setReceiverRelationRight] = useState(3);
    const [receiverRelationLeftOrRight, setReceiverRelationLeftOrRight] = useState(false);
    const [leftButtonValue, setLeftButtonValue] = useState("");
    const [rightButtonValue, setRightButtonValue] = useState("");

    const [classLeftBtn, setClassLeftBtn] = useState("btn btn-dark btn-lg");
    const [classRightBtn, setClassRightBtn] = useState("btn btn-light btn-lg");


    const [currentUser, setCurrentUser] = useState(null);
    const userId = 1;

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

        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/sub/chattingroom`, (message) => {
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

    const handleButton = (whichOne) => {
        console.log(whichOne);
        if (whichOne) {
            setReceiverRelationLeftOrRight(true);
            apiRiderService.getUserChattingRoomByUserId(userId, receiverRelationRight, setChattingRoom);
            setClassRightBtn("btn btn-dark btn-lg");
            setClassLeftBtn("btn btn-light btn-lg");
        } else {
            setReceiverRelationLeftOrRight(false);
            apiRiderService.getUserChattingRoomByUserId(userId, receiverRelationLeft, setChattingRoom);
            setClassLeftBtn("btn btn-dark btn-lg");
            setClassRightBtn("btn btn-light btn-lg");
        }
    }

    // 유저

    useEffect(() => {
        setReceiver();
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

    return (
        <div className="admin-chattingroom-base ">
            <ul className="nav nav-underline">
                <div className="admin-button-base col-12">
                    <button type="button"
                            onClick={() => handleButton(false)}
                            className={classLeftBtn}
                    >
                        {leftButtonValue}
                    </button>
                    <button type="button"
                            onClick={() => handleButton(true)}
                            className={classRightBtn}
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
                                    <p><img src={(room.userPictureUrl)? (`${room.userPictureUrl}`) : (`${UserDefaultIcon}`)}/></p>
                                    <p>{room.userName}</p>
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