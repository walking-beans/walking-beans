import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import detailBtn from "../../images/user/detailbtn.svg";
import React, {use, useEffect, useState} from "react";
import apiUserOrderService from "../../service/apiUserOrderService";
import UserOrderMenuForm from "./UserOrderMenuForm";
import "../../css/Cart.css";
import "../../css/Order.css"
import axios from "axios";
import UserCart from "./UserCart";
import {selectOptions} from "@testing-library/user-event/dist/select-options";
import UserSelectMenu from "./UserSelectMenu";

const UserOrderCheckout = () => {
    const [store, setStore] = useState({});
    const [address, setAddress] = useState("");
    const [carts, setCarts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();
    const totalAmount = new URLSearchParams(location.search).get("totalAmount") || "0";
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user ? user.user_id : null;
    const [storeId, setStoreId] = useState(null);

    // 메뉴 총 금액 계산
    useEffect(() => {
        const newTotalPrice = carts.reduce((acc, cart) => {
            const basePrice = Number(cart.menuPrices) || 0;
            const optionsPrice = cart.optionPrices
                ? cart.optionPrices.split(',').reduce((sum, price) => sum + Number(price), 0)
                : 0;
            return acc + (basePrice + optionsPrice) * (cart.totalQuantities || 1);
        }, 0);

        setTotalPrice(newTotalPrice);
    }, [carts]);

    // 배달팁 포함 총 금액 계산
    const total = totalPrice + Number(store.storeDeliveryTip);

    // 포맷팅 (숫자 , 넣기)
    const formattedTotalPrice = totalPrice.toLocaleString();
    const formattedTotal = total.toLocaleString();

    // 가게 정보 가져오기
    useEffect(() => {
        if (storeId) {
            apiUserOrderService.getStoreByOrderId(storeId)
                .then((data) => {
                    if (data) {
                        setStore(data);
                    }
                })
                .catch((err) => console.error("가게 정보 오류:", err));
        }
    }, [storeId]);

    // 고객 정보 가져오기
    useEffect(() => {
        if (!userId) return;

        axios.get(`http://localhost:7070/api/cart/store/${userId}`)
            .then(res => {
                setStoreId(res.data[0].storeId);
                console.log("setStoreId", setStoreId);
            })
            .catch(err => console.error("storeId 가져오기 실패:", err));

        if (userId && typeof userId !== "string") {
            apiUserOrderService.getOrderAddressByUserId(userId, setAddress)
        }
    }, [userId]);

    // 선택한 카트 데이터 가져오기
    useEffect(() => {
        if (!userId) return;

        axios
            .get(`http://localhost:7070/api/cart/${userId}`)
            .then((res) => {
                console.log("카트 데이터 가져오기 성공 : ", res.data);
                setCarts(res.data);
            })
            .catch((err) => {
                console.log("카트 데이터 가져오기 실패 : ", err);
            })
    }, [userId]);

    // 장바구니 메뉴 삭제
    // 마지막 메뉴 지울 때 삭제하면 다시 가게로 돌아가기 설정
    const handleDelete = (deleteCartId) => {
        if (!deleteCartId) return;
        apiUserOrderService.deleteUserOrderCart(deleteCartId)
            .then(() => apiUserOrderService.getUserCartByUserId(userId))
            .then((updatedCart) => {
                setCarts(updatedCart);
            })
            .catch(err => console.error("장바구니 삭제 오류:", err));
    };

    // 결제하기
    const handlePayment = () => {
        navigate(`/checkout?totalAmount=${totalAmount}&storeId=${storeId}&addressId=${user.addressId}`)
    }

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
                            {/* 기본 주소 선택하면 돌아올 수 있도록 설정 필요 */}
                            <Link to={`/user/insertAddress`}><img src={detailBtn}
                                                                  alt="배달 주소 리스트"/></Link>
                        </div>
                    </div>

                    <div className="user-order-hr" alt="구분선"></div>

                    <div className="user-cart-bordtext">요청사항</div>
                    <input className="user-order-requests" type="text" placeholder="예) 견과류는 빼주시고 문 앞에 놔주세요 (초인종 X)"/>

                    <div className="user-order-hr" alt="구분선"></div>
                    <div className="user-cart-bordtext">{store?.storeName}</div>

                    {/* 선택한 메뉴 데이터*/}
                    <div>
                        {carts.length > 0 &&
                            carts.map((cart, index) => {
                                const isLastItem = index === carts.length - 1;
                                return (
                                    <div key={cart.cartId}>
                                        <UserSelectMenu
                                            {...cart}
                                            handleDelete={() => handleDelete(cart.cartId)}
                                            updateCart={setCarts}
                                        />
                                        {!isLastItem && <div className="user-order-hr-mini"></div>}
                                    </div>
                                );
                            })}
                    </div>

                    <div className="user-order-hr" alt="구분선"></div>

                    <div className="user-order-price-grid">
                        <div className="user-order-bordtext">결제금액</div>
                        <div className="user-cart-big-pricetext">{formattedTotal}원</div>
                    </div>

                    <div className="user-order-address-grid">
                        <div className="user-order-basic-text-m-0">주문금액</div>
                        <div className="user-order-basic-text-m-0">{formattedTotalPrice}원</div>
                    </div>

                    <div className="user-order-price-grid">
                        <div className="user-order-basic-text-m-0">배달팁</div>
                        <div className="user-order-basic-text-m-0">{store.storeDeliveryTip}원</div>
                    </div>

                    <div className="user-order-click-btn-one" onClick={handlePayment}>
                        <button className="user-order-btn-b">배달 주문하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UserOrderCheckout;