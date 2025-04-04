import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import apiOrdersStoresService from "../../service/apiOrdersStoresService";
import deliveredIcon from "../../assert/images/rider/deliveredIcon.jpg"
import check from "../../assert/images/rider/check.png"
import "../../css/rider/RiderResult.css"
import apiRiderService from "../../service/apiRiderService";

const RiderResult = ({user}) => {

    const {orderId} = useParams();
    const [order, setOrder] = useState(null);

    const navigate = useNavigate();

    // orderId 통해서 order 추가
    useEffect(() => {
        if (!orderId) return;

        apiRiderService.checkingRiderIdOnDuty(orderId, user.user_id,
            (result) => {
                console.log(result);
                if (result !== 1) {
                    alert("접근 권한이 없습니다.");
                    navigate("/rider");
                }
            })

        apiOrdersStoresService.getOrderByOrderId(orderId, setOrder);
    }, [orderId]);



    return (
        <div className="rider-result-container">
            {
                order && (
                    <div>
                        <div className="rider-result-main-container">
                            <img src={deliveredIcon}
                                 className="rider-result-main-container-img"
                            />
                            <div className="rider-result-main-container-ordertitle">주문번호</div>
                            <div className="rider-result-main-container-ordernumber">{order.orderNumber}</div>
                        </div>
                        <hr className="rider-result-main-container-hr" />
                        <div className="rider-result-container-div">
                            <span className="rider-result-container-div-spantitle">주문자</span>
                            <span className="rider-result-container-div-span">{order.customerName}</span>
                            <p className="rider-result-container-div-p">{order.orderAddress} {order.orderDetailedAddress} </p>
                        </div>
                        <div className="rider-result-container-div">
                            <span className="rider-result-container-div-spantitle">매장명</span>
                            <span className="rider-result-container-div-span">{order.storeName}</span>
                            <p className="rider-result-container-div-p">{order.storeAddress}</p>
                        </div>

                        <hr className="rider-result-main-container-hr-dashed" />

                        {
                            order.orderDeliveredDay ? (
                                <div className="rider-result-date-container">
                                    <div className="rider-result-date-div">
                                        <div>
                                            <img src={check} className="rider-result-date-div-img"/>
                                            <span className="rider-result-date-div-span">{order.orderDeliveredDay}</span>
                                        </div>
                                        <div className="rider-result-date-div-time">
                                            <span className="rider-result-date-div-span-time">{order.orderDeliveredTime}</span>
                                            <span className="rider-result-date-div-time-orderstatus">배달완료</span>
                                        </div>
                                    </div>
                                    <div className="rider-result-date-div">
                                        <div>
                                            <img src={check} className="rider-result-date-div-img"/>
                                            <span className="rider-result-date-div-span">{order.orderCreatedDay}</span>
                                        </div>
                                        <div className="rider-result-date-div-time">
                                            <span className="rider-result-date-div-span-time">{order.orderCreatedTime}</span>
                                            <span className="rider-result-date-div-time-orderstatus">주문수령</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="rider-result-date-container">
                                    <div className="rider-result-date-div">
                                        <div>
                                            <img src={check} className="rider-result-date-div-img"/>
                                            <span className="rider-result-date-div-span">{order.orderCreatedDay}</span>
                                        </div>
                                        <div className="rider-result-date-div-time">
                                            <span className="rider-result-date-div-span-time">{order.orderDeliveredTime}</span>
                                            <span className="rider-result-date-div-time-orderstatus">배달완료</span>
                                        </div>
                                        <div className="rider-result-date-div-time">
                                            <span className="rider-result-date-div-span-time">{order.orderCreatedTime}</span>
                                            <span className="rider-result-date-div-time-orderstatus">주문수령</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default RiderResult;