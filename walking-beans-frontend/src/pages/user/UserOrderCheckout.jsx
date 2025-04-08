import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import detailBtn from "../../assert/images/user/detailbtn.svg";
import React, {use, useEffect, useState} from "react";
import apiUserOrderService from "../../service/apiUserOrderService";
import "../../css/Cart.css";
import "../../css/Order.css"
import axios from "axios";
import UserSelectMenu from "./UserSelectMenu";
import {v4 as uuidv4} from 'uuid';

const UserOrderCheckout = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paymentKey = queryParams.get("paymentKey");
    const orderTotalPrice = queryParams.get("totalAmount");
    const [addressId, setAddressId] = useState(null);
    const [store, setStore] = useState({});
    const [address, setAddress] = useState(null);
    const [carts, setCarts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const totalAmount = new URLSearchParams(location.search).get("totalAmount") || "0";
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user ? user.user_id : null;
    const [storeId, setStoreId] = useState(null);
    const [clicked, setClicked] = useState(null);
    const [orderRequests, setOrderRequests] = useState("");
    const [optionIds, setOptionIds] = useState(null);

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
    const total = totalPrice + (Number(store.storeDeliveryTip) || 0);

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

        // storeId 가져오기
        axios.get(`http://localhost:7070/api/cart/store/${userId}`)
            .then(res => {
                setStoreId(res.data[0].storeId);
                console.log("storeId:", res.data[0].storeId);
            })
            .catch(err => console.error("storeId 가져오기 실패:", err));

        // 주소 정보 가져오기
        axios.get(`http://localhost:7070/api/addresses/${userId}`)
            .then(res => {
                const primaryAddress = res.data.find(addr => addr.addressRole === 1);

                if (primaryAddress) {
                    setAddress(primaryAddress);
                    setAddressId(primaryAddress.addressId);
                    console.log("기본 주소:", primaryAddress);
                    console.log("기본 주소 ID:", primaryAddress.addressId);
                } else {
                    console.warn("기본 주소가 없습니다.");
                }
            })
            .catch(err => console.error("주소 정보 가져오기 실패:", err));
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
    const handleDelete = (deleteCartId) => {
        if (!deleteCartId) return;

        const isLastItem = carts.length === 1;

        if (isLastItem) {
            const confirmGoBack = window.confirm("마지막 메뉴입니다. 삭제 후 가게로 돌아가시겠습니까?");
            if (!confirmGoBack) return;
        }

        apiUserOrderService.deleteUserOrderCart(deleteCartId)
            .then(() => apiUserOrderService.getUserCartByUserId(userId))
            .then((updatedCart) => {
                setCarts(updatedCart);
                if (isLastItem) {
                    window.location.href = `/store/${storeId}`;
                }
            })
            .catch(err => console.error("장바구니 삭제 오류:", err));
    };

    // 결제 방법 선택
    const handlePayMethodClick = (method) => {
        setClicked(method);
        localStorage.setItem("paymentMethod", method); // 선택된 결제 방식을 로컬스토리지에 저장
    };

    // 결제하기 버튼 클릭
    const handlePaymentClick = async () => {
        if (!orderRequests) {
            alert("요청사항을 입력해주세요!");
            return;
        }


        if (clicked === 'tossPay') {
            console.log('결제 수단 : tossPay');
            navigate(`/checkout?totalAmount=${total}&storeId=${storeId}&orderRequests=${encodeURIComponent(orderRequests)}`, {replace: true});
        } else if (clicked === 'meetPayment') {
            console.log('결제 수단 : 만나서 결제');

            try {
                // 장바구니 데이터 가져오기
                const cartItemsRaw = await apiUserOrderService.getUserCartByUserId(userId);
                console.log("원본 장바구니 데이터:", cartItemsRaw);

                // 랜덤 주문번호 생성
                const orderNumber = uuidv4().replace(/-/g, '').substring(0, 8).toUpperCase();

                const cartItems = cartItemsRaw.map(cart => {
                    const menuIdArray = cart.menuIds ? cart.menuIds.split(",") : [];
                    return {
                        userId: cart.userId,
                        cartId: cart.cartId,
                        cartQuantity: cart.cartQuantity,
                        userName: cart.userName,
                        userEmail: cart.userEmail,
                        userPhone: cart.userPhone,
                        menuId: menuIdArray.length > 0 ? menuIdArray[0] : null,
                        menuNames: cart.menuNames,
                        menuCategories: cart.menuCategories,
                        menuPrices: cart.menuPrices,
                        optionIds: cart.optionIds,
                        optionNames: cart.optionNames,
                        optionContents: cart.optionContents,
                        optionPrices: cart.optionPrices,
                        totalQuantities: cart.totalQuantities,
                        cartCreateDate: cart.cartCreateDate,
                        menuIdList: menuIdArray,
                        menuNameList: cart.menuNames ? cart.menuNames.split(",") : [],
                        optionNameList: cart.optionNames ? cart.optionNames.split(",") : [],
                        optionContentList: cart.optionContents ? cart.optionContents.split(",") : [],
                        optionPriceList: cart.optionPrices ? cart.optionPrices.split(",").map(Number) : [],
                        totalQuantityList: cart.totalQuantities ? cart.totalQuantities.split(",").map(Number) : [],
                    };
                });

                const orderData = {
                    userId,
                    storeId,
                    orderNumber,
                    addressId,
                    orderRequests,
                    orderTotalPrice: total,
                    optionIds,
                    cartList: cartItems,
                    payments: {
                        paymentMethod: "meetPayment",
                        paymentStatus: "완료"
                    }
                };
                console.log("서버로 보내는 데이터:", JSON.stringify(orderData));
                const response = await axios.post("http://localhost:7070/api/payment/confirm", orderData);
                const chattingRoomId = response.data.chattingRoomId;

                alert("주문이 성공적으로 완료되었습니다!");
                localStorage.removeItem("orderRequests");

                if (chattingRoomId) {
                    navigate(`/chat/message/${chattingRoomId}`, {replace: true});  // ✅ 채팅방으로 바로 이동!
                } else {
                    navigate(`/user/delivery/status/${orderNumber}`, {replace: true}); // 기존 로직 유지
                }
            } catch (err) {
                console.error("주문 저장 실패", err);
                alert("오류가 발생하였습니다. 다시 시도해 주세요.");
            }
        } else {
            alert('결제 방법을 선택해주세요.');
        }
    };

    // 작성한 요청사항 유지
    useEffect(() => {
        const savedRequests = localStorage.getItem("orderRequests");
        if (savedRequests) {
            setOrderRequests(savedRequests);
        }
    }, []);

    // 주문 요청사항 서버에 저장
    const handleRequestsChange = (e) => {
        const newValue = e.target.value;
        setOrderRequests(newValue);
        localStorage.setItem("orderRequests", newValue);
    };

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
                    <input
                        className="user-order-requests"
                        type="text"
                        placeholder="예) 견과류는 빼주시고 문 앞에 놔주세요 (초인종 X)"
                        value={orderRequests}
                        onChange={handleRequestsChange}
                    />

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

                    <div className="user-order-hr" alt="구분선"></div>

                    <div className="user-order-bordtext">결제수단</div>
                    <div className="user-order-margin"></div>
                    <div className="user-order-click-btn">

                        {/* tossPay */}
                        <button className={`user-payment-mini-btn ${clicked === 'tossPay' ? 'selected' : ''}`}
                                onClick={() => handlePayMethodClick('tossPay')}>
                            <input
                                type="radio"
                                className="user-order-btn-none"
                                checked={clicked === 'tossPay'}
                            />
                            신용카드
                        </button>

                        {/* 만나서 결제 */}
                        <button className={`user-payment-mini-btn ${clicked === 'meetPayment' ? 'selected' : ''}`}
                                onClick={() => handlePayMethodClick('meetPayment')}>
                            <input
                                type="radio"
                                className="user-order-btn-none"
                                checked={clicked === 'meetPayment'}
                                readOnly
                            />
                            만나서 결제
                        </button>
                    </div>

                    <div className="user-order-click-btn-one" onClick={handlePaymentClick}>
                        <button className="user-order-btn-b">배달 주문하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UserOrderCheckout;