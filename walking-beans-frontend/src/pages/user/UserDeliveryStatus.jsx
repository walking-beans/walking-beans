import {useEffect, useState} from "react";
import  "../../css/User.css";
import riderMapMarker from "../../images/user/riderMapMarker.svg"
import storeMapMarker from "../../images/user/storeMapMarker.svg"
import UserMapMarker from "../../images/user/UserMapMarker.svg"

const KAKAO_MAP_API_KEY = "65165b1e9d69958de8f764a08f2787ad";

const UserDeliveryStatus = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [map, setMap] = useState(null);
    const [userPosition, setUserPosition] = useState(null);

    // 맵 기본 생성
    useEffect(() => {
        if (window.kakao && window.kakao.maps) { // API 요청 중복 방지
            setIsLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => { //window.kakao.maps 가 초기화될 수 있도록 load 호출
                setIsLoaded(true);
            });
        };

        document.head.appendChild(script); // 카카오 api 실행 (오픈 api)
    }, []);


    // 기본 지도 유저 위치 설정
    useEffect(() => {
        if (!isLoaded || !window.kakao || !window.kakao.maps) return;

        // 기본 유저 배달 주소 위치(데이터 가져와서 위도 경도 바뀌도록 설정 필요)
        const storePosition = new window.kakao.maps.LatLng(33.450701, 126.570667);

        const mapContainer = document.getElementById("user-delivery-status-map");
        const mapOption = {
            center: storePosition,
            level: 12
        };

        // 마커 이미지
        const imageSrc = UserMapMarker;

        // 마커 이미지 크기
        const imageSize = new window.kakao.maps.Size(80, 60);

        // 마커 이미지 생성
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

        const newMap = new window.kakao.maps.Map(mapContainer, mapOption); // 지도 생성
        setMap(newMap); // map 상태값 저장

        // 매장 마커 추가
        new window.kakao.maps.Marker({
            position: storePosition, // 마커 위치
            map: newMap, // 지도
            title: "매장 위치",
            image : markerImage // 마커 이미지
        })



        // 유저 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const userPos = new window.kakao.maps.LatLng(lat, lng);

                    setUserPosition(userPos);

                    // 마커 이미지
                    const imageSrc = storeMapMarker;

                    // 마커 이미지 크기
                    const imageSize = new window.kakao.maps.Size(80, 60);

                    // 마커 이미지 생성
                    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);


                    // 유저 위치 마커 추가
                    new window.kakao.maps.Marker({
                        position: userPos,
                        map: newMap,
                        title: "사용자 위치",
                        image : markerImage
                    });

                    // 지도 중심을 유저 위치로 변경
                    newMap.setCenter(userPos); // 위치를 정상적으로 가져왔다면 상태값 업데이트
                },
                (error) => {
                    console.error("위치 정보를 가져올 수 없습니다.", error);
                }
            );
        } else {
            console.error("Geolocation을 지원하지 않는 브라우저입니다.");
        }
    }, [isLoaded]);



    return (
        <div className="user-delivery-status-container">
            {/* Kakao Map */}
            <div
                className="user-delivery-map"
                id="user-delivery-status-map"></div>
        </div>
    );
};
export default UserDeliveryStatus;

// 매장과 유저집을 기준으로 map 보여주기

// 라이더 현재 위치 보여주기

// 매장 마커

// 유저집 마커

/*
// 예시
import React, { useState } from 'react';

function OrderStatusUpdate() {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateStatus = (orderId, newStatus) => {
        setLoading(true);
        setError(null);

        fetch('/api/order/status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: orderId,
                status: newStatus,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setStatus(data.status); // 응답 받은 새로운 상태로 상태 업데이트
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to update order status');
                setLoading(false);
            });
    };

    return (
        <div>
            <h1>Update Order Status</h1>
            <button onClick={() => updateStatus(123, 'shipped')}>
                {loading ? 'Updating...' : 'Mark as Shipped'}
            </button>
            {error && <p>{error}</p>}
            {status && <p>Order status: {status}</p>}
        </div>
    );
}

export default OrderStatusUpdate;

 */