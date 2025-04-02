import React, { useEffect, useState } from "react";
import userCurrentLocation from "../../assert/images/rider/userCurrentLocation.svg";
import storeDefault from "../../assert/images/rider/storeDefaultIcon.svg";
import apiRiderService from "../../service/apiRiderService";
import UntakenOrderDetail from "./UntakenOrderDetail";
import RiderMainSelectedStore from "./RiderMainSelectedStore";
import apiOrdersStoresService from "../../service/apiOrdersStoresService";
// 백엔드 카카오 API 와 프론트엔드 카카오 API 키 값이 다름
// 백엔드 프로젝트 포트 :7070        카카오 프로젝트 포트 : 3000
// 본인 카카오 API 키  내 애플리케이션>앱 설정>플랫폼>Web>사이트 도메인 http://localhost:3000 으로 되어있어야 함
const KAKAO_MAP_API_KEY = process.env.REACT_APP_KAKAO_MAP_API_KEY_LEO; // 본인 카카오 API 키
// 692e181593cf35ad46f4a1b3e5489d60

// 거리 계산 함수 (Haversine 공식 사용)  https://kayuse88.github.io/haversine/ 참조
const getDistance = (lat1, lng1, lat2, lng2) => {
    console.log("kakaomap getdistance : ", {lat1, lng1, lat2, lng2});
    const R = 6371; // 지구 반지름(km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // 거리 (km)
};

const RiderMainMap = ({user}) => {
    // 현재 유저 위치
    const [riderLocation, setRiderLocation] = useState({lat: 37.498095, lng: 127.028391});
    // untaken orders
    const [stores, setStores] = useState([]);

    const [orders, setOrders] = useState({});

    // rider 가 untaken order detail 선택했는지 확인
    const [checkingSelectedStore, setCheckingSelectedStore] = useState(false);
    const [checkingSelectedOrder, setCheckingSelectedOrder] = useState(false);

    const [selectedStoreId, setSelectedStoreId] = useState(0);

    const [selectedOrder, setSelectedOrder] = useState(null);

   /* // apiRiderService.getStoreInfoInRiderMain(setStores) 로 현재 주문 내역들 가져오기
    useEffect(() => {
        apiRiderService.getStoreInfoInRiderMain(setStores);
    }, []);*/

    /*  // 현재 위치 가져오기
    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    console.log("내 위치 갱신:", position.coords.latitude, position.coords.longitude);
                    setRiderLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("위치 정보를 가져올 수 없습니다.", error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 1000,
                    maximumAge: 0,
                }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            console.error( "이 브라우저에서는 위치 정보가 지원되지 않습니다.");
        }
    }, []);*/
    // userLocation 에 현재 위치 가져오기
    useEffect(() => {
        // 현재 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setRiderLocation({ lat, lng });

                    console.log("사용자 위치 : "+ lat + ", " + lng);
                },
                (error) => {
                    console.error("위치 정보를 가져올 수 없습니다:", error);
                }
            );
        } else {
            console.error("Geolocation을 지원하지 않는 브라우저입니다.");
        }
    }, []);

    // stores 에 저장되어 있는 내역들 현재 위치에 km 안으로 filter 하기
    useEffect(() => {
        if (!riderLocation) return;

        const  intervalId = setInterval(() => {
            // apiOrdersStoresService.getOrdersByRiderIdOnDuty(riderLocation.lat, riderLocation.lng, setStores, setOrders);
            fetch(`http://localhost:7070/api/order/riderIdOnDuty?lat=${riderLocation.lat}&lng=${riderLocation.lng}`)
                .then((response) => response.json())
                .then((data) => {
                    const firstOrders = Object.values(data)
                        .map(group => group[0]) // 각 배열의 첫 번째 요소만 가져옴
                        .filter(Boolean);
                    setStores(firstOrders);
                    console.log("orders : " + stores);
                    setOrders(data);
                })
                .catch((error) => console.error("데이터 불러오기 오류:", error));
        }, 5000);

        return () => clearInterval(intervalId);
    }, [riderLocation]);

    // 유저 marker 설정, 매장 marker 설정
    useEffect(() => {
        if (!riderLocation || !stores) return;

        // 카카오맵 스크립트 로드
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("map");
                const mapOption = {
                    center: new window.kakao.maps.LatLng(riderLocation.lat, riderLocation.lng),
                    level: 5,
                };

                let map = new window.kakao.maps.Map(mapContainer, mapOption);

                // 현재 위치 마커 아이콘 설정 (추후 프로젝트에 맞게 수정바람)
                const userMarkerImage = new window.kakao.maps.MarkerImage(
                    `${userCurrentLocation}`, // 사용자 현재 위치 아이콘으로 구분지음
                    new window.kakao.maps.Size(40, 42),
                    { offset: new window.kakao.maps.Point(20, 42) }
                );
                // 현재 위치 마커 생성 (추후 프로젝트에 맞게 수정바람)
                new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(riderLocation.lat, riderLocation.lng),
                    map: map,
                    image: userMarkerImage,
                });

                // 가게 마커 추가 (추후 프로젝트에 맞게 수정바람)
                stores.forEach((store) => {
                    const storeMarkerImage = new window.kakao.maps.MarkerImage(
                        `${storeDefault}`, // 사용자 현재 위치 아이콘으로 구분지음
                        new window.kakao.maps.Size(40, 42),
                        { offset: new window.kakao.maps.Point(20, 42) }
                    );

                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(store.storeLatitude, store.storeLongitude),
                        map: map,
                        image : storeMarkerImage,
                    });

                    window.kakao.maps.event.addListener(marker, "click", () => {
                        // map level 2로 바꾸기
                        map.setLevel(2);
                        // map 중심 가게 중심으로 바꾸기
                        map.panTo(new window.kakao.maps.LatLng(store.storeLatitude, store.storeLongitude));

                        setCheckingSelectedStore(true);
                        setSelectedStoreId(store.storeId);
                    });

                });
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [stores]);

    return (
        <div>
            {/* 맵 출력 */}
            <div id="map" style={{ width: "100%", height: "800px" }}></div>

            {/* 가게에 따른 untaken 주문들 출력 */}
            {
                checkingSelectedStore && <RiderMainSelectedStore orders={orders}
                                                                 storeId={selectedStoreId}
                                                                 setSelectedOrder={setSelectedOrder}
                                                                 setCheckingSelectedOrder={setCheckingSelectedOrder}
                                                                 checkingSelectedOrder={checkingSelectedStore}/>
            }

            {/* untaken 주문들 중 하나 클릭했을 때 보여줄 UI && 주문 받기 */}
            {
                checkingSelectedOrder && <UntakenOrderDetail riderId={user.user_id}
                                                             selectedOrder={selectedOrder}
                                                             riderLocation={riderLocation}/>
            }
        </div>
    );
};

