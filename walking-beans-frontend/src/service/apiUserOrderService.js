import axios, {get} from "axios";

const API_ORDER_URL = "http://localhost:7070/api/orders"
const API_CART_URL = "http://localhost:7070/api/carts"
const API_MENU_URL = "http://localhost:7070/api/menu"
const API_STORE_URL = "http://localhost:7070/api/store"
const API_OPTION_URL = "http://localhost:7070/api/option"
const API_ADDRESS_URL = "http://localhost:7070/api/addresses"

const apiUserOrderService = {

    // 장바구니 메뉴 삭제
    deleteUserOrderCart:
        function (cartId, setCarts) {
            return axios
                .delete(`${API_CART_URL}/${cartId}`)
                .then((res) => {
                    console.log("백엔드 연결 성공", res.data);
                    setCarts((prevCarts) => prevCarts.filter(cart => cart.cartId !== cartId));
                })
                .catch((err) => {
                    console.error("DeleteUserOrderCart 에러 발생", err);
                    alert("메뉴 삭제에 실패하였습니다. 다시 시도해 주세요.");
                });
        },

    // cart 데이터 가져오기
    getUserOrderByCartId: function (cartId) {
        return axios
            .get(`${API_CART_URL}/order/${cartId}`)
            .then((res) => {
                console.log("카트 데이터 연결 성공", res.data);
                // 응답 데이터가 객체일 경우 배열로 감싸기
                if (res.data && typeof res.data === 'object' && !Array.isArray(res.data)) {
                    return [res.data]; // 단일 객체를 배열로 감싸서 반환
                }
                return res.data; // 이미 배열이면 그대로 반환
            })
            .catch((err) => {
                console.log("getUserOrderByCartId 에러 발생", err);
                return [];
            });
    },

    // 선택한 option 데이터 가져오기(orderId 기준)
    getUserOrderByOrderId:
        function (orderId, setCarts) {
            return axios
                .get(`${API_CART_URL}/order/${orderId}`)
                .then(
                    (res) => {
                        console.log("getUserOrderByOrderId 연결 성공 : ", res.data);
                        setCarts(Array.isArray(res.data) ? res.data : [res.data]);
                    }
                )
                .catch(
                    (err) => {
                        console.log("getUserOrderByOrderId 오류 발생 : ", err);
                    }
                )
        },

    // 가게 데이터 가져오기
    getStoreByOrderId:
        function (storeId, setStore) {
            axios
                .get(`${API_STORE_URL}/${storeId}`)
                .then(
                    (res) => {
                        console.log("가게 데이터 가져오기 성공 : ", res.data);
                        return setStore(res.data);
                    }
                )
                .catch(
                    (err) => {
                        console.error("가게 데이터 가져오기 실패 : ", err);
                    }
                )
        },

    // 메뉴 데이터 가져오기
    getMenuByStoreId:
        function (storeId) {
            return axios
                .get(`${API_MENU_URL}/storemenu/${storeId}`)
                .then(
                    (res) => {
                        console.log("메뉴 데이터 가져오기 성공 : ", res.data)
                        return res.data;
                    }
                )
                .catch(
                    (err) => {
                        console.error("메뉴 데이터 가져오기 실패 : ", err)
                        throw err;
                    }
                )
        },

    // 메뉴 Id로 옵션 가져오기
    getOptionsByMenuId:
        function (menuId, setOptions) {
            if (!menuId) {
                console.error("getOptionsByMenuId 오류 menuId가 없음")
                return;
            }

            return axios
                .get(`${API_OPTION_URL}/optionmenu/${menuId}`)
                .then(
                    (res) => {
                        console.log("메뉴 id 로 옵션 가져오기 성공 : ", res.data);
                        setOptions(res.data);
                    }
                )
                .catch(
                    (err) => {
                        console.error("메뉴 id 로 옵션 가져오기 실패 : ", err)
                        setOptions([]);
                    }
                )
        },

    // 카트에 추가하면서 order데이터 생성
    addToCart:
        function (requestData) {
            return axios
                .post(`${API_ORDER_URL}/create`, requestData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then((res) => {
                    console.log("장바구니 추가 성공:", res.data);
                    return res.data;  // orderId, cartId 반환
                })
                .catch((err) => {
                    console.error("장바구니 추가 중 오류 발생:", err);
                    throw err;
                });
        },

    // 대표메뉴 정보 가져오기
    getMenusByStoreId:
        function (storeId) {
            return axios
                .get(`${API_MENU_URL}/mainmenu/${storeId}`)
                .then((res) => {
                    console.log("대표메뉴 데이터 불러오기 성공:", res.data);
                    return res.data;
                })
                .catch((err) => {
                    console.error("대표메뉴 데이터 불러오기 실패:", err);
                    return [];
                });
        },

    // 고객 배달 주소 가져오기
    getOrderAddressByUserId:
        function (userId, setAddress) {
            axios
                .get(`${API_ADDRESS_URL}/${userId}`)
                .then((res) => {
                    console.log("주소 불러오기 성공 : ", res.data);
                    const filteredAddress = res.data.find(addr => addr.addressRole === 1);
                    setAddress(filteredAddress || "기본 주소가 없습니다. 설정해 주세요");
                })
                .catch((err) => {
                    console.log("주소 불러오기 실패 : ", err);
                })
        },

    // 주문내역 내 오더 정보 가져오기
    getOrderStatusByOrderId:
        function (orderId) {
            return axios
                .get(`${API_ORDER_URL}/info/${orderId}`)
                .then(
                    (res) => {
                        console.log("주문내역 가져오기 성공 : ", res.data);
                        return res.data;
                    }
                )
                .catch(
                    (err) => {
                        console.log("주문내역 가져오기 실패 : ", err);
                        throw err;
                    }
                )
        },
}




export default apiUserOrderService;

