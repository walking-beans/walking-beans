import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import RiderOrderStatus from "./RiderOrderStatus";
import "../../css/rider/RiderOrderStatus.css";
import apiRiderService from "../../service/apiRiderService";

const UntakenOrderDetail = ({riderId, selectedOrder, riderLocation}) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("UntakenOrder selected Store : " + selectedOrder);
    }, []);

    /* const goToDetail = () => {
         apiRiderService.updateOrdersByRiderIdAndOrderId(riderId, selectedOrder.orderId);
         apiRiderService.createChattingRoomForRider(riderId, selectedOrder.customerId, selectedOrder.storeOwnerId, selectedOrder.orderId);
         navigate(`/rider/ontheway/${selectedOrder.orderId}`);
     }*/

    async function updateOrderByRiderIdAndOrderId() {
        return apiRiderService.updateOrdersByRiderIdAndOrderId(riderId, selectedOrder.orderId);
    }

    async function createChattingRoomForRider() {
        return apiRiderService.createChattingRoomForRider(riderId, selectedOrder.customerId, selectedOrder.storeOwnerId, selectedOrder.orderId);
    }

    const goToDetail = async () => {
        await updateOrderByRiderIdAndOrderId();
        await createChattingRoomForRider();
        navigate(`/rider/ontheway/${selectedOrder.orderId}`);
    };


    // 거리 계산 함수 (Haversine 공식 사용)  https://kayuse88.github.io/haversine/ 참조
    const getDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371; // 지구 반지름(km)
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLng = (lng2 - lng1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // 거리 (km)
    };

    return (
        <div className="untaken_order_detail_container">
            <div className="untaken_order_detail_div">
                <p className="untaken_order_detail_div_deliveryfee">배달료 {(parseInt(selectedOrder.storeDeliveryTip)).toLocaleString()}원</p>
                <hr />
                <div>
                    <span className="store_circle_span"></span>
                    <span className="store_name">{selectedOrder?.storeName}</span>
                    <span className="store_distance">{(getDistance(riderLocation?.lat,  riderLocation?.lng, selectedOrder?.storeLatitude, selectedOrder?.storeLongitude)).toFixed(1)}km</span>
                    <p className="store_address">{selectedOrder?.storeAddress}</p>
                </div>
                <div className="btw_circles_container">
                    <p className="btw_circles"></p>
                    <p className="btw_circles"></p>
                    <p className="btw_circles"></p>
                </div>
                <div>
                    <span className="client_circle_span"></span>
                    <span className="client_name">고객</span>
                    <span className="client_distance">{(getDistance(selectedOrder?.storeLatitude, selectedOrder?.storeLongitude, selectedOrder?.orderLatitude, selectedOrder?.orderLongitude)).toFixed(1)}km</span>
                    <p className="client_address">{selectedOrder?.orderAddress} {selectedOrder?.orderDetailedAddress}</p>
                    <hr />
                </div>

            </div>

            <RiderOrderStatus
                orderId={selectedOrder?.orderId}
                message="배달 시간이 초과되었습니다."
                css={
                    {
                        order_status : "order_status",
                        order_status_content : "order_status_content",
                        order_status_time_div : "order_status_time_div",
                        order_status_time_remaining : "order_status_time_remaining",
                        order_status_delivery_deadline : "order_status_delivery_deadline",
                        order_status_message : "order_status_message",
                        order_status_steps : "order_status_steps",
                        order_status_step : "order_status_step",
                        order_status_loading: "order_status_loading",
                    }
                }
            />

            <div className="d-grid gap-2">
                <button
                    className="btn untaken_order_detail_btn"
                    onClick={goToDetail}
                >주문 수락
                </button>
            </div>
        </div>
    )
};

export default UntakenOrderDetail;