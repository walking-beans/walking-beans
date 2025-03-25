import React, {useEffect, useRef, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/User.css";
import userCurrentLocation from "../../images/rider/userCurrentLocation.svg";
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


    const preventClose = (e) => {
        // 2. 해당 함수 안에 새로운 함수를 생성하는데, 이때 이 함수는 자바스크립트의 이벤트를 감지하게된다.
        e.preventDefault();
        // 2-1. 특정 이벤트에 대한 사용자 에이전트 (브라우저)의 기본 동작이 실행되지 않도록 막는다.
        e.returnValue = '';
        // 2-2. e.preventDefault를 통해서 방지된 이벤트가 제대로 막혔는지 확인할 때 사용한다고 한다.
        // 2-3. 더 이상 쓰이지 않지만, chrome 설정상 필요하다고 하여 추가함.
        // 2-4. returnValue가 true일 경우 이벤트는 그대로 실행되고, false일 경우 실행되지 않는다고 한다.
        navigate("/");
    };

// 브라우저에 렌더링 시 한 번만 실행하는 코드
    useEffect(() => {
        (() => {
            window.addEventListener('beforeunload', preventClose);
            // 4. beforeunload 이벤트는 리소스가 사라지기 전 window 자체에서 발행한다.
            // 4-2. window의 이벤트를 감지하여 beforunload 이벤트 발생 시 preventClose 함수가 실행된다.
        })();

        return () => {
            window.removeEventListener('beforeunload', preventClose);
            // 5. 해당 이벤트 실행 후, beforeunload를 감지하는 것을 제거한다.
        };
    });

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

    //  주변 매장 데이터 가져오기 (지도 로드 후 실행)
    const fetchNearbyStores = (lat, lng) => {
        axios.get(`http://localhost:7070/api/store/nearby?lat=${lat}&lng=${lng}`)
            .then((res) => {
                console.log(" 주변 매장 데이터:", res.data);
                setStores(res.data); //  매장 데이터 상태 업데이트
            })
            .catch((error) => console.error("매장 정보 불러오기 오류:", error));
    };

    // 기존 마커를 지도에서 삭제하는 함수
    const clearMarkers = () => {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
    };

    //  지도에 매장 마커 표시
    useEffect(() => {
        if (!mapRef.current) return;

        clearMarkers(); //  기존 마커 삭제

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

            // ✅ 마커에 마우스를 올리면 매장 이름 표시
            window.kakao.maps.event.addListener(marker, "mouseover", () => {
                infoWindow.open(mapRef.current, marker);
            });

            window.kakao.maps.event.addListener(marker, "mouseout", () => {
                infoWindow.close();
            });

            //  마커 클릭 이벤트 (기존 infoWindow 닫고 새 infoWindow 열기)
            window.kakao.maps.event.addListener(marker, "click", () => {
                infoWindow.close(); // 클릭 시 매장이름 사라지게 설정
                setSelectedStore(store);
                mapRef.current.panTo(new window.kakao.maps.LatLng(store.storeLatitude, store.storeLongitude));
            });

            markersRef.current.push(marker);
            infoWindowsRef.current.push(infoWindow);
        });

    }, [searchResults, stores]); // ✅ stores가 변경될 때 실행

    // ✅ 매장 상세 정보 보기
    const handleStore = () => {
        if (!selectedStore?.storeId) return;
        navigate(`/user/order/${selectedStore.storeId}`);
    };


    return (
        <div>
            <div id="search-map" style={{ width: "100%", height: "500px" }}></div>
            {selectedStore && (
                <div className="store-info">
                    <h3 onClick={handleStore} className="cursor-pointer text-primary fw-bold">
                        {selectedStore.storeName}
                    </h3>
                    <img className="store-picture" src={selectedStore.storePictureUrl} alt="매장 이미지" />
                    <p>평점: ★ {selectedStore.storeRating} ({selectedStore.storeReviewCount} 리뷰)</p>
                    <p>{selectedStore.storeStatus} : {selectedStore.storeOperationHours}</p>
                </div>
            )}
        </div>
    );
};

export default UserSearchMap;