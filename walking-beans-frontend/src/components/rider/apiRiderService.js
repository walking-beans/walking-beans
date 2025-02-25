import axios from "axios";

const API_URL = "http://localhost:7070/api";

const apiRiderService = {

    // get all rider income
    getAllRiderIncomeList : function (riderId, callback, errCallback) {
        axios
            .get(`${API_URL}/deliveryIncome?riderId=${riderId}`)
            .then(
                (res) => callback(res.data)
            )
            .catch(
                (err) => {
                    alert("배달 기록을 불러오는 중 오류가 발생했습니다.");
                    errCallback("배달 기록 목록 보기 실패");
                    console.log("err 문제 개발자가 확인하기 : " + err)
                }
            );
    },

    // get rider star
    getRiderStarRating : function (riderId, setStar, setErrMessage) {
        axios
            .get(`${API_URL}/riderReview/star?riderId=${riderId}`)
            .then(
                (res) => setStar(res.data)
            )
            .catch(
                (err) => {
                    alert("라이더 별점 불러오는 중 오류가 발생했습니다.");
                    setErrMessage("라이더 별점 가져오기 실패");
                    console.log("err 문제 개발자가 확인하기 : " + err)
                }
            )
    }

}

export default apiRiderService;