import React, {useEffect, useState} from "react";
import userCurrentLocation from "../../assert/images/rider/userCurrentLocation.svg";
import "../../css/rider/BeforeKakaoMapStart.css";
import apiRiderService from "../../service/apiRiderService";

const KAKAO_MAP_API_KEY = process.env.REACT_APP_KAKAO_MAP_API_KEY_LEO;

const BeforeKakaoMapStart = ({user, riderOnDuty, setRiderOnDuty}) => {

    const [userLocation, setUserLocation] = useState(null);

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
        console.log("start : " + riderOnDuty);
        if (!userLocation) return;

        // 카카오맵 스크립트 로드
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
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [userLocation]);

    function handleRiderOnDuty() {
        if (user.user_role !== "rider") {
            alert("접근 권한이 없습니다.");
            return;
        }
        setRiderOnDuty(prevState => !prevState);
        console.log("BeforeKakaoMapStart : " + riderOnDuty);
    }

    useEffect(() => {
        console.log("Map Updated riderOnDuty:", riderOnDuty);
    }, [riderOnDuty]);

    return (
        <div className="before-kakao-map-start">
            <div id="map" style={{ width: "100%", height: "800px" }}></div>
            {
                !riderOnDuty && (
                    <button onClick={()=> {handleRiderOnDuty()}}
                            className="btn btn-info before-kakao-map-start-startbtn">
                        운행 시작
                    </button>
                )
            }
        </div>
    );
};

export default BeforeKakaoMapStart;