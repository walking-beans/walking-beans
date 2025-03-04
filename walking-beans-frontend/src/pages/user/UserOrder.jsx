/*
import { useEffect, useState } from "react";
import apiUserOrderService from "./apiUserOrderService";
import {useParams} from "react-router-dom";

const UserOrder = () => {
    const [carts, setCarts] = useState([]);
    const { orderId} = useParams();


    useEffect(() => {
        if (orderId) {
            apiUserOrderService.getUserOrderByOrderId(orderId)
                .then((data) => {
                    setCarts(data);
                })
                .catch((err) => {
                    console.error("주문 데이터를 가져오는 중 오류 발생:", err);
                });
        }
    }, [orderId]);

    return (
        <div className="userorder-container">
            <div>주문 내역</div>
            {
                carts.map((cart, index) => (
                    <div key={index}>
                        <div>메뉴명: {cart.menuName}</div>
                        <div>가격: {cart.menuPrice}원</div>
                        <div>옵션: {cart.optionName} (+{cart.optionPrice}원)</div>
                        <button>주문하기</button>
                    </div>
                ))
            }
        </div>
    );
};

export default UserOrder;

 */