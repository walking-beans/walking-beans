import axios from "axios";

const API_ORDER_URL = "http://localhost:7070/api/orders";
const API_CART_URL = "http://localhost:7070/api/cart";
const API_MENU_URL = "http://localhost:7070/api/menu";
const API_STORE_URL = "http://localhost:7070/api/store";
const API_OPTION_URL = "http://localhost:7070/api/option";
const API_ADDRESS_URL = "http://localhost:7070/api/addresses";

const apiUserOrderService = {

    getUserCartByUserId: async (userId) => {
        try {
            const response = await axios.get(`${API_CART_URL}/${userId}`);
            console.log("장바구니 데이터 가져오기 성공:", response.data);
            return response.data;
        } catch (error) {
            console.error("장바구니 데이터 가져오기 오류:", error.response ? error.response.data : error.message);
            return [];
        }
    },

    addToCart: async (cartItem) => {
        try {
            //userId 확인
            if (!cartItem.userId) {
                throw new Error("User ID is required");
            }

            // 현재 장바구니 상태 확인
            const currentCart = await apiUserOrderService.getUserCartByUserId(cartItem.userId);
            console.log("현재 장바구니 데이터:", currentCart);

            // 장바구니에 다른 가게의 메뉴가 있는지 확인
            if (
                currentCart.length > 0 &&
                currentCart[0].storeId &&  // storeId가 존재할 때만 비교
                currentCart[0].storeId !== cartItem.storeId
            ) {
                const confirmClear = window.confirm("다른 가게의 메뉴가 장바구니에 있습니다. 장바구니를 비우고 새로운 메뉴를 담으시겠습니까?");
                console.log("새로 추가하려는 메뉴의 storeId:", cartItem.storeId);
                if (confirmClear) {
                    // 장바구니 비우기
                    await apiUserOrderService.clearCart(cartItem.storeId, cartItem.userId);
                } else {
                    // 사용자가 취소한 경우
                    return null;
                }
            }

            // 장바구니에 추가
            console.log("장바구니에 추가된 데이터 : ", cartItem);
            const response = await axios.post(`${API_CART_URL}/add`, cartItem, {
                headers: {"Content-Type": "application/json"}
            });
            return response.data;
        } catch (error) {
            console.error("장바구니 추가 실패:", error.response?.data || error.message);
            throw error;
        }
    },

    clearCart: async (userId, storeId) => {
        if (!userId) {
            console.error("User ID is undefined", userId);
            throw new Error("User ID is required");
        }
        try {
            const response = await axios.delete(`${API_CART_URL}/${userId}/store/${storeId}`);
            console.log("기존 장바구니 삭제 성공:", response);
            return response.data;
        } catch (error) {
            console.error("장바구니 삭제 오류:", error);
            throw error;
        }
    },

    deleteUserOrderCart: async (cartId) => {
        try {
            await axios.delete(`${API_CART_URL}/delete/${cartId}`);
        } catch (error) {
            console.error("장바구니 삭제 실패:", error);
        }
    },

    updateCartQuantity: async (cartId, cartQuantity) => {
        try {
            console.log(`API 요청: 수량 변경 - cartId=${cartId}, cartQuantity=${cartQuantity}`);

            const response = await axios.patch(`${API_CART_URL}/update`,
                {cartId, cartQuantity},
                {headers: {"Content-Type": "application/json"}}
            );

            console.log("장바구니 수량 변경 성공:", response.data);
            return response.data;
        } catch (error) {
            console.error("장바구니 수량 변경 실패:", error);
            throw error;
        }
    },

    getUserOrderByOrderId: async (orderId, setCarts) => {
        try {
            const response = await axios.get(`${API_CART_URL}/order/${orderId}`);
            console.log("getUserOrderByOrderId 연결 성공:", response.data);
            setCarts(Array.isArray(response.data) ? response.data : [response.data]);
        } catch (error) {
            console.error("getUserOrderByOrderId 오류 발생:", error);
        }
    },

    getStoreByOrderId: async (storeId) => {
        try {
            const response = await axios.get(`${API_STORE_URL}/${storeId}`);
            console.log("가게 데이터 가져오기 성공:", response.data);
            return response.data;
        } catch (error) {
            console.error("가게 데이터 가져오기 실패:", error);
            return null;
        }
    },

    getMenuByStoreId: async (storeId) => {
        try {
            const response = await axios.get(`${API_MENU_URL}/storemenu/${storeId}`);
            console.log("메뉴 데이터 가져오기 성공:", response.data);
            return response.data;
        } catch (error) {
            console.error("메뉴 데이터 가져오기 실패:", error);
            throw error;
        }
    },

    getOptionsByMenuId: async (menuId, setOptions) => {
        if (!menuId) {
            console.error("getOptionsByMenuId 오류: menuId가 없음");
            return;
        }
        try {
            const response = await axios.get(`${API_OPTION_URL}/optionmenu/${menuId}`);
            console.log("메뉴 ID로 옵션 가져오기 성공:", response.data);
            setOptions(response.data);
        } catch (error) {
            console.error("메뉴 ID로 옵션 가져오기 실패:", error);
            setOptions([]);
        }
    },

    insertOrder: async () => {
        try {
            const response = await axios .post(`${API_ORDER_URL}/create`,{
                headers: {"Content-Type": "application/json"}
            });

            const data = await response.data;
            console.log("주문 저장 성공 : ", data.orderId)

        } catch (error) {
            console.log("주문 저장 실패 : ", error)
        }
    },

};

export default apiUserOrderService;