import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import bellIcon from "../../../assert/svg/bell.svg";
import "./OrderNotification.css";

const OrderNotification = ({ storeId }) => {
    const [newOrders, setNewOrders] = useState(0);
    const [orderMessages, setOrderMessages] = useState([]);

    useEffect(() => {
        console.log("🔌 WebSocket 연결 시도...");

        const socket = new SockJS("http://localhost:7070/ws-order");
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("✅ WebSocket 연결 성공");
                stompClient.subscribe(`/topic/orders/${storeId}`, (message) => {
                    console.log("📩 주문 알림 수신:", message.body);
                    setNewOrders((prev) => prev + 1);
                    setOrderMessages((prev) => [...prev, message.body]);
                });
            },
            onStompError: (frame) => {
                console.error("❌ WebSocket 오류:", frame);
            },
            onWebSocketClose: () => {
                console.warn("⚠ WebSocket 연결 종료");
            },
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [storeId]);

    return (
        <div className="notification-container">
            <div className="notification-icon">
                <img src={bellIcon} alt="알림" />
                {newOrders > 0 && <span className="notification-badge">{newOrders}</span>}
            </div>
            {newOrders > 0 && (
                <div className="notification-dropdown">
                    <ul>
                        {orderMessages.map((order, index) => (
                            <li key={index}>{order}</li>
                        ))}
                    </ul>
                    <button onClick={() => setNewOrders(0)}>모두 확인</button>
                </div>
            )}
        </div>
    );
};

export default OrderNotification;
