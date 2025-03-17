import axios from "axios";

const API_ORDER_URL = "http://localhost:7070/api/orders";
const API_CART_URL = "http://localhost:7070/api/carts";
const API_MENU_URL = "http://localhost:7070/api/menu";
const API_STORE_URL = "http://localhost:7070/api/store";
const API_OPTION_URL = "http://localhost:7070/api/option";
const API_ADDRESS_URL = "http://localhost:7070/api/addresses";
// 추후 이름 수정
const API_BASE_URL = "http://localhost:7070/api/cart";

const apiUserOrderService = {

    getUserCartByUserId: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${userId}`);
            console.log("장바구니 데이터 가져오기 성공:", response.data);
            return response.data;
        } catch (error) {
            console.error("장바구니 데이터 가져오기 오류:", error.response ? error.response.data : error.message);
            return [];
        }
    },
    addToCart: async (cartItem) => {
        try {
            console.log(" API로 전송할 데이터:", cartItem);
            const response = await axios.post(`${API_BASE_URL}/add`, cartItem, {
                headers: { "Content-Type": "application/json" }
            });
            return response.data;
        } catch (error) {
            console.error("장바구니 추가 실패:", error.response?.data || error.message);
            throw error;
        }
    },


    deleteUserOrderCart: async (cartId) => {
        try {
            await axios.delete(`${API_BASE_URL}/delete/${cartId}`);
        } catch (error) {
            console.error("장바구니 삭제 실패:", error);
        }
    },

    updateCartQuantity: async (cartId, cartQuantity) => {
        try {
            console.log(`API 요청: 수량 변경 - cartId=${cartId}, cartQuantity=${cartQuantity}`);

            const response = await axios.patch(`${API_BASE_URL}/update`,
                { cartId, cartQuantity },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("장바구니 수량 변경 성공:", response.data);
            return response.data;
        } catch (error) {
            console.error("장바구니 수량 변경 실패:", error);
            throw error;
        }
    },


    getUserOrderByCartId: async (cartId) => {
        try {
            const response = await axios.get(`${API_ORDER_URL}/cart/${cartId}`);
            console.log("장바구니 데이터:", response.data);
            return Array.isArray(response.data) ? response.data : [response.data];
        } catch (error) {
            console.error("cartId로 장바구니 데이터 가져오기 실패:", error);
            return [];
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

    getCartIdByUserId: async (userId) => {
        try {
            const response = await axios.get(`${API_ORDER_URL}/cart/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error("userId로 cartId 조회 실패:", error);
            return null;
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

    getMenusByStoreId: async (storeId) => {
        try {
            const response = await axios.get(`${API_MENU_URL}/mainmenu/${storeId}`);
            console.log("대표메뉴 데이터 불러오기 성공:", response.data);
            return response.data;
        } catch (error) {
            console.error("대표메뉴 데이터 불러오기 실패:", error);
            return [];
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

    addToCartWithOrder: async (requestData) => {
        try {
            const response = await axios.post(`${API_ORDER_URL}/create`, requestData, {
                headers: { "Content-Type": "application/json" }
            });
            console.log("장바구니 추가 성공:", response.data);
            return response.data;
        } catch (error) {
            console.error("장바구니 추가 중 오류 발생:", error);
            throw error;
        }
    },

    getOrderAddressByUserId: async (userId, setAddress) => {
        try {
            const response = await axios.get(`${API_ADDRESS_URL}/${userId}`);
            console.log("주소 불러오기 성공:", response.data);
            const filteredAddress = response.data.find((addr) => addr.addressRole === 1);
            setAddress(filteredAddress || "기본 주소가 없습니다. 설정해 주세요");
        } catch (error) {
            console.error("주소 불러오기 실패:", error);
        }
    }
};

export default apiUserOrderService;
