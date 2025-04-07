import {useEffect, useState} from "react";
import axios from "axios";
import "./ModalCss.css"

const OrderDetailCard = ({order, onClose, handleOrderStatus}) => {

    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(null); // 모달 로딩


    //*************************************************************************//
    // 랜덤 도착 시간 (5~15분)
    const getRandomDeliveryTime = () => {
        return Math.floor(Math.random() * 11) + 5; // 5~15 사이 랜덤 소숫점 버림
    };




    useEffect(() => {
        if (order){
            // 주문정보로 상세정보 가져오기
            axios
                .get(`http://localhost:7070/api/orders/ordernumber/${order.orderNumber}`)
                .then((res) => {
                    setOrderDetails(res.data);
                    console.log(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log("주문 상세 로딩 에러: ", err);
                    setLoading(false);
                });
        }
    }, [order]); // order가 변경될때 마다 실행


    return (
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content">
                {loading ? (
                    <p>로딩 중...</p>
                ) : orderDetails ? (
                    <>
                        <h2>주문 상세 정보</h2>
                        <p>주문 번호: {orderDetails.orderNumber}</p>
                        <p>주문 메뉴: {orderDetails.orderList || "메뉴 정보 없음"}</p>
                        <p>요청사항: {orderDetails.orderRequests || "고객 요청사항 없음"}</p>
                        <p>가격: {orderDetails.totalPayment || 0}원</p>
                        <p>라이더 배정 상태 : {order.riderIdOnDuty ? "라이더가 가게로 이동중입니다. " : "배달을 진행할 라이더를 찾고 있습니다."}</p>
                        <p>라이더 도착 예상시간: {getRandomDeliveryTime()}분</p>
                        {/* 액션 버튼 */}
                        <div className="order-actions">
                            <button className="modal-close-btn" onClick={onClose}>닫기</button>
                            {orderDetails.orderStatus === 2 && (
                                <button className="storeOrder-accept-btn"
                                        onClick={() => handleOrderStatus(orderDetails.orderId, 3)}>접수하기</button>
                            )}
                            {orderDetails.orderStatus === 3 && (
                                <button className="storeOrder-complete-btn"
                                        onClick={() => handleOrderStatus(orderDetails.orderId, 4)}>조리완료</button>
                            )}
                            {orderDetails.orderStatus === 4 && (
                                <button className="storeOrder-complete-btn"
                                >배차 중</button>
                            )}
                            {orderDetails.orderStatus === 5 && (
                                <button className="storeOrder-finished-btn"
                                >배차 중</button>
                            )}
                            {orderDetails.orderStatus === 6 && (
                                <button className="storeOrder-finished-btn"
                                >배차 중</button>
                            )}

                        </div>
                    </>
                ) : (
                    <p>주문 정보를 불러오지 못했습니다.</p>
                )}


            </div>
        </>
    )
}

export default OrderDetailCard;