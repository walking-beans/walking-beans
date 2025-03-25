import {useEffect, useState} from "react";
import apiRiderService from "../../service/apiRiderService";

const RiderOrderStatus = ({orderId, message, css, orderStatus, setOrderStatus}) => {
    const [newOrderId, setOrderId] = useState(orderId);
    const [orderInfo, setOrderInfo] = useState(null);

    const [orderProgress, setOrderProgress] = useState(0);

    const setOrderProgressPercent = (no_order_status) => {
        if (no_order_status === 3) {
            setOrderProgress(30);
        } else if (no_order_status === 4) {
            setOrderProgress(50);
        } else if (no_order_status === 5) {
            setOrderProgress(72);
        } else if (no_order_status === 6) {
            setOrderProgress(100);
        } else {
            setOrderProgress(0);
        }
    }

    useEffect(() => {
        console.log("ros orderId : " + orderId);
        console.log("css : " + css)

        setOrderId(orderId);
        apiRiderService.getOrderStatusWithRemainingTime(newOrderId, (no) => {
            setOrderInfo(no);
            setOrderStatus(no.orderStatus);
            setOrderProgressPercent(no.orderStatus);
            console.log("RiderOrderStatus order : " + no);
        });
    }, [orderId, orderStatus]);

    return (
        <div className={css.order_status}>
            {
                orderInfo ? (
                    <div className={css.order_status_content}>
                        {
                            (orderInfo.timeRemaining !== 0) ?
                                <div className={css.order_status_time_div}>
                                    <span className={css.order_status_time_remaining}>{orderInfo.timeRemaining}분</span>
                                    <span className={css.order_status_delivery_deadline}> ({orderInfo.deliveryDeadline})</span>
                                </div>
                                :
                                <div className={css.order_status_message}>
                                    {message}
                                </div>
                        }
                        <div className="progress">
                            <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${orderProgress}%` }}
                                 aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className={css.order_status_steps}>
                            <span className={css.order_status_step}>주문 수락</span>
                            <span className={css.order_status_step}>조리 중</span>
                            <span className={css.order_status_step}>조리 완료</span>
                            <span className={css.order_status_step}>배달 중</span>
                            <span className={css.order_status_step}>배달 완료</span>
                        </div>
                    </div>
                ) : (
                    <div className={css.order_status_loading}>Loading...</div>
                )
            }
        </div>
    )
};

export default RiderOrderStatus;