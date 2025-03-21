import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom";

import RiderOrderStatus from "../../components/rider/riderMain/RiderOrderStatus";

import apiRiderService from "../../service/apiRiderService";
import apiOrdersStoresService from "../../service/apiOrdersStoresService";

import userCurrentLocation from "../../assert/images/rider/userCurrentLocation.svg";
import pickingupIcon from "../../assert/images/rider/pickingupIcon.svg";
import deliveryIcon from "../../assert/images/rider/deliveryIcon.svg";

import "../../css/rider/RiderOntheway.css";
import "../../css/rider/RiderOrderStatus.css";


const KAKAO_MAP_API_KEY = process.env.REACT_APP_KAKAO_MAP_API_KEY_LEO; // 본인 카카오 API 키

// Polyline 컴포넌트
const RiderOntheway = () => {

    const {orderId} = useParams();
    const [order, setOrder] = useState(null);
    const [location, setLocation] = useState({ lat: 37.5665, lng: 126.9780 });
    const [storeRoomId, setStoreRoomId] = useState(0);
    const [userRoomId, setUserRoomId] = useState(0);
    const [chattingMemberList, setChattingMemberList] = useState({});

    const navigate = useNavigate();

    const [onDelivery, setOnDelivery] = useState(false);

    const [storeMarker, setStoreMarker] = useState(null);

    // 현재위치 가져오기
    useEffect(() => {
        // 현재 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setLocation({ lat, lng });

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

    // orderId 통해서 order 추가
    useEffect(() => {
        if (!location) return;

        const  intervalId = setInterval(() => {
            apiOrdersStoresService.getOrderByOrderId(orderId, setOrder);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [location]);

    useEffect(() => {
        if (!order) return;

        apiRiderService.getUserAndStoreRoomId(orderId, order.riderIdOnDuty, setChattingMemberList);
        setStoreRoomId(chattingMemberList?.["3"] ?? "0");
        setUserRoomId(chattingMemberList?.["1"] ?? "0");

    }, [order])

    // 유저 marker 설정, 매장 marker 설정
    useEffect(() => {
        if (!order) return;



        // 카카오맵 스크립트 로드
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("map");
                const mapOption = {
                    center: new window.kakao.maps.LatLng(location.lat, location.lng),
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
                    position: new window.kakao.maps.LatLng(location.lat, location.lng),
                    map: map,
                    image: userMarkerImage,
                });

                const storeMarkerImage = new window.kakao.maps.MarkerImage(
                    `${pickingupIcon}`, // 사용자 현재 위치 아이콘으로 구분지음
                    new window.kakao.maps.Size(40, 42),
                    { offset: new window.kakao.maps.Point(20, 42) }
                );

                if (!onDelivery) {
                    setStoreMarker(new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(order.storeLatitude, order.storeLongitude),
                        map: map,
                        image : storeMarkerImage,
                    }));
                }

                const destinationMarkerImage = new window.kakao.maps.MarkerImage(
                    `${deliveryIcon}`, // 사용자 현재 위치 아이콘으로 구분지음
                    new window.kakao.maps.Size(40, 42),
                    { offset: new window.kakao.maps.Point(20, 42) }
                );

                const destinationMarker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(order.orderLatitude, order.orderLongitude),
                    map: map,
                    image : destinationMarkerImage,
                })
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [order]);

    function handlePickingOrder () {
        setOnDelivery(true);
        storeMarker.setMap(null);
        apiRiderService.updateOrderStatus(orderId, 4);
        console.log(onDelivery);
    }

    const openKakaoNavi = () => {
        const url = `https://map.kakao.com/?nil_profile=title&nil_src=local`;
        window.location.href = url;
    };

    return (

        <div>
            {
                (order && (userRoomId !== "0") && (storeRoomId !== ("0"))) ? (
                    <div>
                        {/* 맵 출력 */}
                        <div id="map" style={{ width: "100%", height: "650px" }}></div>

                        <div className="riderontheway-text-container">
                            <div className="riderontheway-orderdetail">
                                <p className="riderontheway-orderdetail-deliveryfee">배달료 {(parseInt(order.storeDeliveryTip)).toLocaleString()}원</p>
                                <hr />
                                <div className="riderontheway-orderdetail-request-div">
                                    <p
                                        className="riderontheway-orderdetail-requests-title"
                                    >요청사항</p>
                                    {
                                        order.orderRequests ? (
                                            <p className="riderontheway-orderdetail-requests-content">{order.orderRequests}</p>
                                        ) : (
                                            <p className="riderontheway-orderdetail-requests-content">없음</p>
                                        )
                                    }
                                </div>
                                <hr />
                                <RiderOrderStatus
                                    orderId={order.orderId}
                                    message="배달 시간이 초과되었습니다."
                                    css={
                                        {
                                            order_status : "order_status",
                                            order_status_content : "order_status_content",
                                            order_status_time_div : "order_status_time_div",
                                            order_status_time_remaining : "order_status_time_remaining",
                                            order_status_delivery_deadline : "order_status_delivery_deadline",
                                            order_status_message : "order_status_message",
                                            order_status_steps : "order_status_steps",
                                            order_status_step : "order_status_step",
                                            order_status_loading: "order_status_loading",
                                        }
                                    }
                                />
                            </div>
                            <hr />
                            <div className="btn-container">
                                {/* 픽업 완료 btn || 배달 완료 btn */}
                                {
                                    onDelivery ? (
                                        <button
                                            className="btn btn-success btn-lg pickingup-delivery-btn"
                                            onClick={() => {navigate(`/rider/result/${orderId}`)}}
                                        >배달 완료
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-warning btn-lg pickingup-delivery-btn"
                                            onClick={() => {handlePickingOrder()}}
                                        >픽업 완료
                                        </button>
                                    )
                                }
                            </div>
                            <div className="btn-container">
                                <button
                                    className="btn btn-outline-info btn-lg"
                                    onClick={() => {navigate(`/chat/message/${storeRoomId}`)}}
                                >
                                    매장 채팅하기
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-lg"
                                    onClick={() => {navigate(`/chat/message/${userRoomId}`)}}
                                >
                                    고객 채팅하기
                                </button>
                            </div>
                            <div className="btn-container">
                                {/* 카카오 내비 url 이동 */}
                                <button onClick={openKakaoNavi } className="btn btn-primary kakao-btn">
                                    카카오 내비 실행
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="loading">로딩 중...</div>
                )
            }
        </div>
    )
}

export default RiderOntheway;
