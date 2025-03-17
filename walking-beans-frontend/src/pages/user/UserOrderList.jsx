import React, {useEffect, useState} from "react";
import UserOrderListForm from "./UserOrderListForm";
import {useNavigate, useParams} from "react-router-dom";
import apiUserOrderService from "../../service/apiUserOrderService";
import UserOrderMenuForm from "./UserOrderMenuForm";
import axios from "axios";

const UserOrderList = () => {
    const [cartId, setCartId] = useState(null);
    const [storeId, setStoreId] = useState(null);
    const [carts, setCarts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [store, setStore] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [orderId, setOrderId] = useState(null);
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [users, setUsers] = useState([]);

    // 로그인 확인
    useEffect(() => {
        // 로컬 스토리지에서 사용자 정보 불러오기
        const cartsUser = localStorage.getItem("user");
        if (cartsUser) {
            const user = JSON.parse(cartsUser);
            console.log("로그인 user 정보", user);
            setUserId(user.user_id);
            setCartId(user.user_id);
        } else {
            console.log("로그인 필요");
            alert("주문내역 서비스를 이용하시려면 로그인이 필요합니다.");
            navigate("/login");
        }
    }, []);

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

    // 주문 받은 매장 데이터 가져오기
    useEffect(() => {
        if (userId === null) return;
        console.log("매장 데이터를 불러올 userId: ", userId);

        axios
            .get(`http://localhost:7070/api/orders/storeInfo/${userId}`)
            .then(
                (res) => {
                    console.log("주문 받은 매장 : ", res.data);
                    setStore(res.data);
                })
            .catch((err) => {
                console.log("매장 데이터 불러오기 오류 발생 : ", err);
            })
    }, [userId]);

    return (
        <div className="user-order-list-container">
            <div className="user-order-background">
                <div className="user-order-menu-container">
                    <div className="user-title-center">주문내역</div>
                    <div className="user-order-hr" alt="구분선"></div>

                    {carts.map((cart, index) => {
                        const isLastItem = index === orders.length - 1; // 마지막 아이템이면 선 없애기

                        return (
                            <div key={cart.cartId}>
                                <UserOrderListForm
                                    cartId={cart.cartId}
                                    orderId={cart.orderId}
                                    orderStatus={cart.orderStatus}
                                    storePictureUrl={cart.storePictureUrl}
                                    storeName={cart.storeName}
                                    orderModifiedDate={cart.orderModifiedDate}
                                    menuName={cart.menuName}
                                    totalQuantity={cart.totalQuantity}
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