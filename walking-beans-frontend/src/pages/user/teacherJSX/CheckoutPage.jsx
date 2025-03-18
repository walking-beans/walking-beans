import {useEffect, useState} from "react";
import {ANONYMOUS, loadTossPayments} from "@tosspayments/tosspayments-sdk";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const totalAmount = new URLSearchParams(location.search).get("totalAmount") || "0";

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user ? user.user_id : null;

    const [widgets, setWidgets] = useState(null);
    const [amount, setAmount] = useState({
        currency: "KRW",
        value: Number(totalAmount),
    });

    const [storeId, setStoreId] = useState(null);
    const [addressId, setAddressId] = useState(null);

    useEffect(() => {
        async function fetchPaymentWidgets() {
            const tossPayments = await loadTossPayments(clientKey);
            const widgets = tossPayments.widgets({customerKey: ANONYMOUS});
            setWidgets(widgets);
        }

        fetchPaymentWidgets();
    }, []);

    useEffect(() => {
        async function renderPaymentWidgets() {
            if (!widgets) return;

            await widgets.setAmount(amount);

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
        }

        renderPaymentWidgets();
    }, [widgets, amount]);

    useEffect(() => {
        if (!userId) return;
        console.log("userId", userId);

        axios
            .get(`http://localhost:7070/api/cart/store/${userId}`)
            .then(res => {
                    setStoreId(res.data[0].storeId);
                    console.log("setStoreId", setStoreId);
                }
            )
            .catch(err => console.error("storeId 가져오기 실패:", err));

        axios
            .get(`http://localhost:7070/api/addresses/${userId}`)
            .then((res) => {
                setAddressId(res.data[0].addressId);
                console.log(res.data[0].addressId);
            })
            .catch(err => console.error("addressId 가져오기 실패:", err));
    }, [userId]);

    return (
        <div className="wrapper w-100">
            <div className="max-w-540 w-100">
                <div id="payment-method" className="w-100"/>
                <div id="agreement" className="w-100"/>
                <div className="btn-wrapper w-100">
                    <button
                        className="btn primary w-100"
                        onClick={async () => {
                            try {
                                const orderId = generateRandomString();
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
                                    addressId
                                });

                                const response = await axios.post("http://localhost:7070/api/payment/request", {
                                    orderId,
                                    orderName,
                                    totalAmount: totalAmountValue,
                                    customerEmail,
                                    userId,
                                    storeId,
                                    addressId
                                });

                                console.log("결제 요청 성공:", response.data);
                                if (response.data.status !== "success") {
                                    alert("결제 요청 실패: " + response.data.message);
                                    return;
                                }

                                await widgets?.requestPayment({
                                    orderId,
                                    orderName,
                                    customerName: user?.user_name || "홍길동",
                                    customerEmail,
                                    successUrl: `${window.location.origin}/sandbox/success?orderId=${orderId}&totalAmount=${totalAmountValue}&storeId=${storeId}&addressId=${addressId}`,
                                    failUrl: `${window.location.origin}/sandbox/fail`
                                });
                            } catch (error) {
                                console.error("결제 요청 실패:", error.response?.data || error.message);
                                navigate(`/sandbox/fail`);
                            }
                        }}
                    >
                        결제하기
                    </button>
                </div>
            </div>
        </div>
    );
}
