import React, {useEffect, useState} from "react";
import UserOrderListForm from "./UserOrderListForm";
import {useParams} from "react-router-dom";
import apiUserOrderService from "../../service/apiUserOrderService";
import UserOrderMenuForm from "./UserOrderMenuForm";

const UserOrderList = () => {
    const [cartId, setCartId] = useState(null);
    const [storeId, setStoreId] = useState(null);
    const [carts, setCarts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [store, setStore] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [orderId, setOrderId] = useState(null);

    // 주문 상태 가져오기
    useEffect(() => {
        if (orderId) {
            apiUserOrderService.getOrderStatusByOrderId(orderId)
                .then((data) => {
                    console.log("주문 상태:", data);
                    setOrders(data); // 상태 업데이트 추가
                })
                .catch((err) => {
                    console.error("주문 상태 가져오기 실패:", err);
                });
        }
    }, [orderId]);

    // 주문 개수 가져오기
    useEffect(() => {
            apiUserOrderService.getCartQuantityByOrderId(orderId)
    }, [orderId]);

    // carts 데이터 가져오기
    useEffect(() => {
        if (cartId) {
            apiUserOrderService.getUserOrderByCartId(cartId)
                .then((data) => {
                    console.log("cart에서 받아온 데이터", data);
                    setCarts(data); // carts 업데이트
                })
                .catch((err) => {
                    console.error("주문 데이터를 가져오는 중 오류 발생:", err);
                });
        }
    }, [cartId]);

    // 가게 데이터 가져오기
    useEffect(() => {
        apiUserOrderService.getStoreByOrderId(storeId, setStore);
    }, [storeId]);

    return (
        <div className="user-order-list-container">
            <div className="user-order-background">
                <div className="user-order-menu-container">
                    <div className="user-title-center">주문내역</div>
                    <div className="user-order-hr" alt="구분선"></div>

                    {orders.map((order, index) => {
                        const isLastItem = index === orders.length - 1; // 마지막 아이템이면 선 없애기

                        return (
                            <div key={order.orderId}>
                                <UserOrderListForm
                                    orderId={order.orderId}
                                    orderStatus={order.orderStatus}
                                    storePictureUrl={order.storePictureUrl}
                                    storeName={order.storeName}
                                    orderModifiedDate={order.orderModifiedDate}
                                    menuName={order.menuName}
                                    cartQuantity={order.cartQuantity}
                                />

                                {/* 마지막 항목이 아니면 구분선 렌더링 */}
                                {!isLastItem && <div className="user-order-hr"></div>}
                            </div>
                        );
                    })}


                </div>
            </div>
        </div>
    )
};

export default UserOrderList;