import {useEffect, useState} from "react";
import apiRiderService from "../../components/rider/apiRiderService";
import {Link} from "react-router-dom";

const RiderOrderList = ({riderId}) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        apiRiderService.getOrdersByRiderIdOnDuty(2, setOrders);
    }, [/*riderId*/]);


    return (
        <div>
            {
                (orders.length > 0) ? (
                    <ul>
                        {
                            orders.map(
                                (order) => {
                                    return (
                                        <div>
                                            <Link to={`/rider/order/${order.orderId}`}>
                                                <div>{order.orderNumber}</div>
                                                <div>{order.orderStatus}</div>
                                                <div>{(parseInt(order.orderTotalPrice)).toLocaleString()}</div>
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