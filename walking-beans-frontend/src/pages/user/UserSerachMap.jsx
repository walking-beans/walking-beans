import React, { useEffect, useState } from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import  "../../css/User.css";
import userCurrentLocation from "../../images/rider/userCurrentLocation.svg";
import axios from "axios";
import apiStoreService from "../../service/apiStoreService";

const KAKAO_MAP_API_KEY = "1cfadb6831a47f77795a00c42017b581";

const UserSearchMap = () => {
    const location = useLocation();
    const { lat, lng } = location.state || {};
    const [map, setMap] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [stores, setStores] = useState([]);
    const navigate = useNavigate();




    // 대표 주소를 기준으로 주변 매장 불러오기
    useEffect(() => {
        if (!lat || !lng) return;

        axios.get(`http://localhost:7070/api/store/nearby?lat=${lat}&lng=${lng}`)
            .then((res) => {
                setStores(res.data);
            })
            .catch((error) => console.error("매장 정보 불러오기 오류:", error));
    }, [lat, lng]);

    // 마커 클릭 시  해당 매장 정보 불러오기
    useEffect(() => {
        axios.get("http://localhost:7070/api/store")
            .then((res) => {
                setStores(res.data);
                console.log("모든 매장 불러오기 성공:", res.data);
            })
            .catch((error) => console.error(" 매장 정보 불러오기 오류 : ", error));
    }, []);

    useEffect(() => {
        if (!lat || !lng || stores.length === 0) return;

        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("search-map");
                if (!mapContainer) return;

                const mapOption = {
                    center: new window.kakao.maps.LatLng(lat, lng),
                    level: 5,
                };
                const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
                setMap(newMap);

                //  사용자 위치 마커
                const userMarkerImage = new window.kakao.maps.MarkerImage(
                    userCurrentLocation,
                    new window.kakao.maps.Size(40, 42),
                    { offset: new window.kakao.maps.Point(20, 42) }
                );

                new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(lat, lng),
                    map: newMap,
                    title: "내 위치",
                    image: userMarkerImage,
                });

                //  매장 마커 추가
                stores.forEach((store) => {
                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(store.storeLatitude, store.storeLongitude),
                        map: newMap,
                    });

                    window.kakao.maps.event.addListener(marker, "click", () => {
                        if (!map) {
                            console.warn("⚠️ 지도 객체가 없습니다.");
                            return;
                        }

                        console.log("📍 마커 클릭 - 선택한 매장 정보:", store);
                        setSelectedStore(store);
                        console.log("🔄 상태 업데이트 요청됨:", store);

                        map.setLevel(2);
                        map.panTo(new window.kakao.maps.LatLng(store.storeLatitude, store.storeLongitude));
                    });
                });
            });
        };



        return () => {
            document.head.removeChild(script);
        };
    }, [lat, lng, stores]);

    //  매장 상세 정보 보기
    const handleStore = () => {
        if (!selectedStore?.storeId) return;
        navigate(`/user/order/${selectedStore.storeId}`);
    };


    return (
        <div>
            <div id="search-map" style={{ width: "100%", height: "500px" }}></div>
            {selectedStore && (
                <div className="store-info">
                    <h3 onClick={handleStore} className="cursor-pointer text-primary fw-bold">
                        {selectedStore.storeName}
                    </h3>
                    <img className="store-picture" src={selectedStore.storePictureUrl} alt="매장이미지"/>
                    <p>평점: ★ {selectedStore.storeRating} ({selectedStore.storeReviewCount} 리뷰)</p>
                    <p>{selectedStore.storeStatus} :  {selectedStore.storeOperationHours}</p>
                    <p>거리: 약 {selectedStore.distance?.toFixed(1)} km</p>
                </div>
            )}
        </div>
    );
};

export default UserSearchMap;