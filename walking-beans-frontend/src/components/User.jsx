import "./UserHome.css";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import apiStoreService from "../service/apiStoreService";

const KAKAO_MAP_API_KEY = "1cfadb6831a47f77795a00c42017b581";

const UserHome = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [store, setStore] = useState([]);
    const [displayStores, setDisplayStores] = useState([]);
    const [map, setMap] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [sortType, setSortType] = useState("rating");
    const navigate = useNavigate();

    const getDistance = (lat1, lng1, lat2, lng2) => {
        if (!lat1 || !lng1 || !lat2 || !lng2) return 0;
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLng = (lng2 - lng1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    useEffect(() => {
        apiStoreService.getStore(setStore);
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setUserLocation({lat, lng});
                },
                (error) => {
                    console.error("위치 정보를 가져올 수 없습니다:", error);
                }
            );
        }
    }, []);

    useEffect(() => {
        if (!userLocation || store.length === 0) return;
        const filtered = store.filter((s) =>
            getDistance(userLocation.lat, userLocation.lng, s.storeLatitude, s.storeLongitude) <= 10
        );
        setDisplayStores(filtered.sort(() => 0.5 - Math.random()).slice(0, 5));
    }, [userLocation, store]);

    useEffect(() => {
        if (!userLocation) return;
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("map");
                if (!mapContainer) return;
                const mapOption = {
                    center: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                    level: 5,
                };
                const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
                setMap(newMap);

                // 내 위치 마커 추가
                new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                    map: newMap,
                    title: "내 위치"
                });
            });
        };
        return () => {
            document.head.removeChild(script);
        };
    }, [userLocation]);

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            axios.get(`http://localhost:7070/api/store/search?keyword=${searchKeyword}`)
                .then((res) => {
                    console.table(res.data);
                    let sortedData = res.data.map(store => ({
                        ...store,
                        storeRating: store.storeRating ?? 0,
                        storeReviewCount: store.storeReviewCount ?? 0,
                        storeLatitude: store.storeLatitude ?? 0,
                        storeLongitude: store.storeLongitude ?? 0
                    }));
                    if (sortType === "rating") {
                        sortedData.sort((a, b) => b.storeRating - a.storeRating);
                    } else if (sortType === "distance") {
                        sortedData.sort((a, b) =>
                            getDistance(userLocation.lat, userLocation.lng, a.storeLatitude, a.storeLongitude) -
                            getDistance(userLocation.lat, userLocation.lng, b.storeLatitude, b.storeLongitude)
                        );
                    }
                    setDisplayStores(sortedData);
                })
                .catch(() => alert("검색 데이터를 가져오지 못했습니다."));
        }
    };

    const handleMapClick = () => {
        navigate("user/search/map", {state: {userLocation, stores: displayStores}});
    };

    return (
        <div className="user-home-container">
            <div className="input-group mb-3 px-2">
                <input
                    type="text"
                    className="form-control rounded-start"
                    placeholder="가게 검색"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={handleSearch}
                />
                <div className="d-flex">
                    <select className="form-select rounded-end " onChange={(e) => setSortType(e.target.value)}>
                        <option value="rating" className="select-option">평점순</option>
                        <option value="distance" className="select-option small">거리순</option>
                    </select>
                </div>
            </div>


            <div id="map" className="mb-3" onClick={handleMapClick}></div>
            <ul className="store-list">
                {displayStores.map((store) => (
                    <li key={store.storeId} className="store-item">
                        <span className="store-name">{store.storeName}</span>
                        <span className="store-rating">★ {store.storeRating} ({store.storeReviewCount})</span>
                        <span
                            className="store-distance">{userLocation ? getDistance(userLocation.lat, userLocation.lng, store.storeLatitude, store.storeLongitude).toFixed(1) : "-"} km</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserHome;