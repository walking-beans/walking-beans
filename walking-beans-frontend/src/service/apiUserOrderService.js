import axios from "axios";

const API_ORDER_URL = "http://localhost:7070/api/orders"
const API_CART_URL = "http://localhost:7070/api/carts"

const apiUserOrderService = {

    // 장바구니 메뉴 삭제
    deleteUserOrderCart: function (cartId) {
        return axios
            .delete(`${API_CART_URL}/${cartId}`)
            .then((res) => {
                console.log("백엔드 연결 성공", res.data);
                return res.data;
            })
            .catch((err) => {
                console.error("DeleteUserOrderCart 에러 발생", err);
                alert("메뉴 삭제에 실패하였습니다. 다시 시도해 주세요.");
            });
    },

    // cart 데이터 가져오기
    getUserOrderByCartId:
        function (cartId) {
           return axios
                .get(`${API_CART_URL}/${cartId}`)
                .then(
                    (res) => {
                        console.log("백엔드 연결 성공", res.data);
                        return res.data;
                    }
                )
                .catch(
                    (err) => {
                        console.log("getUserOrderByCartId 에러 발생", err);
                        alert("카트 데이터를 가져오는 데 문제가 발생하였습니다. 다시 시도해 주세요.");
                        return null;
                    }
                )
        },

    getUserOrderByOrderId:
    function (orderId) {
        return axios
            .get(`${API_CART_URL}/order/${orderId}`)
            .then(
                (res) => {
                    console.log("백엔드 연결 성공 : ", res.data);
                    return res.data;
                }
            )
            .catch(
                (err) => {
                    console.log("getUserOrderByOrderId 오류 발생 : ", err);
                }
            )
    }

}

export default apiUserOrderService;

