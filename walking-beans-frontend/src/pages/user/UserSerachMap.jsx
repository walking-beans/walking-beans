import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../css/User.css";
import userCurrentLocation from "../../images/rider/userCurrentLocation.svg";

const KAKAO_MAP_API_KEY = "1cfadb6831a47f77795a00c42017b581";

const UserSearchMap = () => {
    const location = useLocation();
    const { userLocation, stores } = location.state || {};
    const [map, setMap] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [storeList, setStoreList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("📌 전달된 userLocation: ", userLocation);
        console.log("📌 전달된 stores 목록: ", stores);
    }, [userLocation, stores]);
// 거리 계산 함수 (위도, 경도를 이용한 두 지점 간 거리 계산)
    const getDistance = (lat1, lng1, lat2, lng2) => {
        if (!lat1 || !lng1 || !lat2 || !lng2) return 0;

        const R = 6371; // 지구 반지름 (km)
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLng = (lng2 - lng1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // 거리 (km)
    };

    useEffect(() => {
        if (!userLocation || !stores) return;

        const updatedStores = stores.map((store) => ({
            ...store,
            distance: getDistance(userLocation.lat, userLocation.lng, store.storeLatitude, store.storeLongitude),
        }));

        updatedStores.sort((a, b) => a.distance - b.distance);
        setStoreList(updatedStores);
    }, [userLocation, stores]);

    useEffect(() => {
        if (!userLocation || storeList.length === 0) return;

        console.log("🗺️ 지도 마커 추가 시작! storeList:", storeList);

        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("search-map");
                if (!mapContainer) return;

                const mapOption = {
                    center: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                    level: 5,
                };
                const map = new window.kakao.maps.Map(mapContainer, mapOption);
                setMap(map);

                storeList.forEach((store) => {
                    console.log("📍 마커 추가됨:", store.storeName);

                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(store.storeLatitude, store.storeLongitude),
                        map: map,
                    });

                    window.kakao.maps.event.addListener(marker, "click", () => {
                        map.setLevel(2);
                        map.panTo(new window.kakao.maps.LatLng(store.storeLatitude, store.storeLongitude));
                        setSelectedStore(store);
                    });
                });
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [userLocation, storeList]);

    const handleStoreClick = (store) => {
        setSelectedStore(store);
        navigate(`/user/order/${store.storeId}`);
    };

    return (
        <div className="container mt-4">
            {/* 지도 영역 */}
            <div id="search-map" className="w-100 mb-4" style={{ height: "500px" }}></div>

            {/* 가게 목록 (Bootstrap 카드 스타일 적용) */}
            <div className="row">
                {storeList.map((store) => (
                    <div key={store.storeId} className="col-md-4 mb-3">
                        <div className="card shadow-sm">
                            <img src={store.storePictureUrl} className="card-img-top" alt={store.storeName} />
                            <div className="card-body">
                                <h5 className="card-title">{store.storeName}</h5>
                                <p className="card-text">평점: ★ {store.storeRating} ({store.storeReviewCount} 리뷰)</p>
                                <p className="card-text">거리: 약 {store.distance?.toFixed(1)} km</p>
                                <button className="btn btn-primary w-100" onClick={() => handleStoreClick(store)}>
                                    주문하기
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserSearchMap;
