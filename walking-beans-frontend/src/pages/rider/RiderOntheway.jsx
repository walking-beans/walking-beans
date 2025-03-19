/*
import {useEffect} from "react";

const RiderOntheway = () => {

    useEffect(() => {
        // Kakao SDK 초기화 (한 번만 실행)
        if (!window.Kakao) return;
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init("1cfadb6831a47f77795a00c42017b581"); // 여기에 본인의 JavaScript 키 입력
        }
    }, []);

    const handleNavigation = () => {
        if (!window.Kakao) {
            alert("Kakao SDK가 로드되지 않았습니다.");
            return;
        }

        window.Kakao.Navi.start({
            name: "현대백화점 판교점",
            x: 127.11205203011632,
            y: 37.39279717586919,
            coordType: "wgs84",
        });
    };

    return (
        <div>
            <button
                onClick={handleNavigation}
                style={{
                    backgroundColor: "#FFEB00",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                }}>
                카카오내비
            </button>
        </div>
    );
}
*/
import React, { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import {useParams} from "react-router-dom";
import apiRiderService from "../../service/apiRiderService";

const RiderOntheway = () => {
    const {orderId} = useParams();

    const [location, setLocation] = useState({ lat: 37.495901, lng: 127.032541 });
    const [path, setPath] = useState([]);
    const [store, setStore] = useState(null);

    useEffect(() => {
        apiRiderService.getStoreAddressByOrderId(orderId, (newStore) => {
            setStore(newStore);
            const newLocation = {
                lat: newStore.storeLatitude,
                lng: newStore.storeLongitude,
            };
            setPath((prevPath) => [...prevPath, newLocation]);
        });
    }, [orderId]);

    useEffect(() => {
        // 현재 위치 가져오기
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const newLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    setLocation(newLocation);
                    setPath((prevPath) => [...prevPath, newLocation]);
                },
                (error) => {
                    console.error("위치 정보를 가져올 수 없습니다.", error);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 10000,
                    timeout: 5000,
                }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            console.error("이 브라우저에서는 위치 정보가 지원되지 않습니다.");
        }
    }, []);

    return (
        <Map
            center={location}
            style={{ width: "100%", height: "500px" }}
            level={3}
        >
            <MapMarker position={location}>
                <div style={{ padding: "5px", color: "#000" }}>현재 위치</div>
            </MapMarker>

            {path.length > 1 && (
                <Polyline
                    path={path}
                    strokeWeight={5}
                    strokeColor={"#FF0000"}
                    strokeOpacity={0.7}도
                    strokeStyle={"solid"}
                />
            )}
        </Map>
    );
};

export default RiderOntheway;