import React, { useEffect, useState } from "react";
import axios from "axios";
import apiStoreService from "../service/apiStoreService";

const KAKAO_MAP_API_KEY = "1cfadb6831a47f77795a00c42017b581"; // 본인 API 키 입력




const UserHome = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [store,setStore] = useState([]);
    const [filteredStores, setFilteredStores] = useState([]);
    const [map,setMap] = useState(null);
    const [markers,setMarkers]= useState([]);
    const [randomStores, setRandomStores] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortType, setSortType] = useState("rating");

    const getDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLng = (lng2 - lng1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };


    useEffect(() => {
        apiStoreService.getStore(setStore)
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


        const filtered = store.filter((s) =>
            getDistance(userLocation.lat, userLocation.lng, s.storeLatitude, s.storeLongitude) <= 10
        );


        setFilteredStores(filtered);
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

    // 배열을 랜덤하게 섞는 함수
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // 랜덤한 4개 매장 선택
    useEffect(() => {
        if (filteredStores.length === 0) return;

        const shuffledStores = shuffleArray(filteredStores);
        setRandomStores(shuffledStores.slice(0, 4)); // 랜덤한 4개 매장 선택
    }, [filteredStores]);


    // 검색기능
    // Enter 키를 눌렀을 때 검색 실행
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (searchKeyword.trim() === "") {
                // 입력값이 없으면 초기화
                setSearchQuery("");
                setFilteredStores([]);
                setRandomStores(shuffleArray(store).slice(0, 4));
            } else {
                setSearchQuery(searchKeyword);
            }
        }
    };


    useEffect(() => {
        if (searchQuery === "") {
            setFilteredStores([]); // 검색어가 없으면 원래 리스트로 복원
            setRandomStores(shuffleArray(store).slice(0, 4));
        } else {
            axios
                .get(`http://localhost:7070/api/store/search?keyword=${searchQuery}`)
                .then((res) => {
                    //  만약 검색 결과가 전체 가게와 동일하면 기존 데이터로 복원
                    if (res.data.length === store.length) {
                        setFilteredStores([]);
                        setRandomStores(shuffleArray(store).slice(0, 4));
                    } else {
                        setFilteredStores(res.data);
                    }
                })
                .catch(() => alert("검색 데이터를 가져오지 못했습니다."));
        }
    }, [searchQuery]);

    useEffect(() => {
    }, [filteredStores]);

// 검색창에 입력할 때 값 변경
    const handleChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSort = (type) => {
        setSortType(type);
        let sortedStores = [...filteredStores];

        if (type === "rating") {
            sortedStores.sort((a, b) => b.storeRating - a.storeRating);
        } else if (type === "distance") {
            sortedStores.sort((a, b) =>
                getDistance(userLocation.lat, userLocation.lng, a.storeLatitude, a.storeLongitude) -
                getDistance(userLocation.lat, userLocation.lng, b.storeLatitude, b.storeLongitude));
        }
        setFilteredStores(sortedStores);
    };




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







    return (
        <div>
            <div className="search-container">
                <button className={sortType === "rating" ? "active" : ""} onClick={() => handleSort("rating")}>
                    평점순
                </button>
                <button className={sortType === "distance" ? "active" : ""} onClick={() => handleSort("distance")}>
                    거리순
                </button>
                <input
                    type="text"
                    placeholder="어떤 커피를 찾으시나요?"
                    value={searchKeyword}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <h2>내 주변 카페 둘러보기 (반경 10km)</h2>
            <div id="map" style={{ width: "100%", height: "500px" }}></div>

            {/* 매장 정보 랜덤 출력 */}
            <div className="user-main-random">
                {randomStores.map((store) => (
                    <div className="user-main-random-card" key={store.storeId} >
                        <img src={store.storePictureUrl} />
                        <h3 >{store.storeName}</h3>
                        <p><span className="store-rating">★</span> {store.storeRating} ({store.storeReviewCount})</p>
                        <p>
                          약  {store.storeMaxDeliveryTime}분
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default UserHome;