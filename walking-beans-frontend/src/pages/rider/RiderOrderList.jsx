import {useEffect, useState} from "react";
import apiRiderService from "../../components/rider/apiRiderService";
import {Link} from "react-router-dom";
import RiderHeader from "../layout/RiderHeader";

const RiderOrderList = ({riderId}) => {
    const [orders, setOrders] = useState([]);

    const status = {
        '0' : '구매 희망',
        '1' : '주문 접수 대기 중',
        '2' : '조리 중',
        '3' : '조리 완료',
        '4' : '배달 중',
        '5' : '배달 완료'
    };

    useEffect(() => {
        apiRiderService.getOrdersByRiderIdOnDuty(2, setOrders);
    }, [/*riderId*/]);


    return (
        <div>
            <RiderHeader />
            {
                (orders.length > 0) ? (
                    <ul>
                        {
                            orders.map(
                                (order) => {
                                    return (
                                        <div>
                                            <Link to={`/rider/order/${order.orderId}`}>
                                                <div>주문번호 : {order.orderNumber}</div>
                                                <div>주문 상태 : {status[order.orderStatus]}</div>
                                                <div>금액 : {(parseInt(order.orderTotalPrice)).toLocaleString()}</div>
                                                <div>주문 날짜 : {order.orderModifiedDate}</div>
                                            </Link>
                                        </div>
                                    )
                                }
                            )
                        }
                    </ul>
                ) : (
                    <div></div>
                )
            }

        </div>
    )
}

export default RiderOrderList;