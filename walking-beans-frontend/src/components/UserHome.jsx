import React, { useEffect, useState } from "react";
import "./UserHome.css";

const storeData = [
    { name: "강남커피하우스", lat: 37.498095, lng: 127.027610 },
    { name: "테헤란로 맛집", lat: 37.500184, lng: 127.035407 },
    { name: "소문난 김밥", lat: 37.502392, lng: 127.030091 },
    { name: "신사동 빵집", lat: 37.515115, lng: 127.020918 },
    { name: "강남국밥", lat: 37.495901, lng: 127.032541 },
    { name: "맛있는 스테이크", lat: 37.503753, lng: 127.025321 },
    { name: "24시 편의점", lat: 37.499643, lng: 127.029382 },
    { name: "테헤란 카페", lat: 37.497731, lng: 127.033859 },
    { name: "수제버거 전문점", lat: 37.501523, lng: 127.037721 },
    { name: "노포 국수집", lat: 37.492591, lng: 127.028789 }
];

const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const KAKAO_MAP_API_KEY = "1cfadb6831a47f77795a00c42017b581";

const UserHome = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [filteredStores, setFilteredStores] = useState([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setUserLocation({ lat, lng });

                    const filtered = storeData.filter((store) =>
                        getDistance(lat, lng, store.lat, store.lng) <= 10
                    );
                    setFilteredStores(filtered);
                },
                (error) => {
                    console.error("위치 정보를 가져올 수 없습니다:", error);
                }
            );
        } else {
            console.error("Geolocation을 지원하지 않는 브라우저입니다.");
        }
    }, []);

    useEffect(() => {
        if (!userLocation) return;

        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("map");
                const mapOption = {
                    center: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                    level: 5,
                };
                const map = new window.kakao.maps.Map(mapContainer, mapOption);

                const userMarker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                    map: map,
                });

                filteredStores.forEach((store) => {
                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(store.lat, store.lng),
                        map: map,
                    });

                    const infowindow = new window.kakao.maps.InfoWindow({
                        content: `<div style="padding:5px; font-size:14px;">${store.name}</div>`,
                    });

                    window.kakao.maps.event.addListener(marker, "click", () => {
                        infowindow.open(map, marker);
                    });
                });
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [userLocation, filteredStores]);

    return (
        <div className="user-home-container">
            <h2 className="user-home-title text-center">내 위치 주변 가게</h2>

            <div id="map"></div>

            <ul className="store-list">
                {filteredStores.map((store, index) => (
                    <li key={index} className="store-item">
                        <span className="store-name">{store.name}</span>
                        <span className="store-distance">
                            {getDistance(userLocation?.lat, userLocation?.lng, store.lat, store.lng).toFixed(1)} km
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserHome;
