import {useEffect, useState} from "react";
import apiRiderService from "../../service/apiRiderService";
import {Link, useNavigate} from "react-router-dom";
import "../../css/rider/RiderOrderList.css";

const RiderOrderList = ({user}) => {
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

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
        apiRiderService.getOrdersByRiderIdOnDuty(user.user_id, setOrders);
    }, [user]);

    function handleOrderDetail(orderStatus, orderId) {
        if (orderStatus === 6) {
            navigate(`/rider/result/${orderId}`);
        } else {
            navigate(`/rider/ontheway/${orderId}`);
        }
    }


    return (
        <div className="rider-order-list-container">
            {
                (orders.length > 0) ? (
                    <ul>
                        {
                            orders.map(
                                (order) => (
                                    <div className="rider-order-list-order" key={order.id}>
                                        <div className="rider-order-list-order-container"
                                             onClick={() => {handleOrderDetail(order.orderStatus, order.orderId)}}>
                                            <div className="rider-order-list-order-ordernumber">주문번호 : {order.orderNumber}</div>
                                            <div className={order.orderStatus === 6 ? "rider-order-list-order-finishedorderstatus" : "rider-order-list-order-orderstatus"}>
                                                {status[order.orderStatus]}
                                            </div>
                                            <div className="rider-order-list-order-orderprice">금액 : {(parseInt(order.orderTotalPrice)).toLocaleString()}</div>
                                            <div className="rider-order-list-order-orderdate">주문 날짜 : {order.orderModifiedDate}</div>
                                        </div>
                                        <Link to={`/rider/order/${order.orderId}` } style={{ textDecoration: "none", color: "black" }}>

                                        </Link>
                                    </div>
                                )
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