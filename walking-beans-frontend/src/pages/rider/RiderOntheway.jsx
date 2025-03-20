import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom";
import apiRiderService from "../../service/apiRiderService";
import userCurrentLocation from "../../images/rider/userCurrentLocation.svg";
import storeDefault from "../../images/rider/storeDefaultIcon.svg";


// Polyline 컴포넌트
const RiderOntheway = () => {
    const {orderId} = useParams();
    const [onDelivery, setOnDelivery] = useState(false);

    const [location, setLocation] = useState({ lat: 37.5665, lng: 126.9780 });
    const [path, setPath] = useState([]);

    // 현재위치 가져오기
    useEffect(() => {
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
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [stores]);


    function handlePickingOrder () {
        setOnDelivery(true);
        apiRiderService.updateOrderStatus(orderId, 4);
        console.log(onDelivery);
    }

    const openKakaoNavi = () => {
        const url = `https://map.kakao.com/?nil_profile=title&nil_src=local`;
        window.location.href = url;
    };


    return (
        <div>
            <div>{orderId}</div>
            <button
                onClick={() => {handlePickingOrder()}}
            >픽업 완료
            </button>
            <button onClick={openKakaoNavi} className="btn btn-primary">
                카카오 내비 실행
            </button>


        </div>
    )
}

export default RiderOntheway;