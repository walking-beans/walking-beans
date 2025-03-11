import "./UserHome.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiStoreService from "../service/apiStoreService";

const KAKAO_MAP_API_KEY = "1cfadb6831a47f77795a00c42017b581";

const UserHome = ({ user: initialUser }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [store, setStore] = useState([]);
    const [displayStores, setDisplayStores] = useState([]);
    const [map, setMap] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [sortType, setSortType] = useState("rating");
    const navigate = useNavigate();
    const [user, setUser] = useState(initialUser || null);  // user 상태 초기화
    const [userAddress, setUserAddress] = useState(null);  // 주소 상태 관리
    const [userId, setUserId] = useState(null);  // userId 상태

    // 로컬스토리지에서 사용자 정보 불러오기
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log("User 정보:", parsedUser);
            setUserId(parsedUser.user_id);  // userId 상태 설정
        } else {
            console.log("로그인되지 않았습니다.");
        }
    }, []);

    // 사용자의 주소 불러오기
    useEffect(() => {
        if (user && user.userId) {
            setUserId(user.userId);  // userId 상태 설정
        }
    }, [user]);  // user 상태가 변경될 때마다 실행

    useEffect(() => {
        if (userId) {
            console.log("유저 ID:", userId);

            axios.get(`http://localhost:7070/api/addresses/${userId}`)
                .then((res) => {
                    console.log("API 응답 데이터:", res.data);

                    // find()를 이용 addressRole === 1 인 주소 찾기
                    const primaryAddress = res.data.find(addr => addr.addressRole === 1);
                    if (primaryAddress) {
                        setUserAddress(primaryAddress);
                    } else {
                        console.log("기본 주소가 없습니다.");
                    }
                })
                .catch((error) => {
                    console.error("주소 목록 불러오기 오류:", error);
                });
        } else {
            console.log("userId가 없습니다.");
        }
    }, [userId]);

    // userAddress가 null인지 확인
    console.log("userAddress 상태:", userAddress);

    const getDistance = (lat1, lng1, lat2, lng2) => {
        if (!lat1 || !lng1 || !lat2 || !lng2) return 0;
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
        apiStoreService.getStore(setStore);
    }, []);

    useEffect(() => {
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
        }
    }, []);

    useEffect(() => {
        if (!userLocation || store.length === 0) return;
        const filtered = store.filter((s) =>
            getDistance(userLocation.lat, userLocation.lng, s.storeLatitude, s.storeLongitude) <= 10
        );
        setDisplayStores(filtered.sort(() => 0.5 - Math.random()).slice(0, 5));
    }, [userLocation, store]);

    useEffect(() => {
        if (!userLocation) return;
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("map");
                if (!mapContainer) return;
                const mapOption = {
                    center: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                    level: 5,
                };
                const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
                setMap(newMap);

                // 내 위치 마커 추가
                new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                    map: newMap,
                    title: "내 위치"
                });
            });
        };
        return () => {
            document.head.removeChild(script);
        };
    }, [userLocation]);

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            axios.get(`http://localhost:7070/api/store/search?keyword=${searchKeyword}`)
                .then((res) => {
                    console.table(res.data);
                    let sortedData = res.data.map(store => ({
                        ...store,
                        storeRating: store.storeRating ?? 0,
                        storeReviewCount: store.storeReviewCount ?? 0,
                        storeLatitude: store.storeLatitude ?? 0,
                        storeLongitude: store.storeLongitude ?? 0
                    }));
                    if (sortType === "rating") {
                        sortedData.sort((a, b) => b.storeRating - a.storeRating);
                    } else if (sortType === "distance") {
                        sortedData.sort((a, b) =>
                            getDistance(userLocation.lat, userLocation.lng, a.storeLatitude, a.storeLongitude) -
                            getDistance(userLocation.lat, userLocation.lng, b.storeLatitude, b.storeLongitude)
                        );
                    }
                    setDisplayStores(sortedData);
                })
                .catch(() => alert("검색 데이터를 가져오지 못했습니다."));
        }
    };

    const handleMapClick = () => {
        navigate("user/search/map", { state: { userLocation, stores: displayStores } });
    };

    console.log("불러온 주소:", userAddress);
    return (
        <div className="user-home-container">
            {/*주소를 보여줄 공간*/}
            <div className="user-address">
                {userAddress ? (
                    <span onClick={() => navigate("/user/insertAddress")}>
                        <strong>{userAddress.addressName}</strong> {userAddress.address} {userAddress.detailedAddress}
                    </span>
                ) : (
                    <button onClick={() => navigate("/user/insertAddress")}>주소를 입력해주세요</button>
                )}
            </div>

            <select onChange={(e) => setSortType(e.target.value)}>
                <option value="rating">평점순</option>
                <option value="distance">거리순</option>
            </select>
            <input type="text" placeholder="가게 검색" value={searchKeyword}
                   onChange={(e) => setSearchKeyword(e.target.value)}
                   onKeyDown={handleSearch} />

            <div id="map" onClick={handleMapClick}></div>
            <ul className="store-list">
                {displayStores.map((store) => (
                    <li key={store.storeId} className="store-item">
                        <span className="store-name">{store.storeName}</span>
                        <img className="store-picture" src={store.storePictureUrl} alt="store" />
                        <span className="store-rating">★ {store.storeRating} ({store.storeReviewCount})</span>
                        <span className="store-distance">{userLocation ? getDistance(userLocation.lat, userLocation.lng, store.storeLatitude, store.storeLongitude).toFixed(1) : "-"} km</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserHome;
