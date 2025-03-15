import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import RiderOrderDetail from "./RiderOrderDetail";
import RiderOrderStatus from "./RiderOrderStatus";
import "../../../css/rider/RiderOrderStatus.css";

const UntakenOrderDetail = ({userAddress, selectedStore, riderLocation}) => {

    const navigate = useNavigate();

    useEffect(() => {
        console.log("UntakenOrder selected Store : " + selectedStore);
    }, []);

    const goToDetail = () => {
        navigate(`/rider/ontheway/${selectedStore.orderId}`);
    }

    // 거리 계산 함수 (Haversine 공식 사용)  https://kayuse88.github.io/haversine/ 참조
    const getDistance = (lat1, lng1, lat2, lng2) => {
        console.log("getdistance : ", {lat1, lng1, lat2, lng2});
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
            <RiderOrderStatus
                orderId={1}

                message="배달 시간이 초과되었습니다."
                css={
                    {
                        order_status : "riderOrderStatus-container",
                        order_status_content : "",
                        order_status_time_div : "",
                        order_status_message : "",
                        order_status_time_remaining : "",
                        order_status_delivery_deadline : "",
                        order_status_steps : "progress-elements",
                        order_status_step : "",
                        order_status_loading: ""
                    }
                }
            />
            <p>{selectedStore?.storeName}</p>
            <p>배달 금액 : 3,500원</p>
            <p>주문 시간 : {selectedStore?.orderCreateDate}</p>
            <p>가게 이미지 : {selectedStore?.storePictureUrl}</p>
            <p>라이더 - 가게 거리 : {(getDistance(riderLocation?.lat,  riderLocation?.lng, selectedStore?.storeLatitude, selectedStore?.storeLongitude)).toFixed(1)}km</p>
            <p>가게 - 유저 거리 : {(getDistance(selectedStore?.storeLatitude, selectedStore?.storeLongitude, userAddress?.addressLatitude, userAddress?.addressLongitude)).toFixed(1)}km</p>
            <button onClick={goToDetail}>주문 수락</button>
        </div>
    )
};

export default UntakenOrderDetail;