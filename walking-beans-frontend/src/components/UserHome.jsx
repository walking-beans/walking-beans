import React, { useEffect, useState } from "react";
import axios from "axios";
const KAKAO_MAP_API_KEY = "1cfadb6831a47f77795a00c42017b581"; // 본인 API 키 입력


// 거리 계산 함수 (Haversine 공식 사용)  https://kayuse88.github.io/haversine/ 참조
const getDistance = (lat1, lng1, lat2, lng2) => {
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



const UserHome = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [store,setStore] = useState([]);
    const [filteredStores, setFilteredStores] = useState([]);
    const [map,setMap] = useState(null);
    const [markers,setMarkers]= useState([]);

    useEffect(() => {
        axios.get("http://localhost:7070/api/store")
            .then((res)=>{
                console.log("api 데이터", res.data);
                setStore(res.data);
            })
            .catch((err)=>{
                alert("백엔드에서 데이터를 가져오지 못했습니다.")
                console.log("err : ", err)
            })
    }, []);

    // 현재 위치 가져오기
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setUserLocation({ lat, lng });

                    console.log("사용자 위치:", { lat, lng }); // 사용자 위치 확인
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
        if (!userLocation || store.length === 0) return;

      /*  const filtered = store.filter((s) =>
            getDistance(userLocation.lat, userLocation.lng, s.storeLatitude, s.storeLongitude) <= 10
        );*/
        const filtered = store.filter((s) => {
            const distance = getDistance(userLocation.lat, userLocation.lng, s.storeLatitude, s.storeLongitude);
            console.log(`${s.storeName}까지의 거리: ${distance}km`); // 각 가게까지의 거리 확인
            return distance <= 10;
        });

        setFilteredStores(filtered);
        console.log("10km 내 가게:", filtered);
    }, [userLocation, store]);

    /*useEffect(() => {
        // 현재 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setUserLocation({ lat, lng });



                    // 반경 10km 내 가게 필터링
                    const filtered = store.filter((s) =>
                        getDistance(lat, lng, s.storeLatitude, s.storeLongitude) <= 10
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
    }, [store]);
*/

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
                setMap(map);

                // 현재 위치 마커 추가
                const userMarkerImage = new window.kakao.maps.MarkerImage(
                    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                    new window.kakao.maps.Size(40, 42),
                    { offset: new window.kakao.maps.Point(20, 42) }
                );

                // 현재 위치 마커 생성 (추후 프로젝트에 맞게 수정바람)
                new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                    map: map,
                    image: userMarkerImage,
                });
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [userLocation]);

    useEffect(() => {
        if (!map || filteredStores.length === 0) return;

        // 기존 마커 삭제
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);

        // 가게 마커 추가 (추후 프로젝트에 맞게 수정바람)
        const newMarkers = filteredStores.map((store) => {
            console.log("마커 추가됨:", store.storeName, store.storeLatitude, store.storeLongitude);
            
            // 마커 객체 생성 현재 카카오 지도에 마커 추가
            const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(store.storeLatitude, store.storeLongitude),
                map: map,
            });

            // 마커 클릭 시 가게 이름 표시 (추후 프로젝트에 맞게 수정바람)
            const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px; font-size:14px;">${store.storeName}</div>`,
            });

            window.kakao.maps.event.addListener(marker, "click", () => {
                infowindow.open(map, marker);
            });

            return marker;
        });

        setMarkers(newMarkers);
    }, [map, filteredStores]);

    return (
        <div>
            <h2>내 위치 주변 가게 (반경 10km)</h2>
            <div id="map" style={{ width: "100%", height: "500px" }}></div>
            <div className="userMainRandom"></div>
        </div>

    );
};


export default UserHome;