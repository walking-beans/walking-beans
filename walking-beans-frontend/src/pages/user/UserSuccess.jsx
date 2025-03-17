import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UserSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const paymentKey = queryParams.get("paymentKey");
    const orderId = queryParams.get("orderId");
    const orderTotalPrice = queryParams.get("totalAmount");
    const storeId = queryParams.get("storeId");
    const addressId = queryParams.get("addressId");

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?.user_id || null;

    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        const confirmPayment = async () => {
            if (isConfirmed) return;

            try {
                if (!paymentKey || !orderId || !orderTotalPrice || !userId || !storeId || !addressId) {
                    console.error("필수 결제 정보가 누락되었습니다.", { paymentKey, orderId, orderTotalPrice, userId, storeId, addressId });
                    alert("결제 정보가 올바르지 않습니다.");
                    navigate("/order-fail", { replace: true });
                    return;
                }

                console.log("결제 승인 요청:", { paymentKey, orderId, orderTotalPrice, userId, storeId, addressId });
                // oderStatus 설정  response = controller 에서 requestData 로 전달됨
                const response = await axios.post("http://localhost:7070/api/payment/confirm", {
                    paymentKey,
                    orderId,
                    orderTotalPrice,
                    userId,
                    storeId,
                    addressId
                });

                console.log("결제 승인 성공:", response.data);
                alert("결제가 성공적으로 완료되었습니다!");

                setIsConfirmed(true);
                navigate("/order-complete", { replace: true });
            } catch (error) {
                console.error("결제 승인 실패:", error.response?.data || error.message);
                alert("결제 승인에 실패했습니다.");
                navigate("/order-fail", { replace: true });
            }
        };

        if (!isConfirmed && paymentKey && orderId && orderTotalPrice) {
            confirmPayment();
        }
    }, [paymentKey, orderId, orderTotalPrice, userId, storeId, addressId, navigate, isConfirmed]);

    return <h1>결제 승인 중...</h1>;
};

export default UserSuccess;
