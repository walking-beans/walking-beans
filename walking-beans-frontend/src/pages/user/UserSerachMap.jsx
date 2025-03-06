import React, { useEffect, useState } from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import "../../components/UserHome.css";
import userCurrentLocation from "../../images/rider/userCurrentLocation.svg";
import axios from "axios";
import apiStoreService from "../../service/apiStoreService";

const KAKAO_MAP_API_KEY = "1cfadb6831a47f77795a00c42017b581";

const UserSearchMap = () => {
    const orderId = useParams();
    const cartId = useParams();
    const storeId = useParams();
    const location = useLocation();
    const { userLocation, stores } = location.state || {};
    const [map, setMap] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [storeList, setStoreList] = useState([]);
    const navigate = useNavigate();

    // 거리 계산 함수 추가
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

    // 가게 목록에 거리 추가
    useEffect(() => {
        if (!userLocation || !stores) return;

        const updatedStores = stores.map((store) => ({
            ...store,
            distance: getDistance(userLocation.lat, userLocation.lng, store.storeLatitude, store.storeLongitude)
        }));

        updatedStores.sort((a, b) => a.distance - b.distance);
        setStoreList(updatedStores);
    }, [userLocation, stores]);

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
                const map = new window.kakao.maps.Map(mapContainer, mapOption);
                setMap(map);

                const userMarkerImage = new window.kakao.maps.MarkerImage(
                    `${userCurrentLocation}`,
                    new window.kakao.maps.Size(40, 42),
                    { offset: new window.kakao.maps.Point(20, 42) }
                );

                new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                    map: map,
                    title: "내 위치",
                    image: userMarkerImage,
                });

                storeList.forEach((store) => {
                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(store.storeLatitude, store.storeLongitude),
                        map: map,
                    });

                    window.kakao.maps.event.addListener(marker, "click", () => {
                        if (!map) return;

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

    return (
        <div>
            <div id="search-map" style={{ width: "100%", height: "500px" }}></div>
            {selectedStore && (
                <div className="store-info">
                   <Link to={`/user/order/${storeId}`}> <h3>{selectedStore.storeName}</h3> </Link>
                    <p>평점: ★ {selectedStore.storeRating} ({selectedStore.storeReviewCount} 리뷰)</p>
                    <p>거리: 약 {selectedStore.distance?.toFixed(1)} km</p>
                </div>
            )}
        </div>
    );
};

export default UserSearchMap;