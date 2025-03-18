import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserOrderDetail = () => {
    const { orderNumber } = useParams();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:7070/api/orders/${orderNumber}`)
            .then((response) => {
                setOrder(response.data || {});
            })
            .catch((error) => {
                console.error("주문 정보를 불러오는 중 오류 발생:", error);
                setError("주문 정보를 가져올 수 없습니다.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [orderNumber]);

    if (loading) return <p>주문 정보를 불러오는 중...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!order || !order.orderNumber) return <p>해당 주문을 찾을 수 없습니다.</p>;

    const orderItems = order.orderList ? order.orderList.split("|").map(item => {
        const parts = item.trim().split("/");

        return {
            menuName: parts[0] || "메뉴 없음",
            optionName: parts[1] && parts[1].trim() !== "" ? parts[1] : "옵션 없음",
            menuPrice: parts[2] ? `${parts[2]}원` : "가격 정보 없음"
        };
    }) : [];

    return (
        <div>
            <h2>주문 상세 내역</h2>
            <p><strong>주문번호:</strong> {order.orderNumber}</p>
            <p><strong>총 결제 금액:</strong> {order.totalPayment ? `${order.totalPayment}원` : "정보 없음"}</p>
            <p><strong>배달 주소:</strong> {order.deliveryAddress || "주소 정보 없음"}</p>

            <h3>주문 아이템</h3>
            <ul>
                {orderItems.map((item, index) => (
                    <li key={index}>
                        <p><strong>메뉴:</strong> {item.menuName}</p>
                        <p><strong>옵션:</strong> {item.optionName}</p>
                        <p><strong>가격:</strong> {item.menuPrice}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserOrderDetail;
