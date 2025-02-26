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



}
export default apiStoreService;