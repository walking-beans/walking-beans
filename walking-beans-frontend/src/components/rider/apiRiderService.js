import axios from "axios";

const API_URL = "http://localhost:7070/api";

const apiRiderService = {

    // get all rider income
    getAllRiderIncomeList : function (riderId, callback, todaysMonth, todaysYear, setTotalPrice) {
        axios
            .get(`${API_URL}/deliveryIncome?riderId=${riderId}&todaysMonth=${todaysMonth}&todaysYear=${todaysYear}`)
            .then(
                (res) => {
                    callback(res.data);
                    setTotalPrice(res.data.reduce((sum, income) => sum + income.incomeAmount, 0));
                }

            )
            .catch(
                (err) => {
                    alert("배달 기록을 불러오는 중 오류가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            );
    },

    // get rider star
    getRiderStarRating : function (riderId, setStar) {
        axios
            .get(`${API_URL}/riderReview/star?riderId=${riderId}`)
            .then(
                (res) => setStar(res.data)
            )
            .catch(
                (err) => {
                    alert("라이더 별점 불러오는 중 오류가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            )
    },

    // get store information by orderId
    getOrdersByRiderIdOnDuty : function (riderIdOnDuty, setOrders) {
        axios
            .get(`${API_URL}/orders/riderIdOnDuty?riderIdOnDuty=${riderIdOnDuty}`)
            .then(
                (res) => {
                    setOrders(res.data);
                }
            )
            .catch(
                (err) => {
                    alert("주문 내역을 불러오는 중 오류가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            )
    },

    getStoreInfoInRiderMain : function (setStores) {
        axios
            .get(`${API_URL}/store/riderMain`)
            .then(
                (res) => {
                    if (res.data.length > 0) {
                        setStores(res.data);
                    } else {
                        alert("현재 10Km 내 주문 대기 상태 중인 주문 내역이 없습니다. 잠시 후 다시 시도해주세요.");
                    }
                }
            )
            .catch(
                (err) => {
                    alert("주문 내역을 불러오는 중 오류가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            )
    }
}

export default apiRiderService;