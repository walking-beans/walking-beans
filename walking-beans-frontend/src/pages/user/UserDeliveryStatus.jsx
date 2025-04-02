import React, {useEffect, useRef, useState} from "react";
import "../../css/User.css";
import storeMapMarker from "../../images/user/storeMapMarker.svg"
import userMapMarker from "../../images/user/UserMapMarker.svg"
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import RiderOrderStatus from "../../components/rider/RiderOrderStatus";
import apiRiderService from "../../service/apiRiderService";

const KAKAO_MAP_API_KEY = "65165b1e9d69958de8f764a08f2787ad";

const UserDeliveryStatus = () => {
    const {orderNumber} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const [userCoords, setUserCoords] = useState({lat: null, lng: null});
    const [storeCoords, setStoreCoords] = useState({lat: null, lng: null});
    const [store, setStore] = useState([]);
    const [address, setAddress] = useState([]);
    const [order, setOrder] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [payments, setPayments] = useState([]);

    const [storeRoomId, setStoreRoomId] = useState(0);
    const [riderRoomId, setRiderRoomId] = useState(0);

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const location = useLocation();
    const chatSectionRef = useRef(null);
    const [highlight, setHighlight] = useState(false);

    // 로그인 확인
    useEffect(() => {
        if (user) {
            setUserId(user.user_id);
        } else {
            alert("배달 현황 서비스를 이용하시려면 로그인이 필요합니다.");
            navigate("/login");
        }
    }, []);

    // 주문 정보 가져오기
    useEffect(() => {
        if (!orderNumber) return;

        const fetchOrderDetails = async () => {
            try {
                const orderResponse = await axios.get(`http://localhost:7070/api/orders/orderNumber/${orderNumber}`);
                const orderData = orderResponse.data;
                setOrder(orderData);
                setOrderId(orderData.orderId);

                const [addressResponse, storeResponse] = await Promise.all([
                    axios.get(`http://localhost:7070/api/addresses/user/order/${orderData.orderId}`),
                    axios.get(`http://localhost:7070/api/orders/storeInfo/${orderData.orderId}`)
                ]);

                if (addressResponse.data) {
                    setAddress(addressResponse.data);
                    setUserCoords({
                        lat: addressResponse.data.addressLatitude,
                        lng: addressResponse.data.addressLongitude
                    });
                }

                if (storeResponse.data) {
                    setStore(storeResponse.data);
                    setStoreCoords({
                        lat: storeResponse.data.storeLatitude,
                        lng: storeResponse.data.storeLongitude
                    });
                }
            } catch (err) {
                console.error("데이터 조회 오류:", err);
            }
        };

        fetchOrderDetails();
    }, [orderNumber]);

    // 결제 정보 조회
    useEffect(() => {
        if (!orderId) return;

        axios.get(`http://localhost:7070/api/payment/method/${orderId}`)
            .then(res => {
                setPayments(res.data);
            })
            .catch(err => {
                console.log("결제 정보 조회 실패", err);
            });
    }, [orderId]);

    // 카카오 맵 설정
    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            setIsLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
        script.async = true;
        script.onload = () => {
            window.kakao.maps.load(() => setIsLoaded(true));
        };
        document.head.appendChild(script);
    }, []);

    // 지도에 마커 표시
    useEffect(() => {
        if (!isLoaded || !userCoords.lat || !storeCoords.lat) return;

        const mapContainer = document.getElementById("user-delivery-status-map");
        const mapOption = {
            center: new window.kakao.maps.LatLng(
                (userCoords.lat + storeCoords.lat) / 2,
                (userCoords.lng + storeCoords.lng) / 2
            ),
            level: 7
        };

        const newMap = new window.kakao.maps.Map(mapContainer, mapOption);

        const userMarker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(userCoords.lat, userCoords.lng),
            map: newMap,
            image: new window.kakao.maps.MarkerImage(userMapMarker, new window.kakao.maps.Size(80, 60))
        });

        const storeMarker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(storeCoords.lat, storeCoords.lng),
            map: newMap,
            image: new window.kakao.maps.MarkerImage(storeMapMarker, new window.kakao.maps.Size(80, 60))
        });

        const bounds = new window.kakao.maps.LatLngBounds();
        bounds.extend(userMarker.getPosition());
        bounds.extend(storeMarker.getPosition());
        newMap.setBounds(bounds);
    }, [isLoaded, userCoords, storeCoords]);

    const handleMeet = () => {
        apiRiderService.updateOrderStatus(orderId, 6);
        // 짧은 지연 후 페이지 이동
        setTimeout(() => navigate(`/order`), 100);
    };

    /****************** 라이더 채팅방은 RiderMain 에서 라이더가 주문 수령시 create 될 예정입니다. 이 부분은 수정해주시길 바랍니다. **********************/
    // 라이더 채팅 핸들러
    const handleRiderChat = () => {
        if (riderRoomId) {
            navigate(`/chat/message/${riderRoomId}`);
        } else {
            // 라이더 정보 가져오기 후 채팅방 생성
            axios.get(`http://localhost:7070/api/orders?orderId=${orderId}`)
                .then(res => {
                    const riderId = res.data.riderIdOnDuty;
                    if (riderId) {
                        axios.get(`http://localhost:7070/api/chattingroom/insert?riderId=${riderId}&userId=${userId}&ownerId=${store.userId}&orderId=${orderId}`)
                            .then(() => {
                                alert("라이더 채팅방이 생성되었습니다. 다시 시도해주세요.");
                                // 채팅방 ID 다시 가져오기
                                apiRiderService.getUserAndStoreRoomId(orderId, userId, (data) => {
                                    if (data["2"]) {
                                        setRiderRoomId(data["2"]);
                                        navigate(`/chat/message/${data["2"]}`);
                                    }
                                });
                            });
                    } else {
                        alert("아직 배정된 라이더가 없습니다.");
                    }
                });
        }
    };

        // 매장 채팅 핸들러
    const handleStoreChat = () => {
        if (storeRoomId) {
            navigate(`/chat/message/${storeRoomId}`);
        } else {
            // 채팅방 생성 API 직접 호출
            axios.get(`http://localhost:7070/api/chattingroom/userinsert?userId=${userId}&orderId=${orderId}&storeId=${store.storeId}`)
                .then(() => {
                    // 채팅방 ID 다시 가져오기
                    apiRiderService.getUserAndStoreRoomId(orderId, userId, (data) => {
                        if (data["3"]) {
                            setStoreRoomId(data["3"]);
                            navigate(`/chat/message/${data["3"]}`);
                        } else {
                            alert("매장 채팅방을 찾을 수 없습니다. 잠시 후 다시 시도해주세요.");
                        }
                    });
                });
        }
    };

    // 반짝
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("scrollToChat") === "true" && chatSectionRef.current) {
            chatSectionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            setHighlight(true);
            setTimeout(() => setHighlight(false), 2000); // 2초 후 효과 제거
        }
    }, [location]);

    return (
        <div className="user-delivery-status-container">
            <div className="user-delivery-map" id="user-delivery-status-map"></div>

            <div className="user-status-modal-container">
                <div>
                    <div className="user-order-bordtext">도착예정시간</div>
                    {orderId && (
                        <RiderOrderStatus
                            orderId={orderId}
                            message="초과! 현재 위치는 라이더 채팅을 이용해 주세요."
                            css={{
                                order_status_time_div: "user-menu-option-group-container",
                                order_status_time_remaining: "user-order-big-text",
                                order_status_delivery_deadline: "user-order-optiontitle",
                                order_status_steps: "user-order-click-btn",
                                order_status_message: "user-order-bordtext",
                                order_status_step: "user-order-optiontitle",
                                order_status_loading: "user-order-guide",
                            }}
                        />
                    )}
                </div>
                <div className="user-order-hr" alt="구분선"></div>

                <div>
                    <div className="user-order-bordtext">{store?.storeName}</div>
                    <div className="user-order-basic-text-m-0">{order.orderNumber}</div>
                    <div className="user-order-basic-text-m-0">
                        {Number(order?.totalPayment).toLocaleString()}원 (메뉴 {order?.quantity}개)
                    </div>
                </div>

                <div className="user-order-hr" alt="구분선"></div>

                <div>
                    <div className="user-order-bordtext">배달주소</div>
                    <div className="user-order-basic-text-m-0">{address?.address} {address?.detailedAddress}</div>
                </div>

                <div className="user-order-hr" alt="구분선"></div>

                <div className="user-order-optiontitle">
                    <div className="user-order-bordtext">요청사항</div>
                    <div className="user-order-basic-text-m-0">{order?.orderRequests}</div>
                </div>
                {/* 결제 방식에 따른 버튼 */}
                <div>
                    {payments?.paymentMethod === "tossPay" && (
                        <div className="user-order-click-btn">
                            <button
                                className="user-mini-btn-b"
                                onClick={handleStoreChat}
                            >
                                매장 채팅하기
                            </button>
                            <button
                                className="user-mini-btn-sb"
                                onClick={handleRiderChat}
                            >
                                라이더 채팅하기
                            </button>
                        </div>
                    )}
                    {payments?.paymentMethod === "meetPayment" && (
                        <div>
                            <div className="user-order-click-btn">
                                <button
                                    className="user-mini-btn-b"
                                    onClick={handleStoreChat}
                                >
                                    매장 채팅하기
                                </button>
                                <button
                                    className="user-mini-btn-sb"
                                    onClick={handleRiderChat}
                                >
                                    라이더 채팅하기
                                </button>
                            </div>
                            <div className="user-order-click-btn-one">
                                <button
                                    className="user-order-btn-b"
                                    onClick={handleMeet}
                                >만나서 결제 완료
                                </button>
                            </div>
                            <div
                                className="user-order-guide"
                                onClick={handleMeet}
                            >배달을 받으셨다면 만나서 결제 완료 버튼을 눌러주세요!
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default UserDeliveryStatus;

// 추가 개발 라이더 현재 위치 보여주기