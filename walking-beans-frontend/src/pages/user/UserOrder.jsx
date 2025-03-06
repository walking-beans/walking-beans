import React, {useEffect, useState} from "react";
import apiUserOrderService from "../../service/apiUserOrderService";
import {useNavigate, useParams} from "react-router-dom";
import UserCart from "../user/UserCart";
import "../../css/Order.css"
import "../../css/Cart.css"

const UserOrder = () => {
    const [carts, setCarts] = useState([]);
    const {orderId, cartId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            console.log("cartId:", cartId); // ✅ cartId 값 확인
            if (cartId) {
                const data = await apiUserOrderService.getUserOrderByCartId(cartId);
                console.log("받아온 데이터:", data); // ✅ 응답 데이터 확인
                if (data) {
                    setCarts(data);
                }
            }
        };
        fetchCart();
    }, [cartId]);

    const handleDelete = () => {
        apiUserOrderService.deleteUserOrderCart(cartId)
            .then((res) => {
                if (res) {
                    console.log("삭제 성공", res);
                    setCarts((prevCarts) => prevCarts.filter(cart => cart.cartId !== cartId));
                }
            })
            .catch((err) => {
                console.error("삭제 실패", err);
                alert("메뉴 삭제에 실패하였습니다. 다시 시도해 주세요.");
            });
    };



    useEffect(() => {
        if (orderId) {
            apiUserOrderService.getUserOrderByOrderId(orderId)
                .then((data) => {
                    console.log("cart에서 받아온 데이터", data);
                    setCarts(data);
                })
                .catch((err) => {
                    console.error("주문 데이터를 가져오는 중 오류 발생:", err);
                });
        }
    }, [orderId]);

    return (
        <div className="userorder-container">
            {/* menu */}




            {/* cart */}
            <div className="user-cart-background">
            <div className="user-cart-title">장바구니</div>
            <div className="user-cart-menuinfo">

            {
                carts.map((cart, index) => (
                    <UserCart key={cart.cartId}
                              menuName={cart.menuName}
                              menuPrice={cart.menuPrice}
                              optionName={cart.optionName}
                              optionPrice={cart.optionPrice}

                              onDelete={handleDelete}
                    />
                ))
            }
            </div>

                <hr className="user-order-hr"/>
                <div className="user-cart-grid">
                <div className="user-cart-bordtext">
                    최종 결제 금액</div>
                <div className="user-cart-title">총금액</div>
                </div>
                <button className="user-order-btn">주문하기</button>
            </div>
        </div>
    );
};

export default UserOrder;