import React, { useEffect, useState, useRef } from "react";
import "./RiderMain.css";

const KAKAO_MAP_API_KEY = "9302732d4f5922e076cdba0d49a8a2fc";

const RiderMain = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.clientHeight);
        }

        const handleResize = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.clientHeight);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
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
                const mapContainer = mapRef.current;
                if (!mapContainer) {
                    console.error("❌ map-container가 렌더링되지 않았음");
                    return;
                }

                const mapOption = {
                    center: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                    level: 5,
                };
                new window.kakao.maps.Map(mapContainer, mapOption);
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [userLocation]);

    return (
        <div className="rider-main-container">
            {/* 헤더 (높이 측정을 위해 ref 연결) */}
            <header ref={headerRef} className="rider-header">
            </header>

            {/* 지도 컨테이너 (헤더 높이를 고려하여 동적 설정) */}
            <div ref={mapRef} id="map" className="map-container" style={{ height: `calc(100vh - ${headerHeight}px)` }}></div>

            <button className="order-button">📦 주문 새로고침</button>
        </div>
    );
};

export default RiderMain;
