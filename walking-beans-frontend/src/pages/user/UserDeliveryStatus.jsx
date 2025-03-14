import React, {useEffect, useState} from "react";
import "../../css/User.css";
import riderMapMarker from "../../images/user/riderMapMarker.svg"
import storeMapMarker from "../../images/user/storeMapMarker.svg"
import userMapMarker from "../../images/user/UserMapMarker.svg"
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const KAKAO_MAP_API_KEY = "65165b1e9d69958de8f764a08f2787ad";

const UserDeliveryStatus = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [map, setMap] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigator = useNavigate();
    const {orderId} = useParams();
    const [userCoords, setUserCoords] = useState({lat: null, lng: null}); // 유저 주소
    const [storeCoords, setStoreCoords] = useState({lat: null, lng: null}); // 매장 주소
    const [store, setStore] = useState([]);
    const [address, setAddress] = useState([]);
    const [order, setOrder] = useState([]);
    const [cart, setCart] = useState([]);

    // 로그인 확인
    useEffect(() => {
        // 로컬 스토리지에서 사용자 정보 불러오기
        const addressUser = localStorage.getItem("user");
        if (addressUser) {
            const address = JSON.parse(addressUser);
            console.log("로그인 user 정보", address);
            setUserId(address.user_id);
        } else {
            console.log("로그인 필요");
            alert("배달 현황 서비스를 이용하시려면 로그인이 필요합니다.");
            navigator("/login");
        }
    }, []);

    // 주문한 유저 주소 가져오기
    useEffect(() => {
        if (!orderId) {
            console.log("유저 주소를 불러올 orderId가 없습니다. : ", orderId)
            return;
        }

        axios
            .get(`http://localhost:7070/api/addresses/user/order/${orderId}`)
            .then((res) => {

                if (!orderId) {
                    console.log("주소를 가져올 orderId가 없습니다 : ", orderId);
                    return;
                }

                // 가져온 데이터 위도 경도 추출
                setUserCoords({
                    lat: res.data.addressLatitude,
                    lng: res.data.addressLongitude
                });
                console.log("유저 주소 위도 :", res.data.addressLatitude, "유저 주소 경도 :", res.data.addressLongitude);
                console.log("유저 주소 데이터 : ", res.data)

                // 현황 데이터 가져오기
                setAddress(res.data);

            })
            .catch((err) => {
                console.log("유저 주소 데이터 불러오기 오류 발생 : ", err);
            });
    }, [orderId]);

    // 주문 받은 매장 주소 가져오기
    useEffect(() => {
        if (!orderId) {
            console.log("매장 주소를 불러올 orderId가 없습니다. : ", orderId)
            return;
        }

        axios
            .get(`http://localhost:7070/api/orders/storeInfo/${orderId}`)
            .then((res) => {
                setStoreCoords({
                    lat: res.data.storeLatitude,
                    lng: res.data.storeLongitude
                });
                console.log("매장 위도 :", res.data.storeLatitude, "매장 경도 :", res.data.storeLongitude);

                // 현황 데이터 가져오기
                setStore(res.data);

            })
            .catch((err) => {
                console.log("매장 주소 데이터 불러오기 오류 발생 : ", err);
            })
    }, [orderId]);

    // 카카오 맵 기본 생성
    useEffect(() => {
        // 카카오 맵 API 요청 중복 방지
        if (window.kakao && window.kakao.maps) {
            setIsLoaded(true);
            return;
        }

        // 카카오 맵 API 요청
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
        script.async = true; //비동기로 데이터 가져오기

        // script 완료 후 실행
        script.onload = () => {
            // load를 사용해 window.kakao.maps 를 초기화 후 실행
            window.kakao.maps.load(() => {
                setIsLoaded(true);
            });
        };

        // 카카오 맵 api 실행 (head => 오픈 api 실행할 때 사용)
        document.head.appendChild(script);
    }, []);

    // 유저, 매장 마커 찍기
    useEffect(() => {
        // 필요한 데이터가 모두 로드되었는지 확인
        if (!isLoaded || !window.kakao?.maps || !userCoords.lat || !userCoords.lng || !storeCoords.lat || !storeCoords.lng) return;

        const mapContainer = document.getElementById("user-delivery-status-map");
        const mapOption = {
            // 유저, 매장의 평균 값 계산을 통해 중간지점 도출/ 중심점을 기준으로 두 가지 모두 나올 수 있도록 변경
            center: new window.kakao.maps.LatLng((userCoords.lat + storeCoords.lat) / 2, (userCoords.lng + storeCoords.lng) / 2),
            level: 7
        };

        // 지도 생성
        const newMap = new window.kakao.maps.Map(mapContainer, mapOption);

        // 사용자 위치 마커
        const userMarker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(userCoords.lat, userCoords.lng),
            map: newMap,
            title: "배달 받을 곳 주소",
            image: new window.kakao.maps.MarkerImage(userMapMarker, new window.kakao.maps.Size(80, 60))
        });

        // 매장 위치 마커
        const storeMarker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(storeCoords.lat, storeCoords.lng),
            map: newMap,
            title: "매장 주소",
            image: new window.kakao.maps.MarkerImage(storeMapMarker, new window.kakao.maps.Size(80, 60))
        });

        // 두 지점이 모두 보이도록 지도 범위 재설정
        const bounds = new window.kakao.maps.LatLngBounds(); // 지도 특정 영역 정의
        bounds.extend(userMarker.getPosition()); // 유저 마커를 좌표에 추가
        bounds.extend(storeMarker.getPosition()); // 매장 마커를 좌표에 추가
        newMap.setBounds(bounds); // 지도에 마커 추가

        setMap(newMap); // 생성된 지도 객체 상태 저장

    }, [isLoaded, userCoords, storeCoords]);

    return (
        <div className="user-delivery-status-container">
            {/* Kakao Map */}
            <div className="user-delivery-map" id="user-delivery-status-map"></div>

            {/* 배달 현황 */}
            <div>
                <div>도착 예정시간</div>
                <div>진행현황 바</div>
            </div>

            <div className="user-order-hr" alt="구분선"></div>

            <div>
                <div>{store?.storeName}</div>
                <div>주문번호</div>
                <div>{order?.orderTotalPrice}(메뉴 {cart.cartQuantity}개)</div>
            </div>

            <div className="user-order-hr" alt="구분선"></div>

            <div>
                <div>배달주소</div>
                <div>{address?.address} {address?.detailedAddress}</div>
            </div>

            <div className="user-order-hr" alt="구분선"></div>

            <div>
                <div>요청사항</div>
                <div>{order.orderRequests}</div>
            </div>

            {/* 컴포넌트 만들어서 결제 방식에 따라 다르게 보이게 하기*/}
            <div className="user-order-click-btn">
                <button onClick={() => {}}>매장 채팅하기</button>
                <button onClick={() => {}}>라이더 채팅하기</button>
                <button onClick={() => {}}>만나서 결제 완료</button>
            </div>
        </div>
    );
};
export default UserDeliveryStatus;

// 추가 개발 라이더 현재 위치 보여주기
