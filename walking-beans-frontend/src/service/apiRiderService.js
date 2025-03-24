import axios from "axios";

const API_URL = "http://localhost:7070/api";

const apiRiderService = {

    /***************** Address *****************/
    // get user main address
    getUserMainAddressByOrderId : function (orderId, userId, setUserAddress) {
        axios
            .get(`${API_URL}/addresses/main?orderId=${orderId}&userId=${userId}`)
            .then(
                (res) => {
                    setUserAddress(res.data);
                }
            )
            .catch(
                (err) => {
                    alert("유저 주소를 불러오는 중 오류가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            )
    },

    /***************** Orders *****************/
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

    getOrderStatusWithRemainingTime : function (orderId, setOrders) {
        axios
            .get(`${API_URL}/orders/riderOrderTimeRemaining?orderId=${orderId}`)
            .then(
                (res) => {
                    setOrders(res.data);
                }
            )
            .catch(
                (err) => {
                    alert("주문 정보를 불러오는 중 오류가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            )
    },

    updateOrdersByRiderIdAndOrderId : function (riderId, orderId) {
        axios
            .patch(`${API_URL}/orders/onme?riderId=${riderId}&orderId=${orderId}`)
            .then(
                (res) => {
                    console.log(res.data + "개 변경");
                }
            )
            .catch(
                (err) => {
                    alert("주문 정보에 해당 라이더를 업데이트 중 문제가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            )
    },

    updateOrderStatus : function (orderId, orderStatus) {
        axios
            .patch(`${API_URL}/orders/orderStatus?orderId=${orderId}&orderStatus=${orderStatus}`)
            .then(
                (res) => {
                    console.log(res.data + "개 변경");
                }
            )
            .catch(
                (err) => {
                    alert("주문 정보에 주문 상태를 업데이트 중 문제가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            )
    },

    /***************** Stores *****************/
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
    },

    getStoreAddressByOrderId : function (orderId, setStore) {
        axios
            .get(`${API_URL}/store/address/orderId/${orderId}`)
            .then(
                (res) => {
                    setStore(res.data);
                }
            )
            .catch(
                (err) => {
                    alert("가게 정보를 불러오는 중 오류가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            )
    },

    /***************** RiderReview *****************/
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

    /***************** Chatting *****************/
    getChattingRooms : function (userId, receiverRelation, setChattingRoom) {
        axios
            .get(`${API_URL}/chattingroom?userId=${userId}&receiverRelation=${receiverRelation}`)
            .then(
                (res) => {
                    setChattingRoom(res.data);
                }
            )
            .catch(
                (err) => {
                    alert("채팅방 목록을 불러오는 중 오류가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            );
    },

    getChattingMessageList : function (roomId, setMessages) {
        axios
            .get(`${API_URL}/chattingmessage?roomId=${roomId}`)
            .then(
                (res) => {
                    setMessages(res.data);
                }
            )
            .catch(
                (err) => {
                    alert("채팅방 목록을 불러오는 중 오류가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            );
    },

    getUserChattingRoomByUserId : function (userId, receiverRelation, setChattingRoom) {
        axios
            .get(`${API_URL}/userchattingroom?userId=${userId}&receiverRelation=${receiverRelation}`)
            .then(
                (res) => {
                    setChattingRoom(res.data);
                }
            )
            .catch(
                (err) => {
                    alert("채팅방 목록을 불러오는 중 오류가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            );
    },

    getAllChattingMembers : function (roomId, userId, setChattingMemberList) {
        axios
            .get(`${API_URL}/chattingmember?roomId=${roomId}&userId=${userId}`)
            .then(
                (res) => {
                    setChattingMemberList(res.data);
                }
            )
            .catch(
                (err) => {
                    alert("채팅방 목록을 불러오는 중 오류가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            );
    },

    getUserAndStoreRoomId : function (orderId, userId, setChattingMemberList) {
        axios
            .get(`${API_URL}/chattingmember/roomId?orderId=${orderId}&userId=${userId}`)
            .then(
                (res) => {
                    console.log("📌 API 응답 데이터:", res.data);  // ✅ 데이터 확인용
                    console.log("📌 데이터 타입:", typeof res.data);
                    setChattingMemberList(res.data);
                }
            )
            .catch(
                (err) => {
                    alert("채팅방 목록을 불러오는 중 오류가 발생했습니다.");
                    console.error("err 문제 개발자가 확인하기 : " + err)
                }
            );
    }
}

export default apiRiderService;