import React, {useEffect, useRef, useState} from "react";
import {loadTossPayments, ANONYMOUS} from "@tosspayments/tosspayments-sdk";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const generateOrderNumber = () => {
    const uuid = uuidv4().replace(/-/g, '');
    return uuid.substring(0, 8).toUpperCase(); // 8자리만 사용
};

// 테스트 toss 키
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export function UserCheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const totalAmount = new URLSearchParams(location.search).get("totalAmount") || "0";
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user ? user.user_id : null;
    const queryParams = new URLSearchParams(location.search);
    const [widgets, setWidgets] = useState(null);
    const widgetInitialized = useRef(false);
    const [paymentRendered, setPaymentRendered] = useState(false);
    const [storeId, setStoreId] = useState(null);
    const [addressId, setAddressId] = useState(null);

    // toss 위젯 초기화
    useEffect(() => {
        async function fetchPaymentWidgets() {
            if (widgetInitialized.current) return; // 이미 위젯이 생성되었으면 다시 실행하지 않음

            // 토스 키
            const tossPayments = await loadTossPayments(clientKey);
            const newWidgets = tossPayments.widgets({customerKey: ANONYMOUS});

            // 상태에 저장
            setWidgets(newWidgets);

            // 다시 실행되지 않도록 설정
            widgetInitialized.current = true;
        }
        fetchPaymentWidgets();
    }, []);


    // 위젯 랜더링
    useEffect(() => {
        async function renderPaymentWidgets() {
            if (!widgets || paymentRendered) return; // 이미 렌더링되었으면 실행하지 않음

            // 결제 금액
            await widgets.setAmount({
                currency: "KRW",
                value: Number(totalAmount),
            });

            // 결제 수단 렌더링
            await Promise.all([
                widgets.renderPaymentMethods({
                    selector: "#payment-method",
                    variantKey: "DEFAULT",
                }),
                widgets.renderAgreement({
                    selector: "#agreement",
                    variantKey: "AGREEMENT",
                }),
            ]);
            // 완료 후 완료 표시
            setPaymentRendered(true);
        }
        renderPaymentWidgets();
    }, [widgets]);

    // userId로 가게, 주소 id 가져오기
    useEffect(() => {
        if (!userId) return;
        console.log("userId", userId);

        axios.get(`http://localhost:7070/api/cart/store/${userId}`)
            .then(res => {
                setStoreId(res.data[0].storeId);
                console.log("setStoreId", setStoreId);
            })
            .catch(err => console.error("storeId 가져오기 실패:", err));

        axios.get(`http://localhost:7070/api/addresses/${userId}`)
            .then((res) => {
                setAddressId(res.data[0].addressId);
                console.log(res.data[0].addressId);
            })
            .catch(err => console.error("addressId 가져오기 실패:", err));
    }, [userId]);

    // 작성한 주문요청사항 가져오기
    const orderRequests = queryParams.get("orderRequests")
        ? decodeURIComponent(queryParams.get("orderRequests"))
        : "";

    return (
        <div className="user-order-background">
            <div className="user-order-menu-container">
                <div className="user-title-center">신용카드 결제하기</div>
                <div className="user-order-hr" alt="구분선"></div>

                <div className="max-w-540 w-100">
                    <div id="payment-method" className="w-100"/>
                    <div id="agreement" className="w-100"/>
                    <div className="user-order-click-btn-one">
                        {/* 결제하기 버튼 */}
                        <button
                            className="user-order-btn-b"
                            onClick={async () => {
                                try {
                                    const orderId = generateOrderNumber();
                                    const orderName = "장바구니 결제";
                                    const totalAmountValue = Number(totalAmount);
                                    const customerEmail = user?.user_email || "customer123@gmail.com";
                                    console.log("결제 요청:", {
                                        orderId,
                                        orderName,
                                        totalAmountValue,
                                        customerEmail,
                                        userId,
                                        storeId,
                                        addressId,
                                        orderRequests
                                    });

                                    // 결제 정보 저장
                                    const response = await axios.post("http://localhost:7070/api/payment/request", {
                                        orderId,
                                        orderName,
                                        totalAmount: totalAmountValue,
                                        customerEmail,
                                        userId,
                                        storeId,
                                        addressId,
                                        orderRequests
                                    });
                                    console.log("결제 요청 성공:", response.data);
                                    if (response.data.status !== "success") {
                                        alert("결제 요청 실패: " + response.data.message);
                                        return;
                                    }

                                    // 결제 성공 시
                                    await widgets?.requestPayment({
                                        orderId,
                                        orderName,
                                        customerName: user?.user_name || "홍길동",
                                        customerEmail,
                                        successUrl: `${window.location.origin}/sandbox/success?totalAmount=${totalAmountValue}&storeId=${storeId}&addressId=${addressId}&orderRequests=${encodeURIComponent(orderRequests)}`,
                                        failUrl: `${window.location.origin}/sandbox/fail`
                                    });
                                } catch (error) {
                                    console.error("결제 요청 실패:", error.response?.data || error.message);
                                    navigate(`/sandbox/fail`, {replace: true});
                                }
                            }}
                        >
                            결제하기
                        </button>
                    </div>

                    {/* 결제수단 변경 버튼 */}
                    <div className="user-order-click-btn-one">
                        <button
                            className="user-order-paymethod-text"
                            onClick={() => navigate(`/order/checkout/${userId}`)}
                                >결제수단 변경하기</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UserCheckoutPage;