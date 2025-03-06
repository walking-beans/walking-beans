import axios from "axios";

const API_STORE_URL = "http://localhost:7070/api/store";

const apiStoreService ={
    // 매장 정보 가져오기
    getStore:
    function (setStore){
        axios.get(API_STORE_URL)
            .then((res)=>{
                console.log("api 데이터", res.data);
                setStore(res.data);
            })
            .catch((err)=>{
                alert("백엔드에서 데이터를 가져오지 못했습니다.")
                console.log("err : ", err)
            })
    },
    // 매장 검색하기
    searchStore:
        function (e, searchKeyword, sortType, userLocation, setDisplayStores,getDistance) {
        if (e.key !== "Enter") return;

        if (!searchKeyword || searchKeyword.trim() === "") {
            alert("검색어를 입력해주세요.");
            return;
        }

        axios.get(`http://localhost:7070/api/store/search?keyword=${encodeURIComponent(searchKeyword)}`)
            .then((res) => {
                console.log("검색 결과:", res.data);

                let sortedData = res.data.map(store => ({
                    ...store,
                    storeRating: store.storeRating ?? 0,
                    storeReviewCount: store.storeReviewCount ?? 0,
                    storeLatitude: store.storeLatitude ?? 0,
                    storeLongitude: store.storeLongitude ?? 0,
                    distance: userLocation
                        ? getDistance(userLocation.lat, userLocation.lng, store.storeLatitude, store.storeLongitude)
                        : null
                }));

                if (sortType === "rating") {
                    sortedData.sort((a, b) => b.storeRating - a.storeRating);
                } else if (sortType === "distance" && userLocation) {
                    sortedData.sort((a, b) => a.distance - b.distance);
                }

                setDisplayStores(sortedData);
            })
            .catch((err) => {
                console.error("검색 요청 오류:", err);
                alert("검색 데이터를 가져오지 못했습니다. 백엔드를 확인하세요.");
            });
    },




}
export default apiStoreService;