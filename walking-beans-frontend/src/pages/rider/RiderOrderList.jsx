import {useEffect, useState} from "react";
import apiRiderService from "../../service/apiRiderService";
import {Link} from "react-router-dom";
import "../../css/rider/RiderOrderList.css";

const RiderOrderList = ({riderId}) => {
    const [orders, setOrders] = useState([]);

    const status = {
        '0' : '구매 희망',
        '1' : '주문 중',
        '2' : '조리 접수 대기 중',
        '3' : '조리 중',
        '4' : '조리 완료',
        '5' : '배달 중',
        '6' : '배달 완료'
    };

    useEffect(() => {
        apiRiderService.getOrdersByRiderIdOnDuty(2, setOrders);
    }, [/*riderId*/]);


    return (
        <div className="rider-order-list-container">
            {
                (orders.length > 0) ? (
                    <ul>
                        {
                            orders.map(
                                (order) => {
                                    return (
                                        <div className="rider-order-list-order" key={order.id}>
                                            <Link to={`/rider/order/${order.orderId}` } style={{ textDecoration: "none", color: "black" }}>
                                                <div className="rider-order-list-order-ordernumber">주문번호 : {order.orderNumber}</div>
                                                <div className="rider-order-list-order-orderstatus">{status[order.orderStatus]}</div>
                                                <div className="rider-order-list-order-orderprice">금액 : {(parseInt(order.orderTotalPrice)).toLocaleString()}</div>
                                                <div className="rider-order-list-order-orderdate">주문 날짜 : {order.orderModifiedDate}</div>
                                            </Link>
                                        </div>
                                    )
                                }
                            )
                        }
                    </ul>
                ) : (
                    <div className="rider-order-list-noorders">배달 내역이 없습니다.</div>
                )
            }

        </div>
    )
}

export default RiderOrderList;