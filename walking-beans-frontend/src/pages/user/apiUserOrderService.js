/*
- <MenuOption/> - 상품 옵션 리스트 div (옵션명, 추가가격, 장바구니추가 버튼, 주문하기 버튼)

- <OrderBtn/> - 주문하기 버튼 클릭 시 장바구니 데이터를 서버로 전송하는 버튼
- <DeliveryAddress/> - 배달 주소 div (배달주소) (표시)
- <OrderDetails/> - 주문 상세 내역 div (메뉴명, 옵션, 가격)
- <PaymentTotal/> - 결제 금액 div (결제금액, 주문금액, 배달팁)
- <OrderList/> - 주문내역 리스트 div (매장명, 주문일자, 주문일시, 제품명, 가격, 상세보기버튼)
*/

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
/*
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

*/
}

export default apiUserOrderService;

