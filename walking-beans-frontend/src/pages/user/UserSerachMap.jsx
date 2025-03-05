import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../components/UserHome.css"

const KAKAO_MAP_API_KEY = "1cfadb6831a47f77795a00c42017b581";

const UserSearchMap = () => {
    const location = useLocation();
    const { userLocation, stores } = location.state || {};
    const [map, setMap] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        if (!userLocation) return;

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
                const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
                setMap(newMap);

                // 내 위치 마커
                new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                    map: newMap,
                    title: "내 위치",
                });

                // 가게 마커 추가
                stores.forEach((store) => {
                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(store.storeLatitude, store.storeLongitude),
                        map: newMap,
                    });

                    window.kakao.maps.event.addListener(marker, "click", () => {
                        setSelectedStore(store);
                    });
                });
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [userLocation, stores]);

    return (
        <div>
            <div id="search-map" style={{ width: "100%", height: "500px" }}></div>
            {selectedStore && (
                <div className="store-info">
                    <h3>{selectedStore.storeName}</h3>
                    <p>평점: ★ {selectedStore.storeRating} ({selectedStore.storeReviewCount} 리뷰)</p>
                    <p>거리: 약 {selectedStore.distance?.toFixed(1)} km</p>
                </div>
            )}
        </div>
    );
};

export default UserSearchMap;