/*

const RiderMainMap = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [filteredStores, setFilteredStores] = useState([]);
    const [untakenOrders, setUntakenOrders] = useState([]);

    useEffect(() => {
        // 현재 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setUserLocation({ lat, lng });
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
        apiRiderService.getStoreInfoInRiderMain((newOrders) => {
                setUntakenOrders(newOrders);
                console.log(newOrders);
                // 반경 10km 내 가게 필터링
                const filtered = untakenOrders.filter((store) =>
                    getDistance(userLocation.lat, userLocation.lng, storeData.lat, storeData.lng) <= 100
                );
                setFilteredStores(filtered);
                console.log("fli : " + filtered);
                console.log("filteredStored : ", filteredStores);
            }
        );
    }, []);

    useEffect(() => {
        if (!userLocation) return;

        // 카카오맵 스크립트 로드
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY_LEO}&libraries=services&autoload=false`;
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

                // 현재 위치 마커 아이콘 설정 (추후 프로젝트에 맞게 수정바람)
                const userMarkerImage = new window.kakao.maps.MarkerImage(
                    `${userCurrentLocation}`, // 사용자 현재 위치 아이콘으로 구분지음
                    new window.kakao.maps.Size(40, 42),
                    { offset: new window.kakao.maps.Point(20, 42) }
                );

                // 현재 위치 마커 생성 (추후 프로젝트에 맞게 수정바람)
                new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                    map: map,
                    image: userMarkerImage,
                });

                // 가게 마커 추가 (추후 프로젝트에 맞게 수정바람)
                filteredStores.forEach((store) => {
                    // 현재 위치 마커 아이콘 설정 (추후 프로젝트에 맞게 수정바람)
                    const storeMarkerImage = new window.kakao.maps.MarkerImage(
                        `${storeDefault}`, // 사용자 현재 위치 아이콘으로 구분지음
                        new window.kakao.maps.Size(40, 42),
                        { offset: new window.kakao.maps.Point(20, 42) }
                    );

                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(storeData.lat, storeData.lng),
                        map: map,
                        image : storeMarkerImage,
                    });

                    // 마커 클릭 시 가게 이름 표시 (추후 프로젝트에 맞게 수정바람)
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
        <div>
            <div id="map" style={{ width: "100%", height: "500px" }}></div>

        </div>
    );
};*/

export default RiderMainMap;
