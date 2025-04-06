import {useEffect, useState} from "react";
import axios from "axios";

const OrderDetailCard = ({order, onClose, UpdateOrderStatus}) => {

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

    // 기본 임시 스타일
    const modalStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        border: "1px solid #ccc",
        zIndex: 1000,
    };

    const overlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
    };


    return (
        <>
            <div style={overlayStyle} onClick={onClose}></div>
            <div style={modalStyle}>
                {loading ? (
                    <p>로딩 중...</p>
                ) : orderDetails ? (
                    <>
                        <h2>주문 상세 정보</h2>
                        <p>주문 번호: {orderDetails.orderNumber}</p>
                        <p>주문 메뉴: {orderDetails.orderList || "메뉴 정보 없음"}</p>
                        <p>요청사항: {orderDetails.orderRequests || "고객 요청사항 없음"}</p>
                        <p>가격: {orderDetails.totalPayment || 0}원</p>
                        <p>라이더 배정 상태 : {order.riderIdOnDuty ? "라이더 이동중" : "라이더 배차중"}</p>
                        <p>라이더 도착 예상시간: {getRandomDeliveryTime()}분</p>
                    </>
                ) : (
                    <p>주문 정보를 불러오지 못했습니다.</p>
                )}
                <button onClick={onClose}>닫기</button>
                <button>주문수락</button>
                <button>조리완료</button>
            </div>
        </>
    )
}

export default OrderDetailCard;