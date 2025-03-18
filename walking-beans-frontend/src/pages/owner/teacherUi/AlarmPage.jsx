import React, {useEffect, useState} from "react";
import axios from "axios";
import {Client} from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {useNavigate} from "react-router-dom";

const AlarmPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [storeId, setStoreId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log("로드된 사용자 정보:", parsedUser);

            if (!parsedUser.storeId) {
                console.warn("storeId 없음. API에서 가져오는 중...");
                fetchStoreId(parsedUser.userId);
            } else {
                setStoreId(parsedUser.storeId);
            }
            setCurrentUser(parsedUser);
        } else {
            console.warn("localStorage에서 사용자 정보를 찾을 수 없음.");
        }
    }, []);

    const fetchStoreId = (userId) => {
        axios
            .get(`http://localhost:7070/api/store/mystore/${userId}`)
            .then(response => {
                const fetchedStoreId = response.data.storeId;

                if (fetchedStoreId) {
                    console.log("API에서 가져온 storeId:", fetchedStoreId);
                    setStoreId(fetchedStoreId);

                    const updatedUser = {...currentUser, storeId: fetchedStoreId};
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                } else {
                    console.warn("storeId를 가져올 수 없음.");
                }
            })
            .catch(error => {
                    console.error("storeId를 가져오는 중 오류 발생:", error);
                }
            );
    };

    useEffect(() => {
        if (!storeId) {
            console.warn("storeId가 없습니다. 알림을 불러올 수 없습니다.");
            return;
        }

        const fetchNotifications = () => {
            axios
                .get(`http://localhost:7070/api/notifications/${storeId}`)
                .then(response => {
                    console.log("API 응답 데이터:", response.data);
                    setNotifications(response.data);
                })
                .catch(error => {
                        console.error("알림을 가져오는 중 오류 발생:", error);
                    }
                );
        };


        fetchNotifications();

        const socket = new SockJS("http://localhost:7070/ws-order");
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            debug: (str) => console.log(`WebSocket Debug: ${str}`),
            onConnect: () => {
                console.log("WebSocket 연결 성공");
                stompClient.subscribe(`/topic/orders/${storeId}`, (message) => {
                    console.log("새로운 주문 알림:", message.body);
                    fetchNotifications();
                });
            },
            onStompError: (frame) => {
                console.error("WebSocket 오류:", frame);
            },
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [storeId]);

    const markAsRead = (notificationId) => {
        axios
            .put(`http://localhost:7070/api/notifications/read/${notificationId}`)
            .then(() => {
                setNotifications(notifications.map(n =>
                    n.notificationId === notificationId ? {...n, isRead: true} : n
                ));
            })
            .catch(error => {
                    console.error("알림 읽음 처리 중 오류 발생:", error);
                }
            );
    };


    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">알림 내역</h2>
            {notifications.length === 0 ? (
                <div className="alert alert-info text-center">아직 알림이 없습니다.</div>
            ) : (
                <ul className="list-group">
                    {notifications.map(
                        (notification) => (
                            <li key={notification.notificationId}
                                className={`list-group-item d-flex justify-content-between 
                                ${notification.isRead ? "list-group-item-light" : "list-group-item-warning"}`}
                            >
                                <span>{notification.message}</span>
                                {!notification.isRead && (
                                    <button className="btn btn-primary btn-sm"
                                            onClick={() => markAsRead(notification.notificationId)}>
                                        확인
                                    </button>
                                )}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default AlarmPage;
