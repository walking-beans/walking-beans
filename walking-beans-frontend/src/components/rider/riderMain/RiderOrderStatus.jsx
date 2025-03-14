import {useEffect, useState} from "react";
import apiRiderService from "../apiRiderService";

const RiderOrderStatus = ({orderId}) => {
    const [newOrderId, setOrderId] = useState(orderId);
    const [orderInfo, setOrderInfo] = useState(null);

    const status = {
        '0' : '구매 희망',
        '1' : '주문 접수 대기 중',
        '2' : '조리 중',
        '3' : '조리 완료',
        '4' : '배달 중',
        '5' : '배달 완료'
    };

    useEffect(() => {
        console.log("orderId : " + orderId)
        setOrderId(orderId);
        apiRiderService.getOrderByOrderId(newOrderId, (no) => {
            setOrderInfo(no);
            console.log("RiderOrderStatus order : " + no);
        });
    }, []);


    return (
        <div className="-container">
            <ul>
                {
                    orderInfo ? (
                        <div>
                            <div>{orderInfo.orderStatus}</div>
                            <div>{orderInfo.orderCreateDate}</div>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )
                }
            </ul>
        </div>
    )
};

export default RiderOrderStatus;