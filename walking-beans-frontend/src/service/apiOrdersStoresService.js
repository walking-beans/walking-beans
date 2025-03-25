import axios from "axios";

const API_URL = "http://localhost:7070/api/order";

const apiOrdersStoresService = {
    // getOrdersByRiderIdOnDuty
    getOrdersByRiderIdOnDuty : function (lat, lng, setStores, setOrders) {
        axios
            .get(`${API_URL}/riderIdOnDuty?lat=${lat}&lng=${lng}`)
            .then((data) => {
                const firstOrders = Object.values(data)
                    .map(group => group[0]) // 각 배열의 첫 번째 요소만 가져옴
                    .filter(Boolean);
                setStores(firstOrders);
                setOrders(data);
            })
            .catch(
                (err) => {
                    alert("주문 내역을 불러오는 중 오류가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            )
    },

    // getOrderByOrderId
    getOrderByOrderId : function (orderId, setOrder) {
        axios
            .get(`${API_URL}?orderId=${orderId}`)
            .then(
                (res) => {
                    if (!res.data) {
                        console.log("no data");
                        return;
                    }
                    console.log(res.data);
                    setOrder(res.data);
                }
            )
            .catch(
                (err) => {
                    alert("주문 내역을 불러오는 중 오류가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            )
    },

}

export default apiOrdersStoresService;