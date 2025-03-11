import tossPayLogo from "../../images/user/tossPay_Logo.svg";
import {Link, useParams} from "react-router-dom";
import detailBtn from "../../images/user/detailbtn.svg";
import React, {useEffect, useState} from "react";
import apiUserOrderService from "../../service/apiUserOrderService";
import UserCart from "./UserCart";
import UserOrderMenuForm from "./UserOrderMenuForm";
import "../../css/Cart.css";
import "../../css/Order.css"

const UserOrdering = () => {
    const {userId, orderId, storeId, menuId, cartId} = useParams();
    const [address, setAddress] = useState("");
    const [store, setStore] = useState({});
    const [carts, setCarts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

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
        <div className="user-ordering-container">
            <div className="user-ordering">
                <div className="user-order-menu-container">
                    <div className="user-title-center">주문하기</div>
                    <div className="user-order-hr" alt="구분선"></div>

                    <div className="user-order-address-grid">
                        <div alt="그리드 추가">
                            <div className="user-cart-bordtext">배달주소</div>
                            <div className="user-order-address-text">{address?.address}</div>
                            <div className="user-order-address-detail-text">{address?.detailedAddress}</div>
                        </div>
                        <div>
                            <Link to={`/user/order`}><img src={detailBtn}
                                                          alt="배달 주소 리스트"/></Link>
                        </div>
                    </div>

                    <div className="user-order-hr" alt="구분선"></div>

                    <div className="user-cart-bordtext">요청사항</div>
                    <input className="user-order-requests" type="text" placeholder="예) 견과류는 빼주시고 문 앞에 놔주세요 (초인종 X)"/>

                    <div className="user-order-hr" alt="구분선"></div>
                    <div className="user-cart-bordtext">{store.storeName}</div>

                    {/* 선택한 메뉴 데이터 */}
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

                    <div className="user-order-click-btn-one">
                        <button className="user-order-btn-b">배달 주문하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UserOrdering;