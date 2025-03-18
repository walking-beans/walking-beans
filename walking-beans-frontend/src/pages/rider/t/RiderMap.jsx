import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // 지구 반지름 (km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const RiderMap = () => {
    // 기본 위치: 강남구 테헤란로 14길 7
    const [location, setLocation] = useState({ lat: 37.498095, lng: 127.028391 });
    const [orders, setOrders] = useState([]);
    const [storeOrders, setStoreOrders] = useState([]);
    const [testOrders, setTestOrders] = useState({});

    // 현재 위치 가져오기
    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    console.log("내 위치 갱신:", position.coords.latitude, position.coords.longitude);
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("위치 정보를 가져올 수 없습니다.", error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            console.error( "이 브라우저에서는 위치 정보가 지원되지 않습니다.");
        }
    }, []);

    useEffect(() => {
        const groupByStores = (orders, key) => {
            return orders.reduce((acc, item) => {
                const groupKey = item[key];
                if (!acc[groupKey]) {
                    acc[groupKey] = [];
                }
                acc[groupKey].push(item);
                return acc;
            }, {});
        }

        fetch("http://localhost:7070/api/order/riderIdOnDuty")
            .then((response) => response.json())
            .then((data) => {
                console.log("test data : " + data);
                setTestOrders(data);
            })
            .catch((error) => console.error("데이터 불러오기 오류:", error));

        fetch("http://localhost:7070/api/order/rider")
            .then((response) => response.json())
            .then((data) => {
                console.log("주문 데이터:", data);
                const filteredOrders = data.filter(order =>
                    getDistance(location.lat, location.lng, order.orderLatitude, order.orderLongitude) <= 20
                );
                console.log("필터링된 주문:", filteredOrders);
                setOrders(filteredOrders);
                setStoreOrders(groupByStores(filteredOrders, "storeId"));
            })
            .catch((error) => console.error("데이터 불러오기 오류:", error));
    }, [location]);

    return (
        <div>
            <Map
                center={{ lat: location.lat, lng: location.lng }}
                style={{ width: "100%", height: "500px" }}
                level={6}
            >

                <MapMarker
                    position={{ lat: location.lat, lng: location.lng }}
                    image={{
                        src: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                        size: { width: 30, height: 30 }
                    }}
                >
                    <div style={{
                        padding: "5px",
                        color: "#fff",
                        backgroundColor: "#3498db",
                        borderRadius: "5px",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                    }}>
                        내 위치
                    </div>
                </MapMarker>

                {orders.length === 0 ? (
                    <p style={{ textAlign: "center", color: "red" }}>📢 반경 10km 이내에 주문이 없습니다.</p>
                ) : (
                    orders.map((order) => (
                        <MapMarker
                            key={order.orderId}
                            position={{ lat: order.orderLatitude, lng: order.orderLongitude }}
                            image={{
                                src: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                size: { width: 30, height: 30 }
                            }}
                        >
                            <div style={{
                                padding: "5px",
                                color: "#fff",
                                backgroundColor: "#e74c3c",
                                borderRadius: "5px",
                                whiteSpace: "nowrap",
                                display: "inline-block",
                            }}>
                                {order.storeName ? `${order.storeName} (₩${order.orderTotalPrice})` : "가게 정보 없음"}
                            </div>
                        </MapMarker>
                    ))
                )}
            </Map>
            <div>
                {
                    Object.entries(storeOrders).map(([storeId, os]) => (
                        <div key={storeId}>
                            <h2>가게 ID: {storeId}</h2>
                            <ul>
                                {os.map((order) => (
                                    <li key={order.id}>key = {order.storeId} && orderNumber = {order.orderNumber}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                }
            </div>
            <div>
                {
                    Object.entries(testOrders).map(([storeId, os]) => (
                        <div key={storeId}>
                            <h2>가게 ID: {storeId}</h2>
                            <ul>
                                {os.map((order) => (
                                    <li key={order.id}>key = {order.storeId} && orderNumber = {order.orderNumber}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default RiderMap;
