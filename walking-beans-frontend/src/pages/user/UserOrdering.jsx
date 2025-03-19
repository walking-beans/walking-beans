import {Link, useNavigate, useParams} from "react-router-dom";
import detailBtn from "../../images/user/detailbtn.svg";
import React, {use, useEffect, useState} from "react";
import apiUserOrderService from "../../service/apiUserOrderService";
import UserOrderMenuForm from "./UserOrderMenuForm";
import "../../css/Cart.css";
import "../../css/Order.css"
import axios from "axios";

const UserOrdering = () => {
    const orderId = useParams();
    const [address, setAddress] = useState("");
    const [store, setStore] = useState({});
    const [carts, setCarts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userId, setUserId] = useState(null);
    const [storeId, setStoreId] = useState(null);
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);
    const [user, setUser] = useState(null);

    // 로그인 확인
    useEffect(() => {
        // 로컬 스토리지에서 사용자 정보 불러오기
        const cartsUser = localStorage.getItem("user");
        console.log("로컬 스토리지에서 불러온 user:", cartsUser);

        if (cartsUser) {
            const user = JSON.parse(cartsUser);
            console.log("로그인 user 정보", user);
            setUserId(user.user_id);
        } else {
            console.log("로그인 필요");
            alert("주문내역 서비스를 이용하시려면 로그인이 필요합니다.");
            navigate("/login");
        }
    }, []);

    // 고객 배달 주소 가져오기
    useEffect(() => {
        apiUserOrderService.getOrderAddressByUserId(userId, setAddress)
    }, [userId]);

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

    // 선택한 카트 데이터 가져오기
    useEffect(() => {
        if (!userId) return;

        axios
            .get(`http://localhost:7070/api/carts/${userId}`)
            .then((res) => {
                console.log("카트 데이터 가져오기 성공 : ",res.data);
                setCarts(res.data);
            })
            .catch((err) => {
                console.log("카트 데이터 가져오기 실패 : ", err);
            })
    }, [userId]);

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
                        <Link to={`/user/ordering/payment/${orderId}`} className="user-order-btn-b">배달 주문하기</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UserOrdering;