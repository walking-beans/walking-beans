import React, {useEffect, useRef, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/User.css";
import userCurrentLocation from "../../assert/images/rider/userCurrentLocation.svg";
import axios from "axios";

const KAKAO_MAP_API_KEY = "1cfadb6831a47f77795a00c42017b581";

const UserSearchMap = () => {
    const location = useLocation();
    const { lat, lng, searchResults = [] } = location.state || {};
    const mapRef = useRef(null);
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const markersRef = useRef([]);
    const navigate = useNavigate();
    const infoWindowsRef = useRef([]);


    // ✅ lat, lng이 변경될 때마다 sessionStorage에 저장
    useEffect(() => {
        if (lat && lng) {
            sessionStorage.setItem("userLat", lat);
            sessionStorage.setItem("userLng", lng);
        }
    }, [lat, lng]);



    //  매장의 리뷰를 가져와 업데이트하는 함수
    const fetchReviews = (storeId, callback) => {
        axios.get(`http://localhost:7070/api/reviews/${storeId}`)
            .then((res) => {
                const reviewsData = res.data;
                const totalScore = reviewsData.reduce((sum, review) => sum + review.reviewStarRating, 0);
                const average = reviewsData.length > 0 ? (totalScore / reviewsData.length).toFixed(1) : "0.0";
                const reviewCount = reviewsData.length;
                callback(average, reviewCount);
            })
            .catch((err) => {
                console.error(`❌ 리뷰 정보를 불러오지 못했습니다. storeId: ${storeId}`, err);
                callback("0.0", 0);
            });
    };

    //  주변 매장 데이터 가져오기 + 리뷰 업데이트
    const fetchNearbyStores = (lat, lng) => {
        axios.get(`http://localhost:7070/api/store/nearby?lat=${lat}&lng=${lng}`)
            .then((res) => {
                console.log("📌 주변 매장 데이터:", res.data);

                let updatedStores = [];
                let remainingStores = res.data.length;

                if (remainingStores === 0) {
                    console.log("❌ 주변에 매장이 없습니다.");
                    setStores([]);
                    return;
                }

                res.data.forEach((store) => {
                    fetchReviews(store.storeId, (rating, reviewCount) => {
                        updatedStores.push({
                            ...store,
                            storeRating: rating,
                            storeReviewCount: reviewCount,
                        });

                        remainingStores--;
                        if (remainingStores === 0) {
                            setStores(updatedStores); // ⭐️ 모든 리뷰 가져온 후 한 번만 업데이트
                        }
                    });
                });
            })
            .catch((error) => console.error("❌ 매장 정보 불러오기 오류:", error));
    };

// 카카오 지도 초기화
    useEffect(() => {
        if (!lat || !lng) return;

        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("search-map");
                if (!mapContainer) return;

                const mapOption = {
                    center: new window.kakao.maps.LatLng(lat, lng),
                    level: 5,
                };
                const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
                mapRef.current = newMap;

                //  사용자 위치 마커 추가
                const userMarkerImage = new window.kakao.maps.MarkerImage(
                    userCurrentLocation,
                    new window.kakao.maps.Size(40, 42),
                    { offset: new window.kakao.maps.Point(20, 42) }
                );

                new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(lat, lng),
                    map: newMap,
                    title: "내 위치",
                    image: userMarkerImage,
                });

                //  지도 생성 후 주변 매장 데이터 요청
                fetchNearbyStores(lat, lng);
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [lat, lng]); // `mapRef.current` 제거



    // 기존 마커를 지도에서 삭제하는 함수
    const clearMarkers = () => {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
    };

    const handleMarkerClick = (store) => {
        fetchReviews(store.storeId, (rating, reviewCount) => {

            //  별점이 제대로 업데이트된 후 setSelectedStore 실행
            setSelectedStore(prevStore => ({
                ...prevStore,
                ...store,
                storeRating: rating, // 최신 리뷰 반영
                storeReviewCount: reviewCount,
            }));
        });

        mapRef.current.panTo(new window.kakao.maps.LatLng(store.storeLatitude, store.storeLongitude));
    };

    useEffect(() => {
        if (!mapRef.current) return;

        clearMarkers(); // 기존 마커 삭제

        const displayStores = searchResults.length > 0 ? searchResults : stores;
        console.log("🗺️ 지도에 표시할 매장 목록:", displayStores);

        displayStores.forEach((store) => {
            const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(store.storeLatitude, store.storeLongitude),
                map: mapRef.current,
            });

            const infoWindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px; font-size:12px; background:#fff; border-radius:5px;">${store.storeName}</div>`,
            });

            //  마커에 마우스를 올리면 매장 이름 표시
            window.kakao.maps.event.addListener(marker, "mouseover", () => {
                infoWindow.open(mapRef.current, marker);
            });

            window.kakao.maps.event.addListener(marker, "mouseout", () => {
                infoWindow.close();
            });

            //  마커 클릭 이벤트: 실시간 리뷰 반영
            window.kakao.maps.event.addListener(marker, "click", () => {
                infoWindow.close();
                handleMarkerClick(store); // 실시간 별점 & 리뷰 반영
            });

            markersRef.current.push(marker);
            infoWindowsRef.current.push(infoWindow);
        });
    }, [searchResults, stores]); // `stores` 변경 시 다시 실행

    //  매장 상세 정보 보기
    const handleStore = () => {
        if (!selectedStore?.storeId) return;
        navigate(`/store/${selectedStore.storeId}`);
    };


    return (
        <div className="user-search-map-container">
            <div id="search-map" style={{ width: "100%", height: "700px" }}></div>
            {selectedStore && (
                <div className="store-info">
                    <div className="user-order-hr"></div>
                    <h3 onClick={handleStore}>
                        {selectedStore.storeName}
                    </h3>
                    <p>평점: ★ {selectedStore.storeRating} ({selectedStore.storeReviewCount} 리뷰)</p>
                    <p>{selectedStore.storeStatus} : {selectedStore.storeOperationHours}</p>
                    <img className="store-picture" src={selectedStore.storePictureUrl} alt="매장 이미지" />
                </div>
            )}
        </div>
    );
};

export default UserSearchMap;