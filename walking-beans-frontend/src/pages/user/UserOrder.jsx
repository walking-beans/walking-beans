import React, {useEffect, useState} from "react";
import apiUserOrderService from "../../service/apiUserOrderService";
import {useNavigate, useParams} from "react-router-dom";
import UserCart from "./UserCart";

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





            <div className="user-cart-container">
            <div>주문 내역</div>
            <div>
            {
                carts.map((cart, index) => (
                    <UserCart orderId={index}
                              menuName={cart.menuName}
                              menuPrice={cart.menuPrice}
                              optionName={cart.optionName}
                              optionPrice={cart.optionPrice}

                              onDelete={handleDelete}
                    />
                ))
            }
            </div>
                <button>주문하기</button>
            </div>
        </div>
    );
};

export default UserOrder;