import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/User.css";
import userCurrentLocation from "../../images/rider/userCurrentLocation.svg";
import axios from "axios";

const KAKAO_MAP_API_KEY = "1cfadb6831a47f77795a00c42017b581";

const UserSearchMap = ({searchResults}) => {
    const location = useLocation();
    const { lat, lng } = location.state || {};
    const [map, setMap] = useState(null);
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);
    const [markers, setMarkers] = useState([]); // ⭐ 마커 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        console.log("📌 지도에 반영될 검색 결과:", searchResults); // ✅ 검색 결과 확인
    }, [searchResults]);

    // 주변 매장 불러오기
    useEffect(() => {
        if (!lat || !lng) return;

        axios.get(`http://localhost:7070/api/store/nearby?lat=${lat}&lng=${lng}`)
            .then((res) => {
                setStores(res.data);
            })
            .catch((error) => console.error("매장 정보 불러오기 오류:", error));
    }, [lat, lng]);

    //  카카오 지도 초기화
    useEffect(() => {
        if (!lat || !lng) return;

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

                //  사용자 위치 마커 추가
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
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [lat, lng,searchResults]);

    //  검색 결과 or 기본 매장 데이터로 지도 업데이트
    useEffect(() => {

        console.log("가져옴 : " + searchResults);
        if (!map) return;


        //  기존 마커 삭제
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);

        //  표시할 매장 결정 (검색 결과 있으면 검색 결과, 없으면 전체 매장)
        const displayStores = searchResults?.length > 0 ? searchResults : stores;
        let newMarkers = [];

        displayStores.forEach((store) => {
            const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(store.storeLatitude, store.storeLongitude),
                map: map,
            });

            const storeInfoWindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px;font-size:14px;">${store.storeName}</div>`,
            });

            window.kakao.maps.event.addListener(marker, "click", () => {
                if (infoWindow) infoWindow.close();
                storeInfoWindow.open(map, marker);
                setInfoWindow(storeInfoWindow);
                setSelectedStore(store);
                map.panTo(new window.kakao.maps.LatLng(store.storeLatitude, store.storeLongitude));
            });

            newMarkers.push(marker);
        });

        setMarkers(newMarkers);
    }, [searchResults, stores, map]);

    // ✅ 매장 상세 정보 보기
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
                    <img className="store-picture" src={selectedStore.storePictureUrl} alt="매장 이미지" />
                    <p>평점: ★ {selectedStore.storeRating} ({selectedStore.storeReviewCount} 리뷰)</p>
                    <p>{selectedStore.storeStatus} : {selectedStore.storeOperationHours}</p>
                </div>
            )}
        </div>
    );
};

export default UserSearchMap;