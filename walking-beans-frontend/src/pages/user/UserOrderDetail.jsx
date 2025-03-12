import React, {useEffect, useState} from "react";
import UserOrderMenuForm from "./UserOrderMenuForm";
import apiUserOrderService from "../../service/apiUserOrderService";
import {useParams} from "react-router-dom";

const UserOrderDetail = () => {
    const [carts, setCarts] = useState([]);
    const {userId, orderId, storeId} = useParams();
    const [address, setAddress] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [store, setStore] = useState({});

    // 고객 배달 주소 가져오기
    useEffect(() => {
        apiUserOrderService.getOrderAddressByUserId(userId, setAddress)
    }, [userId]);

    // 가게 데이터 가져오기
    useEffect(() => {
        apiUserOrderService.getStoreByOrderId(storeId, setStore);
    }, [storeId]);

    // option 데이터 가져오기
    useEffect(() => {
        if (orderId) {
            apiUserOrderService.getUserOrderByOrderId(orderId, setCarts)
                .then(() => {
                    console.log("주문에 해당하는 장바구니 데이터 업데이트 완료");
                })
                .catch((err) => {
                    console.error("getUserOrderByOrderId 에러 발생", err);
                });
        }
    }, [orderId]);

    // 메뉴 총 금액 계산
    useEffect(() => {
        const newTotalPrice = carts.reduce((acc, cart) => acc + Number(cart.menuPrice), 0);
        setTotalPrice(newTotalPrice);
    }, [carts]);

    // 총 금액 계산
    const total = totalPrice + Number(store.storeDeliveryTip);

    // 포맷팅 (숫자 , 넣기)
    const formattedTotalPrice = totalPrice.toLocaleString();
    const formattedTotal = total.toLocaleString();

    return (
        <div className="user-order-detail-container">
            <div className="user-order-background">
                <div className="user-order-menu-container">
                    <div className="user-title-center">주문 상세 내역</div>
                    <div className="user-order-hr" alt="구분선"></div>

                    <div>
                        <div className="user-cart-bordtext">배달주소</div>
                        <div className="user-order-address-text">{address?.address}</div>
                        <div className="user-order-address-detail-text">{address?.detailedAddress}</div>
                    </div>

                    <div className="user-order-hr" alt="구분선"></div>

                    {carts.map((cart, index) => {
                        const isLastItem = index === carts.length - 1; // 마지막 아이템이면 선 없애기

                        return (
                            <div key={cart.cartId}>
                                <UserOrderMenuForm
                                    cartId={cart.cartId}
                                    menuName={cart.menuName}
                                    menuPrice={cart.menuPrice}
                                    optionName={cart.optionName}
                                    optionPrice={cart.optionPrice}
                                    /*  삭제 기능 넣기  */
                                />

                                {/* 마지막 항목이 아니면 구분선 렌더링 */}
                                {!isLastItem && <div className="user-order-hr-mini"></div>}
                            </div>
                        );
                    })}

                    <div className="user-order-hr" alt="구분선"></div>

                    <div className="user-order-price-grid">
                        <div className="user-order-bordtext">결제금액</div>
                        <div className="user-cart-bic-pricetext">{formattedTotal}원</div>
                    </div>

                    <div className="user-order-address-grid">
                        <div className="user-order-basic-text-m-0">주문금액</div>
                        <div className="user-order-basic-text-m-0">{formattedTotalPrice}원</div>
                    </div>

                    <div className="user-order-price-grid">
                        <div className="user-order-basic-text-m-0">배달팁</div>
                        <div className="user-order-basic-text-m-0">{store.storeDeliveryTip}원</div>
                    </div>

                    <div className="user-order-hr" alt="구분선"></div>

                    <div>배달주소</div>
                    <div>고객 배달주소</div>

                    <div className="user-order-hr-mini"></div>

                    <div>요청사항</div>
                    <div>요청사항</div>
                </div>
            </div>
        </div>
    )
};

export default UserOrderDetail;