import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user ? user.user_id : null;

    useEffect(() => {
        if (!userId) {
            console.warn("유저 정보 없음. 로그인 필요.");
            navigate("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/api/order/user/${userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error("주문 목록을 불러오는 중 오류 발생:", error);
            }
        };

        fetchOrders();
    }, [userId, navigate]);

    return (
        <div>
            <h2>📋 내 주문 목록</h2>
            {orders.length === 0 ? (
                <p>주문 내역이 없습니다.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.orderNumber}>
                            <Link to={`/order/${order.orderNumber}`}>
                                <p>🆔 주문번호: {order.orderNumber}</p>

                            </Link>
                            <p>🏠 가게: {order.storeName}</p>
                            <p>📅 주문일자: {order.orderDate}</p>
                            <p>💰 총액: {order.totalPayment}원</p>
                            <p>📝 주문내역: {order.orderList}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderList;
