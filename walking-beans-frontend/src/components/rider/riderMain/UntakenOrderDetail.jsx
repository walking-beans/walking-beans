import {Link, useNavigate} from "react-router-dom";

const UntakenOrderDetail = ({userAddress, selectedStore, riderLocation}) => {

    const navigate = useNavigate();

    const goToDetail = () => {
        navigate(`/rider/ontheway/${selectedStore.orderId}`);
    }

    // 거리 계산 함수 (Haversine 공식 사용)  https://kayuse88.github.io/haversine/ 참조
    const getDistance1 = (lat1, lng1, lat2, lng2) => {
        if (!lat1 || !lng1 || !lat2 || !lng2) return;
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
        <div>
            <p>{selectedStore?.storeName}</p>
            <p>배달 금액 : {selectedStore?.incomeAmount.toLocaleString()}원</p>
            <p>현재 위치</p>
            <p>{riderLocation?.lat}</p>
            <p>{riderLocation?.lng}</p>
            <p>가게 위치</p>
            <p>{selectedStore?.storeLatitude}</p>
            <p>{selectedStore?.storeLongitude}</p>
            <p>유저 집</p>
            <p>{userAddress?.address}</p>
            <p>{userAddress?.addressLatitude}</p>
            <p>{userAddress?.addressLongitude}</p>
            <p>{selectedStore?.orderCreateDate}</p>
            <p>가게 이미지 : {selectedStore?.storePictureUrl}</p>
            <button onClick={goToDetail}>주문 수락</button>
        </div>
    )
};

export default UntakenOrderDetail;